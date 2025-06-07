// components/StatsCard.tsx
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Stat } from "../types";

interface Props {
  stat: Stat;
  index: number;
}

const StatsCard = ({ stat, index }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 rounded-lg border border-gray-800"
  >
    <h3 className="text-gray-400 text-sm mb-2">{stat.title}</h3>
    <div className="flex items-baseline justify-between">
      <p className="text-2xl font-bold">{stat.value}</p>
      <div
        className={`flex items-center text-sm ${
          stat.trend === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        {stat.trend === "up" ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownRight className="w-4 h-4 mr-1" />
        )}
        {stat.change}
      </div>
    </div>
  </motion.div>
);

export default StatsCard;
