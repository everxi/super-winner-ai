import React from 'react';
import { Conversation, Task, ActionItem } from './types';
import { FileText, Mic, Camera, ScanLine, Lightbulb, MessageSquare } from 'lucide-react';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: '超赢智能体',
    avatar: 'https://picsum.photos/id/1/200/200',
    lastMessage: '这是为您准备的京东集团分析报告...',
    time: '10:18',
    unread: 2,
    isAi: true,
  },
  {
    id: '2',
    name: '张明',
    avatar: 'https://picsum.photos/id/1005/200/200',
    lastMessage: '那个合同审批通过了吗？',
    time: '10:27',
    unread: 0,
  },
  {
    id: '3',
    name: '销售一组',
    avatar: 'https://picsum.photos/id/1010/200/200',
    lastMessage: '王总: 我们需要更新Q3的目标。',
    time: '星期三',
    unread: 5,
  },
  {
    id: '4',
    name: '李三',
    avatar: 'https://picsum.photos/id/1025/200/200',
    lastMessage: '好的，客户现场见。',
    time: '星期一',
    unread: 0,
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: '客户满意度下降',
    description: '您的关键客户“东方集团”报告满意度下降了10%，请关注。',
    tag: 'Risk',
    date: '2025-01-20 12:58',
    status: 'pending',
  },
  {
    id: '2',
    title: '合同续签机会',
    description: '客户A的服务合同将在3个月后到期。请立即联系续约。',
    tag: 'Opportunity',
    date: '2025-01-20 14:30',
    status: 'pending',
  },
  {
    id: '3',
    title: '竞争对手预警',
    description: '竞争对手X针对您的行业推出了新的营销活动。',
    tag: 'Warning',
    date: '2025-01-19 09:15',
    status: 'resolved',
  },
];

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: 'report',
    icon: <FileText size={20} />,
    title: '一键生成报告',
    description: '即时生成全面的客户报告。',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'meeting',
    icon: <Mic size={20} />,
    title: 'AI 会议纪要',
    description: '实时录音、转写和智能摘要。',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'ocr',
    icon: <ScanLine size={20} />,
    title: 'OCR 识别',
    description: '扫描文档提取文字。',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'camera',
    icon: <Camera size={20} />,
    title: '智能拍摄',
    description: '拜访拍照并自动打标签。',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'opp',
    icon: <Lightbulb size={20} />,
    title: '商机挖掘',
    description: '从数据中发现新的销售线索。',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 'qa',
    icon: <MessageSquare size={20} />,
    title: '智能问答',
    description: '询问有关产品或政策的任何问题。',
    color: 'bg-indigo-100 text-indigo-600',
  },
];