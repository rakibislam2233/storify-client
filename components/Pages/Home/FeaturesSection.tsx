const FeaturesSection = () => {
  const features = [
    {
      icon: "⚙️",
      title: "Admin Control Panel",
      description: "Define and manage tiered subscription packages with dynamic business rules"
    },
    {
      icon: "💾",
      title: "Smart Storage Limits",
      description: "Enforce package-level restrictions on storage, file counts, and folder depth"
    },
    {
      icon: "📁",
      title: "File Type Management",
      description: "Control which file types users can upload based on their subscription tier"
    },
    {
      icon: "📊",
      title: "Real-time Monitoring",
      description: "Track usage patterns and enforce limits on every user request"
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Robust backend with reliable rule enforcement and secure file handling"
    },
    {
      icon: "🚀",
      title: "Scalable Architecture",
      description: "Built for growth with dynamic configuration and performance optimization"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Platform Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
