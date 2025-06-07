import { BrowserRouter, Routes, Route } from "react-router";
import { motion } from "framer-motion";
//import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Vaults from "@/pages/Vaults";
import CreateVault from "@/pages/CreateVault";
import Dashboard from "@/pages/Dashboard";
import VaultDetails from "@/pages/VaultDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vaults" element={<Vaults />} />
            <Route path="/create-vault" element={<CreateVault />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vaults/:id" element={<VaultDetails />} />
          </Routes>
        </motion.main>
        <Footer />
        {/* <Toaster /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
