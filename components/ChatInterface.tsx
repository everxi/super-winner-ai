import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Plus, Image as ImageIcon, X } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatInterfaceProps {
  initialMessages?: Message[];
  placeholder?: string;
  onClose?: () => void;
  showHeader?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  initialMessages = [], 
  placeholder = "发送消息...",
  onClose,
  showHeader = false
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userMsg.text, history);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Optional Header for Modal Mode */}
      {showHeader && (
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <h2 className="font-semibold text-lg text-gray-800">超赢智能体</h2>
          {onClose && (
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
               <X size={20} className="text-gray-600" />
            </button>
          )}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0 mr-2 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                 AI
               </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              {msg.cardData && (
                <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-1">{msg.cardData.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{msg.cardData.description}</p>
                    {msg.cardData.action && (
                        <button className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
                            {msg.cardData.action}
                        </button>
                    )}
                </div>
              )}
            </div>
            {msg.sender === 'user' && (
              <img 
                src="https://picsum.photos/id/64/100/100" 
                alt="User" 
                className="w-8 h-8 rounded-full ml-2 border border-gray-200"
              />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 mr-2 flex-shrink-0" />
             <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200 sticky bottom-0 safe-bottom">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Plus size={24} />
          </button>
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-sm"
            />
          </div>
           {inputValue.trim() ? (
              <button 
                onClick={handleSendMessage}
                className="p-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition-transform transform active:scale-95"
              >
                <Send size={20} />
              </button>
           ) : (
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Mic size={24} />
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;