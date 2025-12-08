import { axiosInstance } from '@/hooks/useAxiosIns'
import { useMutation, useQuery } from '@tanstack/react-query'

const useBookingService = ({ medicalPackageId, bookingId }: { medicalPackageId?: string; bookingId?: string }) => {
    const booking = useMutation({
        mutationFn: (args: ICreateBookingArgs) =>
            axiosInstance
                .post<{
                    bookingId: string
                }>('/booking', args)
                .then(res => res.data)
    })
    const bookingStatus = useQuery({
        queryKey: ['checkBookingStatus', bookingId],
        queryFn: () => {
            return axiosInstance
                .get<{
                    bookingStatus: IBookingStatus
                }>(`/booking/${bookingId}/status`)
                .then(res => res.data)
        },
        enabled: !!bookingId,
        refetchInterval: 5000
    })

    const slots = useQuery({
        queryKey: ['slots', medicalPackageId],
        queryFn: () =>
            axiosInstance
                .get<Pagination<ISlot>>('/slot', {
                    params: { medicalPackageId }
                })
                .then(res => res.data),
        enabled: !!medicalPackageId
    })

    return {
        booking,
        bookingStatus,
        slots
    }
}

export default useBookingService
