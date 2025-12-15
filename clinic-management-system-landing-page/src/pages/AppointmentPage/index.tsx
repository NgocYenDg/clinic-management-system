import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import AppointmentSection from './AppointmentSection'

const AppointmentPage = () => {
    useTitle('Life Clinic Management System | Lịch hẹn khám')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <AppointmentSection />
        </div>
    )
}

export default AppointmentPage
