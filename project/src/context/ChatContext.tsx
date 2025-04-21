import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatContextType } from '../types';
import { generateResponse } from '../utils/generateResponse';

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    // Random typing delay between 1-3 seconds for more natural feel
    const typingDelay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, typingDelay);
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);

    // Generate bot response
    simulateTyping(() => {
      const responseContent = generateResponse(content, [...messages, userMessage]);
      const botMessage: Message = {
        id: uuidv4(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        content: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const value = { messages, isTyping, sendMessage, clearChat };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Hook to use the context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};