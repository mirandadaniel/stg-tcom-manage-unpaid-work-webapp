import { getNunjucksEnv } from './nunjucksEnv'
import { matchRouteToTemplate } from './routeMap'
import getPopService from '../../server/services/serviceInjection'

type TableEntriesCollection = Array<
  Array<{ text: string | number; attributes?: object } | { html: string | number }>
>

const extractBody = (html: string) => {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : html
}

export const renderLegacyRoute = async (
  path: string,
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const rawBypass = searchParams.bypass
  const bypassValue = Array.isArray(rawBypass) ? rawBypass[0] : rawBypass
  const isBypass = bypassValue === 'true'
  const bypassQuery = isBypass ? '?bypass=true' : ''
  const bypassParam = isBypass ? 'bypass=true' : ''
  const { template, status } = matchRouteToTemplate(path)
  const env = getNunjucksEnv()
  const popService = getPopService()
  const rawUserId = searchParams.userId
  const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId || 'X971639'
  let routeContext: Record<string, unknown> = {}

  if (path === '/pop/your-details') {
    const userProfile = await popService.getUserDetails(userId)
    routeContext = { userProfile }
  }

  if (path === '/pop/your-progress') {
    const rawProgress = searchParams.progress
    const progressValue = Array.isArray(rawProgress) ? rawProgress[0] : rawProgress
    let tempUserId = userId
    let nextAppointment
    let previousAttendence: TableEntriesCollection | undefined
    let attendance = []

    if (progressValue === 'wip') {
      tempUserId = `wip_${tempUserId}`
      nextAppointment = await popService.getNextAppointment(tempUserId)
      attendance = await popService.getPreviousAttendence(tempUserId)
    }

    const progressData = await popService.getProgressDetails(tempUserId)
    const displayBreakdown: TableEntriesCollection = []
    progressData.breakdown.forEach(item => {
      if (item.title === 'Total') {
        displayBreakdown.push([
          { html: `<strong>${item.title}</strong>` },
          { html: `<strong>${item.required}</strong>` },
          { html: `<strong>${item.completed}</strong>` },
        ])
      } else {
        displayBreakdown.push([{ text: item.title }, { text: item.required }, { text: item.completed }])
      }
    })

    if (attendance.length > 0) {
      previousAttendence = []
      attendance.forEach(item => {
        previousAttendence?.push([
          {
            text: item.date,
            attributes: {
              'data-sort-value': item.sortableDate,
            },
          },
          { text: item.status },
          { text: `${item.credits} ${item.unit}` },
          { html: `<strong>${item.performanceRating}</strong><br />${item.feedback}` },
        ])
      })
    }

    const unpaidWorkWarning = await popService.getUnpaidWorkWarning(tempUserId)
    const unpaidWorkSummary = await popService.getUnpaidWorkSummary(tempUserId)
    routeContext = {
      progressData,
      displayBreakdown,
      nextAppointment,
      previousAttendence,
      unpaidWorkSummary,
      unpaidWorkWarning,
    }
  }

  if (path === '/pop/appointments') {
    const appointments = await popService.getAppointments(userId)
    const submittedEvidence = searchParams.submittedEvidence === 'true'
    routeContext = { ...appointments, submittedEvidence }
  }

  if (path === '/pop/view-appointment') {
    const appointmentDetails = await popService.getAppointmentDetails('12345', userId)
    const submitEvidence = searchParams.submitEvidence === 'true'
    routeContext = { appointmentDetails, submitEvidence }
  }

  if (path === '/pop/view-past-appointment') {
    const appointmentDetails = await popService.getAppointmentDetails('67890', userId)
    routeContext = { appointmentDetails }
  }

  if (path === '/pop/conditions') {
    const orderSummary = await popService.getProbationConditionSummary(userId)
    routeContext = { orderSummary }
  }

  if (path === '/pop/upw-conditions') {
    const unpaidWorkSummary = await popService.getUnpaidWorkSummary(userId)
    const unpaidWorkWarning = await popService.getUnpaidWorkWarning(userId)
    const conditions = await popService.getUnpaidWorkConditions(userId)
    routeContext = { unpaidWorkSummary, unpaidWorkWarning, conditions }
  }

  if (path === '/pop/probation-conditions') {
    const conditions = await popService.getProbationConditions(userId)
    routeContext = { conditions }
  }

  const context = {
    applicationName: 'Manage my community sentence',
    asset_path: '/assets/',
    csrfToken: '',
    session: {},
    bypass: bypassValue,
    bypassQuery,
    bypassParam,
    ...Object.fromEntries(Object.entries(searchParams).map(([key, value]) => [key, value ?? ''])),
    ...routeContext,
  }

  const html = env.render(`${template}.njk`, context)
  return { html: extractBody(html), status }
}
