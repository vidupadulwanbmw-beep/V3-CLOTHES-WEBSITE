import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// REPLACE THIS WITH YOUR ACTUAL API KEY FROM GOOGLE AI STUDIO
const API_KEY = "AIzaSyA9kxbv2GNmFCmByo_OCdV5RgikiPbJcew";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "ආයුබෝවන්! මම V3 Clothes AI සහයකයා. අද මම ඔබට උදව් කරන්නේ කොහොමද? (Hello! I'm the V3 Clothes AI assistant. How can I help you today?)", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      if (API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        setMessages(prev => [...prev, { text: "කරුණාකර API Key එක ChatBot.jsx ගොනුවට ඇතුලත් කරන්න. (Please add your Gemini API Key to the ChatBot.jsx file)", isBot: true }]);
        setIsLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a helpful customer support AI for an online clothing store named "V3 Clothes" in Sri Lanka. 
      Answer the customer's question nicely. You can speak in Sinhala (Singlish) and English. 
      Be polite and concise.
      Customer's question: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { text: text, isBot: true }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { text: "සමාවෙන්න, මට දැන් උත්තර දෙන්න අමාරුයි. පසුව උත්සාහ කරන්න. (Sorry, I'm having trouble right now. Please try again later.)", isBot: true }]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'var(--primary, #4f46e5)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999
        }}
      >
        <MessageCircle size={32} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '350px',
              height: '500px',
              maxHeight: '80vh',
              background: '#1a1a1a',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 10000,
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '15px 20px',
              background: 'linear-gradient(135deg, var(--primary, #4f46e5), #2e0014)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'white', color: 'var(--primary, #4f46e5)', borderRadius: '50%', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={20} />
                </div>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>V3 AI Support</div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                    maxWidth: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                  }}
                >
                  <div style={{
                    background: msg.isBot ? '#333' : 'var(--primary, #4f46e5)',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: msg.isBot ? '15px 15px 15px 5px' : '15px 15px 5px 15px',
                    fontSize: '0.95rem',
                    lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', color: '#888', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Bot size={16} /> AI is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '15px',
              background: '#111',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              gap: '10px'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  background: '#222',
                  border: '1px solid #444',
                  borderRadius: '20px',
                  padding: '10px 15px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                style={{
                  background: 'var(--primary, #4f46e5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                <Send size={20} style={{ marginLeft: '3px' }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
