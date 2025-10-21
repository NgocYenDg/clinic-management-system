import { useMutation } from '@tanstack/react-query'

import useAxiosIns from '@/hooks/useAxiosIns'
const appointmentService = () => {
    const axios = useAxiosIns()

    const createAppointmentMutation = useMutation({
        mutationFn: (appointmentData: ICreateAppointmentData) => {
            console.log('Appointment Data:', appointmentData)
            return Promise.resolve()
            // return axios.post('/appointments', appointmentData)
        }
    })

    return {
        createAppointmentMutation
    }
}

export default appointmentService
