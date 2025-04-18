
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  PieChart,
  LineChart,
  Wallet,
  Bell,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Briefcase,
  Globe,
  DollarSign,
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  alert?: boolean;
};

const mainNav: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Briefcase, label: "Portfolio", path: "/portfolio" },
  { icon: TrendingUp, label: "Markets", path: "/markets" },
  { icon: BarChart3, label: "Trading", path: "/trading" },
  { icon: Wallet, label: "Assets", path: "/assets" },
];

const secondaryNav: NavItem[] = [
  { icon: Globe, label: "News", path: "/news" },
  { icon: PieChart, label: "Analysis", path: "/analysis" },
  { icon: Bell, label: "Alerts", path: "/alerts", alert: true },
];

const bottomNav: NavItem[] = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative">
      <motion.div
        className={`h-screen overflow-hidden transition-all duration-300 bg-white dark:bg-finance-navy border-r border-gray-200 dark:border-gray-800 flex flex-col ${
          collapsed ? "w-[70px]" : "w-[240px]"
        }`}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="h-16 px-4 flex items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-md flex items-center justify-center shrink-0">
              <span className="text-white font-bold">F</span>
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.h1
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-xl tracking-tight overflow-hidden whitespace-nowrap"
                >
                  FinViz
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="px-2 mt-6 flex-1">
          <div className="mb-6">
            {mainNav.map((item) => (
              <motion.div key={item.label} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 group transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="shrink-0">
                    <item.icon
                      size={20}
                      className={isActive(item.path) ? "text-blue-600 dark:text-blue-400" : ""}
                    />
                  </span>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <div className="px-3 mb-2 text-xs text-gray-500 dark:text-gray-400 uppercase">
              {!collapsed && "Analysis"}
            </div>
            {secondaryNav.map((item) => (
              <motion.div key={item.label} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="shrink-0 relative">
                    <item.icon size={20} />
                    {item.alert && (
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </span>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Bottom navigation */}
        <div className="px-2 mb-6">
          {bottomNav.map((item) => (
            <motion.div key={item.label} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="shrink-0">
                  <item.icon size={20} />
                </span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* User profile */}
        <div className="px-3 mb-4">
          <motion.div
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
              A
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <p className="font-medium text-sm">Alex Morgan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Premium</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 h-6 w-6 bg-white dark:bg-finance-navy border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
};

export default Sidebar;
