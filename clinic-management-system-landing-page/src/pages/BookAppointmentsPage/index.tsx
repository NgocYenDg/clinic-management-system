import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import BookAppointmentsSection from '@/pages/BookAppointmentsPage/BookAppointmentsSection'

const BookAppointmentsPage = () => {
    useTitle('Life Clinic Management System | Đặt lịch khám')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <BookAppointmentsSection />
        </div>
    )
}

export default BookAppointmentsPage
