import TextInput from '@/components/common/TextInput'
import DatePicker from '@/components/common/DatePicker'
import SelectInput from '@/components/common/SelectInput'
import Button from '@/components/common/Button'
import doctorService from '@/services/doctorService'
import { useState } from 'react'
import appointmentService from '@/services/appointmentService'

type Shift = 1 | 2 | 3
const BookAppointmentsSection = () => {
    const { doctors } = doctorService()
    const { createAppointmentMutation } = appointmentService()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhone] = useState('')
    const [birthDate, setBirthDate] = useState<Date>()
    const [shift, setShift] = useState<Shift>()
    const [doctorId, setDoctorId] = useState<number>()
    const [symptom, setSymptom] = useState('')

    return (
        <section className="bg-ivory flex flex-col items-center px-5 py-[100px]">
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-secondary font-semibold tracking-widest uppercase">Đặt lịch nhanh chóng và tiện lợi</p>
                    <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">Đặt lịch nhanh chỉ với vài thao tác đơn giản</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-x-32 gap-y-8 px-40">
                    <div>
                        <TextInput placeholder="Nhập họ và tên" fieldName="name" value={fullName} error="" onChange={value => setFullName(value)} />
                    </div>
                    <div>
                        <DatePicker placeHolder="Chọn ngày tháng năm sinh" date={birthDate} setDate={date => setBirthDate(date)} />
                    </div>
                    <div>
                        <TextInput placeholder="Email" fieldName="email" value={email} error="" onChange={value => setEmail(value)} />
                    </div>

                    <div>
                        <TextInput
                            placeholder="Nhập số điện thoại"
                            fieldName="phone"
                            value={phoneNumber}
                            error=""
                            onChange={value => setPhone(value)}
                        />
                    </div>

                    <div>
                        <SelectInput
                            placeholder="Chọn ca khám"
                            fieldName="shift"
                            error=""
                            onChange={value => setShift(value as Shift)}
                            options={[
                                {
                                    label: 'Ca sáng (8:00 - 11:30)',
                                    value: 1
                                },
                                {
                                    label: 'Ca chiều (13:30 - 17:00)',
                                    value: 2
                                },
                                {
                                    label: 'Ca tối (18:00 - 20:30)',
                                    value: 3
                                }
                            ]}
                            value={shift}
                        ></SelectInput>
                    </div>

                    <div>
                        <SelectInput
                            placeholder="Chọn bác sĩ"
                            fieldName="doctor"
                            error=""
                            value={doctorId}
                            onChange={value => setDoctorId(value as number)}
                            options={doctors.map(doctor => ({
                                label: doctor.fullName,
                                value: doctor.doctorId
                            }))}
                        ></SelectInput>
                    </div>

                    <div>
                        <TextInput
                            placeholder="Mô tả triệu chứng"
                            fieldName="symptom"
                            error=""
                            value={symptom}
                            onChange={value => setSymptom(value)}
                        ></TextInput>
                    </div>
                    <div className="col-span-2 mt-4 flex justify-center">
                        <Button
                            text="Đặt lịch khám"
                            variant="primary"
                            onClick={() =>
                                createAppointmentMutation.mutate({
                                    fullName: fullName,
                                    birthDate: birthDate,
                                    email: email,
                                    phoneNumber: phoneNumber,
                                    shift: shift,
                                    doctorId: doctorId,
                                    symptom: symptom
                                })
                            }
                        ></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookAppointmentsSection
