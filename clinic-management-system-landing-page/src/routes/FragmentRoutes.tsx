import { Suspense } from 'react'
import FragmentLayout from '@/layouts/FragmentLayout'
import ErrorPage from '@/pages/ErrorPage'

const FragmentRoutes = [
    {
        path: '/',
        element: (
            <Suspense>
                <FragmentLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />
    }
]

export default FragmentRoutes
