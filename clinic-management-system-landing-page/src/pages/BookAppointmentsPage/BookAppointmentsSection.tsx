import TextInput from '@/components/common/TextInput'
import DatePicker from '@/components/common/DatePicker'
import SelectInput from '@/components/common/SelectInput'
import Button from '@/components/common/Button'
import { useState } from 'react'
import appointmentService from '@/services/appointmentService'
import medicalPackageService from '@/services/medicalPackageService'
import paymentService from '@/services/paymentService'
import { format, set } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

type Shift = 1 | 2
type ValidationResult = 'failed' | 'passed'
const BookAppointmentsSection = () => {
    const [medicalPackageId, setMedicalPackageId] = useState<number>()
    const [bookingDate, setBookingDate] = useState<Date>()
    const [shift, setShift] = useState<Shift>()
    const { medicalPackages } = medicalPackageService()

    const [fullName, setFullName] = useState('')
    // const [birthDate, setBirthDate] = useState<Date>()
    const [phoneNumber, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState('')
    const [verifiedPhone, setVerifiedPhone] = useState(false)
    const [showOTP, setShowOTP] = useState(false)

    const { qrCode, getQRCode } = paymentService()

    const { createAppointmentMutation } = appointmentService()
    const [step, setStep] = useState<'package' | 'patientInfo' | 'payment' | 'finalStep'>('package')

    const [errors, setErrors] = useState({
        medicalPackageIsRequired: null as ValidationResult | null,
        bookingDateIsRequired: null as ValidationResult | null,
        shiftIsRequired: null as ValidationResult | null,
        nameIsRequired: null as ValidationResult | null,
        phoneIsRequired: null as ValidationResult | null,
        phoneIsInvalidFormat: null as ValidationResult | null,
        emailIsInvalidFormat: null as ValidationResult | null
    })

    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
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
                                value={medicalPackageId}
                                onChange={value => {
                                    setErrors(prev => ({
                                        ...prev,
                                        medicalPackageIsRequired: !value ? 'failed' : 'passed'
                                    }))
                                    setMedicalPackageId(Number(value))
                                }}
                                options={medicalPackages.map(medicalPackage => ({
                                    label: medicalPackage.name,
                                    value: medicalPackage.medicalPackageId
                                }))}
                            ></SelectInput>
                        </div>

                        <div>
                            <DatePicker
                                placeHolder="Chọn ngày khám bệnh"
                                date={bookingDate}
                                setDate={date => {
                                    setErrors(prev => ({
                                        ...prev,
                                        bookingDateIsRequired: !date ? 'failed' : 'passed'
                                    }))
                                    setBookingDate(date)
                                }}
                                disableDate={{
                                    before: new Date()
                                }}
                                error={errors.bookingDateIsRequired === 'failed' ? 'Vui lòng chọn ngày khám' : ''}
                            />
                        </div>

                        <div>
                            <SelectInput
                                placeholder="Chọn ca khám (bắt buộc)"
                                fieldName="shift"
                                error={errors.shiftIsRequired === 'failed' ? 'Vui lòng chọn ca khám' : ''}
                                onChange={value => {
                                    setErrors(prev => ({
                                        ...prev,
                                        shiftIsRequired: !value ? 'failed' : 'passed'
                                    }))
                                    setShift(Number(value) as Shift)
                                }}
                                options={[
                                    {
                                        label: 'Ca sáng (8:00 - 12:00)',
                                        value: 1
                                    },
                                    {
                                        label: 'Ca chiều (13:00 - 17:00)',
                                        value: 2
                                    }
                                ]}
                                value={shift}
                            ></SelectInput>
                        </div>

                        <div className="mx-auto">
                            {/* {!verifiedPhone && !showOTP && ( */}
                            <Button
                                text="Chọn gói khám"
                                variant="primary"
                                onClick={() => {
                                    // call api to xác nhận gói khám đã chọn
                                    const errors = {
                                        shiftIsRequired: !shift ? 'failed' : 'passed',
                                        bookingDateIsRequired: !bookingDate ? 'failed' : 'passed',
                                        medicalPackageIsRequired: !medicalPackageId ? 'failed' : 'passed'
                                    } as const

                                    setErrors(prev => ({
                                        ...prev,
                                        ...errors
                                    }))

                                    if (
                                        errors.shiftIsRequired === 'passed' &&
                                        errors.bookingDateIsRequired === 'passed' &&
                                        errors.medicalPackageIsRequired === 'passed'
                                    ) {
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
                        {showOTP && (
                            <div>
                                <div className="flex flex-row items-center gap-2">
                                    <div className="grow">
                                        <TextInput
                                            placeholder="Mã OTP"
                                            fieldName="otp"
                                            value={otp}
                                            error=""
                                            onChange={value => {
                                                setOtp(value)
                                            }}
                                        />
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        size="2xl"
                                        className={classNames({
                                            'text-green-500': verifiedPhone,
                                            'text-gray-300': !verifiedPhone
                                        })}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="mx-auto flex flex-row gap-4">
                            <Button
                                text="Quay lại"
                                variant="primary"
                                onClick={() =>
                                    // call api to xác nhận gói khám đã chọn
                                    setStep('package')
                                }
                            ></Button>
                            {!verifiedPhone && !showOTP && (
                                <Button
                                    text="Xác nhận số điện thoại"
                                    variant="primary"
                                    onClick={() => {
                                        setErrors(prev => ({
                                            ...prev,
                                            phoneIsRequired: !phoneNumber ? 'failed' : 'passed'
                                        }))

                                        if (phoneNumber) {
                                            setShowOTP(true)
                                        }
                                    }}
                                ></Button>
                            )}
                            {showOTP && !verifiedPhone && (
                                <Button
                                    text="Gửi lại OTP"
                                    variant="primary"
                                    onClick={() => {
                                        // call api to resend OTP
                                        alert('Đã gửi lại mã OTP')
                                    }}
                                ></Button>
                            )}
                            {showOTP && !verifiedPhone && (
                                <Button
                                    text="Xác nhận OTP"
                                    variant="primary"
                                    onClick={() => {
                                        setVerifiedPhone(true)
                                    }}
                                ></Button>
                            )}
                            {verifiedPhone && (
                                <Button
                                    text="Đặt cọc để giữ chỗ"
                                    variant="primary"
                                    onClick={() => {
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
                                            setStep('payment')
                                        }
                                    }}
                                ></Button>
                            )}
                        </div>
                    </div>
                )}
                {step === 'payment' && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="grid grid-cols-2 gap-12">
                            <div className="aspect-square w-80">
                                <img src="/images/qrcode_example.png" alt="QR Code" className="h-full w-full object-contain" />
                            </div>
                            <div className="grid h-fit grid-cols-[auto_1fr] gap-2">
                                <div className="font-semibold">Họ tên:</div>
                                <div>{fullName}</div>
                                <div className="font-semibold">Số điện thoại:</div>
                                <div>{phoneNumber}</div>
                                <div className="font-semibold">Email:</div>
                                <div>{email}</div>
                                <div className="font-semibold">Gói khám:</div>
                                <div>{medicalPackages.find(pkg => pkg.medicalPackageId === medicalPackageId)?.name}</div>
                                <div className="font-semibold">Ngày khám:</div>
                                <div>{bookingDate ? format(bookingDate, 'dd/MM/yyyy') : ''}</div>
                                <div className="font-semibold">Ca khám:</div>
                                <div>{shift === 1 ? 'Ca sáng (8:00 - 12:00)' : shift === 2 ? 'Ca chiều (13:00 - 17:00)' : ''}</div>
                            </div>
                        </div>
                        <div className="mx-auto flex flex-row gap-4">
                            <Button
                                text="Quay lại"
                                variant="primary"
                                onClick={() =>
                                    // call api to xác nhận gói khám đã chọn
                                    setStep('patientInfo')
                                }
                            ></Button>
                            <Button
                                text="Xác nhận thanh toán"
                                variant="primary"
                                onClick={() =>
                                    // call api to xác nhận gói khám đã chọn
                                    setStep('finalStep')
                                }
                            ></Button>
                        </div>
                    </div>
                )}
                {step === 'finalStep' && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div>
                            {/* <div className="flex flex-col items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    size="1000x"
                                    className={classNames({
                                        'text-green-500': verifiedPhone,
                                        'text-gray-300': !verifiedPhone
                                    })}
                                />
                            </div> */}
                            <div className="flex flex-row items-center justify-center gap-4">
                                <FontAwesomeIcon icon={faCheck} size="10x" className="text-green-500" />
                            </div>
                            <div>Đặt lịch khám thành công! Vui lòng đến phòng khám đúng giờ đã hẹn để hoàn tất thủ tục khám bệnh.</div>
                        </div>
                        <div>
                            <Button
                                text="Đặt lịch khám khác"
                                variant="primary"
                                onClick={() => {
                                    // call api to xác nhận gói khám đã chọn
                                    setFullName(''),
                                        setPhone(''),
                                        setEmail(''),
                                        setVerifiedPhone(false),
                                        setShowOTP(false),
                                        setOtp(''),
                                        setMedicalPackageId(undefined),
                                        setBookingDate(undefined),
                                        setShift(undefined),
                                        setStep('package')
                                }}
                            ></Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BookAppointmentsSection
