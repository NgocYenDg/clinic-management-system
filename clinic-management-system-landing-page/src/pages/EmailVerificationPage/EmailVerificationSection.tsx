import useAuthService from '@/services/authService'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearchParams } from 'react-router'

const EmailVerificationSection = () => {
    const [searchParams] = useSearchParams()
    const verificationId = searchParams.get('verificationId')
    const code = searchParams.get('code')
    const { emailVerification } = useAuthService({ verificationId: verificationId || undefined, code: code || undefined })

    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            <div className="flex flex-col items-center justify-center">
                {(emailVerification.isLoading || emailVerification.isPending) && (
                    <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-lg">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="mb-2 text-3xl font-bold text-green-800">Đang xác nhận email!</h3>
                        </div>
                    </div>
                )}
                {emailVerification.isError && (
                    <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-red-400 bg-gradient-to-br from-red-50 to-red-50 p-8 shadow-lg">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-lg">
                            <FontAwesomeIcon icon={faXmark} className="text-5xl text-white" />
                        </div>
                        <div className="text-center">
                            <h3 className="mb-2 text-3xl font-bold text-red-800">Xác nhận email thất bại!</h3>
                        </div>
                    </div>
                )}
                {emailVerification.isSuccess && (
                    <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-lg">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
                            <FontAwesomeIcon icon={faCheck} className="text-5xl text-white" />
                        </div>
                        <div className="text-center">
                            <h3 className="mb-2 text-3xl font-bold text-green-800">Xác thực email thành công!</h3>
                            <p className="text-lg text-green-700">Vui lòng kiểm tra email để kiểm tra thông tin lịch khám của bạn.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default EmailVerificationSection
