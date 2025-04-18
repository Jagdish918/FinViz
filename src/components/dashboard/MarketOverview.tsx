
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Loader2,
  Globe,
} from "lucide-react";
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

type MarketIndex = {
  id: string;
  name: string;
  value: number;
  change: number;
  percentChange: number;
  region: "us" | "europe" | "asia";
};

type MarketSector = {
  id: string;
  name: string;
  change: number;
  percentChange: number;
};

// Mock market indices data
const marketIndices: MarketIndex[] = [
  {
    id: "spx",
    name: "S&P 500",
    value: 4892.38,
    change: 15.23,
    percentChange: 0.31,
    region: "us",
  },
  {
    id: "dji",
    name: "Dow Jones",
    value: 38797.50,
    change: 126.54,
    percentChange: 0.33,
    region: "us",
  },
  {
    id: "ixic",
    name: "NASDAQ",
    value: 15455.67,
    change: -32.27,
    percentChange: -0.21,
    region: "us",
  },
  {
    id: "rut",
    name: "Russell 2000",
    value: 2032.47,
    change: 8.72,
    percentChange: 0.43,
    region: "us",
  },
  {
    id: "ftse",
    name: "FTSE 100",
    value: 7650.30,
    change: -15.35,
    percentChange: -0.20,
    region: "europe",
  },
  {
    id: "gdaxi",
    name: "DAX",
    value: 17046.69,
    change: 38.32,
    percentChange: 0.23,
    region: "europe",
  },
  {
    id: "n225",
    name: "Nikkei 225",
    value: 38487.62,
    change: 523.50,
    percentChange: 1.38,
    region: "asia",
  },
  {
    id: "hsi",
    name: "Hang Seng",
    value: 17529.04,
    change: -85.63,
    percentChange: -0.49,
    region: "asia",
  },
];

// Mock market sectors data
const marketSectors: MarketSector[] = [
  {
    id: "tech",
    name: "Technology",
    change: 1.27,
    percentChange: 2.35,
  },
  {
    id: "health",
    name: "Healthcare",
    change: 0.58,
    percentChange: 1.12,
  },
  {
    id: "finance",
    name: "Financials",
    change: -0.42,
    percentChange: -0.87,
  },
  {
    id: "consumer",
    name: "Consumer Discretionary",
    change: 0.83,
    percentChange: 1.63,
  },
  {
    id: "energy",
    name: "Energy",
    change: -0.92,
    percentChange: -1.78,
  },
  {
    id: "materials",
    name: "Materials",
    change: 0.37,
    percentChange: 0.72,
  },
  {
    id: "utilities",
    name: "Utilities",
    change: -0.24,
    percentChange: -0.45,
  },
  {
    id: "realestate",
    name: "Real Estate",
    change: 0.65,
    percentChange: 1.24,
  },
];

const MarketOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [displayedIndices, setDisplayedIndices] = useState<MarketIndex[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter indices based on active tab
    if (activeTab === "all") {
      setDisplayedIndices(marketIndices);
    } else {
      setDisplayedIndices(
        marketIndices.filter((index) => index.region === activeTab)
      );
    }
  }, [activeTab]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (value: number) => ({
      width: `${Math.min(Math.abs(value) * 10, 100)}%`,
      transition: { duration: 0.8 },
    }),
  };

  return (
    <Card className="finance-card w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Global indices and sectors</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="pb-4 px-4">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="us">US</TabsTrigger>
              <TabsTrigger value="europe">Europe</TabsTrigger>
              <TabsTrigger value="asia">Asia</TabsTrigger>
              <TabsTrigger value="sectors">Sectors</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
        ) : (
          <div>
            {activeTab !== "sectors" ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-800"
              >
                {displayedIndices.map((index) => (
                  <motion.div
                    key={index.id}
                    variants={itemVariants}
                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{index.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {index.value.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <div
                        className={`flex flex-col items-end ${
                          index.change >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        <div className="flex items-center">
                          {index.change >= 0 ? (
                            <TrendingUp size={16} className="mr-1" />
                          ) : (
                            <TrendingDown size={16} className="mr-1" />
                          )}
                          <span>
                            {index.change >= 0 ? "+" : ""}
                            {index.change.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm">
                          {index.change >= 0 ? "+" : ""}
                          {index.percentChange.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-4 space-y-4"
              >
                {marketSectors.map((sector) => (
                  <motion.div
                    key={sector.id}
                    variants={itemVariants}
                    className="space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{sector.name}</div>
                      <div
                        className={`text-sm font-medium ${
                          sector.percentChange >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {sector.percentChange >= 0 ? "+" : ""}
                        {sector.percentChange.toFixed(2)}%
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        custom={sector.percentChange}
                        variants={barVariants}
                        className={`h-2 rounded-full ${
                          sector.percentChange >= 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
