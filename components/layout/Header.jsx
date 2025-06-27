import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import SearchModal from "../ui/SearchModal";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Active link kontrolü için helper function
  const isActiveLink = (path) => {
    if (path === "/auth/login") {
      // Login sayfası için çeşitli auth path'lerini kontrol et
      return (
        router.asPath.includes("/auth") ||
        router.asPath.includes("/login") ||
        router.asPath.includes("/profile")
      );
    }
    return router.asPath === path;
  };

  // Navigation link'i için ortak class'lar
  const getLinkClasses = (path) => {
    const baseClasses =
      "hover:underline text-[14px] md:text-[16px] uppercase transition-all duration-300";
    const activeClasses = "text-primary underline font-semibold";
    const inactiveClasses = "hover:text-primary";

    return `${baseClasses} ${
      isActiveLink(path) ? activeClasses : inactiveClasses
    }`;
  };

  // Mobile navigation link'i için ortak class'lar
  const getMobileLinkClasses = (path) => {
    const baseClasses = "text-lg uppercase transition-all duration-300";
    const activeClasses =
      "text-primary font-bold border-l-4 border-primary pl-2";
    const inactiveClasses = "hover:text-primary hover:pl-2";

    return `${baseClasses} ${
      isActiveLink(path) ? activeClasses : inactiveClasses
    }`;
  };

  // Icon button'ları için ortak class'lar
  const getIconButtonClasses = (path, isSpecialActive = false) => {
    const baseClasses =
      "relative flex items-center cursor-pointer justify-center px-2 py-2 md:px-3 md:py-2 rounded-lg transition-all duration-300";
    const activeClasses =
      "text-primary bg-primary bg-opacity-20 transform scale-110 shadow-lg";
    const inactiveClasses =
      "hover:text-primary hover:transform hover:scale-105 hover:bg-white hover:bg-opacity-10";

    const isActive = isSpecialActive || isActiveLink(path);
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="relative">
      {/* Header */}
      <div
        className={`h-[88px] relative px-4 md:px-6 flex items-center ${
          router.asPath === "/" ? "bg-transparent" : "bg-secondary"
        } transition-all z-40`}
      >
        <div className="container mx-auto text-white flex justify-between items-center h-full">
          {/* Left Section - Burger Icon and Logo */}
          <div className="flex items-center gap-x-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden inline-block -ml-12"
            >
              <GiHamburgerMenu className="text-xl hover:text-primary transition-all duration-300" />
            </button>
          </div>
          <div className="flex items-center md:gap-x-8 lg:-ml-12">
            <Logo className="" />
          </div>

          {/* Navigation */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-x-3 text-center">
              <li className="px-5 py-3 uppercase">
                <Link href="/" className={getLinkClasses("/")}>
                  Home
                </Link>
              </li>
              <li className="px-5 py-3 uppercase">
                <Link href="/menu" className={getLinkClasses("/menu")}>
                  Menu
                </Link>
              </li>
              <li className="px-5 py-3 uppercase">
                <Link href="/about" className={getLinkClasses("/about")}>
                  About
                </Link>
              </li>
              <li className="px-5 py-3 uppercase">
                <Link
                  href="/bookTable"
                  className={getLinkClasses("/bookTable")}
                >
                  Reserve
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Section - Icons and Button */}
          <div className="flex items-center gap-x-3 md:gap-x-4">
            {/* User Icon */}
            <Link
              href="/auth/login"
              className={getIconButtonClasses("/auth/login")}
            >
              <FaUser
                className={`transition-all duration-300 ${
                  isActiveLink("/auth/login") ? "text-primary" : ""
                }`}
              />
              {/* User Active Indicator */}
              {isActiveLink("/auth/login") && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              )}
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className={getIconButtonClasses("/cart")}>
              <FaShoppingCart
                className={`-mr-1 transition-all duration-300 ${
                  isActiveLink("/cart") ? "text-primary" : ""
                }`}
              />
              <span
                className={`w-5 h-5 text-xs grid place-content-center rounded-full absolute -top-2 -right-2 font-bold transition-all duration-300 ${
                  cart.products && cart.products.length > 0
                    ? "bg-primary text-black animate-bounce"
                    : "bg-gray-500 text-white"
                }`}
              >
                {cart.products ? cart.products.length : 0}
              </span>
              {/* Cart Active Indicator */}
              {isActiveLink("/cart") && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </Link>

            {/* Search Button */}
            <button
              onClick={() => setIsOpenSearch(true)}
              className={getIconButtonClasses("", isOpenSearch)}
            >
              <FaSearch
                className={`transition-all duration-300 ${
                  isOpenSearch ? "text-primary rotate-90" : ""
                }`}
              />
              {/* Search Active Indicator */}
              {isOpenSearch && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-ping"></div>
              )}
            </button>

            {/* Order Button */}
            <Link href="/order" className="inline-block">
              <button
                className={`font-sans px-4 md:px-6 py-2 text-sm md:text-base rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isActiveLink("/order")
                    ? "bg-white text-primary border-2 border-primary font-bold shadow-lg animate-pulse"
                    : "bg-primary text-white hover:bg-opacity-90 hover:shadow-md"
                }`}
              >
                Order/Online
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Burger Menu Modal */}
      {isMenuOpen && (
        <div className="absolute top-[90px] left-0 w-[300px] bg-white shadow-lg z-20 rounded-lg border border-gray-200">
          {/* Close Button */}
          <div className="flex justify-end px-4 py-2">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-black text-2xl hover:text-red-500 transition-all duration-300 hover:rotate-90"
            >
              <IoIosCloseCircle />
            </button>
          </div>
          {/* Navigation Links */}
          <ul className="flex flex-col items-start gap-y-2 p-4">
            <li className="w-full">
              <Link
                href="/"
                className={`block w-full py-2 ${getMobileLinkClasses("/")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/menu"
                className={`block w-full py-2 ${getMobileLinkClasses("/menu")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/about"
                className={`block w-full py-2 ${getMobileLinkClasses(
                  "/about"
                )}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/bookTable"
                className={`block w-full py-2 ${getMobileLinkClasses(
                  "/bookTable"
                )}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Reserve
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/order"
                className={`block w-full py-2 ${getMobileLinkClasses(
                  "/order"
                )}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Order
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Search Modal */}
      {isOpenSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <SearchModal setIsOpenSearch={setIsOpenSearch} />
        </div>
      )}
    </div>
  );
};

export default Header;
