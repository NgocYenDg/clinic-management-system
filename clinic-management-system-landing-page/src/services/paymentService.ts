import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import useAxiosIns from '@/hooks/useAxiosIns'

const paymentService = () => {
    const queryClient = useQueryClient()
    const axios = useAxiosIns()
    const [qrCode, setQRCode] = useState<string>('')

    const getQRCode = useQuery({
        queryKey: ['QRCode'],
        queryFn: () => {
            // call API to get QR code
            return Promise.resolve({
                data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
            } as IResponseData<string>)
        },
        enabled: true
    })

    useEffect(() => {
        if (getQRCode.data) {
            setQRCode(getQRCode.data.data)
        }
    }, [getQRCode.data])

    return {
        qrCode,
        getQRCode
    }
}

export default paymentService
