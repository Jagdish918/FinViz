
import { useState, useEffect } from "react";
import { Bell, Search, Menu, Settings, User, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-finance-navy/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Menu size={24} />
          </button>
          <div className="hidden md:flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <Link to="/" className="font-bold text-xl tracking-tight">FinViz</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 w-64 transition-all duration-300 focus-within:w-80">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
          <input 
            className="bg-transparent border-none outline-none px-3 py-1 w-full text-sm" 
            placeholder="Search stocks, indices, ETFs..." 
          />
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <motion.button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
          </motion.button>
          
          <motion.button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={20} />
          </motion.button>
          
          <motion.button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={20} />
          </motion.button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button 
                className="flex items-center gap-2 ml-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                  A
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">Alex Morgan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Premium</p>
                </div>
                <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
