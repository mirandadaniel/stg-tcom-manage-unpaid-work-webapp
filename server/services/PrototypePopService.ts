import fs from 'fs'
import { Session, SessionData } from 'express-session'
import { PopService, ProgressBreakdownItem } from './PopService'
import { pastAppointments, upcomingAppointments } from '../routes/data/appointments'
import { unpaidWorkConditions, probationConditions } from '../routes/data/conditions'
import logger from '../../logger'

const PrototypePopService: PopService = {
  async getUserDetails(userId: string) {
    return {
      name: 'Joe Bloggs',
      userId,
      hoursRequired: 100,
      address: '123 Example Street\nLondon\nSW1A 1AA',
      email: 'joe.bloggs@email.com',
      phone: '07700 900123',
    }
  },

  async getProgressDetails(userId) {
    // to simulate zero progress or in progress (wip) we will fake a prefix on the userId
    let breakdown: ProgressBreakdownItem[] = []
    let totalCompletedHours = 0
    const totalRequiredHours = 100
    if (userId.startsWith('wip_')) {
      totalCompletedHours = 50
      breakdown = [
        { title: 'In person', completed: 40, required: 70 },
        { title: 'Education, Training and Employment (ETE) programmes', completed: 10, required: 30 },
        { title: 'Total', completed: 50, required: 100 },
      ]
    } else {
      totalCompletedHours = 40
      breakdown = [
        { title: 'In person', completed: 30, required: 70 },
        { title: 'Education, Training and Employment (ETE) programmes', completed: 10, required: 30 },
        { title: 'Total', completed: 40, required: 100 },
      ]
    }
    return {
      userId,
      totalCompletedHours,
      totalHours: totalRequiredHours,
      percentCompleted: (totalCompletedHours / totalRequiredHours) * 100,
      breakdown,
      appointment: {
        title: 'Community Garden Maintenance',
        date: 'Friday 15 March 2024',
        time: '09:00',
        location: '123 Garden Street, London SE1 7TH',
      },
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPreviousAttendence(userId: string) {
    return [
      {
        date: '15 March 2025',
        sortableDate: '2025-03-15',
        status: 'Attended',
        credits: 7,
        unit: 'hours',
        performanceRating: 'Excellent',
        feedback: 'Great work on the skirting board.\nAppreciate you keeping the engery up even after 3pm.',
      },
      {
        date: '8 March 2025',
        sortableDate: '2025-03-08',
        status: 'Attended',
        credits: 7,
        unit: 'hours',
        performanceRating: 'Excellent',
        feedback: 'Fantastic job on organising the inventory today. Your attention to detail really shows!',
      },
      {
        date: '1 March 2025',
        sortableDate: '2025-03-01',
        status: 'Left earlier',
        credits: 2,
        unit: 'hours',
        performanceRating: 'Satisfactory',
        feedback: 'Your communication could be better. Try using less aggressive language with others.',
      },
      {
        date: '22 February 2025',
        sortableDate: '2025-02-22',
        status: 'Attended',
        credits: 7,
        unit: 'hours',
        performanceRating: 'Excellent',
        feedback: 'Great teamwork during the shift.',
      },
      {
        date: '13 February 2025',
        sortableDate: '2025-02-13',
        status: 'Did not attend',
        credits: 0,
        unit: 'hours',
        performanceRating: '',
        feedback: '',
      },
    ]
  },

  async getAppointments(userId) {
    return { upcomingAppointments, pastAppointments, userId }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getNextAppointment(userId) {
    return {
      date: 'Monday 3 February 2026',
      time: '10:00am',
      title: 'Probation appointment',
      location: 'Probation Office, 123 Main Street, London SE1 2AB',
      contact: 'Sarah Johnson',
      contactLink: '',
      description: 'Probation appointment to review progress and next steps.',
      category: 'Probation appointment',
      showOnMap: true,
    }
  },

  async getAppointmentDetails(appointmentId: string, userId: string) {
    return {
      id: appointmentId,
      title: 'Community Garden Maintenance',
      date: 'Friday 15 March 2024',
      time: '09:00',
      location: '123 Garden Street, London SE1 7TH',
      description: `This is a fake appointment for user ${userId}.`,
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUnpaidWorkSummary(userId: string) {
    return {
      day: 'Saturdays',
      time: '9am - 5pm',
      frequency: 'Weekly',
      meetingPoint: '123 Garden Street, London SE1 7TH',
      workType: 'Group session',
      requirements:
        'Bring a packed lunch and wear appropriate clothing for outdoor work. Shorts, vests or skirts are not allowed. Tools will be provided. Break times will be scheduled during the session.',
      // ^ this might be a list of strings in the future
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUnpaidWorkWarning(userId: string) {
    return 'If you do not wear the right clothes or do not bring your packed lunch, you might be sent back home and your hours will not be credited.'
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUnpaidWorkConditions(userId: string) {
    return unpaidWorkConditions
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getProbationConditionSummary(userId: string) {
    return {
      orderType: 'Community order',
      startDate: '16 December 2024',
      requirementsCompletionDate: '15 December 2025',
      requirements: [
        {
          category: 'Curfew',
          requirement:
            'You must stay at 123 Example Street, London, SW1A 1AA between 10:00 pm and 6:00 am on Mondays to Thursdays, and between 11:00 pm and 8:00 am on Fridays and Saturdays for a period of 3 months from 16 December 2024 to 15 March 2025',
        },
        { category: 'Unpaid work', requirement: '100 hours' },
        { category: 'Rehabilitation activity requirement (RAR)', requirement: '7 days' },
      ],
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getProbationConditions(userId: string) {
    return probationConditions
  },

  async deleteEvidence(session: Session & Partial<SessionData>, filename: string): Promise<void> {
    try {
      const evidenceIndex = session.uploadedEvidence.findIndex(
        (file: { filename: string }) => file.filename === filename,
      )
      if (evidenceIndex === -1) {
        logger.error(`Evidence not found.`)
      }

      const evidencePath = session.uploadedEvidence[evidenceIndex].path
      session.uploadedEvidence.splice(evidenceIndex, 1)
      fs.unlink(evidencePath, err => {
        if (err) {
          logger.error(`Error deleting: ${err.message}`)
        } else {
          logger.info(`File deleted: ${evidencePath}`)
        }
      })
    } catch (error) {
      logger.error(`Error deleting evidence: ${error.message}`)
    }
  },

  async submitEvidence(session: Session & Partial<SessionData>): Promise<void> {
    // eslint-disable-next-line no-param-reassign
    session.uploadedEvidence = []
  },

  async uploadEvidence(session: Session & Partial<SessionData>, files: Express.Multer.File[]): Promise<void> {
    const uploadedEvidence = session.uploadedEvidence || []
    files.forEach(file => {
      uploadedEvidence.push({
        filename: file.originalname,
        path: file.path,
      })
    })
    // eslint-disable-next-line no-param-reassign
    session.uploadedEvidence = uploadedEvidence
  },
}

export default PrototypePopService
