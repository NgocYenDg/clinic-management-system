import { createBrowserRouter } from 'react-router-dom'
import MainRoutes from '@/routes/MainRoutes'
import FragmentRoutes from '@/routes/FragmentRoutes'
import ServiceRoute from './ServiceRoute'

const developmentRoutes = createBrowserRouter([...MainRoutes, ...FragmentRoutes, ...ServiceRoute])
const testingRoutes = createBrowserRouter([...MainRoutes, ...FragmentRoutes, ...ServiceRoute])
const productionRoutes = createBrowserRouter([...MainRoutes, ...FragmentRoutes, ...ServiceRoute])

const getRouter = (environment: 'development' | 'testing' | 'production') => {
    switch (environment) {
        case 'development':
            return developmentRoutes
        case 'testing':
            return testingRoutes
        case 'production':
            return productionRoutes
    }
}

export default getRouter
