import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, User, Stethoscope } from 'lucide-react'
import useAIService, { IChatMessage } from '@/services/aiService'
import { toast } from 'react-toastify'
import toastOption from '@/configs/toast'

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<IChatMessage[]>([
        {
            role: 'assistant',
            content: 'Xin chào! Tôi có thể giúp bạn tìm hiểu về các gói khám, kiểm tra lịch trống và đặt lịch hẹn. Bạn cần hỗ trợ gì hôm nay'
        }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [sessionId, setSessionId] = useState<string | undefined>(undefined)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { sendMessage } = useAIService()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        const userMessage: IChatMessage = {
            role: 'user',
            content: inputMessage
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage('')

        try {
            const response = await sendMessage.mutateAsync({
                message: inputMessage,
                session_id: sessionId
            })

            if (response.session_id) {
                setSessionId(response.session_id)
            }

            const assistantMessage: IChatMessage = {
                role: 'assistant',
                content: response.response
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch {
            toast('Không thể kết nối với trợ lý AI. Vui lòng thử lại!', toastOption('error'))
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <>
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                    aria-label="Open chat"
                >
                    <div className="relative">
                        <Stethoscope className="h-8 w-8" />
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs">
                            <MessageCircle size={12} />
                        </div>
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed right-6 bottom-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl bg-white shadow-2xl">
                    {/* Header */}
                    <div className="bg-primary flex items-center justify-between rounded-t-2xl p-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Trợ lý AI</h3>
                                <p className="text-xs text-white/80">Luôn sẵn sàng hỗ trợ bạn</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1 transition-colors hover:bg-white/20"
                            aria-label="Close chat"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex max-w-[80%] gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                            message.role === 'user' ? 'bg-primary' : 'bg-gray-300'
                                        }`}
                                    >
                                        {message.role === 'user' ? (
                                            <User size={16} className="text-white" />
                                        ) : (
                                            <Stethoscope size={16} className="text-gray-700" />
                                        )}
                                    </div>
                                    <div
                                        className={`rounded-2xl px-4 py-2 ${
                                            message.role === 'user' ? 'bg-primary text-white' : 'bg-white text-gray-800 shadow-sm'
                                        }`}
                                    >
                                        <p className="break-word text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {sendMessage.isPending && (
                            <div className="flex justify-start">
                                <div className="flex gap-2">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300">
                                        <Stethoscope size={16} className="text-gray-700" />
                                    </div>
                                    <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-2 shadow-sm">
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={e => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập tin nhắn..."
                                className="focus:border-primary focus:ring-primary/20 flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
                                disabled={sendMessage.isPending}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || sendMessage.isPending}
                                className="bg-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center rounded-full text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Send message"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chatbox
