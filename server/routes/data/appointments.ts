import userProfileData from '../../data/user-profile.json'

// Re-export appointments from centralized user profile
export const pastAppointments = userProfileData.appointments.past
export const upcomingAppointments = userProfileData.appointments.upcoming
