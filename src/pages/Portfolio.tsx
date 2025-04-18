
import { motion } from "framer-motion";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import StockChart from "@/components/dashboard/charts/StockChart";

const Portfolio = () => {
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
              <h1 className="text-2xl font-bold mb-1">Portfolio Overview</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Track and manage your investment portfolio
              </p>
            </motion.div>
            
            {/* Portfolio Summary */}
            <motion.div variants={fadeInUpVariants}>
              <PortfolioSummary />
            </motion.div>
            
            {/* Investment Charts */}
            <motion.div variants={fadeInUpVariants} className="space-y-6">
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
              <StockChart 
                symbol="MSFT" 
                name="Microsoft Corporation" 
                description="NASDAQ: MSFT"
                isPositive={true} 
              />
            </motion.div>
            
            {/* Portfolio Allocation */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Asset Allocation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Stocks</h4>
                  <p className="text-2xl font-bold">65%</p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bonds</h4>
                  <p className="text-2xl font-bold">20%</p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Cash</h4>
                  <p className="text-2xl font-bold">15%</p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
