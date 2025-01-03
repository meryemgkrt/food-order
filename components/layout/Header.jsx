import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import SearchModal from "../ui/SearchModal";
import { useRouter } from "next/router";

const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className={`h-[88px] relative px-4 md:px-6 flex items-center  ${router.asPath === '/' ? 'bg-transparent' : 'bg-dark'} transition-all z-40`}>
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
                <a
                  href="#"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  Home
                </a>
              </li>
              <li className="px-5 py-3 uppercase">
                <a
                  href="#"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  Menu
                </a>
              </li>
              <li className="px-5 py-3 uppercase">
                <a
                  href="#"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  About
                </a>
              </li>
              <li className="px-5 py-3 uppercase">
                <a
                  href="#"
                  className="hover:underline hover:text-primary text-[14px] md:text-[16px] uppercase"
                >
                  Book Table
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Section - Icons and Button */}
          <div className="flex items-center gap-x-3 md:gap-x-4">
            <a
              href="#"
              className="flex items-center justify-center px-2 py-2 md:px-3 md:py-2 rounded hover:text-primary"
            >
              <FaUser />
            </a>
            <a
              href="#"
              className="flex items-center justify-center px-2 py-2 md:px-3 md:py-2 rounded hover:text-primary"
            >
              <FaShoppingCart />
            </a>
            <button
              onClick={() => setIsOpenSearch(true)}
              className="flex items-center justify-center px-2 py-2 md:px-3 md:py-2 rounded hover:text-primary"
            >
              <FaSearch />
            </button>
            <a href="#" className="inline-block">
              <button className="bg-primary btn text-white w-full font-sans px-4 md:px-6 py-1 text-sm md:text-base rounded-full">
                Order Online
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Burger Menu Modal */}
      {isMenuOpen && (
        <>
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
                <a href="#" className="text-lg hover:text-primary uppercase">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-primary uppercase">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-primary uppercase">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-primary uppercase">
                  Book Table
                </a>
              </li>
              <li>
                <button className="text-lg hover:text-primary uppercase">
                  Order 
                </button>
              </li>
            </ul>
          </div>
        </>
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
