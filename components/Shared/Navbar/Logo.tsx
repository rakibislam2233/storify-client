import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 font-epilogue group"
    >
      {/* SVG Logo Icon */}
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          {/* Cloud Shape */}
          <path
            d="M8 20C5.79 20 4 18.21 4 16C4 13.79 5.79 12 8 12C8.06 12 8.12 12 8.18 12.01C8.06 11.35 8 10.68 8 10C8 6.69 10.69 4 14 4C16.96 4 19.44 6.16 19.92 9C19.95 9 19.97 9 20 9C23.31 9 26 11.69 26 15C26 18.31 23.31 21 20 21H8C5.79 21 4 19.21 4 17C4 14.79 5.79 13 8 13"
            stroke="#8E00CC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Folder Icon inside cloud */}
          <path
            d="M10 14V18C10 18.55 10.45 19 11 19H21C21.55 19 22 18.55 22 18V14C22 13.45 21.55 13 21 13H16L14 11H11C10.45 11 10 11.45 10 12V14Z"
            fill="#8E00CC"
            stroke="#8E00CC"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Small dots for storage */}
          <circle cx="13" cy="16" r="1" fill="white" />
          <circle cx="16" cy="16" r="1" fill="white" />
          <circle cx="19" cy="16" r="1" fill="white" />
        </svg>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10 scale-150"></div>
      </div>
      
      {/* Brand Name */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-extrabold text-[#25324B] transition-colors duration-300 group-hover:text-primary">
          Storify
        </h1>
        <span className="text-xs text-gray-500 font-medium tracking-wider">
          FILE MANAGEMENT
        </span>
      </div>
    </Link>
  );
};

export default Logo;
