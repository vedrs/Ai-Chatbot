import { Message } from '../types';

// Simple NLP patterns for demonstration
const patterns = [
  {
    pattern: /(hi|hello|hey|greetings)/i,
    responses: [
      "Hello! How can I help you today?",
      "Hi there! What can I assist you with?",
      "Hey! What brings you here today?"
    ]
  },
  {
    pattern: /(how are you|how're you|how you doing)/i,
    responses: [
      "I'm doing well, thanks for asking! How about you?",
      "I'm great! What can I help you with today?",
      "All systems operational! What can I do for you?"
    ]
  },
  {
    pattern: /(bye|goodbye|see you|farewell)/i,
    responses: [
      "Goodbye! Have a great day!",
      "See you later! Feel free to come back if you have more questions.",
      "Farewell! I'll be here if you need anything else."
    ]
  },
  {
    pattern: /(thank you|thanks|thx)/i,
    responses: [
      "You're welcome!",
      "Happy to help!",
      "Anytime! Is there anything else you'd like to know?"
    ]
  },
  {
    pattern: /(what is nlp|what is natural language processing)/i,
    responses: [
      "Natural Language Processing (NLP) is a field of artificial intelligence that focuses on the interaction between computers and humans through natural language. It helps machines understand and respond to human language.",
      "NLP, or Natural Language Processing, enables computers to understand, interpret, and generate human language in a valuable way. It's what allows chatbots like me to communicate with you!",
      "Natural Language Processing combines computational linguistics, machine learning, and deep learning to help computers understand human language. It powers voice assistants, chatbots, and translation services."
    ]
  },
  {
    pattern: /(what can you do|your capabilities|help me)/i,
    responses: [
      "I can answer questions, engage in conversation, and provide information on various topics. Feel free to ask me anything!",
      "I'm designed to have conversations, answer questions, and assist with information. What would you like to know?",
      "I can chat with you, answer questions, and provide assistance. How can I help you today?"
    ]
  }
];

// Fallback responses when no pattern matches
const fallbackResponses = [
  "I'm not sure I understand. Could you rephrase that?",
  "Interesting! Can you tell me more about that?",
  "I'm still learning. Could you elaborate on that?",
  "I don't have information on that yet. Is there something else I can help with?",
  "That's beyond my current capabilities. Is there something else you'd like to talk about?"
];

// Context-awareness function (basic implementation)
const getContextualResponse = (messages: Message[]): string | null => {
  // Look at the last few messages for context
  const recentMessages = messages.slice(-3);
  
  // Check if user has asked multiple questions in a row
  const userQuestionsCount = recentMessages.filter(m => 
    m.sender === 'user' && m.content.endsWith('?')
  ).length;
  
  if (userQuestionsCount >= 2) {
    return "I notice you have several questions. I'll try my best to answer them one by one.";
  }
  
  // Check for repetition
  const lastUserMessages = recentMessages.filter(m => m.sender === 'user').map(m => m.content);
  if (lastUserMessages.length >= 2 && 
      lastUserMessages[lastUserMessages.length - 1] === lastUserMessages[lastUserMessages.length - 2]) {
    return "I notice you sent the same message twice. Did I miss something in my previous response?";
  }
  
  return null;
}

// Generate a response based on user input and conversation history
export const generateResponse = (message: string, messages: Message[]): string => {
  // Check for contextual response first
  const contextResponse = getContextualResponse(messages);
  if (contextResponse) return contextResponse;
  
  // Check for pattern matches
  for (const item of patterns) {
    if (item.pattern.test(message)) {
      const randomIndex = Math.floor(Math.random() * item.responses.length);
      return item.responses[randomIndex];
    }
  }
  
  // Use fallback if no pattern matches
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
};