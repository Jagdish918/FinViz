
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, RefreshCw, TrendingUp, TrendingDown, Plus, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for stocks
const watchlistData = [
  { 
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 154.23,
    change: 3.42,
    changePercent: 2.27,
    color: "#4CAF50",
    high: 156.78,
    low: 152.45,
    volume: "12.4M"
  },
  { 
    id: 2,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 318.52,
    change: 5.76,
    changePercent: 1.84,
    color: "#4CAF50",
    high: 321.12,
    low: 315.98,
    volume: "8.7M"
  },
  { 
    id: 3,
    symbol: "GOOG",
    name: "Alphabet Inc.",
    price: 125.68,
    change: -2.13,
    changePercent: -1.67,
    color: "#EF4444",
    high: 128.56,
    low: 124.59,
    volume: "5.2M"
  },
  { 
    id: 4,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 129.12,
    change: 1.23,
    changePercent: 0.96,
    color: "#4CAF50",
    high: 130.45,
    low: 127.89,
    volume: "9.1M"
  },
  { 
    id: 5,
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 243.98,
    change: -6.23,
    changePercent: -2.49,
    color: "#EF4444",
    high: 251.32,
    low: 240.15,
    volume: "15.8M"
  },
  { 
    id: 6,
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 304.85,
    change: 8.73,
    changePercent: 2.95,
    color: "#4CAF50",
    high: 307.12,
    low: 298.56,
    volume: "10.3M"
  }
];

// Crypto data
const cryptoData = [
  { 
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: 45678.34,
    change: 1245.67,
    changePercent: 2.81,
    color: "#4CAF50",
    high: 46789.12,
    low: 44567.89,
    volume: "$34.2B"
  },
  { 
    id: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: 2456.78,
    change: -45.67,
    changePercent: -1.82,
    color: "#EF4444",
    high: 2498.76,
    low: 2412.34,
    volume: "$18.5B"
  },
  { 
    id: 3,
    symbol: "SOL",
    name: "Solana",
    price: 89.45,
    change: 3.21,
    changePercent: 3.72,
    color: "#4CAF50",
    high: 90.12,
    low: 84.67,
    volume: "$5.7B"
  },
  { 
    id: 4,
    symbol: "ADA",
    name: "Cardano",
    price: 0.58,
    change: 0.02,
    changePercent: 3.57,
    color: "#4CAF50",
    high: 0.59,
    low: 0.56,
    volume: "$1.2B"
  }
];

const WatchList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("stocks");
  const [favorites, setFavorites] = useState<number[]>([1, 4]); // IDs of favorite stocks
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Card className="finance-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Watchlist</CardTitle>
          <CardDescription>Track your securities</CardDescription>
        </div>
        <div className="flex gap-2">
          <motion.button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={handleRefresh}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw
              size={18}
              className={`${isRefreshing ? "animate-spin" : ""}`}
            />
          </motion.button>
          <motion.button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} />
          </motion.button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stocks" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stocks">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {watchlistData.map((stock) => (
                <WatchlistItem
                  key={stock.id}
                  item={stock}
                  isFavorite={favorites.includes(stock.id)}
                  onToggleFavorite={() => toggleFavorite(stock.id)}
                />
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="crypto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {cryptoData.map((crypto) => (
                <WatchlistItem
                  key={crypto.id}
                  item={crypto}
                  isFavorite={favorites.includes(crypto.id)}
                  onToggleFavorite={() => toggleFavorite(crypto.id)}
                  isCrypto
                />
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {activeTab === "favorites" && (
                <>
                  {watchlistData
                    .filter(item => favorites.includes(item.id))
                    .map((stock) => (
                      <WatchlistItem
                        key={stock.id}
                        item={stock}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(stock.id)}
                      />
                    ))}
                  {cryptoData
                    .filter(item => favorites.includes(item.id))
                    .map((crypto) => (
                      <WatchlistItem
                        key={crypto.id}
                        item={crypto}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(crypto.id)}
                        isCrypto
                      />
                    ))}
                </>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

type WatchlistItemProps = {
  item: {
    id: number;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    color: string;
    high: number;
    low: number;
    volume: string;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isCrypto?: boolean;
};

const WatchlistItem = ({ item, isFavorite, onToggleFavorite, isCrypto = false }: WatchlistItemProps) => {
  const isPositive = item.change >= 0;
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: isCrypto && value < 1 ? 4 : 2,
      maximumFractionDigits: isCrypto && value < 1 ? 4 : 2,
    }).format(value);
  };
  
  return (
    <motion.div
      variants={itemVariants}
      className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-amber-400 transition-colors"
          >
            <Star size={16} className={isFavorite ? "fill-amber-400 text-amber-400" : ""} />
          </motion.button>
          
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-sm">{item.symbol}</span>
              {isCrypto && (
                <span className="ml-1.5 text-xs py-0.5 px-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  Crypto
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{item.name}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-medium">{formatCurrency(item.price)}</div>
          <div className={`text-xs flex items-center justify-end ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositive ? (
              <TrendingUp size={12} className="mr-1" />
            ) : (
              <TrendingDown size={12} className="mr-1" />
            )}
            <span>
              {isPositive ? '+' : ''}{item.change.toFixed(2)} ({isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <MoreHorizontal size={16} />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Add to Portfolio</DropdownMenuItem>
              <DropdownMenuItem>Set Alert</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">Remove from Watchlist</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WatchList;
