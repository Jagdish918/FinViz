
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import StockChart from "@/components/dashboard/charts/StockChart";
import WatchList from "@/components/dashboard/WatchList";
import MarketOverview from "@/components/dashboard/MarketOverview";
import TradeSimulator from "@/components/dashboard/TradeSimulator";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-finance-navy dark:to-gray-900">
        <div className="text-center">
          <div className="h-16 w-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">FinViz Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Loading your financial data...</p>
          <div className="mt-6 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full animate-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

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
            {/* Welcome Message */}
            <motion.div variants={fadeInUpVariants} className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Welcome back, Alex</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Here's what's happening with your portfolio today
              </p>
            </motion.div>
            
            {/* Portfolio Summary */}
            <motion.div variants={fadeInUpVariants}>
              <PortfolioSummary />
            </motion.div>
            
            {/* Charts and Watchlist */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <StockChart 
                  symbol="AAPL" 
                  name="Apple Inc." 
                  description="NASDAQ: AAPL"
                  isPositive={true} 
                />
                <StockChart 
                  symbol="TSLA" 
                  name="Tesla Inc." 
                  description="NASDAQ: TSLA"
                  isPositive={false} 
                />
              </div>
              <div>
                <WatchList />
              </div>
            </motion.div>
            
            {/* Market Overview and Trade Simulator */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketOverview />
              <TradeSimulator />
            </motion.div>
            
            {/* Recent News Section */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Recent Financial News</h3>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center hover:underline">
                  View all <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-none">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1 line-clamp-2">Fed signals potential rate cuts later this year as inflation cools</h4>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>Financial Times</span>
                        <span className="mx-2">•</span>
                        <span>2h ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
