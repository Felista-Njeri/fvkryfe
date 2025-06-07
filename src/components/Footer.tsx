import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Footer () {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle newsletter subscription
      console.log("Subscribe email:", email);
      setEmail("");
    };

    return (
        <>
        {/* Footer */}
      <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              FVKRY PRVNTA
            </h3>
            <p className="text-gray-400">
              Secure your crypto future with time-locked vaults.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-500 transition-colors"
                aria-label="Twitter"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-500 transition-colors"
                aria-label="Discord"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-500 transition-colors"
                aria-label="Github"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/vaults" className="text-gray-400 hover:text-white">
                  Vaults
                </Link>
              </li>
              <li>
                <Link
                  to="/create-vault"
                  className="text-gray-400 hover:text-white"
                >
                  Create Vault
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Smart Contracts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Subscribe to Newsletter</h4>
            <p className="text-sm text-gray-400">
              Stay updated with our latest features and releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  required
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} FVKRY PRVNTA. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
    );
};