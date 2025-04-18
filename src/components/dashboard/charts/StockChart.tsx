
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for the stock chart
const generateStockData = (days = 30, volatility = 1, trend = 1) => {
  const startPrice = 150 + Math.random() * 50;
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    return date.toISOString().split('T')[0];
  });

  let price = startPrice;
  const data = dates.map((date) => {
    // Create random price movements with a trend bias
    const change = (Math.random() - 0.5) * volatility * 5 + trend * 0.5;
    price = Math.max(price + change, 10); // Ensure price doesn't go below 10
    
    return {
      x: date,
      y: [
        parseFloat((price - Math.random() * 3).toFixed(2)), // Open
        parseFloat((price + Math.random() * 5).toFixed(2)), // High
        parseFloat((price - Math.random() * 5).toFixed(2)), // Low
        parseFloat(price.toFixed(2)), // Close
      ],
    };
  });

  return data;
};

type StockChartProps = {
  symbol?: string;
  name?: string;
  description?: string;
  isPositive?: boolean;
};

const StockChart = ({
  symbol = "AAPL",
  name = "Apple Inc.",
  description = "NASDAQ: AAPL",
  isPositive = true,
}: StockChartProps) => {
  const [timeframe, setTimeframe] = useState("1M");
  const [data, setData] = useState(generateStockData(30, 2, isPositive ? 1 : -1));
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data loading when timeframe changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const days = 
        timeframe === "1D" ? 1 : 
        timeframe === "1W" ? 7 : 
        timeframe === "1M" ? 30 : 
        timeframe === "3M" ? 90 : 
        timeframe === "1Y" ? 365 : 30;
      
      setData(generateStockData(days, 2, isPositive ? 1 : -1));
      setIsLoading(false);
    };
    
    loadData();
  }, [timeframe, isPositive]);

  // Calculate price change
  const currentPrice = data[data.length - 1]?.y[3] || 0;
  const previousPrice = data[0]?.y[0] || 0;
  const priceDifference = currentPrice - previousPrice;
  const percentageChange = ((priceDifference / previousPrice) * 100).toFixed(2);
  
  // Render a candlestick-like chart without ApexCharts
  const renderCandlestickChart = () => {
    return (
      <div className="w-full h-[300px] relative flex items-end overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl font-semibold text-gray-400">
            Interactive Chart
          </div>
        </div>
        {data.map((point, index) => {
          const open = point.y[0];
          const close = point.y[3];
          const isUp = close >= open;
          
          // Calculate relative height and position based on the entire dataset
          const allValues = data.flatMap(d => d.y);
          const min = Math.min(...allValues);
          const max = Math.max(...allValues);
          const range = max - min;
          
          const candleHeight = Math.abs(open - close) / range * 200;
          const wickHeight = (point.y[1] - point.y[2]) / range * 200;
          const bottomPosition = (Math.min(open, close) - min) / range * 200;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center justify-end mx-1"
              style={{ height: '100%', width: `${100 / data.length}%`, maxWidth: '20px' }}
            >
              <div 
                className={`w-[3px] ${isUp ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ height: `${wickHeight}px`, marginBottom: `${bottomPosition}px` }}
              />
              <div 
                className={`w-full ${isUp ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ height: `${Math.max(candleHeight, 2)}px`, marginBottom: `${bottomPosition}px` }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full overflow-hidden finance-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </motion.div>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1D">1D</SelectItem>
            <SelectItem value="1W">1W</SelectItem>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="3M">3M</SelectItem>
            <SelectItem value="1Y">1Y</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-baseline mb-6 mt-2">
          <motion.h3 
            className="text-3xl font-bold mr-2" 
            key={currentPrice}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            ${currentPrice.toFixed(2)}
          </motion.h3>
          <motion.div 
            className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {isPositive ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            <span>{isPositive ? '+' : ''}{percentageChange}%</span>
          </motion.div>
        </div>
        
        <div className="h-[300px] w-full">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              {renderCandlestickChart()}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
