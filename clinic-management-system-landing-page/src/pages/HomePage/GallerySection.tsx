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
                            <div
                                key={medicalPackage.medicalPackageId}
                                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="h-56 w-full overflow-hidden">
                                    <img
                                        src={medicalPackage.image || '/images/canlamsang.png'}
                                        alt={medicalPackage.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-4">
                                        <h3 className="line-clamp-2 min-h-[3.5rem] font-serif text-xl font-bold text-gray-900">
                                            {medicalPackage.name}
                                        </h3>
                                        <p className="mt-3 line-clamp-3 text-sm text-gray-600">{medicalPackage.description}</p>
                                    </div>

                                    <div className="mt-auto space-y-4">
                                        <div className="border-t border-gray-100 pt-4">
                                            <div className="flex items-baseline justify-between">
                                                <span className="text-sm font-medium text-gray-500">Giá dịch vụ</span>
                                                <span className="text-accent font-serif text-xl font-bold">
                                                    {medicalPackage.price.toLocaleString('vi-VN')} đ
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            className="bg-accent hover:bg-accent/90 w-full rounded-full py-3 text-sm font-bold tracking-widest text-white uppercase transition-all hover:shadow-lg active:scale-95"
                                            onClick={() => navigate(`/book-appointment?medicalPackageId=${medicalPackage.medicalPackageId}`)}
                                        >
                                            Đặt lịch ngay
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
