declare global {
    type Shift = 1 | 2 | 3
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
