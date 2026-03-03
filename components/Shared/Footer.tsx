import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "./Navbar/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#202430] text-white pt-16 pb-8 font-epilogue">
      <div className="container px-5 md:px-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo & Info */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6 pr-4">
            <Logo />
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mt-2">
              Professional file management system with smart subscription tiers.
              Secure, scalable, and enterprise-ready.
            </p>
          </div>

          {/* Links: Product */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 font-epilogue text-white">
              Product
            </h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm md:text-base">
              <li>
                <Link
                  href="/features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="hover:text-white transition-colors"
                >
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 font-epilogue text-white">
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm md:text-base">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Support */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 font-epilogue text-white">
              Support
            </h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm md:text-base">
              <li>
                <Link
                  href="/help"
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="hover:text-white transition-colors"
                >
                  System Status
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="hover:text-white transition-colors"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-6 font-epilogue text-white">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-sm leading-relaxed">
              Get the latest features, updates, and file management tips sent to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 border-none rounded-none h-12 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-offset-transparent flex-1"
              />
              <Button className="bg-primary cursor-pointer text-white rounded-none h-12 px-8 font-semibold w-full sm:w-auto">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-800 mb-8 mt-12"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 text-sm font-medium">
          <p>{new Date().getFullYear()} © Storify. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-white"
            >
              <Facebook className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-white"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-white"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-white"
            >
              <Twitter className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
