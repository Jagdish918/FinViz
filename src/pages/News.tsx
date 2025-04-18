
import { motion } from "framer-motion";
import { Clock, Tag, TrendingUp, ExternalLink } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

const News = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Sample news data
  const featuredNews = {
    title: "Federal Reserve signals potential interest rate cuts later this year as inflation cools",
    summary: "Fed officials indicated they expect to cut rates three times this year, though they kept rates steady at the March meeting.",
    source: "Financial Times",
    time: "2 hours ago",
    image: "https://placehold.co/600x400/eeeeee/cccccc",
    tags: ["Economy", "Federal Reserve", "Interest Rates"]
  };
  
  const newsItems = [
    {
      title: "Tech stocks rally as investors bet on AI-driven growth",
      summary: "Major tech companies saw their stocks rise as investors remain bullish on artificial intelligence innovations.",
      source: "Reuters",
      time: "4 hours ago",
      tags: ["Technology", "AI", "Stocks"]
    },
    {
      title: "Oil prices stabilize after OPEC+ maintains production cuts",
      summary: "Crude oil prices held steady after OPEC and its allies agreed to continue with supply reductions until the end of the year.",
      source: "Bloomberg",
      time: "5 hours ago",
      tags: ["Commodities", "OPEC", "Oil"]
    },
    {
      title: "Corporate earnings exceed expectations in Q1 reports",
      summary: "Several major companies have reported better-than-expected earnings for the first quarter, boosting market sentiment.",
      source: "Wall Street Journal",
      time: "6 hours ago",
      tags: ["Earnings", "Corporate", "Markets"]
    },
    {
      title: "Retail sales show resilience despite inflation concerns",
      summary: "Consumer spending remained robust in the latest retail sales data, suggesting economic strength despite ongoing inflation worries.",
      source: "CNBC",
      time: "8 hours ago",
      tags: ["Retail", "Economy", "Consumer Spending"]
    },
    {
      title: "Housing market shows signs of cooling as mortgage rates rise",
      summary: "Home sales declined for the third consecutive month as higher mortgage rates begin to impact buyer demand.",
      source: "MarketWatch",
      time: "10 hours ago",
      tags: ["Real Estate", "Housing", "Mortgage Rates"]
    },
  ];
  
  // Sample market movers
  const marketMovers = [
    { symbol: "NVDA", name: "NVIDIA Corp", change: "+4.2%", isPositive: true },
    { symbol: "TSLA", name: "Tesla Inc", change: "-2.1%", isPositive: false },
    { symbol: "AMD", name: "Advanced Micro Devices", change: "+3.5%", isPositive: true },
    { symbol: "AAPL", name: "Apple Inc", change: "+1.2%", isPositive: true },
    { symbol: "META", name: "Meta Platforms", change: "+2.8%", isPositive: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-finance-navy">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="flex-1 px-4 md:px-6 py-6 overflow-auto">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-7xl mx-auto"
          >
            {/* Page Title */}
            <motion.div variants={fadeInUpVariants} className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Financial News</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Stay updated with the latest market news and insights
              </p>
            </motion.div>
            
            {/* Featured News */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/5 h-64 md:h-auto bg-gray-200 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <span className="text-lg font-medium">News Image</span>
                  </div>
                </div>
                <div className="md:w-3/5 p-6">
                  <h2 className="text-xl font-bold mb-2 leading-tight">{featuredNews.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{featuredNews.summary}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{featuredNews.source}</span>
                    <span className="mx-2">•</span>
                    <Clock size={14} className="mr-1" />
                    <span>{featuredNews.time}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredNews.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 font-medium flex items-center hover:underline">
                    Read full article <ExternalLink size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* News and Market Movers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div variants={fadeInUpVariants} className="lg:col-span-2 space-y-6">
                <h3 className="text-lg font-bold">Latest News</h3>
                
                {newsItems.map((news, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUpVariants} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <h4 className="text-lg font-bold mb-2">{news.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{news.summary}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>{news.source}</span>
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      <span>{news.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {news.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2.5 py-0.5 rounded-full flex items-center">
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div variants={fadeInUpVariants} className="space-y-6">
                <h3 className="text-lg font-bold">Market Movers</h3>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Today's Top Performers</h4>
                  <div className="space-y-4">
                    {marketMovers.map((stock) => (
                      <div key={stock.symbol} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                        </div>
                        <div className={`flex items-center ${stock.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.isPositive && <TrendingUp size={16} className="mr-1" />}
                          {!stock.isPositive && <TrendingUp size={16} className="mr-1 transform rotate-180" />}
                          {stock.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h4 className="font-medium mb-4">News Categories</h4>
                  <div className="space-y-2">
                    {['Markets', 'Economy', 'Stocks', 'Commodities', 'Currencies', 'Crypto', 'Personal Finance', 'Politics'].map((category) => (
                      <div key={category} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-none">
                        <span>{category}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                          {Math.floor(Math.random() * 20) + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default News;
