import { axiosInstance } from '@/hooks/useAxiosIns'
import { useQuery } from '@tanstack/react-query'

const useAuthService = ({ verificationId, code }: { verificationId?: string; code?: string }) => {
    const emailVerification = useQuery({
        queryKey: ['emailVerification', verificationId, code],
        queryFn: () => {
            return axiosInstance
                .get<string>(`/auth/otp/email`, {
                    params: { verificationId, code }
                })
                .then(res => res.data)
        },
        enabled: !!verificationId && !!code,
        retry: false
    })

    return {
        emailVerification
    }
}

export default useAuthService
