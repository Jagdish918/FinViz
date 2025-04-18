
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

const Assets = () => {
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

  // Sample assets data
  const assets = [
    { name: "AAPL", fullName: "Apple Inc.", shares: 25, price: 173.50, change: "+1.2%", value: 4337.50, isPositive: true, logo: "apple" },
    { name: "MSFT", fullName: "Microsoft Corp.", shares: 15, price: 397.30, change: "+0.8%", value: 5959.50, isPositive: true, logo: "microsoft" },
    { name: "GOOGL", fullName: "Alphabet Inc.", shares: 10, price: 163.75, change: "-0.3%", value: 1637.50, isPositive: false, logo: "google" },
    { name: "AMZN", fullName: "Amazon.com Inc.", shares: 12, price: 176.80, change: "+1.5%", value: 2121.60, isPositive: true, logo: "amazon" },
    { name: "TSLA", fullName: "Tesla Inc.", shares: 18, price: 177.10, change: "-2.1%", value: 3187.80, isPositive: false, logo: "tesla" },
    { name: "META", fullName: "Meta Platforms Inc.", shares: 20, price: 475.90, change: "+0.5%", value: 9518.00, isPositive: true, logo: "meta" },
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
              <h1 className="text-2xl font-bold mb-1">My Assets</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your investment portfolio
              </p>
            </motion.div>
            
            {/* Portfolio Value */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Portfolio Value</h3>
                <p className="text-3xl font-bold mb-2">$26,762.90</p>
                <div className="flex items-center text-green-500">
                  <TrendingUp size={16} className="mr-1" />
                  <span>+2.3% today</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Cash Balance</h3>
                <p className="text-3xl font-bold mb-2">$5,432.18</p>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Available for trading</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Day's Change</h3>
                <p className="text-3xl font-bold mb-2">+$592.50</p>
                <div className="flex items-center text-green-500">
                  <TrendingUp size={16} className="mr-1" />
                  <span>+2.3% ($592.50)</span>
                </div>
              </div>
            </motion.div>
            
            {/* Assets List */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 pb-0">
                <h3 className="text-lg font-bold mb-4">Your Assets</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left">Asset</th>
                      <th className="px-6 py-3 text-right">Shares</th>
                      <th className="px-6 py-3 text-right">Price</th>
                      <th className="px-6 py-3 text-right">24h Change</th>
                      <th className="px-6 py-3 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {assets.map((asset) => (
                      <tr key={asset.name} className="transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                              <span className="font-semibold text-xs">{asset.logo.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{asset.fullName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">{asset.shares}</td>
                        <td className="px-6 py-4 text-right">${asset.price.toFixed(2)}</td>
                        <td className={`px-6 py-4 text-right ${asset.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center justify-end">
                            {asset.isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                            {asset.change}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">${asset.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            
            {/* Asset Allocation */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Sector Allocation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Technology</h4>
                  <p className="text-2xl font-bold">47%</p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '47%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Consumer Cyclical</h4>
                  <p className="text-2xl font-bold">23%</p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Communication</h4>
                  <p className="text-2xl font-bold">18%</p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Others</h4>
                  <p className="text-2xl font-bold">12%</p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '12%' }}></div>
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

export default Assets;
