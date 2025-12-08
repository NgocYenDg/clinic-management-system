import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import useMedicalPackageService from '@/services/medicalPackageService'
const GallerySection = () => {
    const navigate = useNavigate()
    const { medicalPackages } = useMedicalPackageService()

    return (
        <section className="bg-ivory flex flex-col items-center px-5 pb-6">
            <div className="max-w-container flex w-full flex-col gap-9">
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
                {medicalPackages.isLoading ? (
                    <div>Đang tải gói khám...</div>
                ) : (
                    <div className="grid grid-cols-4 gap-4 px-3">
                        {medicalPackages.data?.content?.map(medicalPackage => (
                            <div key={medicalPackage.name} className="flex flex-col overflow-hidden rounded-3xl">
                                <img
                                    src={medicalPackage.image || '/images/canlamsang.png'}
                                    alt={medicalPackage.name}
                                    className="aspect-8/5 bg-cover bg-center"
                                />
                                <div className="flex flex-1 flex-col gap-4 bg-white p-4">
                                    <div>
                                        <p className="font-serif text-[25px] font-semibold text-balance">{medicalPackage.name}</p>
                                        <div className="mt-[15px] line-clamp-3 text-lg text-[#6E6E6E]">{medicalPackage.description}</div>
                                    </div>
                                    <div className="border-black-200 border-t pt-4">
                                        <p className="flex justify-between font-serif text-[25px] font-semibold text-balance">
                                            <span>Giá:</span>
                                            <span>{medicalPackage.price.toLocaleString('vi-VN')} VNĐ</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center gap-6">
                                        <button
                                            className="bg-accent text-ivory hover:bg-accent/90 flex h-[60px] w-[230px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase"
                                            onClick={() => navigate(`/book-appointment?medicalPackageId=${medicalPackage.medicalPackageId}`)}
                                        >
                                            Đặt lịch
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default GallerySection
