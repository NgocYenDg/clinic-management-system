import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { INTRODUCTION_VIDEO_URL } from '@/configs/constants'
import BackgroundPoster from '@/components/ui/BackgroundPoster'

const HomeHeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative">
            <BackgroundPoster imageUrl="/public/images/banner_homepage.jpg" size="big" />

            <div className="max-w-container absolute bottom-[90px] left-1/2 grid w-full -translate-x-1/2 grid-cols-5 gap-[60px] px-5 2xl:bottom-[170px]">
                <div className="col-span-3 flex flex-col gap-6">
                    <p className="text-ivory font-semibold uppercase">Dịch vụ chăm sóc sức khỏe uy tín hàng đầu tại TP. Hồ Chí Minh</p>
                    <p className="text-ivory font-serif text-5xl leading-[1.4] font-semibold capitalize">
                        Nào, hãy cùng chăm sóc sức khỏe toàn diện cho bạn và gia đình <span className="text-secondary whitespace-nowrap">tại đây ...</span>
                    </p>
                    <p className="text-ivory font-semibold capitalize">
                        Dịch vụ khám chữa bệnh uy tín – Bác sĩ tận tâm – Đặt lịch nhanh chóng – Chi phí minh bạch
                    </p>
                    <div className="flex items-center gap-6">
                        <button
                            className="bg-accent text-ivory hover:bg-accent/90 flex h-[60px] w-[280px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                            onClick={() => navigate('/our-services')}
                        >
                            Tìm hiểu thêm
                        </button>
                        <button
                            className="bg-ivory text-primary hover:bg-ivory/90 flex h-[60px] w-[230px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                            onClick={() => navigate('/book-appointment')}
                        >
                            Đặt lịch
                        </button>
                    </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <Link
                        className="bg-secondary hover:bg-secondary/90 flex aspect-square w-[90px] cursor-pointer items-center justify-center rounded-full"
                        to={INTRODUCTION_VIDEO_URL}
                    >
                        <FontAwesomeIcon icon={faPlay} className="text-white" size="2xl" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeHeroSection
