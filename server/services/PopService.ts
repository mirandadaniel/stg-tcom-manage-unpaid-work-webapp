export type ProgressBreakdownItem = { title: string; completed: number; required: number }
export type UserDetails = {
  name: string
  userId: string
  hoursRequired: number
  address: string
  email: string
  phone: string
}

export type ProgressDetails = {
  totalCompletedHours: number
  totalHours: number
  percentCompleted: number
  breakdown: Array<ProgressBreakdownItem>
  appointment: {
    title: string
    date: string
    time: string
    location: string
  }
}

export type OrderRequirement = {
  category: string
  requirement: string
  infoLink?: string
}

export type UnpaidWorkSummary = {
  day: string
  time: string
  frequency: string
  meetingPoint: string
  workType: string
  requirements: string
}

export type ProbationConditionsSummary = {
  orderType: string
  startDate: string // later: data type date, format at view
  requirementsCompletionDate: string // later: data type date, format at view
  requirements: Array<OrderRequirement>
}

export interface PopService {
  getUserDetails(userId: string): Promise<UserDetails>

  getProgressDetails(userId: string): Promise<ProgressDetails>

  getUnpaidWorkConditions(userId: string): Promise<Array<string>>

  getProbationConditions(userId: string): Promise<Array<string>>

  getUnpaidWorkSummary(userId: string): Promise<UnpaidWorkSummary>

  getUnpaidWorkWarning(userId: string): Promise<string>

  getProbationConditionSummary(userId: string): Promise<ProbationConditionsSummary>

  getAppointments(userId: string): Promise<{
    upcomingAppointments: Array<{
      title: string
      date: string
      time: string
      location: string
      contact?: string
      contactLink?: string
      description?: string
      category?: string
      showOnMap?: boolean
      status?: string
    }>
    pastAppointments: Array<{
      title: string
      date: string
      time: string
      location: string
      contact?: string
      contactLink?: string
      description?: string
      category?: string
      showOnMap?: boolean
      status?: string
    }>
  }>
}
