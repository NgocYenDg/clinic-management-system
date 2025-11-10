import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ServicesGallerySection from '@/pages/HomePage/ServicesGallerySection'

// const DESCRIPTION_IMAGES = {
//     // gallery: {
//     //     feature:
//     //         'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/487489194_1089817216520187_7863584507565965494_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH06c7aUC2mU3TPUEksdt2UbzNb0xQDqZxvM1vTFAOpnC178ikBFg1O2vS9CjUfFUOUOVBsHGSNDHpBLrntQw1J&_nc_ohc=fX7KR5OKGMwQ7kNvwHYFOOW&_nc_oc=Adns1JRepMchIA7WbWbx_jc-6CtEUetJZcDfw99ahMDihFS8LBIW5GQ_G3BXayYo4OQ&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=8bYxa_OjJIaDbOqGH6hZhA&oh=00_AfHrc13_GW024KMzQSVOHJhNk0qR2usTZsUI8c8XGbEZ3w&oe=68092D40',
//     //     top: [
//     //         'https://cdn.tcdulichtphcm.vn/upload/4-2024/images/2024-12-20/1734664051-dsc07346.jpg',
//     //         'https://mia.vn/media/uploads/blog-du-lich/gieng-troi-2-1736845069.jpg'
//     //     ],
//     //     bottom: [
//     //         'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ben_Thanh_market_2.jpg/960px-Ben_Thanh_market_2.jpg',
//     //         'https://cdn3.ivivu.com/2024/11/z4484349590890_559af-1558.jpg',
//     //         'https://cdn3.ivivu.com/2024/11/dia-diem-check-in-doc-tuyen-Metro-so-1-ivivu-7.png'
//     //     ]
//     // },
//     banner: '/images/homepage.png'
// }

const HIGHLIGHTED_MEDICAL_PACKAGES = [
    {
        id: 1,
        image: '/images/tongquat.png',
        name: 'Khám tổng quát',
        description:
            'Dịch vụ khám sức khỏe tổng quát giúp kiểm tra toàn diện các chỉ số cơ bản của cơ thể như tim mạch, huyết áp, đường huyết, mỡ máu, chức năng gan – thận. Kết hợp với siêu âm và xét nghiệm cần thiết, bác sĩ sẽ đánh giá tình trạng sức khỏe và đưa ra phác đồ theo dõi phù hợp.',
        price: 1200000
    },
    {
        id: 2,
        image: '/images/canlamsang.png',
        name: 'Cận lâm sàng',
        description:
            'Dịch vụ cận lâm sàng bao gồm xét nghiệm máu, nước tiểu, sinh hóa, siêu âm ổ bụng, X-quang, điện tim (ECG) và các kỹ thuật chẩn đoán hình ảnh khác. Kết quả nhanh chóng – chính xác, hỗ trợ hiệu quả cho quá trình khám chữa bệnh.',
        price: 800000
    },
    {
        id: 3,
        image: '/images/tuvan.png',
        name: 'Tư vấn sức khỏe',
        description:
            'Cung cấp dịch vụ tư vấn sức khỏe cho mọi độ tuổi, giúp giải đáp thắc mắc về triệu chứng bệnh, hướng dẫn chăm sóc tại nhà và tư vấn lộ trình khám – điều trị phù hợp.',
        price: 500000
    }
]

const GallerySection = () => {
    const navigate = useNavigate()
    
    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            {/* <ServicesGallerySection images={DESCRIPTION_IMAGES} /> */}

            <div className="max-w-container flex w-full flex-col gap-9 pt-[100px]">
                <div className="flex items-center justify-between">
                    <div className="flex max-w-[70%] flex-col gap-5">
                        <p className="text-secondary font-semibold tracking-widest uppercase">Vài dịch vụ nổi bật của chúng tôi</p>
                        <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">
                            Life Clinic mang đến hệ thống dịch vụ y tế đa dạng, đáp ứng mọi nhu cầu khám chữa bệnh.
                        </p>
                    </div>
                    <Link to="/book-appointment">
                        <div className="text-primary font-semibold tracking-widest uppercase">
                            Đặt lịch ngay <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-[30px] px-3">
                    {HIGHLIGHTED_MEDICAL_PACKAGES.map(medical_package => (
                        <div key={medical_package.name} className="flex flex-col overflow-hidden rounded-3xl">
                            <div
                                className="aspect-[8/5] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${medical_package.image})`
                                }}
                            ></div>
                            <div className="flex flex-1 flex-col gap-[26px] bg-white p-[35px]">
                                <div>
                                    <p className="font-serif text-[25px] font-semibold text-balance">{medical_package.name}</p>
                                    <div className="mt-[15px] line-clamp-3 text-lg text-[#6E6E6E]">{medical_package.description}</div>
                                </div>
                                <div className="border-black-200 border-t pt-4">
                                    <p className="flex justify-between font-serif text-[25px] font-semibold text-balance">
                                        <span>Giá:</span>
                                        <span>{medical_package.price.toLocaleString('vi-VN')} VNĐ</span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-center gap-6">
                                    <button
                                        className="bg-accent text-ivory hover:bg-accent/90 flex h-[60px] w-[230px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                                        onClick={() => navigate('/book-appointment')}
                                    >
                                        Đặt lịch
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GallerySection
