
import React, { useState, useRef, useEffect } from 'react';
import { getProductRecommendations } from '../services/geminiService';
import { products } from '../data/products';
import ReactMarkdown from 'react-markdown';

const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{ type: 'user' | 'bot', content: string }[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage = { type: 'user' as const, content: query };
    setConversation(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await getProductRecommendations(query, products);
      const botMessage = { type: 'bot' as const, content: response };
      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { type: 'bot' as const, content: 'Sorry, I am having trouble connecting. Please try again later.' };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggle}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform transform hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.455.09-.934.09-1.425v-2.909A5.97 5.97 0 0 1 5.055 9.452c-.322-.842-.322-1.732.004-2.518A5.97 5.97 0 0 1 12 3c4.97 0 9 3.694 9 8.25Zm-9 3.75a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V16.5a.75.75 0 0 1 .75-.75Z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 flex flex-col h-[70vh] overflow-hidden border">
          <header className="bg-primary text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Marso Smart Assistant</h3>
            <button onClick={handleToggle} className="hover:text-gray-200">&times;</button>
          </header>
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-100 text-sm text-blue-800">
                <p>Hi there! How can I help you find the perfect electronic device today? Try asking "What's a good laptop for gaming?"</p>
              </div>
              {conversation.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-sm p-3 rounded-lg ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <div className="prose prose-sm max-w-none">
                       <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      </div>
                   </div>
                 </div>
              )}
               <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask for a recommendation..."
                className="flex-grow border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !query.trim()} className="bg-primary text-white rounded-full p-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SmartAssistant;
