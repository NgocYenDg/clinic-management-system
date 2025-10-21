import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const DESCRIPTION_IMAGES = [
    '/images/homepage2.png',
    '/images/homepage.png',
    '/images/homepage1.png'
]

const DescriptionSection = () => {
    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex items-center justify-between">
                    <div className="flex max-w-[70%] flex-col gap-5">
                        <p className="text-secondary font-semibold tracking-widest uppercase">Vài nét về chúng tôi</p>
                        <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">
                            Khám chữa bệnh chuyên nghiệp, tận tâm vì sức khỏe của bạn.
                        </p>
                    </div>
                    <Link to="/our-services">
                        <div className="text-primary font-semibold tracking-widest uppercase">
                            Tìm hiểu thêm <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-[30px] pt-10">
                    <div className="relative flex flex-col items-start gap-5 pr-5 pl-[50px]">
                        <div
                            className="bg-accent absolute bottom-0 left-0 rounded-t-3xl"
                            style={{
                                width: 'calc(100% + 120px)',
                                height: 'calc(100% + 40px)'
                            }}
                        ></div>
                        <FontAwesomeIcon icon={faQuoteLeft} className="z-[1] text-[#DADADA]" size="3x" />
                        <p className="z-[1] text-lg font-semibold text-white/75 italic xl:text-[22px] xl:leading-[1.2] 2xl:text-[26px] 2xl:leading-[1.3]">
                            "Healthy Today, Better Tomorrow!"
                        </p>
                    </div>
                    {DESCRIPTION_IMAGES.map(imageUrl => (
                        <div key={imageUrl} className="bg-ivory z-[1] h-[175px] rounded-t-3xl px-[10px] pt-[10px] lg:h-[200px]">
                            <div
                                className="h-full rounded-t-2xl bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${imageUrl})`
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DescriptionSection
