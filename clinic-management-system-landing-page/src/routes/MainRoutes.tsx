import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import ErrorPage from '@/pages/ErrorPage'
import HomePage from '@/pages/HomePage'
import BookAppointmentsPage from '@/pages/BookAppointmentsPage'
import EmailVerificationPage from '@/pages/EmailVerificationPage'
import AppointmentPage from '@/pages/AppointmentPage'

const MainRoutes = [
    {
        path: '/',
        element: (
            <Suspense>
                <MainLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '/book-appointment',
                element: <BookAppointmentsPage />
            },
            {
                path: '/email-verification',
                element: <EmailVerificationPage />
            },
            {
                path: '/appointment/:appointmentId',
                element: <AppointmentPage />
            }
        ]
    }
]

export default MainRoutes
