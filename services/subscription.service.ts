"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActiveSubscription,
  Package,
} from "@/interface/subscription.interface";
import { getCookie } from "@/utils/tokenHandlers";
import { api } from "./api";

export async function getAllPackages(): Promise<Package[]> {
  try {
    const res = await api.get("/packages");
    if (!res.success) {
      throw new Error(res.message || "Failed to fetch packages");
    }
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch packages:", error.message);
    throw error;
  }
}

export async function purchasePackage(packageId: string) {
  const accessToken = await getCookie("accessToken");
  if (!accessToken) {
    throw new Error("User not authenticated");
  }

  try {
    const res = await api.post("/subscription-history/purchase", { packageId });
    if (!res.success) {
      throw new Error(res.message || "Failed to purchase package");
    }
    return res.data;
  } catch (error: any) {
    console.error("Failed to purchase package:", error.message);
    throw error;
  }
}

export async function getMySubscriptionHistories(): Promise<
  ActiveSubscription[]
> {
  const accessToken = await getCookie("accessToken");
  if (!accessToken) {
    throw new Error("User not authenticated");
  }

  try {
    const res = await api.get("/subscription-history/user");
    if (!res.success) {
      throw new Error(res.message || "Failed to fetch subscription histories");
    }
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch subscription histories:", error.message);
    throw error;
  }
}

export async function getActiveSubscription(): Promise<ActiveSubscription | null> {
  const accessToken = await getCookie("accessToken");
  if (!accessToken) {
    return null;
  }

  try {
    const res = await api.get("/subscription-history/active");
    if (!res.success) {
      return null;
    }
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch active subscription:", error.message);
    return null;
  }
}

export async function checkActiveSubscription() {
  const accessToken = await getCookie("accessToken");
  if (!accessToken) {
    return false;
  }

  try {
    const res = await api.get("/subscription-history/check-active");
    if (!res.success) {
      return false;
    }
    return res.data; // Should be a boolean or similar from backend
  } catch (error: any) {
    console.error("Failed to check active subscription:", error.message);
    return false;
  }
}
