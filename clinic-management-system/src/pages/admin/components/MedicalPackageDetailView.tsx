import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import useBookingService from "@/services/bookingService";

interface MedicalPackageDetailViewProps {
  packageData: MedicalPackageDetailDTO;
  onBack: () => void;
}

export default function MedicalPackageDetailView({
  packageData,
  onBack,
}: MedicalPackageDetailViewProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { slots } = useBookingService({
    medicalPackageId: packageData.medicalPackageId,
  });

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getSlotsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return slots.data?.content?.filter((slot) => slot.date === dateStr) || [];
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Quay lại danh sách</span>
      </button>

      {/* Package details */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex gap-6">
          {/* Image */}
          {packageData.image && (
            <div className="shrink-0">
              <img
                src={packageData.image}
                alt={packageData.name}
                className="w-64 h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {packageData.name}
              </h2>
              <p className="text-3xl font-bold text-blue-400">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(packageData.price)}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Mô tả</h3>
              <p className="text-gray-300">{packageData.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Dịch vụ bao gồm
              </h3>
              <div className="space-y-2">
                {packageData.medicalServices.map((service) => (
                  <div
                    key={service.medicalServiceId}
                    className="bg-white/5 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-white">{service.name}</p>
                        <p className="text-sm text-gray-400">
                          {service.departmentName}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        Ưu tiên: {service.processingPriority}
                      </span>
                    </div>
                    {service.description && (
                      <p className="text-sm text-gray-400 mt-2">
                        {service.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar view for slots */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">
          Lịch khám có sẵn
        </h3>

        {/* Calendar navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            ←
          </button>
          <h4 className="text-lg font-semibold text-white">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-400 py-2"
            >
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );
            const daySlots = getSlotsForDate(date);
            const hasSlots = daySlots.length > 0;
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`aspect-square p-2 rounded-lg border transition-colors ${
                  today
                    ? "border-blue-400 bg-blue-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="text-center">
                  <div className={`text-sm ${today ? "font-bold" : ""}`}>
                    {day}
                  </div>
                  {hasSlots && (
                    <div className="mt-1 space-y-1">
                      {daySlots.map((slot) => (
                        <div
                          key={slot.slotId}
                          className="text-xs bg-green-500/20 text-green-400 rounded px-1 py-0.5"
                        >
                          {slot.shift === 0 ? "Sáng" : "Chiều"} (
                          {slot.remainingQuantity}/{slot.maxQuantity})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading state */}
        {slots.isLoading && (
          <div className="text-center py-4 text-gray-400">
            Đang tải lịch khám...
          </div>
        )}

        {/* No slots message */}
        {!slots.isLoading && (!slots.data?.content || slots.data.content.length === 0) && (
          <div className="text-center py-4 text-gray-400">
            Chưa có lịch khám nào được tạo
          </div>
        )}
      </div>
    </div>
  );
}
