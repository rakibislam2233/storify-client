const SubscriptionTiers = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0/mo",
      features: ["1 GB Storage", "2 Folder Levels", "Basic Files", "5MB Max Size"],
      highlighted: false
    },
    {
      name: "Silver",
      price: "$9/mo",
      features: ["10 GB Storage", "5 Folder Levels", "All File Types", "25MB Max Size"],
      highlighted: false
    },
    {
      name: "Gold",
      price: "$19/mo",
      features: ["50 GB Storage", "10 Folder Levels", "All File Types", "100MB Max Size"],
      highlighted: true
    },
    {
      name: "Diamond",
      price: "$39/mo",
      features: ["Unlimited Storage", "Unlimited Levels", "All File Types", "500MB Max Size"],
      highlighted: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Subscription Tiers</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Choose from four carefully designed tiers that scale with your needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow ${
                tier.highlighted ? 'border-2 border-primary' : ''
              }`}
            >
              <h3 className="text-lg font-bold text-primary mb-2">{tier.name}</h3>
              <div className="text-2xl font-bold mb-4">{tier.price}</div>
              <ul className="space-y-2 text-sm text-gray-600">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionTiers;
