"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveSubscription,
  getAllPackages,
  purchasePackage,
} from "@/services/subscription.service";
import {
  CreditCard,
  FileCheck,
  HardDrive,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SubscriptionContent = ({
  initialPackages = [],
  initialActiveSubscription = null,
}: {
  initialPackages?: any[];
  initialActiveSubscription?: any;
}) => {
  const [packages, setPackages] = useState<any[]>(initialPackages);
  const [activeSubscription, setActiveSubscription] = useState<any>(
    initialActiveSubscription,
  );
  const [loading, setLoading] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [pkgs, active] = await Promise.all([
        getAllPackages(),
        getActiveSubscription(),
      ]);
      setPackages(pkgs);
      setActiveSubscription(active);
    } catch (error) {
      toast.error("Failed to load subscription data");
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

  // Find active package details from the packages list to get limits
  const activePackageDetails = activeSubscription
    ? packages.find((p) => p.name === activeSubscription.packageName)
    : null;

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

      {loading ? (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
            <div className="space-y-2 w-full max-w-[200px]">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-8 w-full justify-end">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      ) : activeSubscription ? (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-extrabold text-[#25324B]">
                  Current Plan: {activeSubscription.packageName}
                </h2>
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-gray-500 font-medium text-sm">
                Started on:{" "}
                {new Date(activeSubscription.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-right">
            {activePackageDetails && (
              <>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 text-nowrap">
                    File Size Limit
                  </span>
                  <span className="text-lg font-extrabold text-primary">
                    {activePackageDetails.maxFileSize} MB
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 text-nowrap">
                    Total Files
                  </span>
                  <span className="text-lg font-extrabold text-primary">
                    {activePackageDetails.totalFileLimit}
                  </span>
                </div>
              </>
            )}
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 text-nowrap">
                Price Paid
              </span>
              <span className="text-lg font-extrabold text-primary">
                ${activeSubscription.price}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-3xl p-8 space-y-6"
              >
                <div className="space-y-3">
                  <Skeleton className="h-7 w-1/2" />
                  <Skeleton className="h-10 w-1/3" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>
            ))
          : packages.map((pkg) => {
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
                        {pkg.maxFileSize} MB Max File Size
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full flex items-center justify-center shrink-0">
                        <FolderOpen className="w-3 h-3" />
                      </div>
                      <span className="text-gray-600 text-sm font-semibold">
                        {pkg.maxFolders} Max Folders
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full flex items-center justify-center shrink-0">
                        <Layers className="w-3 h-3" />
                      </div>
                      <span className="text-gray-600 text-sm font-semibold">
                        {pkg.maxNestingLevel} Level Deep Folders
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full flex items-center justify-center shrink-0">
                        <FileCheck className="w-3 h-3" />
                      </div>
                      <span className="text-gray-600 text-sm font-semibold">
                        {pkg.totalFileLimit} Total Files
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full flex items-center justify-center shrink-0">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      <span className="text-gray-600 text-sm font-semibold">
                        {pkg.filesPerFolder} Files per Folder
                      </span>
                    </div>
                    {pkg.allowedFileTypes &&
                      pkg.allowedFileTypes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
                          {pkg.allowedFileTypes.map((type: string) => (
                            <span
                              key={type}
                              className="text-[10px] font-bold bg-gray-50 text-gray-500 px-2 py-1 rounded"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      )}
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
