declare global {
    type Shift = 0 | 1 // 0: Morning, 1: Afternoon
    type ICreateBookingArgs = {
        slotId: string
        name: string
        email: string
        phone: string
    }

    type ISlot = {
        slotId: string
        medicalPackageId: string
        date: string
        shift: Shift
        maxQuantity: number
        remainingQuantity: number
    }

    type IBookingStatus = {
        createdAt?: string
        updatedAt?: string
        deletedAt?: string
        bookingId: string
        appointmentId: string
        status: 'PENDING' | 'APPROVED' | 'REJECTED'
        message?: 'TIMEOUT'
    }
}

export {}
