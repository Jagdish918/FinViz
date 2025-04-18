
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Globe, PaintBucket, Monitor, Moon, Sun, Laptop } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [autoTheme, setAutoTheme] = useState(false);

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

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === "system") {
      setAutoTheme(true);
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
    } else {
      setAutoTheme(false);
      setTheme(newTheme as "light" | "dark");
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
              <h1 className="text-2xl font-bold mb-1">Settings</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Customize your dashboard experience
              </p>
            </motion.div>
            
            {/* Settings Tabs */}
            <motion.div variants={fadeInUpVariants}>
              <Tabs defaultValue="appearance" className="w-full">
                <TabsList className="grid grid-cols-4 lg:w-[400px] mb-6">
                  <TabsTrigger value="appearance" className="flex items-center gap-2">
                    <PaintBucket size={16} />
                    <span className="hidden sm:inline">Appearance</span>
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex items-center gap-2">
                    <User size={16} />
                    <span className="hidden sm:inline">Account</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell size={16} />
                    <span className="hidden sm:inline">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="flex items-center gap-2">
                    <Shield size={16} />
                    <span className="hidden sm:inline">Privacy</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="appearance" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center">
                      <PaintBucket size={20} className="mr-2 text-blue-500" />
                      Theme Settings
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Theme Mode</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div 
                            className={`p-4 rounded-lg border flex flex-col items-center cursor-pointer transition-all ${
                              !autoTheme && theme === "light" 
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-gray-600"
                            }`}
                            onClick={() => handleThemeChange("light")}
                          >
                            <Sun size={24} className="mb-2 text-amber-500" />
                            <span className="text-sm font-medium">Light</span>
                          </div>
                          <div 
                            className={`p-4 rounded-lg border flex flex-col items-center cursor-pointer transition-all ${
                              !autoTheme && theme === "dark" 
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-gray-600"
                            }`}
                            onClick={() => handleThemeChange("dark")}
                          >
                            <Moon size={24} className="mb-2 text-indigo-500" />
                            <span className="text-sm font-medium">Dark</span>
                          </div>
                          <div 
                            className={`p-4 rounded-lg border flex flex-col items-center cursor-pointer transition-all ${
                              autoTheme 
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-gray-600"
                            }`}
                            onClick={() => handleThemeChange("system")}
                          >
                            <Laptop size={24} className="mb-2 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium">System</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <h4 className="text-sm font-medium mb-4">Animation Settings</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="motion-animations" className="font-medium">Motion Animations</Label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Enable smooth transitions and animations</p>
                            </div>
                            <Switch id="motion-animations" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="chart-animations" className="font-medium">Chart Animations</Label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Animate chart data visualization</p>
                            </div>
                            <Switch id="chart-animations" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="reduced-motion" className="font-medium">Reduced Motion</Label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Prefer reduced motion when available</p>
                            </div>
                            <Switch id="reduced-motion" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <h4 className="text-sm font-medium mb-4">Language & Region</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="language" className="text-sm font-medium block mb-2">Language</Label>
                            <select 
                              id="language" 
                              className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md"
                              defaultValue="en-US"
                            >
                              <option value="en-US">English (US)</option>
                              <option value="en-GB">English (UK)</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                              <option value="ja">Japanese</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="currency" className="text-sm font-medium block mb-2">Currency</Label>
                            <select 
                              id="currency" 
                              className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md"
                              defaultValue="USD"
                            >
                              <option value="USD">US Dollar ($)</option>
                              <option value="EUR">Euro (€)</option>
                              <option value="GBP">British Pound (£)</option>
                              <option value="JPY">Japanese Yen (¥)</option>
                              <option value="CNY">Chinese Yuan (¥)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="account" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center">
                      <User size={20} className="mr-2 text-blue-500" />
                      Account Settings
                    </h3>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-medium">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold">Alex Morgan</h4>
                        <p className="text-gray-500 dark:text-gray-400">alex.morgan@example.com</p>
                        <p className="text-sm mt-1">
                          <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                            Premium Plan
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName" className="text-sm font-medium block mb-2">Full Name</Label>
                          <input 
                            id="fullName" 
                            className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md"
                            defaultValue="Alex Morgan"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium block mb-2">Email Address</Label>
                          <input 
                            id="email" 
                            type="email"
                            className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md"
                            defaultValue="alex.morgan@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <h4 className="text-sm font-medium mb-4">Session Management</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="active-sessions" className="font-medium">Active Sessions</Label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">2 devices are currently logged in</p>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                            </div>
                            <Switch id="two-factor" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex justify-end">
                        <Button variant="destructive" className="mr-auto">Delete Account</Button>
                        <Button variant="outline" className="mr-2">Cancel</Button>
                        <Button onClick={saveSettings}>Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center">
                      <Bell size={20} className="mr-2 text-blue-500" />
                      Notification Preferences
                    </h3>
                    
                    <div className="space-y-6">
                      {[
                        { 
                          category: "Market Alerts", 
                          items: [
                            { id: "price-alerts", label: "Price Alerts", description: "When stocks hit target prices" },
                            { id: "market-news", label: "Market News", description: "Breaking news about markets" },
                            { id: "earnings", label: "Earnings Announcements", description: "Company earnings reports" }
                          ] 
                        },
                        { 
                          category: "Account Notifications", 
                          items: [
                            { id: "portfolio-updates", label: "Portfolio Updates", description: "Daily summary of your portfolio" },
                            { id: "security", label: "Security Alerts", description: "Important account security notifications" },
                            { id: "product-updates", label: "Product Updates", description: "New features and improvements" }
                          ] 
                        }
                      ].map((group) => (
                        <div key={group.category} className={group.category !== "Market Alerts" ? "border-t border-gray-100 dark:border-gray-700 pt-6" : ""}>
                          <h4 className="text-sm font-medium mb-4">{group.category}</h4>
                          <div className="space-y-4">
                            {group.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between">
                                <div>
                                  <Label htmlFor={item.id} className="font-medium">{item.label}</Label>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                                <Switch id={item.id} defaultChecked />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <h4 className="text-sm font-medium mb-4">Notification Channels</h4>
                        <div className="space-y-4">
                          {[
                            { id: "email-notif", label: "Email", description: "Receive notifications via email" },
                            { id: "push-notif", label: "Push Notifications", description: "Receive notifications on your device" },
                            { id: "sms-notif", label: "SMS", description: "Receive text message alerts" }
                          ].map((channel) => (
                            <div key={channel.id} className="flex items-center justify-between">
                              <div>
                                <Label htmlFor={channel.id} className="font-medium">{channel.label}</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{channel.description}</p>
                              </div>
                              <Switch id={channel.id} defaultChecked={channel.id !== "sms-notif"} />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex justify-end">
                        <Button variant="outline" className="mr-2">Reset to Default</Button>
                        <Button onClick={saveSettings}>Save Preferences</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center">
                      <Shield size={20} className="mr-2 text-blue-500" />
                      Privacy & Security
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-4">Data Privacy</h4>
                        <div className="space-y-4">
                          {[
                            { id: "data-collection", label: "Data Collection", description: "Allow collection of usage data to improve services" },
                            { id: "personalization", label: "Personalization", description: "Personalize your experience based on your activity" },
                            { id: "third-party", label: "Third-party Data Sharing", description: "Share data with trusted partners" }
                          ].map((setting) => (
                            <div key={setting.id} className="flex items-center justify-between">
                              <div>
                                <Label htmlFor={setting.id} className="font-medium">{setting.label}</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                              </div>
                              <Switch id={setting.id} defaultChecked={setting.id !== "third-party"} />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <h4 className="text-sm font-medium mb-4">Security Settings</h4>
                        <RadioGroup defaultValue="60days" className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30days" id="30days" />
                            <Label htmlFor="30days">Automatically log out after 30 days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="60days" id="60days" />
                            <Label htmlFor="60days">Automatically log out after 60 days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="90days" id="90days" />
                            <Label htmlFor="90days">Automatically log out after 90 days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="never" id="never" />
                            <Label htmlFor="never">Never automatically log out</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <h4 className="text-sm font-medium mb-2">Export Your Data</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Download a copy of your personal data</p>
                        <Button variant="outline">Request Data Export</Button>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex justify-end">
                        <Button variant="outline" className="mr-2">Cancel</Button>
                        <Button onClick={saveSettings}>Save Settings</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
