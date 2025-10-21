import React from "react";

const Banner : React.FC = () => {
    return (
        <>
            <div>
                <div className="relative h-[650px]">
                    <div className="z-[2] h-[650px] w-full absolute flex">
                        <div className="flex flex-[2] items-center justify-center">
                            <div className="border-l-[5px] border-primary-light pl-[15px]">
                                <h1 className="text-[50px] text-white uppercase font-bold">Life Clinic Management System</h1>
                                <p className="text-primary-light text-[40px] font-bold uppercase">Vì Sức Khỏe Cộng Đồng</p>
                                <p className="text-primary-light text-[40px] font-bold uppercase">Vì Tương Lai Bền Vững</p>
                            </div>
                        </div>
                        <div className="flex-1"></div>
                    </div>
                    <div className="z-[1] bg-black h-[650px] w-full absolute opacity-50">
                    </div>
                    <div>
                        <img src="/public/images/banner_homepage.jpg" alt="banner" className="absolute top-0 left-0 z-0 w-full h-[650px] object-cover"/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Banner;