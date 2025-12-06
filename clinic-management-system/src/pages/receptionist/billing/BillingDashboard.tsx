import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  examinationFlowService,
  QueueItemResponse,
} from "../../../services/examinationFlowService";
import usePaymentService from "../../../services/paymentService";
import useAuthService from "@/services/authService";
import useStaffService from "@/services/staffService";
import toast from "react-hot-toast";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaUser,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaSpinner,
  FaArrowLeft,
  FaUserInjured,
} from "react-icons/fa";
import LogoutButton from "../../../components/LogoutButton";

export default function BillingDashboard() {
  const { account } = useAuthService();
  const staffId = account.data?.staffId;
  const { staff } = useStaffService({ staffId });
  const receptionistName = staff.data?.name || "Receptionist";

  const [queueItems, setQueueItems] = useState<QueueItemResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<QueueItemResponse | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "VNPAY">("CASH");
  const [isProcessing, setIsProcessing] = useState(false);

  const { createTransaction } = usePaymentService();

  const [wsConnected, setWsConnected] = useState(false);
  const [queueSize, setQueueSize] = useState<number>(0);
  const [currentQueueItem, setCurrentQueueItem] =
    useState<QueueItemResponse | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        if (examinationFlowService.isConnected()) {
          return;
        }
        // Get JWT token from localStorage
        const tokensStr = localStorage.getItem("tokens");
        if (!tokensStr) {
          console.warn("No authentication token found");
          return;
        }

        const tokens = JSON.parse(tokensStr) as {
          token: string;
          refreshToken: string;
        };

        // Connect to WebSocket
        examinationFlowService.connect(
          // tokens.token,
          staffId!,
          () => {
            console.log("Successfully connected to ExaminationFlow WebSocket");
            setWsConnected(true);
            toast.success("Đã kết nối hàng đợi khám bệnh");

            // Subscribe to queue items
            examinationFlowService.subscribeToQueueItems(
              (item: QueueItemResponse) => {
                console.log("Received queue item:", item);
                setCurrentQueueItem(item);
                toast.success("Nhận được bệnh nhân mới từ hàng đợi");
              }
            );

            // Subscribe to queue size updates
            examinationFlowService.subscribeToQueueSize((size: number) => {
              console.log("Queue size updated:", size);
              setQueueSize(size);
            });

            // Subscribe to errors
            examinationFlowService.subscribeToErrors((error: string) => {
              console.error("Queue error:", error);
              toast.error(error);
            });

            // Get in-progress item if any
            examinationFlowService.getInProgressItem();

            // Query queue size if departmentId is available
            const queueId = "reception";
            examinationFlowService.subscribeToQueueBroadcast(
              queueId,
              (size: number) => {
                console.log("Queue size updated:", size);
                setQueueSize(size);
              }
            );
            examinationFlowService.queryQueueSize(queueId);
            // Subscribe to queue broadcasts for this department
            examinationFlowService.subscribeToQueueBroadcast(
              queueId,
              (data: any) => {
                console.log("Queue broadcast update:", data);
              }
            );
          },
          (error) => {
            console.error("WebSocket connection error:", error);
            setWsConnected(false);
            toast.error("Không thể kết nối hàng đợi khám bệnh");
          }
        );
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
        toast.error("Lỗi khi kết nối hàng đợi");
      }
    };

    if (staffId) {
      connectWebSocket();
    }

    // Cleanup on unmount
    return () => {
      if (examinationFlowService.isConnected()) {
        examinationFlowService.disconnect();
        setWsConnected(false);
      }
    };
  }, [staffId]);

  // Function to take next patient from queue
  const handleTakeNextPatient = () => {
    if (!examinationFlowService.isConnected()) {
      toast.error("Chưa kết nối đến hàng đợi");
      return;
    }

    examinationFlowService.takeNextItem("reception");
    toast.loading("Đang lấy bệnh nhân tiếp theo...", { duration: 2000 });
  };

  const handlePayment = async () => {
    if (!selectedItem || !staffId) return;

    const invoiceId = selectedItem.medicalForm?.invoice?.invoiceId;
    if (!invoiceId) {
      toast.error("Không tìm thấy thông tin hóa đơn");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await createTransaction.mutateAsync({
        request: {
          invoiceId,
          paymentMethod,
        },
        staffId,
      });

      if (paymentMethod === "VNPAY" && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        toast.success("Thanh toán thành công!");
        setSelectedItem(null);
        // Refresh queue or wait for WebSocket update
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Lỗi khi tạo giao dịch thanh toán");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link
              to="/receptionist"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white mr-2"
            >
              <FaArrowLeft />
            </Link>
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FaFileInvoiceDollar className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Thanh toán viện phí</h1>
              <p className="text-sm text-slate-400">{receptionistName}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full animate-pulse ${
                  wsConnected ? "bg-green-400" : "bg-gray-400"
                }`}
              ></div>
              <h3 className="text-lg font-semibold">
                Hàng đợi khám bệnh{" "}
                {wsConnected ? "(Đã kết nối)" : "(Đang kết nối...)"}
              </h3>
            </div>
            <button
              onClick={handleTakeNextPatient}
              disabled={!wsConnected || !!currentQueueItem}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                !wsConnected || !!currentQueueItem
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600 text-white"
              }`}
            >
              <FaUserInjured className="w-4 h-4" />
              <span>Lấy bệnh nhân tiếp theo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-slate-400">Số bệnh nhân đang chờ</p>
              <p className="text-2xl font-bold text-cyan-400">{queueSize}</p>
            </div>
          </div>

          {/* Current Patient & Package Info */}
          {currentQueueItem && (
            <div className="mt-6 space-y-6">
              {/* Top Panel: Patient & Package Info */}
              <div className="grid grid-cols-1 gap-6">
                {/* Patient Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                    <FaUserInjured />
                    Thông tin bệnh nhân
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Mã bệnh nhân:</span>
                      <span className="text-white font-mono">
                        {currentQueueItem.medicalForm?.invoice?.patientId ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Họ và tên:</span>
                      <span className="text-white font-medium">
                        {currentQueueItem.medicalForm?.invoice?.patientName ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Số điện thoại:</span>
                      <span className="text-white">
                        {currentQueueItem.medicalForm?.invoice?.patientPhone ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Email:</span>
                      <span className="text-white">
                        {currentQueueItem.medicalForm?.invoice?.patientEmail ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Mã hồ sơ:</span>
                      <span className="text-white font-mono">
                        {currentQueueItem.medicalForm?.id || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Số tiền:</span>
                      <span className="text-red-500 font-mono">
                        {currentQueueItem.medicalForm?.invoice?.totalAmount ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Trạng thái:</span>
                      <span className="text-white font-mono">
                        {currentQueueItem.medicalForm?.invoice?.status || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          
        </div>
      </main>
    </div>
  );
}
