import { useNavigate } from 'react-router-dom'

type ServicesGallerySectionProps = {
    images: {
        gallery: {
            feature: string
            top: string[]
            bottom: string[]
        }
        banner: string
    }
}

const ServicesGallerySection = ({ images }: ServicesGallerySectionProps) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="max-w-container w-full">
                <div className="relative aspect-[10/4]">
                    <div
                        className="h-full rounded-3xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${images.banner})`
                        }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-linear-[90deg,rgba(38,91,158,0.95)_0%,rgba(0,0,0,0.11)_100%] p-[35px]">
                        <div className="flex max-w-[720px] flex-col items-center gap-5">
                            <p className="text-ivory text-center font-serif text-5xl leading-[1.4] font-semibold text-balance whitespace-nowrap">
                                Nơi bạn an tâm gửi gắm sức khỏe!
                            </p>
                            <p className="text-justify text-xl text-white/75">Giải pháp y tế toàn diện cho mọi nhu cầu sức khỏe</p>
                            <button
                                className="bg-primary text-ivory hover:bg-primary/90 flex h-[60px] w-[280px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                                onClick={() => navigate('/book-appointment')}
                            >
                                Đặt lịch ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesGallerySection
