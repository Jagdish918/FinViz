
import { motion } from "framer-motion";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import TradeSimulator from "@/components/dashboard/TradeSimulator";
import StockChart from "@/components/dashboard/charts/StockChart";

const Trading = () => {
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
              <h1 className="text-2xl font-bold mb-1">Trading Platform</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Place trades and monitor market activity
              </p>
            </motion.div>
            
            {/* Trading Chart */}
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <StockChart 
                symbol="AAPL" 
                name="Apple Inc." 
                description="NASDAQ: AAPL"
                isPositive={true} 
              />
            </motion.div>
            
            {/* Trading Module */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">Order Book</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Buy Orders */}
                    <div>
                      <h4 className="text-sm font-medium text-green-500 mb-2">Buy Orders</h4>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={`buy-${i}`} className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">${(Math.random() * 5 + 170).toFixed(2)}</span>
                            <span>{Math.floor(Math.random() * 1000)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sell Orders */}
                    <div>
                      <h4 className="text-sm font-medium text-red-500 mb-2">Sell Orders</h4>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={`sell-${i}`} className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">${(Math.random() * 5 + 175).toFixed(2)}</span>
                            <span>{Math.floor(Math.random() * 1000)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                    <h4 className="text-sm font-medium mb-2">Recent Trades</h4>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={`trade-${i}`} className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            {new Date(Date.now() - i * 60000).toLocaleTimeString()}
                          </span>
                          <span className={i % 2 === 0 ? "text-green-500" : "text-red-500"}>
                            ${(Math.random() * 5 + 173).toFixed(2)}
                          </span>
                          <span>{Math.floor(Math.random() * 500)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <TradeSimulator />
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Trading;
