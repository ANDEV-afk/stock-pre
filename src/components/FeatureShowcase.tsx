import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Zap,
  Play,
  Sparkles,
  TrendingUp,
  Video,
  Palette,
  Monitor,
  Smartphone,
  Globe,
} from "lucide-react";

const FeatureShowcase = () => {
  const { theme } = useTheme();
  const newFeatures = [
    {
      icon: TrendingUp,
      title: "Live Stock Ticker",
      description:
        "Real-time scrolling stock prices with animated updates and market data",
      status: "New",
      color: "cyber-green",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description:
        "Expert-led finance education with interactive video library",
      status: "New",
      color: "cyber-blue",
    },
    {
      icon: Sparkles,
      title: "Enhanced Animations",
      description:
        "Stunning visual effects and smooth transitions throughout the app",
      status: "Enhanced",
      color: "cyber-purple",
    },
    {
      icon: Palette,
      title: "Dynamic Backgrounds",
      description:
        "Interactive particle systems and animated background overlays",
      status: "New",
      color: "cyber-yellow",
    },
    {
      icon: Monitor,
      title: "Responsive Design",
      description:
        "Optimized layouts that adapt beautifully to any screen size",
      status: "Enhanced",
      color: "cyber-blue",
    },
    {
      icon: Globe,
      title: "Global Animation System",
      description: "Consistent and performant animations across all pages",
      status: "New",
      color: "cyber-green",
    },
  ];

  return (
    <section
      className={`py-16 relative ${theme === "light" ? "bg-white" : ""}`}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          className="inline-block mb-4"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Badge
            className={
              theme === "dark"
                ? "bg-gradient-to-r from-cyber-green to-cyber-blue text-white px-4 py-2 text-lg"
                : "bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 text-lg"
            }
          >
            <Zap className="h-4 w-4 mr-2" />
            Latest Updates
          </Badge>
        </motion.div>

        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === "dark"
              ? "bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent"
              : "bg-gradient-to-r from-blue-600 via-gray-900 to-purple-600 bg-clip-text text-transparent"
          }`}
        >
          Enhanced Trading Experience
        </h2>
        <p
          className={`text-xl max-w-2xl mx-auto ${
            theme === "dark" ? "text-cyber-blue/80" : "text-slate-600"
          }`}
        >
          Discover our latest features designed to provide you with the most
          immersive and intuitive trading platform
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {newFeatures.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card
                className={`p-6 backdrop-blur-md transition-all duration-300 h-full relative overflow-hidden ${
                  theme === "dark"
                    ? "bg-white/5 border border-cyber-blue/20 hover:border-cyber-blue/40 group-hover:shadow-xl group-hover:shadow-cyber-blue/25"
                    : "bg-white/70 border border-gray-200/50 hover:border-gray-300/60 shadow-lg hover:shadow-xl group-hover:shadow-blue-500/25"
                }`}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, var(--${feature.color}) 0%, transparent 70%)`,
                  }}
                />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`
                      ${
                        feature.status === "New"
                          ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30"
                          : "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30"
                      }
                    `}
                  >
                    {feature.status}
                  </Badge>
                </div>

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-br from-${feature.color} to-${feature.color}-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-${feature.color}/25 transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-7 w-7 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white group-hover:text-cyber-blue"
                        : "text-gray-900 group-hover:text-blue-600"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`leading-relaxed ${
                      theme === "dark" ? "text-white/80" : "text-slate-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div
          className={`inline-flex items-center space-x-2 mb-4 ${
            theme === "dark" ? "text-cyber-blue/80" : "text-blue-600"
          }`}
        >
          <Smartphone className="h-5 w-5" />
          <span>Experience these features across all devices</span>
        </div>

        <motion.p
          className={`text-lg ${
            theme === "dark" ? "text-white/70" : "text-slate-600"
          }`}
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Optimized for desktop, tablet, and mobile
        </motion.p>
      </motion.div>
    </section>
  );
};

export default FeatureShowcase;
