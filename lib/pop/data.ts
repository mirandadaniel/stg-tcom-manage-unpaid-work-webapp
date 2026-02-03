import getPopService from '../../server/services/serviceInjection'
import {
  ProbationConditionsSummary,
  ProgressDetails,
  UnpaidWorkSummary,
  UserDetails,
} from '../../server/services/PopService'

const popService = getPopService()

export type Appointment = {
  date: string
  time: string
  title: string
  location: string
  contact?: string
  contactLink?: string
  description?: string
  category?: string
  showOnMap?: boolean
}

type AppointmentLists = {
  upcomingAppointments: Appointment[]
  pastAppointments: Appointment[]
}

export const getUserDetails = async (userId: string): Promise<UserDetails> =>
  popService.getUserDetails(userId)

export const getProgressDetails = async (userId: string, progress?: string): Promise<ProgressDetails> => {
  const effectiveUserId = progress === 'wip' ? `wip_${userId}` : userId
  return popService.getProgressDetails(effectiveUserId)
}

export const getAppointments = async (userId: string): Promise<AppointmentLists> =>
  popService.getAppointments(userId) as AppointmentLists

export const getUpcomingAppointment = async (userId: string): Promise<Appointment | null> => {
  const appointments = await popService.getAppointments(userId)
  return appointments.upcomingAppointments?.[0] || null
}

export const getPastAppointment = async (userId: string): Promise<Appointment | null> => {
  const appointments = await popService.getAppointments(userId)
  return appointments.pastAppointments?.[0] || null
}

export const getOrderSummary = async (userId: string): Promise<ProbationConditionsSummary> =>
  popService.getProbationConditionSummary(userId)

export const getUnpaidWorkSummary = async (userId: string): Promise<UnpaidWorkSummary> =>
  popService.getUnpaidWorkSummary(userId)

export const getUnpaidWorkWarning = async (userId: string): Promise<string> =>
  popService.getUnpaidWorkWarning(userId)

export const getUnpaidWorkConditions = async (userId: string) =>
  popService.getUnpaidWorkConditions(userId)

export const getProbationConditions = async (userId: string) =>
  popService.getProbationConditions(userId)
