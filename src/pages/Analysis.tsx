
import { motion } from "framer-motion";
import { PieChart, LineChart, BarChart, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import MarketOverview from "@/components/dashboard/MarketOverview";
import StockChart from "@/components/dashboard/charts/StockChart";

const Analysis = () => {
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
        delayChildren: 0.1
      }
    }
  };

  const chartCardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

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
              <h1 className="text-2xl font-bold mb-1">Market Analysis</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Comprehensive market analysis and financial insights
              </p>
            </motion.div>
            
            {/* Analysis Tools */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Technical Analysis", icon: LineChart, color: "blue" },
                { name: "Fundamental Analysis", icon: BarChart, color: "green" },
                { name: "Sector Analysis", icon: PieChart, color: "purple" },
                { name: "Market Screener", icon: BarChart3, color: "amber" }
              ].map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center"
                  variants={chartCardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-14 h-14 rounded-full bg-${tool.color}-100 dark:bg-${tool.color}-900/30 flex items-center justify-center mb-3`}>
                    <tool.icon className={`text-${tool.color}-500 dark:text-${tool.color}-400`} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{tool.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-1">
                    Interactive tools and charts
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Main Chart Section */}
            <motion.div variants={fadeInUpVariants}>
              <StockChart 
                symbol="SPY" 
                name="S&P 500 ETF" 
                description="NYSE: SPY"
                isPositive={true} 
              />
            </motion.div>
            
            {/* Analysis Metrics */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Market Sentiment</h3>
                <div className="space-y-4">
                  {[
                    { name: "Bull/Bear Ratio", value: "1.2", trend: "up" },
                    { name: "Put/Call Ratio", value: "0.8", trend: "down" },
                    { name: "VIX Index", value: "16.24", trend: "down" },
                    { name: "Retail Sentiment", value: "64%", trend: "up" }
                  ].map((metric) => (
                    <div key={metric.name} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-700 dark:text-gray-300">{metric.name}</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{metric.value}</span>
                        {metric.trend === "up" ? (
                          <TrendingUp size={16} className="text-green-500" />
                        ) : (
                          <TrendingDown size={16} className="text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Economic Indicators</h3>
                <div className="space-y-4">
                  {[
                    { name: "GDP Growth (YoY)", value: "2.4%", trend: "up" },
                    { name: "Unemployment Rate", value: "3.6%", trend: "down" },
                    { name: "Inflation Rate", value: "3.1%", trend: "down" },
                    { name: "10Y Treasury Yield", value: "4.25%", trend: "up" }
                  ].map((metric) => (
                    <div key={metric.name} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-700 dark:text-gray-300">{metric.name}</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{metric.value}</span>
                        {metric.trend === "up" ? (
                          <TrendingUp size={16} className={metric.name.includes("Unemployment") || metric.name.includes("Inflation") ? "text-red-500" : "text-green-500"} />
                        ) : (
                          <TrendingDown size={16} className={metric.name.includes("Unemployment") || metric.name.includes("Inflation") ? "text-green-500" : "text-red-500"} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Market Overview */}
            <motion.div variants={fadeInUpVariants}>
              <MarketOverview />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Analysis;
