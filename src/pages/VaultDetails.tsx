import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Lock,
  Clock,
  Calendar,
  Plus,
  ArrowLeft,
  TrendingUp,
  Wallet,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VaultDetails {
  id: number;
  name: string;
  amount: string;
  token: string;
  lockPeriod: string;
  startDate: string;
  unlockDate: string;
  status: "locked" | "unlocking" | "completed";
  progress: number;
  daysLeft: number;
  category: string;
  description?: string;
}

const VaultDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vault, setVault] = useState<VaultDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAmount, setNewAmount] = useState("");

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    const fetchVaultDetails = async () => {
      setIsLoading(true);
      // Mock data - replace with actual API call
      const mockVault: VaultDetails = {
        id: Number(id),
        name: "Long-term Savings",
        amount: "2.5 ETH",
        token: "ETH",
        lockPeriod: "1 year",
        startDate: "2024-01-10",
        unlockDate: "2025-01-10",
        status: "locked",
        progress: 65,
        daysLeft: 127,
        category: "Savings",
        description: "A long-term savings vault for future investments",
      };

      setTimeout(() => {
        setVault(mockVault);
        setIsLoading(false);
      }, 500);
    };

    fetchVaultDetails();
  }, [id]);

  const handleAddAssets = () => {
    // Handle adding assets to vault
    console.log("Adding assets:", newAmount);
    setShowAddModal(false);
    setNewAmount("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Vault Not Found</h3>
        <p className="text-gray-400 mb-4">
          The vault you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/vaults")}>
          Back to Vaults <ArrowLeft className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/vaults")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vaults
        </Button>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Assets
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Assets to {vault.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="pr-20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {vault.token}
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-purple-500 hover:bg-purple-600"
                onClick={handleAddAssets}
              >
                Add to Vault
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vault Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Main Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{vault.name}</h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vault.status === "locked"
                    ? "bg-purple-500/10 text-purple-500"
                    : vault.status === "unlocking"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-green-500/10 text-green-500"
                }`}
              >
                {vault.status}
              </span>
            </div>
            {vault.description && (
              <p className="text-gray-400 mb-6">{vault.description}</p>
            )}
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <Wallet className="w-4 h-4 mr-2" />
                <span>Current Amount: {vault.amount}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Start Date: {vault.startDate}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>Unlock Date: {vault.unlockDate}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Lock className="w-4 h-4 mr-2" />
                <span>Lock Period: {vault.lockPeriod}</span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <h2 className="text-lg font-semibold mb-4">Lock Progress</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-purple-500">{vault.progress}%</span>
              </div>
              <Progress value={vault.progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Time Remaining</span>
                <span className="text-purple-500">{vault.daysLeft} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-6">
          {/* Value Growth */}
          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <h2 className="text-lg font-semibold mb-4">Value Growth</h2>
            <div className="h-48 flex items-center justify-center text-gray-400">
              <TrendingUp className="w-8 h-8 mr-2" />
              <span>Chart will be displayed here</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Mock activity items - replace with actual data */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Initial Deposit</span>
                <span className="text-purple-500">+{vault.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Vault Created</span>
                <span className="text-gray-400">{vault.startDate}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VaultDetails;
