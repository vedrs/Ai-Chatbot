import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });
  
  return (
    <div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
      data-testid={`${message.sender}-message`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-gray-100 text-gray-800 rounded-bl-none'
            : 'bg-blue-500 text-white rounded-br-none'
        }`}
      >
        <p className="text-sm sm:text-base">{message.content}</p>
        <span className={`text-xs ${isBot ? 'text-gray-500' : 'text-blue-100'} block mt-1`}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;