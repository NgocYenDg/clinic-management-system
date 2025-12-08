import { axiosInstance } from '@/hooks/useAxiosIns'
import { useMutation } from '@tanstack/react-query'

export interface IChatMessage {
    role: 'user' | 'assistant'
    content: string
}

export interface IChatRequest {
    message: string
    session_id?: string
}
 
export interface IChatResponse {
    response: string
    suggested_actions?: string[]
    session_id?: string
    timestamp: string
    error?: string
}

const useAIService = () => {
    const sendMessage = useMutation({
        mutationFn: (args: IChatRequest) =>
            axiosInstance.post<IChatResponse>('/ai/chat', args).then(res => res.data)
    })

    return {
        sendMessage
    }
}

export default useAIService
