
import { Calculator } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex flex-col items-center gap-2 sm:gap-3">
          <Calculator className="text-purple-500 animate-scale-in mx-auto" size={28} aria-hidden="true" />
          <span>Finance Calculator</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Plan your budget, track expenses, and achieve your financial goals
        </p>
      </div>
    </header>
  );
};

export default Header;
