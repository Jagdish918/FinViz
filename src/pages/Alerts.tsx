
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Plus, Trash2, Settings, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Alerts = () => {
  const { toast } = useToast();
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, symbol: "AAPL", price: 175.50, condition: "above", threshold: 180.00, enabled: true },
    { id: 2, symbol: "TSLA", price: 220.30, condition: "below", threshold: 200.00, enabled: true },
    { id: 3, symbol: "MSFT", price: 340.20, condition: "above", threshold: 350.00, enabled: false },
    { id: 4, symbol: "AMZN", price: 135.70, condition: "below", threshold: 130.00, enabled: true },
  ]);

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
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      backgroundColor: "rgba(59, 130, 246, 0.05)",
      transition: {
        duration: 0.2
      }
    }
  };

  const handleToggleAlert = (id: number) => {
    setActiveAlerts(
      activeAlerts.map((alert) =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
    
    const alert = activeAlerts.find(a => a.id === id);
    toast({
      title: alert?.enabled ? "Alert disabled" : "Alert enabled",
      description: `${alert?.symbol} price ${alert?.condition} $${alert?.threshold.toFixed(2)}`,
    });
  };

  const handleDeleteAlert = (id: number) => {
    const alert = activeAlerts.find(a => a.id === id);
    setActiveAlerts(activeAlerts.filter((alert) => alert.id !== id));
    
    toast({
      title: "Alert deleted",
      description: `Removed alert for ${alert?.symbol}`,
      variant: "destructive"
    });
  };

  const addNewAlert = () => {
    toast({
      title: "Create new alert",
      description: "Alert creation dialog would appear here",
    });
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
            <motion.div variants={fadeInUpVariants} className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Price Alerts</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Stay updated on price movements
                </p>
              </div>
              <Button onClick={addNewAlert} className="group">
                <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
                New Alert
              </Button>
            </motion.div>
            
            {/* Alerts Section */}
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center bg-gray-50 dark:bg-gray-700/50">
                <Bell size={20} className="text-blue-500 mr-2" />
                <h3 className="text-lg font-bold">Active Alerts</h3>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {activeAlerts.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">No alerts configured</h3>
                    <p className="text-gray-400 dark:text-gray-500 mt-1">Create your first price alert to get notified</p>
                    <Button variant="outline" className="mt-4" onClick={addNewAlert}>
                      <Plus size={16} className="mr-2" />
                      Add Alert
                    </Button>
                  </div>
                ) : (
                  <ul>
                    {activeAlerts.map((alert, index) => (
                      <motion.li 
                        key={alert.id}
                        className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        variants={listItemVariants}
                        whileHover="hover"
                        custom={index}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center mb-2 sm:mb-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            alert.condition === "above" ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                          }`}>
                            {alert.condition === "above" ? (
                              <ArrowUpRight size={20} className="text-green-500" />
                            ) : (
                              <ArrowDownRight size={20} className="text-red-500" />
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center">
                              <span className="font-bold text-lg">{alert.symbol}</span>
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
                                {alert.condition === "above" ? "Above" : "Below"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Current: ${alert.price.toFixed(2)} | Target: ${alert.threshold.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 self-end sm:self-auto">
                          <Switch 
                            checked={alert.enabled} 
                            onCheckedChange={() => handleToggleAlert(alert.id)}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteAlert(alert.id)}
                            className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
            
            {/* Alert Settings */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Settings size={20} className="text-blue-500 mr-2" />
                <h3 className="text-lg font-bold">Notification Settings</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: "email", label: "Email Notifications", description: "Receive alerts via email", enabled: true },
                  { id: "push", label: "Push Notifications", description: "Receive alerts on your device", enabled: true },
                  { id: "sms", label: "SMS Notifications", description: "Receive alerts via text message", enabled: false },
                  { id: "repeat", label: "Repeat Notifications", description: "Repeat alerts every 30 minutes until acknowledged", enabled: false }
                ].map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                    <div>
                      <h4 className="font-medium">{setting.label}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                    </div>
                    <Switch checked={setting.enabled} />
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

export default Alerts;
