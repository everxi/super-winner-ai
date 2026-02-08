import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  LayoutGrid, 
  Bell, 
  User, 
  Search, 
  ScanLine, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

import { MOCK_CONVERSATIONS, MOCK_TASKS, ACTION_ITEMS } from './constants';
import { Tab } from './types';
import ChatInterface from './components/ChatInterface';
import MeetingRecorder from './components/MeetingRecorder';

// --- Sub-components for specific tabs ---

const HomeTab: React.FC<{ onOpenChat: () => void }> = ({ onOpenChat }) => (
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="px-4 py-3 bg-white border-b flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-bold text-gray-900">快乐平安</h1>
      <ScanLine className="text-gray-600" />
    </div>
    <div className="px-4 py-2 bg-white">
      <div className="bg-gray-100 rounded-lg flex items-center px-3 py-2">
         <Search size={18} className="text-gray-400 mr-2" />
         <input type="text" placeholder="搜索消息、任务..." className="bg-transparent outline-none text-sm w-full" />
      </div>
    </div>

    {/* List */}
    <div className="flex-1 overflow-y-auto bg-white">
      {MOCK_CONVERSATIONS.map((conv) => (
        <div 
            key={conv.id} 
            onClick={() => conv.isAi ? onOpenChat() : null}
            className="flex items-center px-4 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="relative">
             <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
             {conv.unread > 0 && (
               <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                 {conv.unread}
               </div>
             )}
          </div>
          <div className="ml-3 flex-1 min-w-0">
             <div className="flex justify-between items-baseline mb-1">
               <h3 className={`text-base font-semibold truncate ${conv.isAi ? 'text-teal-700' : 'text-gray-900'}`}>
                 {conv.name}
               </h3>
               <span className="text-xs text-gray-400">{conv.time}</span>
             </div>
             <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SmartBodyTab: React.FC<{ onOpenMeeting: () => void; initialView?: 'dashboard' | 'chat' }> = ({ onOpenMeeting, initialView = 'dashboard' }) => {
  const [view, setView] = useState<'dashboard' | 'chat'>(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  if (view === 'chat') {
      return (
          <div className="h-full flex flex-col">
              <ChatInterface 
                showHeader 
                onClose={() => setView('dashboard')} 
                placeholder="问超赢任何问题..."
                initialMessages={[
                    {
                        id: 'welcome',
                        sender: 'ai',
                        text: '你好！我是你的超赢助手。今天我能为你做些什么？',
                        timestamp: new Date()
                    }
                ]}
              />
          </div>
      )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-4 py-4 bg-white border-b flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">超赢</h1>
        <MoreHorizontal className="text-gray-600" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
         {/* Capabilities Grid */}
         <div className="bg-white rounded-2xl p-4 shadow-sm">
             <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">AI 能力</h2>
             <div className="grid grid-cols-2 gap-3">
                 {ACTION_ITEMS.map((item) => (
                     <button 
                        key={item.id}
                        onClick={() => {
                            if (item.id === 'meeting') {
                                onOpenMeeting();
                            } else {
                                setView('chat'); // For demo, other actions open chat
                            }
                        }}
                        className="flex flex-col items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                     >
                        <div className={`p-2 rounded-lg ${item.color} mb-3`}>
                            {item.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 leading-tight">{item.description}</p>
                     </button>
                 ))}
             </div>
         </div>

         {/* Recent Insight Card */}
         <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">每日洞察</span>
                    <span className="text-teal-100 text-xs">1月26日 11:08</span>
                </div>
                <h3 className="text-lg font-bold mb-2">京东集团拜访计划</h3>
                <p className="text-teal-100 text-sm mb-4 line-clamp-2">
                    基于最近的市场数据，京东正在扩大其在西南地区的物流网络。这对于我们是一个极佳的机会...
                </p>
                <button 
                    onClick={() => setView('chat')}
                    className="bg-white text-teal-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm active:scale-95 transition-transform"
                >
                    查看详情
                </button>
             </div>
             {/* Decorative Background Circles */}
             <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
         </div>
      </div>
    </div>
  );
};

const NotificationsTab: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Risk' | 'Opportunity'>('All');
  
  const filteredTasks = MOCK_TASKS.filter(t => filter === 'All' || t.tag === filter);

  const filterMap: Record<string, string> = {
    'All': '全部',
    'Risk': '风险',
    'Opportunity': '机会',
    'Warning': '预警'
  };

  const tagMap: Record<string, string> = {
    'Risk': '风险',
    'Opportunity': '机会',
    'Warning': '预警',
    'General': '通用'
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="px-4 py-4 bg-white border-b">
         <h1 className="text-xl font-bold text-gray-900 mb-4">任务中心</h1>
         <div className="flex space-x-2 overflow-x-auto no-scrollbar">
             {['All', 'Risk', 'Opportunity', 'Warning'].map(f => (
                 <button 
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        filter === f 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-white border border-gray-200 text-gray-600'
                    }`}
                 >
                     {filterMap[f]}
                 </button>
             ))}
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredTasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide
                        ${task.tag === 'Risk' ? 'bg-red-100 text-red-600' : 
                          task.tag === 'Opportunity' ? 'bg-blue-100 text-blue-600' : 
                          'bg-yellow-100 text-yellow-600'}`
                      }>
                          {tagMap[task.tag]}
                      </span>
                      <span className="text-xs text-gray-400">{task.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                  <div className="flex justify-end">
                      <button className="text-sm font-medium text-teal-600 flex items-center">
                          去处理 <ChevronRight size={16} />
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

const ProfileTab: React.FC = () => (
    <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white p-6 border-b mb-2">
            <div className="flex items-center space-x-4 mb-6">
                <img src="https://picsum.photos/id/64/150/150" alt="Profile" className="w-16 h-16 rounded-full border-2 border-white shadow-md" />
                <div>
                    <h2 className="text-xl font-bold text-gray-900">王明</h2>
                    <p className="text-sm text-gray-500">深圳分公司 | VIP客户经理</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">12</div>
                    <div className="text-xs text-gray-500">我的客户</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">5</div>
                    <div className="text-xs text-gray-500">商机</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">98%</div>
                    <div className="text-xs text-gray-500">达成率</div>
                </div>
            </div>
        </div>
        
        <div className="bg-white flex-1 p-4">
            <div className="space-y-1">
                {['我的业绩', '我的项目', '团队排名', '设置'].map((item) => (
                    <button key={item} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <span className="text-gray-700 font-medium">{item}</span>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                ))}
            </div>
        </div>
    </div>
);


export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [showMeetingRecorder, setShowMeetingRecorder] = useState(false);
  const [forceChatView, setForceChatView] = useState(false); // Quick hack to force chat tab to show chat view

  const handleOpenChat = () => {
      setActiveTab('smart_body');
      setForceChatView(true);
  };

  const handleOpenMeeting = () => {
      setShowMeetingRecorder(true);
  };

  if (showMeetingRecorder) {
      return <MeetingRecorder onBack={() => setShowMeetingRecorder(false)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'chat' && <HomeTab onOpenChat={handleOpenChat} />}
        {activeTab === 'smart_body' && (
          <SmartBodyTab 
            onOpenMeeting={handleOpenMeeting} 
            initialView={forceChatView ? 'chat' : 'dashboard'} 
          />
        )}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-2 pb-safe flex justify-between items-center safe-bottom">
        <button 
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'chat' ? 'text-teal-600' : 'text-gray-400'}`}
        >
          <MessageCircle size={24} strokeWidth={activeTab === 'chat' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">消息</span>
        </button>
        
        <button 
            onClick={() => { setActiveTab('smart_body'); setForceChatView(false); }}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'smart_body' ? 'text-teal-600' : 'text-gray-400'}`}
        >
          <div className={`p-1 rounded-full transition-all ${activeTab === 'smart_body' ? 'bg-teal-50' : ''}`}>
            <LayoutGrid size={24} strokeWidth={activeTab === 'smart_body' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium">智能体</span>
        </button>

        <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'notifications' ? 'text-teal-600' : 'text-gray-400'}`}
        >
          <div className="relative">
             <Bell size={24} strokeWidth={activeTab === 'notifications' ? 2.5 : 2} />
             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>
          <span className="text-[10px] font-medium">待办</span>
        </button>

        <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-teal-600' : 'text-gray-400'}`}
        >
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">我的</span>
        </button>
      </div>
    </div>
  );
}