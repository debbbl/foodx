import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Coins, ShoppingCart } from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

const rewards: Reward[] = [
  {
    id: 1,
    name: "Happy Tree Friend",
    image: "https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?auto=format&fit=crop&q=80",
    price: 1000,
    description: "A cheerful tree companion that brings joy to your garden"
  },
  {
    id: 2,
    name: "Forest Guardian",
    image: "https://images.unsplash.com/photo-1576502200916-3808e07386a5?auto=format&fit=crop&q=80",
    price: 2000,
    description: "A wise old tree that protects your virtual forest"
  },
  {
    id: 3,
    name: "Star Protector",
    image: "https://images.unsplash.com/photo-1577915509669-e8daeb28b498?auto=format&fit=crop&q=80",
    price: 3000,
    description: "A magical tree that glows under the starlight"
  }
];

export const RewardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPurchaseAnimation, setShowPurchaseAnimation] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % rewards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + rewards.length) % rewards.length);
  };

  const handlePurchase = (rewardId: number) => {
    setShowPurchaseAnimation(true);
    setTimeout(() => {
      setPurchasedItems([...purchasedItems, rewardId]);
      setShowPurchaseAnimation(false);
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 flex items-start">
      {/* Main Content */}
      <div className="flex-1 relative">
        <h2 className="text-4xl font-bold text-[#2C5530] mb-8 text-left">Tree Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-48 object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#2C5530]/80 flex items-center justify-center"
                >
                  <p className="text-white text-center p-4">{reward.description}</p>
                </motion.div>
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2C5530] mb-2">{reward.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg font-semibold">{reward.price}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePurchase(reward.id)}
                    disabled={purchasedItems.includes(reward.id)}
                    className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                      purchasedItems.includes(reward.id)
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-[#2C5530] text-white'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{purchasedItems.includes(reward.id) ? 'Owned' : 'Buy Now'}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Purchase Animation */}
      <AnimatePresence>
        {showPurchaseAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{
                y: [-50, 50],
                opacity: [1, 0],
              }}
              transition={{ duration: 1 }}
              className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg"
            >
              <Coins className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold">Purchase Complete!</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};