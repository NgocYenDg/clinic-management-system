import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axios-instance";

const useBookingService = ({
  medicalPackageId,
  bookingId,
  appointmentId,
  appointmentsParams,
}: {
  medicalPackageId?: string;
  bookingId?: string;
  appointmentId?: string;
  appointmentsParams?: ISearchAppointmentsParams;
}) => {
  const queryClient = useQueryClient();

  // Booking mutations (existing)
  const booking = useMutation({
    mutationFn: (args: ICreateBookingArgs) =>
      axiosInstance
        .post<{
          bookingId: string;
        }>("/api/booking", args)
        .then((res) => res.data),
  });

  // Booking status query (existing)
  const bookingStatus = useQuery({
    queryKey: ["checkBookingStatus", bookingId],
    queryFn: () => {
      return axiosInstance
        .get<{
          bookingStatus: IBookingStatus;
        }>(`/api/booking/${bookingId}/status`)
        .then((res) => res.data);
    },
    enabled: !!bookingId,
    refetchInterval: 5000,
  });

  // Slots queries
  const slots = useQuery({
    queryKey: ["slots", medicalPackageId],
    queryFn: () =>
      axiosInstance
        .get<Pagination<ISlot>>("/api/slot", {
          params: { medicalPackageId },
        })
        .then((res) => res.data),
    enabled: !!medicalPackageId,
  });

  const createSlot = useMutation({
    mutationFn: (args: ICreateSlotRequest) =>
      axiosInstance
        .post<{
          slotId: string;
        }>("/api/slot", args)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
  });

  // Appointment queries
  const appointments = useQuery({
    queryKey: ["appointments", appointmentsParams],
    queryFn: () =>
      axiosInstance
        .get<Pagination<IAppointment>>("/api/appointments", {
          params: appointmentsParams,
        })
        .then((res) => res.data),
    enabled: !!appointmentsParams,
  });

  const appointment = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () =>
      axiosInstance
        .get<IAppointmentDetails>(`/api/appointments/${appointmentId}`)
        .then((res) => res.data),
    enabled: !!appointmentId,
  });

  // Appointment mutations
  const createAppointment = useMutation({
    mutationFn: (args: ICreateAppointmentRequest) =>
      axiosInstance
        .post<{
          appointmentId: string;
        }>("/api/appointments", args)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
  });

  const updateAppointmentState = useMutation({
    mutationFn: ({
      appointmentId,
      state,
    }: {
      appointmentId: string;
      state: AppointmentState;
    }) =>
      axiosInstance
        .patch(`/api/appointments/${appointmentId}`, state, {
          headers: { "Content-Type": "text/plain" },
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
    },
  });

  const deleteAppointment = useMutation({
    mutationFn: (appointmentId: string) =>
      axiosInstance.delete(`/api/appointments/${appointmentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
  });

  return {
    // Booking
    booking,
    bookingStatus,
    // Slots
    slots,
    createSlot,
    // Appointments
    appointments,
    appointment,
    createAppointment,
    updateAppointmentState,
    deleteAppointment,
  };
};

export default useBookingService;
