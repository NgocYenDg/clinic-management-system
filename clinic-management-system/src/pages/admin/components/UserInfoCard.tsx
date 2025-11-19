import { User } from "firebase/auth";
import EmailVerificationStatus from "../../../components/EmailVerificationStatus";

interface UserInfoCardProps {
  currentUser: User | null;
  userRole: string | null;
}

export default function UserInfoCard({
  currentUser,
  userRole,
}: UserInfoCardProps) {
  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-slate-400 text-sm">Email</p>
          <p className="text-white font-medium">{currentUser?.email}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Chức vụ</p>
          <p className="text-red-400 font-medium capitalize">{userRole}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Họ và tên</p>
          <p className="text-white font-medium">{currentUser?.displayName}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Xác thực email</p>
          <EmailVerificationStatus />
        </div>
      </div>
    </div>
  );
}
