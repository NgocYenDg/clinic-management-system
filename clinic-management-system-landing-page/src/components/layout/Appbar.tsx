import { NavLink, useNavigate } from 'react-router-dom'
import { NAVIGATION_TABS } from '@/configs/constants'

const Appbar = () => {
    const navigate = useNavigate()

    return (
        <header className="bg-primary sticky top-0 z-1000 flex flex-col items-center px-5">
            <div className="h-navbar max-w-container flex w-full items-center justify-between">
                <div
                    className="flex cursor-pointer items-center justify-center gap-2.5 py-3 font-medium"
                    style={{
                        height: 'var(--sidebar-logo-height)'
                    }}
                    onClick={() => navigate('/')}
                >
                    <img src="/images/logo-hurc.png" width={45} alt="" className="rounded-lg outline-hidden" />
                    <span className="text-[22px] font-bold tracking-widest whitespace-pre text-white">Life Clinic Management System</span>
                </div>

                <div className="flex items-center gap-9">
                    {NAVIGATION_TABS.map(tab => (
                        <NavLink key={tab.href} to={tab.href} className={({ isActive }) => (isActive ? 'text-secondary' : 'text-white')}>
                            <span className="hover:text-secondary font-semibold tracking-wide uppercase">{tab.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="border-primary bg-ivory text-primary flex h-[54px] w-[180px] cursor-pointer items-center justify-center rounded-full border-2 font-semibold tracking-widest uppercase hover:bg-[#DBD6CA]"
                        onClick={() => {
                            window.location.href = `${import.meta.env.VITE_APP_BASE_URL}/login`
                        }}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Appbar
