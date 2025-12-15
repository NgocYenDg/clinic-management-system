import useBookingService from '@/services/bookingService'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import toastOption from '@/configs/toast'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

const AppointmentSection = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>()

    const { appointment, updateAppointmentState } = useBookingService({
        appointmentId
    })

    const handleCancel = async () => {
        if (!appointmentId) return
        try {
            await updateAppointmentState.mutateAsync({
                appointmentId,
                state: 'CANCELED'
            })
            toast('Hủy lịch hẹn thành công', toastOption('success'))
        } catch (error) {
            toast('Có lỗi xảy ra khi hủy lịch hẹn', toastOption('error'))
        }
    }

    if (appointment.isLoading) {
        return <div className="flex justify-center py-20">Loading...</div>
    }

    if (!appointment.data) {
        return <div className="flex justify-center py-20">Không tìm thấy lịch hẹn</div>
    }

    const data = appointment.data

    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="text-primary mb-6 text-center text-2xl font-bold">Chi tiết lịch hẹn</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 pb-4">
                        <div className="text-gray-500">Mã lịch hẹn</div>
                        <div className="text-right font-medium">{data.id}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 pb-4">
                        <div className="text-gray-500">Bệnh nhân</div>
                        <div className="text-right font-medium">{data.patientName}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 pb-4">
                        <div className="text-gray-500">Gói khám</div>
                        <div className="text-right font-medium">{data.medicalPackageName}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 pb-4">
                        <div className="text-gray-500">Ngày khám</div>
                        <div className="text-right font-medium">{data.date}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 pb-4">
                        <div className="text-gray-500">Ca khám</div>
                        <div className="text-right font-medium">{data.shift === 0 ? 'Sáng' : 'Chiều'}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-300 pb-4">
                        <div className="text-gray-500">Trạng thái</div>
                        <div className="text-right font-medium">
                            <span
                                className={`rounded-full px-3 py-1 text-sm ${
                                    data.state === 'CREATED'
                                        ? 'bg-blue-100 text-blue-600'
                                        : data.state === 'CANCELED'
                                          ? 'bg-red-100 text-red-600'
                                          : data.state === 'SHOWED'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                                {data.state === 'CREATED'
                                    ? 'Đã đặt'
                                    : data.state === 'CANCELED'
                                      ? 'Đã hủy'
                                      : data.state === 'SHOWED'
                                        ? 'Đã đến'
                                        : 'Không đến'}
                            </span>
                        </div>
                    </div>
                </div>

                {data.state === 'CREATED' && (
                    <div className="mt-8 flex justify-center">
                        <ConfirmationDialog
                            Trigger={
                                <button
                                    disabled={updateAppointmentState.isPending}
                                    className="rounded-lg bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                                >
                                    {updateAppointmentState.isPending ? 'Đang xử lý...' : 'Hủy lịch hẹn'}
                                </button>
                            }
                            title="Xác nhận hủy lịch hẹn"
                            body="Bạn có chắc chắn muốn hủy lịch hẹn này không?"
                            onConfirm={handleCancel}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

export default AppointmentSection
