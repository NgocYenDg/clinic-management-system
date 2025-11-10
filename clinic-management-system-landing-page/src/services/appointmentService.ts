import { axiosInstance } from '@/hooks/useAxiosIns'
import { useMutation } from '@tanstack/react-query'

const useAppointmentService = () => {
    const createAppointment = useMutation({
        mutationFn: (appointmentData: ICreateAppointmentData) => axiosInstance.post('/appointments', appointmentData).then(res => res.data)
    })

    return {
        createAppointment
    }
}

export default useAppointmentService
