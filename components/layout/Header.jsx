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

  return (
    <div className="relative">
      {/* Header */}
      <div
        className={`h-[88px] relative px-4 md:px-6 flex items-center  ${
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
              <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
            </button>
          </div>
          <div className="flex items-center md:gap-x-8 lg:-ml-12">
            <Logo className="" />
          </div>

          {/* Navigation */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-x-3 text-center">
              <li className="px-5 py-3 uppercase">
                <Link
                  href="/"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  Home
                </Link>
              </li>
              <li className="px-5 py-3 uppercase">
                <Link
                  href="/menu"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  Menu
                </Link>
              </li>
              <li className="px-5 py-3 uppercase">
                <Link
                  href="/about"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  About
                </Link>
              </li>
              <li className="px-5 py-3 uppercase">
                <Link
                  href="/bookTable"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  Reserve
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Section - Icons and Button */}
          <div className="flex items-center gap-x-3 md:gap-x-4">
            <Link
              href="/auth/login"
              className="flex items-center cursor-pointer justify-center px-2 py-2 md:px-3 md:py-2 rounded hover:text-primary"
            >
              <FaUser />
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center justify-center px-2 py-2 md:px-3 md:py-2 rounded hover:text-primary"
            >
              <FaShoppingCart className="-mr-1" />
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </Link>

            <button
              onClick={() => setIsOpenSearch(true)}
              className="flex items-center justify-center px-2 py-2 md:px-3 md:py-2 rounded hover:text-primary"
            >
              <FaSearch />
            </button>
            <Link href="/order" className="inline-block">
              <button className="bg-primary btn text-white w-full font-sans px-4 md:px-6 py-1 text-sm md:text-base rounded-full">
                Order/Online
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Burger Menu Modal */}
      {isMenuOpen && (
        <div className="absolute top-[90px] left-0 w-[300px] bg-white shadow-lg z-20 rounded-lg">
          {/* Close Button */}
          <div className="flex justify-end px-4 py-2">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-black text-2xl hover:text-red-500"
            >
              <IoIosCloseCircle />
            </button>
          </div>
          {/* Navigation Links */}
          <ul className="flex flex-col items-start gap-y-4 p-4">
            <li>
              <Link
                href="/"
                className="text-lg hover:text-primary uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="text-lg hover:text-primary uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-lg hover:text-primary uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/bookTable"
                className="text-lg hover:text-primary uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Reserve
              </Link>
            </li>
            <li>
              <Link
                href="/order"
                className="text-lg hover:text-primary uppercase"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <SearchModal setIsOpenSearch={setIsOpenSearch} />
        </div>
      )}
    </div>
  );
};

export default Header;
