import React, { useState, useEffect } from 'react';
import { Mic, StopCircle, Play, Pause, ChevronLeft, MoreHorizontal, FileText } from 'lucide-react';
import { generateMeetingSummary } from '../services/geminiService';

interface MeetingRecorderProps {
  onBack: () => void;
}

const MeetingRecorder: React.FC<MeetingRecorderProps> = ({ onBack }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [activeTab, setActiveTab] = useState<'live' | 'summary'>('live');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Mock transcript generation effect
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
        // Simulate incoming text periodically
        if (Math.random() > 0.7) {
            const phrases = [
                "我们需要专注于Q3的战略目标。",
                "客户获取成本降低了5%。",
                "京东项目正在按计划进行。",
                "我们下周二安排后续跟进。",
                "供应链方面有什么风险吗？",
                "是的，我们发现物流有一点延误。"
            ];
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setTranscript(prev => [...prev, `[${timestamp}] ${randomPhrase}`]);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = async () => {
    setIsRecording(false);
    setActiveTab('summary');
    setIsGeneratingSummary(true);
    
    // Call Gemini for summary
    const fullText = transcript.join('\n');
    if (fullText) {
        const result = await generateMeetingSummary(fullText);
        setSummary(result);
    } else {
        setSummary("没有录音内容可供总结。");
    }
    setIsGeneratingSummary(false);
  };

  return (
    <div className="flex flex-col h-full bg-white z-50 fixed inset-0">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between bg-white safe-top">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h2 className="font-semibold text-lg">AI 会议纪要</h2>
        <button className="p-2 -mr-2 text-gray-600">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 mx-4 mt-4 bg-gray-100 rounded-lg">
        <button 
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'live' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            onClick={() => setActiveTab('live')}
        >
            实时录音
        </button>
        <button 
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'summary' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            onClick={() => setActiveTab('summary')}
        >
            AI 总结
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'live' ? (
            <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-10">
                    <div className="text-5xl font-mono font-light text-gray-800 mb-4 tracking-wider">
                        {formatTime(duration)}
                    </div>
                    {isRecording ? (
                        <div className="flex items-center space-x-2 text-red-500 animate-pulse">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-sm font-medium">正在录音...</span>
                        </div>
                    ) : (
                        <div className="text-gray-400 text-sm">准备录音</div>
                    )}
                </div>
                
                <div className="space-y-3">
                    {transcript.map((line, idx) => (
                        <p key={idx} className="text-gray-600 text-sm leading-relaxed border-l-2 border-teal-100 pl-3">
                            {line}
                        </p>
                    ))}
                    {transcript.length === 0 && (
                        <div className="text-center text-gray-400 mt-10">
                            录音转文字将在这里显示...
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                {isGeneratingSummary ? (
                    <div className="flex flex-col items-center justify-center h-40">
                         <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-3"></div>
                         <p className="text-gray-500 text-sm">正在生成智能总结...</p>
                    </div>
                ) : (
                    <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                        <div className="flex items-center space-x-2 mb-3 text-teal-800">
                            <FileText size={18} />
                            <h3 className="font-semibold">会议总结</h3>
                        </div>
                        <div className="prose prose-sm text-gray-700 whitespace-pre-wrap">
                            {summary}
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-white border-t safe-bottom flex justify-center items-center space-x-8">
         {!isRecording ? (
             <button 
                onClick={() => setIsRecording(true)}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
             >
                 <Mic size={32} className="text-white" />
             </button>
         ) : (
             <>
                <button 
                    onClick={() => setIsRecording(false)}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
                >
                    <Pause size={24} />
                </button>
                <button 
                    onClick={handleStop}
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center border-4 border-red-500"
                >
                    <div className="w-6 h-6 bg-red-500 rounded-sm" />
                </button>
             </>
         )}
      </div>
    </div>
  );
};

export default MeetingRecorder;