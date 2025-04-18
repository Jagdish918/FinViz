
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, ArrowUpRight, ArrowDownRight, DollarSign, Percent, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Generate price history data with random fluctuations
const generatePriceHistory = (days = 30, startPrice = 150, volatility = 0.02) => {
  const data = [];
  let price = startPrice;
  
  for (let i = 0; i < days; i++) {
    // Random price change with specified volatility
    const change = price * (volatility * (Math.random() - 0.5) * 2);
    price = Math.max(price + change, 1); // Ensure price doesn't go below 1
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return data;
};

const stockOptions = [
  { value: "AAPL", label: "Apple Inc." },
  { value: "MSFT", label: "Microsoft Corp." },
  { value: "AMZN", label: "Amazon.com Inc." },
  { value: "GOOGL", label: "Alphabet Inc." },
  { value: "META", label: "Meta Platforms Inc." },
  { value: "TSLA", label: "Tesla Inc." },
  { value: "NVDA", label: "NVIDIA Corp." },
];

const TradeSimulator = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [priceData, setPriceData] = useState(generatePriceHistory());
  const [amount, setAmount] = useState(1000);
  const [shares, setShares] = useState(0);
  const [isBuying, setIsBuying] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leverage, setLeverage] = useState([1]);
  
  const currentPrice = priceData[priceData.length - 1].price;
  const previousPrice = priceData[priceData.length - 2].price;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;
  
  // Calculate max shares based on available amount
  const maxShares = Math.floor(amount / currentPrice);
  
  useEffect(() => {
    // When stock changes, regenerate price data
    setPriceData(generatePriceHistory(30, 50 + Math.random() * 200, 0.02));
  }, [selectedStock]);
  
  const handleStockChange = (value: string) => {
    setSelectedStock(value);
  };
  
  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setAmount(numValue);
    }
  };
  
  const handleSharesChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setShares(numValue);
    }
  };
  
  const handleLeverageChange = (value: number[]) => {
    setLeverage(value);
  };
  
  const handleExecute = () => {
    setIsConfirming(true);
    
    // Simulate server response delay
    setTimeout(() => {
      setIsConfirming(false);
      setIsSuccess(true);
      
      // Reset after success notification
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  // Calculate total cost
  const leverageValue = leverage[0];
  const totalCost = shares * currentPrice * leverageValue;
  const isDisabled = shares <= 0 || (isBuying && totalCost > amount);
  
  // Estimated returns with leverage (simplified)
  const potentialReturn = shares * currentPrice * 0.10 * leverageValue; // Assuming 10% price movement
  const potentialLoss = shares * currentPrice * 0.10 * leverageValue; // Assuming 10% price movement
  
  // Animation variants
  const chartVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.03,
      }
    }
  };
  
  const pointVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Render price chart
  const renderPriceChart = () => {
    const minPrice = Math.min(...priceData.map(d => d.price));
    const maxPrice = Math.max(...priceData.map(d => d.price));
    const range = maxPrice - minPrice;
    
    // Calculate normalized height for each point (0 to 100%)
    const normalizeHeight = (price: number) => {
      return ((price - minPrice) / range) * 100;
    };
    
    return (
      <motion.div 
        className="h-40 flex items-end space-x-1"
        variants={chartVariants}
        initial="hidden"
        animate="visible"
      >
        {priceData.map((data, index) => {
          const height = normalizeHeight(data.price);
          const isCurrentDay = index === priceData.length - 1;
          
          return (
            <motion.div 
              key={index}
              className="flex-1 flex items-end h-full"
              variants={pointVariants}
            >
              <div 
                className={`w-full transition-colors duration-500 ${
                  isCurrentDay 
                    ? 'bg-blue-500 dark:bg-blue-400' 
                    : priceData[index].price < priceData[index+1]?.price 
                      ? 'bg-green-500/40 dark:bg-green-400/40' 
                      : 'bg-red-500/40 dark:bg-red-400/40'
                }`}
                style={{ height: `${height}%` }}
              >
                {isCurrentDay && (
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 py-0.5 px-2 rounded-md text-xs font-medium">
                      ${currentPrice.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };
  
  return (
    <Card className="finance-card w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle>Trade Simulator</CardTitle>
            <CardDescription>Practice your trading strategy</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-center">
                <h3 className="text-xl font-bold mr-2">{selectedStock}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>
              <div
                className={`flex items-center text-sm ${
                  priceChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {priceChange >= 0 ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span>
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(2)} ({priceChange >= 0 ? "+" : ""}
                  {priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            
            {renderPriceChart()}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Security</Label>
                <Select value={selectedStock} onValueChange={handleStockChange}>
                  <SelectTrigger id="stock">
                    <SelectValue placeholder="Select Stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockOptions.map((stock) => (
                      <SelectItem key={stock.value} value={stock.value}>
                        {stock.value} - {stock.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Available Funds</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
            
            <Tabs 
              defaultValue="buy" 
              className="w-full"
              onValueChange={(value) => setIsBuying(value === "buy")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="shares">Number of Shares</Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Max: {maxShares.toLocaleString()}
                    </span>
                  </div>
                  <Input
                    id="shares"
                    type="number"
                    value={shares}
                    onChange={(e) => handleSharesChange(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Leverage (x{leverageValue})</Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Higher risk, higher potential return
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={leverage}
                    onValueChange={handleLeverageChange}
                    className="py-4"
                  />
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Price per Share:</span>
                    <span>${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Quantity:</span>
                    <span>{shares}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Leverage:</span>
                    <span>x{leverageValue}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1 pt-1"></div>
                  <div className="flex justify-between font-medium">
                    <span>Total Cost:</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Potential Gain (+10%):</span>
                    <span className="text-green-600 dark:text-green-400">+${potentialReturn.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Potential Loss (-10%):</span>
                    <span className="text-red-600 dark:text-red-400">-${potentialLoss.toFixed(2)}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sell" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="shares-sell">Number of Shares</Label>
                  <Input
                    id="shares-sell"
                    type="number"
                    value={shares}
                    onChange={(e) => handleSharesChange(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Leverage (x{leverageValue})</Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Higher risk, higher potential return
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={leverage}
                    onValueChange={handleLeverageChange}
                    className="py-4"
                  />
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Price per Share:</span>
                    <span>${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Quantity:</span>
                    <span>{shares}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Leverage:</span>
                    <span>x{leverageValue}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1 pt-1"></div>
                  <div className="flex justify-between font-medium">
                    <span>Total Value:</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Potential Gain (-10%):</span>
                    <span className="text-green-600 dark:text-green-400">+${potentialReturn.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Potential Loss (+10%):</span>
                    <span className="text-red-600 dark:text-red-400">-${potentialLoss.toFixed(2)}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg py-2 px-4 text-sm"
            >
              Trade executed successfully!
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button 
                onClick={handleExecute} 
                disabled={isDisabled || isConfirming}
                className={`font-medium ${isBuying ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {isConfirming ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : isBuying ? (
                  "Buy"
                ) : (
                  "Sell"
                )}{" "}
                {shares} Share{shares !== 1 ? "s" : ""}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
};

export default TradeSimulator;
