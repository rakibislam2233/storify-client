"use client";

import {
  getActiveSubscription,
  getAllPackages,
  purchasePackage,
} from "@/services/subscription.service";
import {
  Check,
  CreditCard,
  FileCheck,
  HardDrive,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SubscriptionContent = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pkgs, active] = await Promise.all([
        getAllPackages(),
        getActiveSubscription(),
      ]);
      setPackages(pkgs);
      setActiveSubscription(active);
    } catch (error) {
      toast.error("Failed to load subscription data");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (packageId: string) => {
    setPurchasingId(packageId);
    try {
      const res = await purchasePackage(packageId);
      if (res.success) {
        toast.success("Package purchased successfully!");
        fetchData();
      } else {
        toast.error(res.message || "Purchase failed");
      }
    } catch (error) {
      toast.error("An error occurred during purchase");
    } finally {
      setPurchasingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 font-epilogue">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
        <p className="font-medium">Loading subscription plans...</p>
      </div>
    );
  }

  return (
    <div className="p-6 font-epilogue">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold text-[#25324B]">
          Subscription Plans
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Choose a plan that fits your storage needs.
        </p>
      </div>

      {activeSubscription && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-extrabold text-[#25324B]">
                  Current Plan: {activeSubscription.package.name}
                </h2>
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-gray-500 font-medium text-sm">
                Next billing date:{" "}
                {new Date(activeSubscription.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-right">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                Storage Limit
              </span>
              <span className="text-lg font-extrabold text-primary">
                {(
                  activeSubscription.package.totalStorageLimit /
                  (1024 * 1024 * 1024)
                ).toFixed(0)}{" "}
                GB
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                File Limit
              </span>
              <span className="text-lg font-extrabold text-primary">
                {activeSubscription.package.totalFileLimit} Files
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => {
          const isActive = activeSubscription?.packageId === pkg.id;
          return (
            <div
              key={pkg.id}
              className={`relative bg-white border ${isActive ? "border-primary ring-1 ring-primary/20 shadow-xl" : "border-gray-100 hover:border-gray-200"} rounded-3xl p-8 transition-all flex flex-col h-full`}
            >
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-extrabold px-4 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                  Current Selection
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-extrabold text-[#25324B] mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-primary">
                    ${pkg.price}
                  </span>
                  <span className="text-gray-400 font-bold text-sm">
                    /month
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full flex items-center justify-center shrink-0">
                    <HardDrive className="w-3 h-3" />
                  </div>
                  <span className="text-gray-600 text-sm font-semibold">
                    {(pkg.totalStorageLimit / (1024 * 1024 * 1024)).toFixed(0)}{" "}
                    GB Storage
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full flex items-center justify-center shrink-0">
                    <FileCheck className="w-3 h-3" />
                  </div>
                  <span className="text-gray-600 text-sm font-semibold">
                    {pkg.totalFileLimit} total files
                  </span>
                </div>
                {pkg.features?.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-600 text-sm font-semibold">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePurchase(pkg.id)}
                disabled={isActive || purchasingId !== null}
                className={`w-full py-4 rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                }`}
              >
                {purchasingId === pkg.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>{isActive ? "Owned" : "Get Started"}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionContent;
