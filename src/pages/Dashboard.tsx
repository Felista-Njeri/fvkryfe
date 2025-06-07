import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Info } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

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

interface Activity {
  type: string;
  amount: string;
  vault: string;
  timestamp: string;
  txHash: string;
  status: string;
}

interface UnlockInfo {
  vault: string;
  amount: string;
  unlockDate: string;
  daysLeft: number;
  initialLockDate: string;
  lockPeriod: string;
}

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    lockPeriod: "",
    tokenType: "ETH",
  });

  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);

  // Mock data for all vaults
  const allVaults: Vault[] = [
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

  // Calculate total locked value and other aggregated stats
  const calculateTotalStats = () => {
    const tokenPrices = {
      ETH: 2050,
      USDC: 1,
      DAI: 1,
    };

    const totalValueByToken = allVaults.reduce((acc, vault) => {
      const [amount, token] = vault.amount.split(" ");
      acc[token] = (acc[token] || 0) + parseFloat(amount);
      return acc;
    }, {} as Record<string, number>);

    const totalUSDValue = Object.entries(totalValueByToken).reduce(
      (total, [token, amount]) =>
        total + amount * tokenPrices[token as keyof typeof tokenPrices],
      0
    );

    const activeVaults = allVaults.filter(
      (vault) => vault.status === "locked" || vault.status === "unlocking"
    ).length;

    const averageLockPeriod = Math.round(
      allVaults.reduce((sum, vault) => sum + vault.daysLeft, 0) /
        allVaults.length
    );

    return {
      totalUSDValue,
      activeVaults,
      averageLockPeriod,
      totalValueByToken,
    };
  };

  // Mock data for recent activity
  const recentActivity: Activity[] = [
    {
      type: "Deposit",
      amount: "1.2 ETH",
      vault: "Long-term Savings",
      timestamp: "2 hours ago",
      txHash: "0x1234...5678",
      status: "Confirmed",
    },
    {
      type: "Vault Created",
      amount: "2.5 ETH",
      vault: "Emergency Fund",
      timestamp: "1 day ago",
      txHash: "0x8765...4321",
      status: "Confirmed",
    },
    {
      type: "Lock Period Extended",
      amount: "0.5 ETH",
      vault: "Education Fund",
      timestamp: "3 days ago",
      txHash: "0x9876...1234",
      status: "Confirmed",
    },
  ];

  // Mock data for upcoming unlocks
  const upcomingUnlocks: UnlockInfo[] = [
    {
      vault: "Long-term Savings",
      amount: "2.5 ETH",
      unlockDate: "2024-05-10",
      daysLeft: 30,
      initialLockDate: "2023-05-10",
      lockPeriod: "1 year",
    },
    {
      vault: "Emergency Fund",
      amount: "1.2 ETH",
      unlockDate: "2024-06-15",
      daysLeft: 66,
      initialLockDate: "2023-12-15",
      lockPeriod: "6 months",
    },
  ];

  // Mock data for the selected vault's history or overall portfolio history
  const getVaultHistory = (vault: Vault | null) => {
    if (vault) {
      // Return individual vault history (existing code)
      const baseAmount = parseFloat(vault.amount.split(" ")[0]);
      return Array.from({ length: 20 }, (_, i) => ({
        date: new Date(Date.now() - (20 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        value: (baseAmount * (0.8 + (i * 0.2) / 19)).toFixed(2),
        usdValue: Math.floor(baseAmount * (0.8 + (i * 0.2) / 19) * 2050),
      }));
    } else {
      // Return aggregated history for all vaults
      const totalBaseValue = calculateTotalStats().totalUSDValue;
      return Array.from({ length: 20 }, (_, i) => ({
        date: new Date(Date.now() - (20 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        value: (totalBaseValue * (0.8 + (i * 0.2) / 19)).toFixed(2),
        usdValue: Math.floor(totalBaseValue * (0.8 + (i * 0.2) / 19)),
      }));
    }
  };

  // Stats based on selected vault or overall portfolio
  const getStats = () => {
    if (selectedVault) {
      // Return individual vault stats (existing code)
      return [
        {
          title: "Locked Amount",
          value: selectedVault.amount,
          change: "+5%",
          trend: "up",
        },
        {
          title: "Lock Progress",
          value: `${selectedVault.progress}%`,
          change: `${selectedVault.daysLeft} days left`,
          trend: "up",
        },
        {
          title: "Status",
          value: selectedVault.status,
          change: "On Track",
          trend: "up",
        },
      ];
    }

    // Return aggregated stats for all vaults
    const stats = calculateTotalStats();
    return [
      {
        title: "Total Locked Value",
        value: `$${stats.totalUSDValue.toLocaleString()}`,
        change: "+12.5%",
        trend: "up",
      },
      {
        title: "Active Vaults",
        value: stats.activeVaults.toString(),
        change: "+1",
        trend: "up",
      },
      {
        title: "Average Lock Period",
        value: `${stats.averageLockPeriod} days`,
        change: "+15 days",
        trend: "up",
      },
    ];
  };

  // Selected vault's asset allocation or overall portfolio allocation
  const getAssetAllocation = () => {
    if (selectedVault) {
      // Return individual vault allocation (existing code)
      return [
        {
          name: selectedVault.token,
          value: parseFloat(selectedVault.amount.split(" ")[0]),
          color: "#8B5CF6",
          percentage: "100%",
          usdValue: (
            parseFloat(selectedVault.amount.split(" ")[0]) * 2050
          ).toFixed(0),
        },
      ];
    }

    // Return aggregated allocation for all vaults
    const stats = calculateTotalStats();
    const totalUSDValue = stats.totalUSDValue;

    const tokenColors = {
      ETH: "#8B5CF6",
      USDC: "#3B82F6",
      DAI: "#EF4444",
    };

    return Object.entries(stats.totalValueByToken).map(([token, amount]) => {
      const usdValue = token === "ETH" ? amount * 2050 : amount;
      return {
        name: token,
        value: amount,
        color: tokenColors[token as keyof typeof tokenColors],
        percentage: `${((usdValue / totalUSDValue) * 100).toFixed(1)}%`,
        usdValue: usdValue.toLocaleString(),
      };
    });
  };

  const handleVaultSelect = (vault: Vault | null) => {
    setSelectedVault(vault);
  };

  const stats = getStats();
  const assetAllocationData = getAssetAllocation();
  const assetGrowthData = getVaultHistory(selectedVault);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and contract interaction here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onVaultSelect={handleVaultSelect} />
      <div className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {selectedVault ? selectedVault.name : "Dashboard"}
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                Create New Vault
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>Create New Vault</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new vault to securely lock your assets.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Vault Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Long-term Savings"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenType">Token Type</Label>
                  <Select
                    value={formData.tokenType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, tokenType: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select token type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lockPeriod">Lock Period</Label>
                  <Select
                    value={formData.lockPeriod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, lockPeriod: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select lock period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="12">1 Year</SelectItem>
                      <SelectItem value="24">2 Years</SelectItem>
                      <SelectItem value="36">3 Years</SelectItem>
                      <SelectItem value="60">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Create Vault
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Selected Vault Details */}
        {/* {selectedVault && (
          <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-gray-400 mb-2">Status</h3>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    selectedVault.status === "locked"
                      ? "bg-purple-500/10 text-purple-500"
                      : selectedVault.status === "unlocking"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-green-500/10 text-green-500"
                  }`}
                >
                  {selectedVault.status}
                </span>
              </div>
              <div>
                <h3 className="text-gray-400 mb-2">Lock Progress</h3>
                <div className="space-y-2">
                  <Progress value={selectedVault.progress} className="h-2" />
                  <span className="text-sm text-gray-400">
                    {selectedVault.progress}% Complete
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-gray-400 mb-2">Time Remaining</h3>
                <span className="text-lg font-medium">
                  {selectedVault.daysLeft} days
                </span>
              </div>
            </div>
          </div>
        )} */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
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
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-lg border border-gray-800 bg-gray-900/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {selectedVault ? "Vault Value" : "Portfolio Value"}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {selectedVault
                      ? `$${(
                          parseFloat(selectedVault.amount.split(" ")[0]) * 2050
                        ).toFixed(2)}`
                      : "$14,475"}
                  </span>
                  <span className="flex items-center text-green-500 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors">
                  1D
                </button>
                <button className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors">
                  1W
                </button>
                <button className="px-3 py-1 text-sm rounded-full bg-purple-500 text-white">
                  1M
                </button>
                <button className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors">
                  1Y
                </button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={assetGrowthData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="#6B7280"
                    tick={{ fill: "#9CA3AF" }}
                    axisLine={{ stroke: "#374151" }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fill: "#9CA3AF" }}
                    axisLine={{ stroke: "#374151" }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "0.375rem",
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="usdValue"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Asset Allocation Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-lg border border-gray-800 bg-gray-900/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {selectedVault ? "Vault Allocation" : "Asset Allocation"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {selectedVault
                    ? "Current vault distribution"
                    : "Distribution of locked assets"}
                </p>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Info className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={assetAllocationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {assetAllocationData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "0.375rem",
                      }}
                      labelStyle={{ color: "#9CA3AF" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-4 pt-4">
                {assetAllocationData.map((asset, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: asset.color }}
                      />
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-gray-400">
                          ${asset.usdValue}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">{asset.percentage}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button
              variant="outline"
              className="text-gray-400 border-gray-700 hover:bg-gray-800"
            >
              View All
            </Button>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="text-gray-400 font-medium">
                      Type
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Amount
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Vault
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Time
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Transaction
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity, index) => (
                    <TableRow
                      key={index}
                      className="border-gray-800 hover:bg-gray-800/50"
                    >
                      <TableCell className="font-medium py-4">
                        {activity.type}
                      </TableCell>
                      <TableCell className="py-4">{activity.amount}</TableCell>
                      <TableCell className="py-4">{activity.vault}</TableCell>
                      <TableCell className="py-4">
                        {activity.timestamp}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          {activity.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <a
                          href={`https://etherscan.io/tx/${activity.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-500 hover:text-purple-400"
                        >
                          {activity.txHash}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Upcoming Unlocks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upcoming Unlocks</h2>
            <Button
              variant="outline"
              className="text-gray-400 border-gray-700 hover:bg-gray-800"
            >
              View All
            </Button>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-gray-800/50">
                    <TableHead className="text-gray-400 font-medium">
                      Vault
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Amount
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Initial Lock Date
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Lock Period
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Unlock Date
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Days Left
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingUnlocks.map((unlock, index) => (
                    <TableRow
                      key={index}
                      className="border-gray-800 hover:bg-gray-800/50"
                    >
                      <TableCell className="font-medium py-4">
                        {unlock.vault}
                      </TableCell>
                      <TableCell className="py-4">{unlock.amount}</TableCell>
                      <TableCell className="py-4">
                        {unlock.initialLockDate}
                      </TableCell>
                      <TableCell className="py-4">
                        {unlock.lockPeriod}
                      </TableCell>
                      <TableCell className="py-4">
                        {unlock.unlockDate}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
                          {unlock.daysLeft} days
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
