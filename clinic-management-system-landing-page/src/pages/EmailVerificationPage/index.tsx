import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import EmailVerificationSection from './EmailVerificationSection'

const EmailVerificationPage = () => {
    useTitle('Life Clinic Management System | Email Verification')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <EmailVerificationSection />
        </div>
    )
}

export default EmailVerificationPage
