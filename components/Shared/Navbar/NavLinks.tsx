import Link from "next/link";

const NavLinks = () => {
  return (
    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
      <Link
        href="/dashboard"
        className="transition-colors font-epilogue hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/pricing"
        className="transition-colors font-epilogue hover:text-primary"
      >
        Pricing
      </Link>
    </div>
  );
};

export default NavLinks;
