
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Globe } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import MarketOverview from "@/components/dashboard/MarketOverview";

const Markets = () => {
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

  // Sample market index data
  const indices = [
    { name: "S&P 500", value: "4,781.58", change: "+1.02%", isPositive: true },
    { name: "Dow Jones", value: "38,239.66", change: "+0.56%", isPositive: true },
    { name: "Nasdaq", value: "16,920.79", change: "+1.65%", isPositive: true },
    { name: "Russell 2000", value: "2,023.54", change: "-0.28%", isPositive: false },
    { name: "VIX", value: "13.10", change: "-5.83%", isPositive: false },
    { name: "10-Year Treasury", value: "4.203%", change: "+0.024", isPositive: true },
  ];
  
  // Sample global market data
  const globalMarkets = [
    { name: "FTSE 100", value: "8,156.38", change: "+0.38%", isPositive: true, country: "UK" },
    { name: "DAX", value: "18,343.83", change: "+0.72%", isPositive: true, country: "Germany" },
    { name: "Nikkei 225", value: "38,821.27", change: "-0.35%", isPositive: false, country: "Japan" },
    { name: "Shanghai Composite", value: "3,112.03", change: "+0.84%", isPositive: true, country: "China" },
    { name: "Hang Seng", value: "17,778.41", change: "-1.22%", isPositive: false, country: "Hong Kong" },
    { name: "ASX 200", value: "7,812.06", change: "+0.56%", isPositive: true, country: "Australia" },
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
              <h1 className="text-2xl font-bold mb-1">Markets</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Global market data and performance
              </p>
            </motion.div>
            
            {/* US Market Indices */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">US Market Indices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {indices.map((index) => (
                  <div key={index.name} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{index.name}</h4>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold">{index.value}</p>
                      <div className={`flex items-center ${index.isPositive ? 'text-finance-chart-green' : 'text-finance-chart-red'}`}>
                        {index.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        <span className="font-medium">{index.change}</span>
                      </div>
                    </div>
                    <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div 
                        className={`h-full rounded-full ${index.isPositive ? 'bg-finance-chart-green' : 'bg-finance-chart-red'}`} 
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Market Overview */}
            <motion.div variants={fadeInUpVariants}>
              <MarketOverview />
            </motion.div>
            
            {/* Global Markets */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={20} />
                <h3 className="text-lg font-bold">Global Markets</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {globalMarkets.map((market) => (
                  <div key={market.name} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{market.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{market.country}</p>
                      </div>
                      <div className={`flex items-center ${market.isPositive ? 'text-finance-chart-green' : 'text-finance-chart-red'}`}>
                        {market.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xl font-bold">{market.value}</p>
                      <p className={`text-sm ${market.isPositive ? 'text-finance-chart-green' : 'text-finance-chart-red'}`}>
                        {market.change}
                      </p>
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

export default Markets;
