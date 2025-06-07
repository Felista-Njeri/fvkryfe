import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Vault {
  id: number;
  name: string;
  category: string;
  amount: string;
  token: string;
  progress: number;
  status: "locked" | "unlocking" | "completed";
  daysLeft: number;
}

interface SidebarProps {
  onVaultSelect: (vault: Vault | null) => void;
}

const Sidebar = ({ onVaultSelect }: SidebarProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedVaultId, setSelectedVaultId] = useState<number | null>(null);

  // Mock data - replace with actual data from your contract
  const vaults: Vault[] = [
    {
      id: 1,
      name: "Long-term Savings",
      category: "Savings",
      amount: "2.5 ETH",
      token: "ETH",
      progress: 65,
      status: "locked",
      daysLeft: 127,
    },
    {
      id: 2,
      name: "Trading Control",
      category: "Trading",
      amount: "5000 USDC",
      token: "USDC",
      progress: 30,
      status: "locked",
      daysLeft: 45,
    },
    {
      id: 3,
      name: "Emergency Fund",
      category: "Savings",
      amount: "1.2 ETH",
      token: "ETH",
      progress: 90,
      status: "unlocking",
      daysLeft: 15,
    },
    {
      id: 4,
      name: "Education Fund",
      category: "Goals",
      amount: "10000 DAI",
      token: "DAI",
      progress: 100,
      status: "completed",
      daysLeft: 0,
    },
  ];

  const statuses = ["locked", "unlocking", "completed"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "locked":
        return "text-purple-500 bg-purple-500/10";
      case "unlocking":
        return "text-blue-500 bg-blue-500/10";
      case "completed":
        return "text-green-500 bg-green-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const filteredVaults = vaults.filter((vault) => {
    return selectedStatus === "all" || vault.status === selectedStatus;
  });

  const handleVaultClick = (vault: Vault) => {
    setSelectedVaultId(vault.id);
    onVaultSelect(vault);
  };

  const handleOverviewClick = () => {
    setSelectedVaultId(null);
    onVaultSelect(null);
  };

  return (
    <div className="sticky top-0 w-80 h-screen border-r border-gray-800 bg-gray-900/50 p-4 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Your Vaults</h2>
        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
          <Plus className="w-4 h-4 mr-1" /> New Vault
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-400"
            >
              <Filter className="w-4 h-4 mr-1" />
              Status
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
              All Statuses
            </DropdownMenuItem>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setSelectedStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Vault List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-3 rounded-lg border ${
            selectedVaultId === null
              ? "border-purple-500"
              : "border-gray-800 hover:border-purple-500/50"
          } cursor-pointer transition-all bg-gradient-to-r from-purple-500/10 to-pink-500/10`}
          onClick={handleOverviewClick}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Overview</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
              All Vaults
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {vaults.length} Active Vaults
          </div>
        </motion.div>

        {/* Individual Vault Cards */}
        {filteredVaults.map((vault) => (
          <motion.div
            key={vault.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-3 rounded-lg border ${
              selectedVaultId === vault.id
                ? "border-purple-500"
                : "border-gray-800 hover:border-purple-500/50"
            } cursor-pointer transition-all`}
            onClick={() => handleVaultClick(vault)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{vault.name}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  vault.status
                )}`}
              >
                {vault.status}
              </span>
            </div>
            <div className="text-sm text-gray-400">{vault.amount}</div>
          </motion.div>
        ))}
      </div>

      {/* Settings */}
      <div className="pt-4 mt-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Settings className="w-4 h-4 mr-2" />
          Vault Settings
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
