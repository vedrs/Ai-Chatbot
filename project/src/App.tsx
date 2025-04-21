import React from 'react';
import { ChatProvider } from './context/ChatContext';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:items-center sm:justify-center">
      <div className="mx-auto h-[600px] w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:h-[700px]">
        <ChatProvider>
          <ChatInterface />
        </ChatProvider>
      </div>
    </div>
  );
}

export default App;