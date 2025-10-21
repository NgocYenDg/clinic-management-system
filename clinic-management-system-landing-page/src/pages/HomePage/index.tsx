import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import HomeHeroSection from '@/pages/HomePage/HomeHeroSection'
import DescriptionSection from '@/pages/HomePage/DescriptionSection'
import GallerySection from '@/pages/HomePage/GallerySection'

const HomePage = () => {
    useTitle('Life Clinic Management System | Trang Chủ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <HomeHeroSection />
            <DescriptionSection />
            <GallerySection />
        </div>
    )
}

export default HomePage
