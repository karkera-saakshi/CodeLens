import { useState, useRef, useEffect } from "react";

export default function VelaAIPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "I'm VELA — your Velocity Enhancement Learning Advisor. I analyze your GitHub commits, LeetCode solutions, and Codeforces performance to generate precise, actionable growth strategies. Ask me anything.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "assistant",
        content: `Processing your query: "${userMessage.content}". Based on your current trajectory, I recommend focusing on graph algorithms and system design patterns. Your LeetCode completion rate suggests strong fundamentals, but competitive programming metrics indicate timing optimization gaps.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const quickPrompts = [
    "Analyze my skill gaps",
    "Generate learning roadmap",
    "Compare vs industry standard",
    "Weakest algorithm categories",
  ];

  const handleQuickPrompt = (prompt) => {
    setInputValue(prompt);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="w-full border-b-4 border-black px-4 sm:px-6 md:px-8 py-16 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 sm:space-y-12">
              <div className="border-4 border-black bg-black text-white px-6 py-3 inline-block">
                <span className="font-black text-sm sm:text-base uppercase tracking-widest">
                  AI-POWERED INTELLIGENCE
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-black">
                VELA AI
              </h1>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-black leading-relaxed border-l-4 border-black pl-6">
                  Velocity Enhancement Learning Advisor
                </p>
                <p className="text-base sm:text-lg font-bold text-black leading-relaxed">
                  Not a chatbot. A Staff Engineer that cross-references your GitHub velocity, algorithmic bottlenecks, and competitive programming agility to synthesize the exact learning sequence that eliminates stagnation.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="border-4 border-black px-6 py-4 bg-white">
                  <div className="text-3xl sm:text-4xl font-black text-black">98.7%</div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-black mt-1">
                    Accuracy Rate
                  </div>
                </div>
                <div className="border-4 border-black px-6 py-4 bg-white">
                  <div className="text-3xl sm:text-4xl font-black text-black">24/7</div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-black mt-1">
                    Available
                  </div>
                </div>
                <div className="border-4 border-black px-6 py-4 bg-white">
                  <div className="text-3xl sm:text-4xl font-black text-black">&lt;2s</div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-black mt-1">
                    Response Time
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="border-4 border-black p-6 bg-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 transition-transform">
                <div className="text-4xl font-black mb-4">01</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3">Multi-Source Analysis</h3>
                <p className="text-sm font-bold leading-relaxed">
                  Unified telemetry from GitHub, LeetCode, and Codeforces
                </p>
              </div>
              <div className="border-4 border-black p-6 bg-black text-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 transition-transform">
                <div className="text-4xl font-black mb-4">02</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3">Predictive Roadmaps</h3>
                <p className="text-sm font-bold leading-relaxed">
                  AI-generated learning paths based on real performance gaps
                </p>
              </div>
              <div className="border-4 border-black p-6 bg-black text-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 transition-transform">
                <div className="text-4xl font-black mb-4">03</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3">Real-Time Feedback</h3>
                <p className="text-sm font-bold leading-relaxed">
                  Instant analysis of code patterns and algorithmic choices
                </p>
              </div>
              <div className="border-4 border-black p-6 bg-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 transition-transform">
                <div className="text-4xl font-black mb-4">04</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3">Benchmark Insights</h3>
                <p className="text-sm font-bold leading-relaxed">
                  Compare your trajectory against industry standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section className="flex-1 w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto h-full">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-4">
              Interface Terminal
            </h2>
            <p className="text-base sm:text-lg font-bold uppercase tracking-wide text-black">
              Direct neural link to your performance data
            </p>
          </div>

          {/* Premium Chat Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-auto lg:h-[700px]">
            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-3 space-y-4">
              <div className="border-4 border-black bg-white p-6">
                <h3 className="text-lg font-black uppercase tracking-tight mb-6 border-b-4 border-black pb-3">
                  Quick Prompts
                </h3>
                <div className="space-y-3">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="w-full text-left px-4 py-3 border-4 border-black bg-white hover:bg-black hover:text-white transition-colors font-black text-sm uppercase tracking-tight"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-4 border-black bg-black text-white p-6">
                <h3 className="text-lg font-black uppercase tracking-tight mb-4">
                  Active Session
                </h3>
                <div className="space-y-3 text-sm font-bold">
                  <div className="flex justify-between border-b-2 border-white pb-2">
                    <span className="uppercase tracking-wide">Queries</span>
                    <span className="font-black">{messages.filter(m => m.type === 'user').length}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-white pb-2">
                    <span className="uppercase tracking-wide">Insights</span>
                    <span className="font-black">{messages.filter(m => m.type === 'assistant').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wide">Status</span>
                    <span className="font-black text-white">{isLoading ? 'PROCESSING' : 'READY'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-9 border-4 border-black bg-white shadow-[16px_16px_0_0_rgba(0,0,0,1)] flex flex-col h-[600px] lg:h-full">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] ${
                        message.type === "user"
                          ? "border-4 border-black bg-black text-white"
                          : "border-4 border-black bg-white text-black"
                      } p-4 sm:p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]`}
                    >
                      <div className="text-xs font-black uppercase tracking-widest mb-3 opacity-70">
                        {message.type === "user" ? "You" : "VELA"}
                      </div>
                      <div className="text-sm sm:text-base font-bold leading-relaxed break-words">
                        {message.content}
                      </div>
                      <div className="text-xs font-bold mt-3 opacity-50">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-black animate-pulse"></div>
                        <div className="w-3 h-3 bg-black animate-pulse delay-75"></div>
                        <div className="w-3 h-3 bg-black animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t-4 border-black bg-white p-4 sm:p-6">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask VELA anything..."
                    disabled={isLoading}
                    className="flex-1 border-4 border-black px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase tracking-wide placeholder:text-black placeholder:opacity-40 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-shadow disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="px-6 sm:px-10 py-3 sm:py-4 border-4 border-black bg-black text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </form>
                <div className="mt-4 text-xs font-bold uppercase tracking-wide text-black opacity-60">
                  Powered by Google Gemini AI • Real-time performance analysis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="w-full border-t-4 border-black px-4 sm:px-6 md:px-8 py-16 sm:py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Stop Guessing. Start Growing.
          </h2>
          <p className="text-base sm:text-lg font-bold uppercase tracking-wide max-w-3xl mx-auto">
            VELA doesn't give generic advice. It engineers your exact path from current state to target competency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6">
            <button className="w-full sm:w-auto px-10 py-5 border-4 border-white bg-white text-black font-black uppercase tracking-widest hover:bg-transparent hover:text-white transition-colors">
              Get Started Free
            </button>
            <button className="w-full sm:w-auto px-10 py-5 border-4 border-white bg-transparent text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: white;
          border-left: 4px solid black;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: black;
          border: 2px solid white;
        }
        .delay-75 {
          animation-delay: 0.15s;
        }
        .delay-150 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
