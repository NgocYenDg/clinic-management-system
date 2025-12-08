import { axiosInstance } from '@/hooks/useAxiosIns'
import { useQuery } from '@tanstack/react-query'

const useMedicalPackageService = () => {
    const medicalPackages = useQuery({
        queryKey: ['medical-packages'],
        queryFn: () => axiosInstance.get<Pagination<IMedicalPackage>>('/medical-package').then(res => res.data)
    })

    return {
        medicalPackages
    }
}

export default useMedicalPackageService
