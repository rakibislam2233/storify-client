import SubscriptionContent from "@/components/Pages/Dashboard/User/SubscriptionContent";
import {
  getActiveSubscription,
  getAllPackages,
} from "@/services/subscription.service";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Subscription | Storify",
  description: "Manage your subscription plans.",
};
export default async function SubscriptionPage() {
  const [packages, activeSubscription] = await Promise.all([
    getAllPackages().catch(() => []),
    getActiveSubscription().catch(() => null),
  ]);

  return (
    <SubscriptionContent
      initialPackages={packages}
      initialActiveSubscription={activeSubscription}
    />
  );
}
