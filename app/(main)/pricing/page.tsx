import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storify | Pricing",
  description: "Choose the perfect subscription plan for your file management needs.",
};

const PricingPage = () => {
  return (
    <section className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground">
            Select the perfect subscription tier for your file management needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Free Plan */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">$0<span className="text-sm text-muted-foreground">/month</span></p>
            <ul className="space-y-2 text-sm">
              <li>• 1 GB Storage</li>
              <li>• 2 Folder Levels Deep</li>
              <li>• Basic File Types</li>
              <li>• 5MB Max File Size</li>
              <li>• 10 Files Total</li>
            </ul>
          </div>

          {/* Silver Plan */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Silver</h3>
            <p className="text-3xl font-bold mb-4">$9<span className="text-sm text-muted-foreground">/month</span></p>
            <ul className="space-y-2 text-sm">
              <li>• 10 GB Storage</li>
              <li>• 5 Folder Levels Deep</li>
              <li>• All File Types</li>
              <li>• 25MB Max File Size</li>
              <li>• 100 Files Total</li>
            </ul>
          </div>

          {/* Gold Plan */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow border-primary">
            <h3 className="text-xl font-bold mb-2">Gold</h3>
            <p className="text-3xl font-bold mb-4">$19<span className="text-sm text-muted-foreground">/month</span></p>
            <ul className="space-y-2 text-sm">
              <li>• 50 GB Storage</li>
              <li>• 10 Folder Levels Deep</li>
              <li>• All File Types</li>
              <li>• 100MB Max File Size</li>
              <li>• 500 Files Total</li>
            </ul>
          </div>

          {/* Diamond Plan */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Diamond</h3>
            <p className="text-3xl font-bold mb-4">$39<span className="text-sm text-muted-foreground">/month</span></p>
            <ul className="space-y-2 text-sm">
              <li>• Unlimited Storage</li>
              <li>• Unlimited Folder Levels</li>
              <li>• All File Types</li>
              <li>• 500MB Max File Size</li>
              <li>• Unlimited Files</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
