import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Clock, ArrowRight, Search } from "lucide-react";

const Vaults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock data - replace with actual data from your contract
  const vaults = [
    {
      id: 1,
      name: "Long-term Savings",
      amount: "2.5 ETH",
      lockPeriod: "1 year",
      unlockDate: "2025-04-10",
      status: "locked",
    },
    {
      id: 2,
      name: "Emergency Fund",
      amount: "1.2 ETH",
      lockPeriod: "6 months",
      unlockDate: "2024-10-10",
      status: "locked",
    },
    // Add more mock vaults as needed
  ];

  const handleViewDetails = (vaultId: number) => {
    navigate(`/vaults/${vaultId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Your Vaults</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search vaults..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaults.map((vault, index) => (
          <motion.div
            key={vault.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{vault.name}</h3>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
                {vault.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <Lock className="w-4 h-4 mr-2" />
                <span>{vault.amount}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>Unlocks on {vault.unlockDate}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <Button
                variant="outline"
                className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                onClick={() => handleViewDetails(vault.id)}
              >
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {vaults.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-xl font-semibold mb-2">No Vaults Found</h3>
          <p className="text-gray-400 mb-4">
            You haven't created any vaults yet. Start by creating your first
            vault.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <a href="/create-vault">Create Vault</a>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Vaults;
