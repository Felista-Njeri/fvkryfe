import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Lock,
  Clock,
  ArrowRight,
  Shield,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);


  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Locking",
      description:
        "Lock your ETH and ERC-20 tokens in secure vaults with customizable time periods.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Duration",
      description:
        "Choose lock periods ranging from days to years, with options to extend.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Asset Management",
      description:
        "Transfer assets between vaults and manage multiple sub-vaults efficiently.",
    },
  ];

  const faqs = [
    {
      question: "What is FVKRY PRVNTA?",
      answer:
        "FVKRY PRVNTA is a blockchain-based platform that allows users to lock their ETH and ERC-20 tokens in secure vaults for predetermined periods, helping them maintain financial discipline and avoid impulsive trading.",
    },
    {
      question: "How long can I lock my assets?",
      answer:
        "You can lock your assets for various durations ranging from days to years (up to 5 years). You also have the flexibility to extend the lock period after expiration.",
    },
    {
      question: "Can I withdraw my assets before the lock period ends?",
      answer:
        "No, to maintain the integrity of the locking mechanism and help users stick to their financial goals, assets cannot be withdrawn before the predetermined lock period ends.",
    },
    {
      question: "What tokens can I lock?",
      answer:
        "You can lock ETH and any ERC-20 tokens that aren't blacklisted. The platform supports most major tokens on the Ethereum network.",
    },
    {
      question: "Are my assets safe?",
      answer:
        "Yes, your assets are secured by smart contracts on the Ethereum blockchain. The contracts have been audited and implement industry-standard security practices.",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Secure Your Crypto Future
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            FVKRY PRVNTA helps you maintain financial discipline by securely
            locking your crypto assets for predefined periods.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Link to="/create-vault">Create Vault</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-500"
            >
              <Link to="/vaults">Explore Vaults</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-center text-3xl mb-16 font-bold">Why Choose <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent" >FVKRY PRVNTA</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors"
            >
              <div className="text-purple-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Find answers to common questions about FVKRY PRVNTA
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                >
                  <span className="font-medium">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <Minus className="w-4 h-4 text-purple-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-purple-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="p-4 pt-0 text-gray-400">{faq.answer}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of users who are taking control of their crypto
            assets with FVKRY PRVNTA.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Link to="/create-vault">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
