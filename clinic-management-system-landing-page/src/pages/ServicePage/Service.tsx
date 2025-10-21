import { LucideNavigation, PictureInPicture2, Zap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";


const Service : React.FC = () => {
    return (
        <>
            <div>
                <div className="max-w-7xl mx-auto text-justify px-[50px] py-[70px]">
                    <h2 className=" text-center text-4xl text-primary font-medium mb-[30px]">Dịch vụ Khám Sức Khỏe Tổng Quát – Bảo vệ sức khỏe từ hôm nay</h2>
                    <p className="text-[20px] font-semibold leading-7 tracking-wide text-slate-500 mb-3">Sức khỏe là vốn quý nhất, nhưng trong nhịp sống hiện đại bận rộn, nhiều người chỉ đi khám khi đã xuất hiện triệu chứng bất thường. Điều này tiềm ẩn nhiều nguy cơ khi bệnh đã chuyển sang giai đoạn nặng và khó điều trị. Vì vậy, khám sức khỏe tổng quát định kỳ chính là giải pháp cần thiết để theo dõi, đánh giá tình trạng sức khỏe và phát hiện sớm các bệnh lý tiềm ẩn.</p>
                    <p className="text-[20px] font-semibold leading-7 tracking-wide text-slate-500 mb-3">Tại Life Clinic, dịch vụ khám tổng quát được thiết kế toàn diện – chính xác – nhanh chóng với quy trình khoa học và đội ngũ bác sĩ chuyên môn cao. Gói khám giúp kiểm tra các chỉ số sức khỏe quan trọng như tim mạch, huyết áp, gan – thận, chức năng hô hấp, đường huyết, mỡ máu, và tầm soát nhiều bệnh lý nguy hiểm như tiểu đường, gout, viêm gan, thiếu máu, bệnh lý tuyến giáp…</p>
                   
                    <ul className="my-4 flex gap-4">
                        <li className=" flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-slate-500"><LucideNavigation className="text-orange-500"/> <span>Phát hiện sớm bệnh lý tiềm ẩn để điều trị kịp thời</span></li>
                        <li className="flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-slate-500"><Zap className="text-green-400"/>Được bác sĩ tư vấn cá nhân hóa, phù hợp từng thể trạng</li>
                        <li className="flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-slate-500"><PictureInPicture2 className="text-pink-500"/>Hồ sơ sức khỏe điện tử, theo dõi lịch sử khám</li>
                    </ul>
                    <div className="flex items-center justify-center">
                        <button className="bg-primary px-[16px] py-[9px] rounded-2xl text-white border-2 border-primay hover:bg-white transition-all duration-200 hover:text-primary"><Link to={"/book-appointment"}>Đặt lịch ngay</Link></button>
                    </div>
                </div>

                <div className="bg-primary mx-auto text-justify px-[50px] py-[40px] flex justify-center items-center">
                    <div className="max-w-7xl">
                        <h2 className=" text-center text-4xl text-white font-medium mb-[30px]">Dịch vụ Cận Lâm Sàng – Chẩn đoán chính xác, điều trị hiệu quả</h2>
                        <p className="text-[20px] font-semibold leading-7 tracking-wide text-white mb-3">Trong khám chữa bệnh, chẩn đoán đúng là yếu tố quyết định hiệu quả điều trị. Vì vậy, dịch vụ cận lâm sàng tại Life Clinic đóng vai trò quan trọng trong việc hỗ trợ bác sĩ phát hiện bất thường trong cơ thể và xác định nguyên nhân gây bệnh một cách nhanh chóng – chính xác – an toàn.</p>
                        <p className="text-[20px] font-semibold leading-7 tracking-wide text-white mb-3">Với hệ thống máy xét nghiệm – chẩn đoán hình ảnh hiện đại, quy trình khép kín và đội ngũ kỹ thuật viên giàu kinh nghiệm, Life Clinic cam kết mang đến kết quả cận lâm sàng đáng tin cậy, giúp bác sĩ đưa ra phác đồ điều trị hiệu quả cho từng bệnh nhân.</p>
                    
                        <ul className="my-4 flex gap-4">
                            <li className=" flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-white"><LucideNavigation className="text-orange-500"/> <span>Hệ thống thiết bị hiện đại cho kết quả chẩn đoán nhanh chóng và chính xác</span></li>
                            <li className="flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-white"><Zap className="text-green-400"/>Bác sĩ trực tiếp tư vấn kết quả & định hướng điều trị</li>
                            <li className="flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-white"><PictureInPicture2 className="text-pink-500"/>Chi phí hợp lý, minh bạch</li>
                        </ul>
                        <div className="flex items-center justify-center">
                            <button className="bg-white px-[16px] py-[9px] rounded-2xl text-primary border-2 border-white hover:bg-primary transition-all duration-200 hover:text-white"><Link to={"/book-appointment"}>Đặt lịch ngay</Link></button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto text-justify px-[50px] py-[70px]">
                    <h2 className=" text-center text-4xl text-primary font-medium mb-[30px]">Dịch vụ Tư Vấn Sức Khỏe – Đồng hành chăm sóc sức khỏe cùng bạn</h2>
                    <p className="text-[20px] font-semibold leading-7 tracking-wide text-slate-500 mb-3">Sức khỏe không chỉ là không có bệnh, mà là sự cân bằng giữa thể chất, tinh thần và lối sống. Hiểu được điều đó, Life Clinic cung cấp dịch vụ Tư Vấn Sức Khỏe nhằm giúp khách hàng được giải đáp thắc mắc y khoa, đánh giá tình trạng sức khỏe và nhận hướng dẫn chăm sóc phù hợp từ đội ngũ bác sĩ chuyên môn cao.</p>
                    <p className="text-[20px] font-semibold leading-7 tracking-wide text-slate-500 mb-3">Bạn đang băn khoăn về các triệu chứng bất thường trong cơ thể? Bạn cần tham khảo ý kiến bác sĩ trước khi điều trị hoặc sử dụng thuốc? Bạn muốn xây dựng chế độ dinh dưỡng – tập luyện khoa học? Life Clinic luôn sẵn sàng hỗ trợ.</p>
                   
                    <ul className="my-4 flex gap-4">
                        <li className=" flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-slate-500"><LucideNavigation className="text-orange-500"/> <span>Tư vấn trực tiếp tại phòng khám</span></li>
                        <li className="flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-slate-500"><Zap className="text-green-400"/>Tư vấn từ xa qua điện thoại/Zalo/Video call nhanh chóng và tiện lợi</li>
                        <li className="flex gap-2 text-[14px] font-semibold leading-7 tracking-wide text-slate-500"><PictureInPicture2 className="text-pink-500"/>Theo dõi và nhắc lịch tái khám định kỳ</li>
                    </ul>
                    <div className="flex items-center justify-center">
                        <button className="bg-primary px-[16px] py-[9px] rounded-2xl text-white border-2 border-primay hover:bg-white transition-all duration-200 hover:text-primary"><Link to={"/book-appointment"}>Đặt lịch ngay</Link></button>
                    </div>
                    
                </div>
                {/* <div className="h-[600px] overflow-hidden relative">
                    <div className="p-[80px] px-[120px] flex absolute top-0 left-0 z-10 w-full h-full justify-around flex-col">
                        <div className="flex flex-col">
                            <h2 className="uppercase font-bold z-10 text-primary-light text-[40px]">Chính sách chất lượng</h2>
                            <p className="uppercase font-bold z-10 text-primary-light text-[30px]">TCVN ISO 9001:2015</p>
                        </div>
                        <div className="flex justify-end">
                        <div className="grid grid-cols-2 grid-rows-2 gap-[60px] mt-[100px] justify-end w-[75%]">
                            <div className="flex gap-4">
                                <div>
                                    <div className="bg-primary w-[50px] h-[50px] text-center leading-[50px] font-medium text-white text-2xl rounded-full">1</div>
                                </div>
                                <div>
                                    <div className="border-[2px] border-primary-light tracking-wide p-[10px] rounded-2xl text-primary font-medium bg-white">Xây dựng hình ảnh tốt đẹp về hệ thống đường sắt đô thị TP.HCM, góp phần cải thiện môi trường và nâng cao chất lượng cuộc sống người dân.</div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <div className="bg-primary w-[50px] h-[50px] text-center leading-[50px] font-medium text-white text-2xl rounded-full">2</div>
                                </div>
                                <div>
                                    <div className="border-[2px] border-primary-light tracking-wide p-[10px] rounded-2xl text-primary font-medium bg-white">Phát huy sức mạnh nội bộ và trách nhiệm của từng cá nhân trong hệ thống quản lý chất lượng.</div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <div className="bg-primary w-[50px] h-[50px] text-center leading-[50px] font-medium text-white text-2xl rounded-full">3</div>
                                </div>
                                <div>
                                    <div className="border-[2px] border-primary-light tracking-wide p-[10px] rounded-2xl text-primary font-medium bg-white">Tuân thủ đúng theo các quy định pháp luật và các yêu cầu của khách hàng.</div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <div className="bg-primary w-[50px] h-[50px] text-center leading-[50px] font-medium text-white text-2xl rounded-full">4</div>
                                </div>
                                <div>
                                    <div className="border-[2px] border-primary-light tracking-wide p-[10px] rounded-2xl text-primary font-medium bg-white">Phát triển nguồn nhân lực toàn diện, nâng cao năng lực, kỹ năng, ý thức trách nhiệm trong công việc.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                    <div className="z-[1] bg-black top-0 left-0 h-[650px] w-full absolute opacity-65">
                    </div>
                    <div>
                        <img src="/public/images/banner_service_2.jpg" className="absolute top-0 left-0 h-[700px] mt-[-100px] w-full object-cover"/>
                    </div>
                </div> */}
            </div>
        </>
    )
}
export default Service;