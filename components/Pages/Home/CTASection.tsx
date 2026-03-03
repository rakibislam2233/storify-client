const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of users who trust Storify for their file management needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/auth/register" 
            className="px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
          >
            Start Your Free Trial
          </a>
          <a 
            href="/dashboard" 
            className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg font-semibold"
          >
            View Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
