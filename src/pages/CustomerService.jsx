import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SupportForm from "@/components/SupportForm";

export default function CustomerService() {
  return (
    <>
      <Helmet>
        <title>Customer Service - BolixPress</title>
        <meta
          name="description"
          content="Get help with your orders, returns, and general inquiries"
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions or contact our support team
              </p>
            </motion.div>

            {/* FAQ Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <FAQ />
              </div>
            </motion.section>

            {/* Contact Form Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Contact Support</h2>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Send us a message and
                  we'll get back to you within 24 hours.
                </p>
                <SupportForm />
              </div>
            </motion.section>

            {/* Live Chat Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border rounded-lg p-6 text-center"
            >
              <MessageCircle className="h-12 w-12 mx-auto text-primary mb-3" />
              <h3 className="font-semibold mb-2">Live Chat Support</h3>
              <p className="text-sm text-muted-foreground">
                Coming soon - Chat with our support team in real-time
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
