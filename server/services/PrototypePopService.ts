import { PopService, ProgressBreakdownItem } from './PopService'
import userProfileData from '../data/user-profile.json'
import { unpaidWorkConditions, probationConditions } from '../routes/data/conditions'

const PrototypePopService: PopService = {
  async getUserDetails(userId: string) {
    return {
      name: userProfileData.personalDetails.name,
      preferredName: userProfileData.personalDetails.preferredName,
      dateOfBirth: userProfileData.personalDetails.dateOfBirth,
      userId,
      hoursRequired: userProfileData.unpaidWork.hoursRequired,
      address: userProfileData.contactDetails.address,
      email: userProfileData.contactDetails.email,
      phone: userProfileData.contactDetails.phone,
      mobile: userProfileData.contactDetails.mobile,
      emergencyContact: {
        name: userProfileData.emergencyContact.name,
        relationship: userProfileData.emergencyContact.relationship,
        phone: userProfileData.emergencyContact.phone,
      },
      probationPractitioner: {
        name: userProfileData.probationPractitioner.name,
        phone: userProfileData.probationPractitioner.phone,
        officeAddress: userProfileData.probationPractitioner.officeAddress,
      },
      lastUpdated: userProfileData.metadata.lastUpdated,
    }
  },

  async getProgressDetails(userId) {
    // to simulate zero progress or in progress (wip) we will fake a prefix on the userId
    let breakdown: ProgressBreakdownItem[] = []
    let totalCompletedHours = 0
    const totalRequiredHours = userProfileData.unpaidWork.hoursRequired
    if (userId.startsWith('wip_')) {
      totalCompletedHours = 50
      breakdown = [
        { title: 'In person', completed: 40, required: 70 },
        { title: 'Education, Training and Employment (ETE) programmes', completed: 10, required: 30 },
        { title: 'Total', completed: 50, required: 100 },
      ]
    } else {
      totalCompletedHours = userProfileData.unpaidWork.totalCompletedHours
      breakdown = userProfileData.unpaidWork.breakdown
    }
    return {
      userId,
      totalCompletedHours,
      totalHours: totalRequiredHours,
      percentCompleted: (totalCompletedHours / totalRequiredHours) * 100,
      breakdown,
      appointment: userProfileData.unpaidWork.nextAppointment,
    }
  },

  async getAppointments(userId) {
    return {
      upcomingAppointments: userProfileData.appointments.upcoming,
      pastAppointments: userProfileData.appointments.past,
      userId,
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUnpaidWorkSummary(userId: string) {
    return {
      day: userProfileData.unpaidWork.schedule.day,
      time: userProfileData.unpaidWork.schedule.time,
      frequency: userProfileData.unpaidWork.schedule.frequency,
      meetingPoint: userProfileData.unpaidWork.schedule.meetingPoint,
      workType: userProfileData.unpaidWork.schedule.workType,
      requirements: userProfileData.unpaidWork.schedule.requirements,
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUnpaidWorkWarning(userId: string) {
    return userProfileData.unpaidWork.schedule.warning
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUnpaidWorkConditions(userId: string) {
    return unpaidWorkConditions
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getProbationConditionSummary(userId: string) {
    return userProfileData.orderDetails
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getProbationConditions(userId: string) {
    return probationConditions
  },
}

export default PrototypePopService
