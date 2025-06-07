import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const CreateVault = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    lockPeriod: "",
    tokenType: "ETH",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and contract interaction here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          to="/vaults"
          className="inline-flex items-center text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vaults
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Create New Vault</h1>
        <p className="text-gray-400 mb-8">
          Create a new vault to securely lock your crypto assets for a specified
          period.
        </p>

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

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Create Vault
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateVault;
