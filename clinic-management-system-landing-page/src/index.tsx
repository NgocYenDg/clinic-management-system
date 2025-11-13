import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'

import getRouter from '@/routes'
import './index.css'
import { ToastContainer } from 'react-toastify'

const GG_CLIENT_ID = import.meta.env.VITE_GG_CLIENT_ID
const queryClient = new QueryClient()
const environment = import.meta.env.VITE_NODE_ENV as 'development' | 'testing' | 'production'

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={getRouter(environment)} />
            <ToastContainer />
        </QueryClientProvider>
    </GoogleOAuthProvider>
)
