declare global {
    type Shift = 0| 1 // 0: Morning, 1: Afternoon
    type ICreateAppointmentData = {
        fullName?: string
        email?: string
        phoneNumber?: string
        birthDate?: Date
        shift?: Shift
        doctorId?: number
        symptom?: string
    }
}

export {}
