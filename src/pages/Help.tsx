
import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Search, ChevronDown, MessageCircle, Book, Play, Bookmark, ExternalLink } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // FAQ data
  const faqCategories = [
    {
      category: "Getting Started",
      items: [
        { question: "How do I set up my first portfolio?", answer: "To set up your first portfolio, navigate to the Portfolio page and click the 'Create Portfolio' button. Follow the guided steps to add your assets and track your investments." },
        { question: "How can I track multiple investment portfolios?", answer: "You can create and manage multiple portfolios by using the portfolio selector dropdown in the Portfolio page. Each portfolio can be customized with different assets and tracking preferences." },
        { question: "What markets and assets are supported?", answer: "Our platform supports a wide range of markets including US, European, and Asian exchanges. You can track stocks, ETFs, mutual funds, bonds, cryptocurrencies, and more." },
        { question: "How do I customize my dashboard?", answer: "You can customize your dashboard by using the 'Customize' button in the top right corner of the Dashboard page. From there, you can add, remove, and rearrange widgets to match your preferences." }
      ]
    },
    {
      category: "Charts and Analysis",
      items: [
        { question: "How do I read the candlestick charts?", answer: "Candlestick charts show the open, high, low, and close prices for a specific time period. Green candles indicate price increases (close higher than open), while red candles show price decreases (close lower than open)." },
        { question: "What technical indicators are available?", answer: "We offer over 50 technical indicators including Moving Averages, RSI, MACD, Bollinger Bands, Fibonacci retracements, and many more. You can add these to any chart by clicking the Indicators button." },
        { question: "Can I draw on charts or save my analysis?", answer: "Yes, you can use our drawing tools to add trendlines, Fibonacci retracements, and other annotations to charts. Your analysis can be saved and will persist when you return to the platform." },
        { question: "How often is market data updated?", answer: "For most markets, data is updated with minimal delay during market hours. Premium subscribers receive real-time data across all supported markets." }
      ]
    },
    {
      category: "Account and Billing",
      items: [
        { question: "How do I upgrade to Premium?", answer: "To upgrade to Premium, go to your account settings and select 'Subscription'. From there, you can view available plans and complete your purchase with your preferred payment method." },
        { question: "What are the benefits of Premium?", answer: "Premium members enjoy real-time data, advanced charting features, unlimited portfolios, additional technical indicators, export capabilities, and priority customer support." },
        { question: "How do I update my payment information?", answer: "You can update your payment information in the Settings page under the Billing section. Click 'Manage Payment Methods' to add, remove, or update your payment details." },
        { question: "Can I get a refund if I'm not satisfied?", answer: "Yes, we offer a 14-day money-back guarantee for all new Premium subscriptions. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund." }
      ]
    }
  ];

  const resources = [
    { title: "Video Tutorials", icon: Play, description: "Watch step-by-step guides on how to use platform features", link: "#tutorials" },
    { title: "Documentation", icon: Book, description: "Comprehensive guides and reference materials", link: "#docs" },
    { title: "Webinars", icon: MessageCircle, description: "Live and recorded sessions with market experts", link: "#webinars" },
    { title: "Knowledge Base", icon: Bookmark, description: "Articles and tips from our team and community", link: "#knowledge" },
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
              <h1 className="text-2xl font-bold mb-1">Help & Support</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Get help with using the FinViz dashboard
              </p>
            </motion.div>
            
            {/* Search Section */}
            <motion.div 
              variants={fadeInUpVariants}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">How can we help you today?</h2>
              <p className="text-blue-100 mb-6 text-center">Search our help articles or browse the categories below</p>
              
              <div className="max-w-2xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pl-10 bg-white dark:bg-gray-800 border-0 shadow-lg rounded-lg text-gray-800 dark:text-gray-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Button className="absolute right-1.5 top-1.5">
                  Search
                </Button>
              </div>
            </motion.div>
            
            {/* Help Resources */}
            <motion.div variants={fadeInUpVariants}>
              <h2 className="text-xl font-bold mb-4">Resources & Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {resources.map((resource, index) => (
                  <motion.a
                    key={resource.title}
                    href={resource.link}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <resource.icon size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {resource.description}
                    </p>
                    <ExternalLink size={16} className="mt-3 text-blue-500" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* FAQs Section */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <HelpCircle size={20} className="mr-2 text-blue-500" />
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqCategories.map((category, categoryIndex) => (
                  <div key={category.category} className={categoryIndex > 0 ? "mt-6" : ""}>
                    <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={`${categoryIndex}-${itemIndex}`} value={`${categoryIndex}-${itemIndex}`}>
                        <AccordionTrigger className="hover:text-blue-500 text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                ))}
              </Accordion>
            </motion.div>
            
            {/* Contact Support */}
            <motion.div variants={fadeInUpVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
              <h3 className="text-lg font-bold mb-2">Still need help?</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Our support team is ready to assist you with any questions</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="outline" className="w-full sm:w-auto">
                  <MessageCircle size={16} className="mr-2" />
                  Live Chat
                </Button>
                <Button className="w-full sm:w-auto">
                  Contact Support
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Help;
