import SubscriptionContent from "@/components/Pages/Dashboard/User/SubscriptionContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription | Storify",
  description: "Manage your subscription plans.",
};

const SubscriptionPage = () => {
  return <SubscriptionContent />;
};

export default SubscriptionPage;
