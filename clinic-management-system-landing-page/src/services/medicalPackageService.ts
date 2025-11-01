import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import useAxiosIns from '@/hooks/useAxiosIns'

const medicalPackageService = () => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [medicalPackages, setMedicalPackages] = useState<IMedicalPackage[]>([])

    const getAllMedicalPackagesQuery = useQuery({
        queryKey: ['MedicalPackages'],
        queryFn: () => {
            return Promise.resolve({
                data: [
                    { medicalPackageId: 1, name: 'Gói khám tổng quát' },
                    { medicalPackageId: 2, name: 'Gói khám chuyên khoa' },
                    { medicalPackageId: 3, name: 'Gói khám sức khỏe định kỳ' },
                    { medicalPackageId: 4, name: 'Gói khám phụ khoa' },
                    { medicalPackageId: 5, name: 'Gói khám nam khoa' },
                    { medicalPackageId: 6, name: 'Gói khám nhi khoa' },
                    { medicalPackageId: 7, name: 'Gói khám da liễu' },
                    { medicalPackageId: 8, name: 'Gói khám răng hàm mặt' }
                ]
            } as IResponseData<IMedicalPackage[]>)
        },
        enabled: true
    })

    useEffect(() => {
        if (getAllMedicalPackagesQuery.data) {
            setMedicalPackages(getAllMedicalPackagesQuery.data.data)
        }
    }, [getAllMedicalPackagesQuery.data])

    return {
        medicalPackages
    }
}

export default medicalPackageService
