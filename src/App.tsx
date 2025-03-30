import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Sprout, TreePine, Recycle, Award, AlertTriangle, ArrowRight, ArrowDown } from 'lucide-react';
import { RewardCarousel } from './components/RewardCarousel';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [problemRef, problemInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [solutionRef, solutionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F9F3]">
      {/* Hero Section */}
      <motion.header 
        style={{ scale, y }}
        className="relative overflow-hidden min-h-screen flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80"
            alt="Forest background"
            className="w-full h-full object-cover"
            style={{
              scale: useTransform(scrollYProgress, [0, 1], [1.1, 1.3])
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <nav className="absolute w-full top-0 z-10 py-6">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Leaf className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">FoodX</span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-white hover:text-gray-200">Features</a>
              <a href="#impact" className="text-white hover:text-gray-200">Impact</a>
              <a href="#about" className="text-white hover:text-gray-200">About</a>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#2C5530] px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Get Started
            </motion.button>
          </div>
        </nav>

        <div className="container mx-auto px-4 pt-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Go Green, Go FoodX
            </motion.h1>
            <p className="text-xl text-gray-200 mb-8">
              Join the movement to cut food waste by 50% by 2030. Our AI-powered app helps you track freshness, save money, and make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#2C5530] px-8 py-4 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
              >
                Download App <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#2C5530] transition"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ArrowDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.header>

      {/* Solution Section */}
      <motion.section 
        ref={solutionRef}
        initial={{ opacity: 0 }}
        animate={solutionInView ? { opacity: 1 } : {}}
        className="py-20 bg-[#F8F9F3]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#2C5530] mb-16">Our Solution</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,
                title: "AI Food Recognition",
                description: "Smart scanning technology identifies groceries and assesses their freshness in real-time.",
                image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&q=80"
              },
              {
                icon: TreePine,
                title: "Smart Alerts",
                description: "Get timely notifications about expiring food and personalized storage tips.",
                image: "https://images.unsplash.com/photo-1495592822108-9e6261896da8?auto=format&fit=crop&q=80"
              },
              {
                icon: Award,
                title: "Reward System",
                description: "Earn credits for donations and redeem them for eco-friendly rewards.",
                image: "https://images.unsplash.com/photo-1444430098362-23a2b76c60ff?auto=format&fit=crop&q=80"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={solutionInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.2 }}
                className="relative h-[400px] group cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:opacity-0"
                >
                  <feature.icon className="h-12 w-12 text-[#2C5530] mb-6" />
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-[#2C5530]/80 rounded-2xl flex items-center justify-center p-8">
                    <div className="text-white">
                      <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <section className="py-20 bg-[#2C5530] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl font-bold mb-4">1B+</div>
              <p className="text-xl">Meals Saved</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-4">50%</div>
              <p className="text-xl">Waste Reduction Goal</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-5xl font-bold mb-4">9.3B</div>
              <p className="text-xl">Tonnes CO₂e Prevented</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <RewardCarousel />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3B1E] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold">FoodX</span>
            </div>
            <div className="text-sm">
              © 2024 FoodX. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;