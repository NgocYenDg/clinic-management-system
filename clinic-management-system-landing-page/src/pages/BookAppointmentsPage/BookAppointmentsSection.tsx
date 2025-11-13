import TextInput from '@/components/common/TextInput'
import DatePicker from '@/components/common/DatePicker'
import SelectInput from '@/components/common/SelectInput'
import Button from '@/components/common/Button'
import { useState } from 'react'
import useBookingService from '@/services/bookingService'
import useMedicalPackageService from '@/services/medicalPackageService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from 'react-router'
import { Tag } from 'lucide-react'
import { toast } from 'react-toastify'
import toastOption from '@/configs/toast'

type ValidationResult = 'failed' | 'passed'
const BookAppointmentsSection = () => {
    const { medicalPackages } = useMedicalPackageService()
    const [searchParams] = useSearchParams()
    const [medicalPackageId, setMedicalPackageId] = useState(searchParams.get('medicalPackageId'))
    const [bookingDate, setBookingDate] = useState<Date>(new Date())
    const [slot, setSlot] = useState<ISlot>()

    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [bookingId, setBookingId] = useState<string>()
    const { slots, booking, bookingStatus } = useBookingService({
        medicalPackageId: medicalPackageId ?? undefined,
        bookingId: bookingId
    })
    const [step, setStep] = useState<'package' | 'patientInfo' | 'finalStep'>('package')

    const [errors, setErrors] = useState({
        medicalPackageIsRequired: null as ValidationResult | null,
        nameIsRequired: null as ValidationResult | null,
        phoneIsRequired: null as ValidationResult | null,
        phoneIsInvalidFormat: null as ValidationResult | null,
        emailIsInvalidFormat: null as ValidationResult | null
    })

    const availableSlots =
        slots.data?.content
            ?.filter(slot => !bookingDate || new Date(slot.date).toDateString() === bookingDate.toDateString())
            .sort((a, b) => a.shift - b.shift) ?? []

    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            {booking.isPending && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-white/90 p-8 shadow-lg">
                        <div className="flex items-center justify-center">
                            <div className="from-primary flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r to-blue-400 p-1">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                    <svg
                                        className="text-primary h-12 w-12 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        role="status"
                                        aria-label="loading"
                                    >
                                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path
                                            className="opacity-100"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-lg font-semibold">Đang xử lý...</div>
                            <div className="mt-1 text-sm text-gray-600">Vui lòng đợi trong giây lát. Yêu cầu đặt lịch đang được gửi.</div>
                        </div>
                    </div>
                </div>
            )}
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-secondary font-semibold tracking-widest uppercase">Đặt lịch nhanh chóng và tiện lợi</p>
                    <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">Đặt lịch nhanh chỉ với vài thao tác đơn giản</p>
                </div>

                {step === 'package' && (
                    <div className="mx-auto flex w-xl flex-col gap-8">
                        <div className="font-semibold">Thông tin lịch khám</div>
                        <div>
                            <SelectInput
                                placeholder="Chọn gói khám (bắt buộc)"
                                fieldName="medicalPackage"
                                error={errors.medicalPackageIsRequired === 'failed' ? 'Vui lòng chọn gói khám' : ''}
                                value={medicalPackageId ?? undefined}
                                onChange={value => {
                                    setErrors(prev => ({
                                        ...prev,
                                        medicalPackageIsRequired: !value ? 'failed' : 'passed'
                                    }))
                                    setMedicalPackageId(value as string)
                                }}
                                options={
                                    medicalPackages.data?.content.map(medicalPackage => ({
                                        label: medicalPackage.name,
                                        value: medicalPackage.medicalPackageId
                                    })) ?? []
                                }
                            ></SelectInput>
                        </div>

                        <div>
                            <DatePicker
                                placeHolder="Chọn ngày khám bệnh"
                                date={bookingDate}
                                setDate={date => {
                                    setBookingDate(date as Date)
                                }}
                                disableDate={{
                                    before: new Date()
                                }}
                            />
                        </div>
                        {availableSlots.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8">
                                <div className="mb-3 text-gray-400">
                                    <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-.5 5.5A2 2 0 003.5 18H20.5a2 2 0 002-2l-.5-5.5m-6 0V7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-700">Không có ca khám nào</h3>
                                <p className="text-center text-gray-500">
                                    Ngày đã chọn hiện tại không có ca khám nào khả dụng. Vui lòng chọn ngày khác.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 font-semibold">Chọn ca khám</div>
                                {availableSlots.map(slotItem => (
                                    <div
                                        key={slotItem.slotId}
                                        className={`flex flex-col rounded-lg border-2 p-4 transition-all duration-200 ${
                                            slotItem.remainingQuantity === 0
                                                ? 'cursor-not-allowed border-gray-300 bg-gray-100 opacity-50'
                                                : slotItem === slot
                                                  ? 'border-primary bg-primary/10 cursor-pointer'
                                                  : 'hover:border-primary/50 cursor-pointer border-gray-200 hover:bg-gray-50'
                                        }`}
                                        onClick={() => {
                                            if (slotItem.remainingQuantity > 0) {
                                                setSlot(slotItem)
                                            }
                                        }}
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="font-semibold text-gray-800">{new Date(slotItem.date).toLocaleDateString('vi-VN')}</div>
                                            <div
                                                className={`rounded px-2 py-1 text-sm font-medium ${
                                                    slotItem.shift === 0 ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                                                }`}
                                            >
                                                {slotItem.shift === 0 ? 'Ca Sáng' : 'Ca Chiều'}
                                            </div>
                                        </div>
                                        <div className="mb-2 text-sm text-gray-600">{slotItem.shift === 0 ? '8:00 - 12:00' : '13:00 - 17:00'}</div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Tag size={14} />
                                                <span>Còn {slotItem.remainingQuantity} chỗ</span>
                                            </div>
                                            {slotItem === slot && <FontAwesomeIcon icon={faCheck} className="text-primary" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mx-auto">
                            <Button
                                text="Chọn gói khám"
                                variant="primary"
                                onClick={() => {
                                    // call api to xác nhận gói khám đã chọn
                                    const errors = {
                                        bookingDateIsRequired: !bookingDate ? 'failed' : 'passed',
                                        medicalPackageIsRequired: !medicalPackageId ? 'failed' : 'passed'
                                    } as const

                                    setErrors(prev => ({
                                        ...prev,
                                        ...errors
                                    }))

                                    if (!slot) {
                                        toast('Vui lòng chọn ca khám!', toastOption('error'))
                                        return
                                    }

                                    if (errors.bookingDateIsRequired === 'passed' && errors.medicalPackageIsRequired === 'passed') {
                                        setStep('patientInfo')
                                    }
                                }}
                            ></Button>
                        </div>
                    </div>
                )}
                {step === 'patientInfo' && (
                    <div className="mx-auto flex w-xl flex-col gap-8">
                        <div className="font-semibold">Thông tin bệnh nhân</div>

                        <div>
                            <TextInput
                                placeholder="Họ và tên bệnh nhân (bắt buộc)"
                                fieldName="name"
                                value={fullName}
                                error={errors.nameIsRequired === 'failed' ? 'Vui lòng nhập họ và tên' : ''}
                                onChange={value => {
                                    setErrors(prev => ({
                                        ...prev,
                                        nameIsRequired: !value ? 'failed' : 'passed'
                                    }))
                                    setFullName(value)
                                }}
                            />
                        </div>

                        <div>
                            <TextInput
                                placeholder="Số điện thoại (bắt buộc)"
                                fieldName="phone"
                                value={phoneNumber}
                                error={
                                    errors.phoneIsRequired === 'failed'
                                        ? 'Vui lòng nhập số điện thoại'
                                        : errors.phoneIsInvalidFormat === 'failed'
                                          ? 'Số điện thoại không đúng định dạng'
                                          : ''
                                }
                                onChange={value => {
                                    setErrors(prev => ({
                                        ...prev,
                                        phoneIsRequired: !value ? 'failed' : 'passed',
                                        phoneIsInvalidFormat: !/^(0|\+84)[0-9]{9}$/.test(value) ? 'failed' : 'passed'
                                    }))
                                    setPhone(value)
                                }}
                            />
                        </div>

                        <div>
                            <TextInput
                                placeholder="Email"
                                fieldName="email"
                                value={email}
                                error={errors.emailIsInvalidFormat === 'failed' ? 'Email không đúng định dạng' : ''}
                                onChange={value => {
                                    setErrors(prev => ({
                                        ...prev,
                                        emailIsInvalidFormat: value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? 'failed' : 'passed'
                                    }))
                                    setEmail(value)
                                }}
                            />
                        </div>

                        <div className="mx-auto flex flex-row gap-4">
                            <Button
                                text="Quay lại"
                                variant="primary"
                                onClick={() =>
                                    // call api to xác nhận gói khám đã chọn
                                    setStep('package')
                                }
                            ></Button>

                            <Button
                                text="Đặt lịch khám"
                                variant="primary"
                                onClick={async () => {
                                    // call api to xác nhận gói khám đã chọn
                                    const errors = {
                                        nameIsRequired: !fullName ? 'failed' : 'passed',
                                        phoneIsRequired: !phoneNumber ? 'failed' : 'passed',
                                        phoneIsInvalidFormat: !/^(0|\+84)[0-9]{9}$/.test(phoneNumber) ? 'failed' : 'passed',
                                        emailIsInvalidFormat: email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'failed' : 'passed'
                                    } as const
                                    setErrors(prev => ({
                                        ...prev,
                                        ...errors
                                    }))
                                    if (
                                        errors.nameIsRequired === 'passed' &&
                                        errors.phoneIsRequired === 'passed' &&
                                        errors.phoneIsInvalidFormat === 'passed' &&
                                        errors.emailIsInvalidFormat === 'passed'
                                    ) {
                                        try {
                                            const { bookingId } = await booking.mutateAsync({
                                                slotId: slot!.slotId,
                                                name: fullName,
                                                email: email,
                                                phone: phoneNumber
                                            })

                                            setBookingId(bookingId)
                                            setStep('finalStep')
                                        } catch {
                                            toast('Đặt lịch khám thất bại. Vui lòng thử lại!', toastOption('error'))
                                        }
                                    }
                                }}
                            ></Button>
                        </div>
                    </div>
                )}
                {step === 'finalStep' && (
                    <div className="mx-auto flex w-xl flex-col gap-8">
                        {(bookingStatus.isPending || bookingStatus.data?.bookingStatus.status === 'PENDING') && (
                            <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400">
                                        <svg
                                            className="h-6 w-6 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-yellow-800">Xác nhận email</h3>
                                        <p className="text-sm text-yellow-700">Lịch khám của bạn đang chờ xác nhận</p>
                                    </div>
                                </div>
                                <p className="text-yellow-700">
                                    Chúng tôi đã gửi email xác nhận đến địa chỉ <span className="font-semibold">{email}</span>. Vui lòng kiểm tra hộp
                                    thư và nhấp vào liên kết xác nhận để hoàn tất đặt lịch.
                                </p>
                            </div>
                        )}
                        {bookingStatus.data?.bookingStatus.status === 'APPROVED' && (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-lg">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
                                            <FontAwesomeIcon icon={faCheck} className="text-5xl text-white" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="mb-2 text-3xl font-bold text-green-800">Đặt lịch khám thành công!</h3>
                                            <p className="text-lg text-green-700">Vui lòng kiểm tra email để kiểm tra thông tin lịch khám của bạn.</p>
                                        </div>
                                        <div className="flex w-full flex-col gap-3 rounded-lg bg-white/60 p-4 backdrop-blur-sm">
                                            <div className="flex items-center justify-between border-b border-green-200 pb-2">
                                                <span className="text-sm font-medium text-gray-600">Mã đặt lịch</span>
                                                <span className="font-mono text-sm font-semibold text-green-700">{bookingId}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-600">Trạng thái</span>
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                    Đã xác nhận
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        text="Đặt lịch khám khác"
                                        variant="primary"
                                        onClick={() => {
                                            setFullName('')
                                            setPhone('')
                                            setEmail('')
                                            setMedicalPackageId(null)
                                            setBookingDate(new Date())
                                            setSlot(undefined)
                                            setBookingId(undefined)
                                            setStep('package')
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        )}
                        {bookingStatus.data?.bookingStatus.status === 'REJECTED' && (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="rounded-lg border-2 border-red-400 bg-red-50 p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-400">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-red-800">Đặt lịch thất bại</h3>
                                            <p className="text-sm text-red-700">Có lỗi xảy ra trong quá trình đặt lịch</p>
                                        </div>
                                    </div>
                                    <p className="text-red-700">
                                        Rất tiếc, lịch khám của bạn không thể được xác nhận. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ
                                        trợ.
                                    </p>
                                </div>
                                <div>
                                    <Button
                                        text="Thử lại"
                                        variant="primary"
                                        onClick={() => {
                                            setFullName('')
                                            setPhone('')
                                            setEmail('')
                                            setMedicalPackageId(null)
                                            setBookingDate(new Date())
                                            setSlot(undefined)
                                            setBookingId(undefined)
                                            setStep('package')
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default BookAppointmentsSection
