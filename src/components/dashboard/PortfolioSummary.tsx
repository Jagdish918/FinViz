
import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PortfolioSummaryProps = {
  totalValue?: number;
  dailyChange?: number;
  totalGain?: number;
};

const PortfolioSummary = ({
  totalValue = 123456.78,
  dailyChange = 2345.67,
  totalGain = 23456.78,
}: PortfolioSummaryProps) => {
  const [showValue, setShowValue] = useState(true);

  const toggleValueVisibility = () => {
    setShowValue(!showValue);
  };

  const dailyChangePercentage = (dailyChange / (totalValue - dailyChange)) * 100;
  const totalGainPercentage = (totalGain / (totalValue - totalGain)) * 100;
  
  const isDailyPositive = dailyChange >= 0;
  const isTotalPositive = totalGain >= 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  // Animated placeholder values
  const placeholderValue = "$ • • • • •";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {/* Total Portfolio Value */}
      <motion.div variants={itemVariants} className="md:col-span-2">
        <Card className="finance-card h-full overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <CardDescription>All assets</CardDescription>
              </div>
            </div>
            <button 
              onClick={toggleValueVisibility}
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showValue ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              )}
            </button>
          </CardHeader>
          <CardContent>
            <motion.div
              className="text-3xl font-bold"
              key={showValue ? "value" : "hidden"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {showValue ? formatCurrency(totalValue) : placeholderValue}
            </motion.div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 w-full mt-4 rounded-full">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Cash</span>
              <span>Investments</span>
              <span>Crypto</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Change */}
      <motion.div variants={itemVariants}>
        <Card className="finance-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${isDailyPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                {isDailyPositive ? (
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <CardTitle className="text-sm font-medium">Daily Change</CardTitle>
                <CardDescription>Last 24h</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              className={`text-2xl font-bold ${isDailyPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              key={showValue ? "value" : "hidden"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {showValue ? formatCurrency(dailyChange) : placeholderValue}
            </motion.div>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${isDailyPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isDailyPositive ? "+" : ""}{formatPercentage(dailyChangePercentage)}
              </span>
            </div>
            <div className="mt-4 h-[40px]">
              <div className="flex items-end h-full justify-around">
                {Array.from({ length: 12 }).map((_, i) => {
                  // Generate random heights for the bar chart
                  const height = 10 + Math.random() * 30;
                  return (
                    <motion.div
                      key={i}
                      className={`w-[4px] rounded-full ${i % 3 === 0 ? 'bg-blue-500' : 'bg-blue-300/50'}`}
                      style={{ height: `${height}px` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}px` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Gain */}
      <motion.div variants={itemVariants}>
        <Card className="finance-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${isTotalPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                <BarChart3 className={`h-5 w-5 ${isTotalPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">Total Gain</CardTitle>
                <CardDescription>All time</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              className={`text-2xl font-bold ${isTotalPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              key={showValue ? "value" : "hidden"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {showValue ? formatCurrency(totalGain) : placeholderValue}
            </motion.div>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${isTotalPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isTotalPositive ? "+" : ""}{formatPercentage(totalGainPercentage)}
              </span>
            </div>
            <div className="mt-4 h-[40px]">
              <motion.div 
                className="w-full h-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              >
                <PieChart className="h-8 w-8 text-blue-500" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioSummary;
