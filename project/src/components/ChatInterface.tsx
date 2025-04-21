import React, { useRef, useEffect } from 'react';
import { Trash2, Zap } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../context/ChatContext';

const ChatInterface: React.FC = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-white">
        <div className="flex items-center">
          <Zap className="mr-2" size={20} />
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>
        <button
          onClick={clearChat}
          className="rounded-full p-2 transition-colors hover:bg-blue-700"
          aria-label="Clear chat"
          title="Clear chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex animate-pulse items-center space-x-2 text-gray-500">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">AI is typing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatInterface;