import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../../components/LogoutButton";
import EmailVerificationStatus from "../../components/EmailVerificationStatus";
import {
  Bell,
  UserPlus,
  CalendarCheck,
  Calendar,
  FileText,
  FileDown,
  Hash,
  DollarSign,
} from "lucide-react";
import useAuthService from "@/services/authService";
import useStaffService from "@/services/staffService";

export default function Receptionist() {
  const { account } = useAuthService();
  const staffId = account.data?.staffId;
  const { staff } = useStaffService({ staffId });
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [todayPrescriptions, setTodayPrescriptions] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  // Fetch real appointment data
  // useEffect(() => {
  //   const appointmentsRef = collection(db, "appointments");
  //   const q = query(appointmentsRef, orderBy("createdAt", "desc"));

  //   const unsubscribe = onSnapshot(
  //     q,
  //     (snapshot) => {
  //       const appointmentsData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setAppointments(appointmentsData);

  //       // Calculate today's appointments
  //       const today = new Date().toISOString().split("T")[0];
  //       const todayCount = appointmentsData.filter(
  //         (apt) => apt.appointmentDate === today
  //       ).length;
  //       setTodayAppointments(todayCount);
  //       setTotalAppointments(appointmentsData.length);
  //     },
  //     (error) => {
  //       console.error("Error fetching appointments:", error);
  //     }
  //   );

  //   return () => unsubscribe();
  // }, []);

  // Fetch prescription data
  // useEffect(() => {
  //   const prescriptionsRef = collection(db, "prescriptions");
  //   const q = query(prescriptionsRef, orderBy("createdAt", "desc"));

  //   const unsubscribe = onSnapshot(
  //     q,
  //     (snapshot) => {
  //       const prescriptionsData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       // Calculate today's prescriptions
  //       const today = new Date().toISOString().split("T")[0];
  //       const todayCount = prescriptionsData.filter(
  //         (pres) => pres.prescriptionDate === today
  //       ).length;
  //       setTodayPrescriptions(todayCount);
  //     },
  //     (error) => {
  //       console.error("Error fetching prescriptions:", error);
  //     }
  //   );

  //   return () => unsubscribe();
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Bảng điều khiển dành cho lễ tân
              </h1>
              <p className="text-sm text-slate-400">
                {staff.data?.name || "Receptionist"}
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Stats */}
          <Link
            to="/receptionist/billing"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-semibold">Hóa đơn & Thanh toán</h3>
            </div>
            <p className="text-3xl font-bold text-cyan-400">
              {totalAppointments}
            </p>
            <p className="text-sm text-slate-400 mt-2">Tổng số hóa đơn</p>
            <p className="text-xs text-cyan-400 mt-2">
              Nhấn để quản lý thanh toán →
            </p>
          </Link>

          <Link
            to="/receptionist/appointments"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CalendarCheck className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold">Lịch hẹn hôm nay</h3>
              </div>
              <Calendar className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">
              {todayAppointments}
            </p>
            <p className="text-sm text-slate-400 mt-2">Đã lên lịch hôm nay</p>
            <p className="text-xs text-green-400 mt-2">
              Nhấn để quản lý lịch hẹn →
            </p>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Email</p>
              <p className="text-white font-medium">{staff.data?.email}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Chức vụ</p>
              <p className="text-cyan-400 font-medium capitalize">Lễ tân</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Họ và tên</p>
              <p className="text-white font-medium">{staff.data?.name}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Email đã xác thực</p>
              <EmailVerificationStatus />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
