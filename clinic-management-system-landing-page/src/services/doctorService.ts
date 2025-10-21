import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import useAxiosIns from '@/hooks/useAxiosIns'

const doctorService = () => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [doctors, setDoctors] = useState<IDoctor[]>([])

    const getAllDoctorsQuery = useQuery({
        queryKey: ['Doctors'],
        queryFn: () => {
            return Promise.resolve({
                data: [
                    { doctorId: 1, fullName: 'Dr. John Doe' },
                    { doctorId: 2, fullName: 'Dr. Jane Smith' },
                    { doctorId: 3, fullName: 'Dr. Emily Johnson' },
                    { doctorId: 4, fullName: 'Dr. Michael Brown' },
                    { doctorId: 5, fullName: 'Dr. Sarah Davis' },
                    { doctorId: 6, fullName: 'Dr. William Wilson' },
                    { doctorId: 7, fullName: 'Dr. Linda Martinez' },
                    { doctorId: 8, fullName: 'Dr. Robert Anderson' }
                ]
            } as IResponseData<IDoctor[]>)
        },
        enabled: true
    })

    useEffect(() => {
        if (getAllDoctorsQuery.data) {
            setDoctors(getAllDoctorsQuery.data.data)
        }
    }, [getAllDoctorsQuery.data])

    return {
        doctors
    }
}

export default doctorService
