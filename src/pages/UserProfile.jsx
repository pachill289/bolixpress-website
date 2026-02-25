import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { User, Mail, Calendar, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserProfile() {
  const { currentUser } = useAuth();

  return (
    <>
      <Helmet>
        <title>My Profile - BolixPress</title>
        <meta
          name="description"
          content="Manage your ShopHub account settings and personal information"
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="bg-card border rounded-lg p-6 space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || "User"}
                    className="h-20 w-20 rounded-full"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">
                    {currentUser?.displayName || "User"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date().getFullYear()}
                  </p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{currentUser?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Member Since
                    </p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Default Address
                    </p>
                    <p className="font-medium">Not set</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}
