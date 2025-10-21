import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faEnvelope, faMapPin, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'
import { NAVIGATION_TABS, SOCIAL_LINKS } from '@/configs/constants'

const Footer = () => {
    const currentYear = new Date().getFullYear().toString()

    return (
        <footer className="bg-accent text-ivory mt-auto flex flex-col items-center gap-[60px] px-5 pt-[100px]">
            <div className="max-w-container grid w-full grid-cols-9 gap-[30px]">
                <div className="col-span-3 pr-[60px]">
                    <div className="flex cursor-pointer items-center gap-2.5 py-3 font-medium">
                        <img src="/images/logo-hurc.png" width={45} alt="" className="rounded-lg outline-hidden" />
                        <span className="text-[22px] font-bold tracking-widest whitespace-pre text-white">Life clinic management system</span>
                    </div>

                    <div className="mt-[25px] text-lg text-white/75">Đồng hành cùng bạn trong mỗi hành trình chăm sóc sức khỏe!</div>

                    <div className="text-ivory mt-[25px] flex items-center gap-3">
                        {SOCIAL_LINKS.map(link => (
                            <Link key={link.url} to={link.url}>
                                <FontAwesomeIcon icon={link.icon} className="min-w-max" size="lg" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <h3 className="font-serif text-2xl font-semibold">Truy cập nhanh</h3>
                    <div className="mt-[25px] flex flex-col gap-[15px]">
                        {NAVIGATION_TABS.filter(tab => !tab.roles).map(tab => (
                            <Link key={tab.href} to={tab.href}>
                                <div className="flex items-center gap-[15px]">
                                    <FontAwesomeIcon icon={faCaretRight} size="lg" />
                                    <p className="text-lg text-white/75 capitalize">{tab.label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <h3 className="font-serif text-2xl font-semibold">Tiện nghi nổi bật</h3>
                    <div className="mt-[25px] flex flex-col gap-[15px]">
                        <div className="flex items-center gap-[15px]">
                            <FontAwesomeIcon icon={faCaretRight} size="lg" />
                            <p className="text-lg text-white/75">Đặt lịch khám online 24/7</p>
                        </div>
                        <div className="flex items-center gap-[15px]">
                            <FontAwesomeIcon icon={faCaretRight} size="lg" />
                            <p className="text-lg text-white/75">Trang thiết bị y khoa hiện đại</p>
                        </div>
                        <div className="flex items-center gap-[15px]">
                            <FontAwesomeIcon icon={faCaretRight} size="lg" />
                            <p className="text-lg text-white/75">Chi phí minh bạch</p>
                        </div>
                        <div className="flex items-center gap-[15px]">
                            <FontAwesomeIcon icon={faCaretRight} size="lg" />
                            <p className="text-lg text-white/75">Chăm sóc khách hàng sau khám</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <h3 className="font-serif text-2xl font-semibold">Thông tin liên hệ</h3>
                    <div className="mt-[25px] flex items-center gap-[15px]">
                        <FontAwesomeIcon icon={faMapPin} size="lg" />
                        <p className="text-lg text-white/75">97 Man Thiện, Thủ Đức</p>
                    </div>
                    <div className="mt-[25px] flex items-center gap-[15px]">
                        <FontAwesomeIcon icon={faEnvelope} size="lg" />
                        <p className="text-lg text-white/75">lifeclinicMS@gmail.com</p>
                    </div>
                    <div className="mt-[25px] flex items-center gap-[15px]">
                        <FontAwesomeIcon icon={faPhoneSquare} size="lg" />
                        <p className="text-lg text-white/75">(+84)9123456780</p>
                    </div>
                </div>
            </div>
            <div className="max-w-container w-full border-t border-white/30 py-[30px] text-center font-semibold tracking-widest uppercase">
                &#169; {currentYear} - Bản quyền thuộc về Life Clinic Management System
            </div>
        </footer>
    )
}

export default Footer
