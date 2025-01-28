import React from "react";
import Title from "../ui/Title";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-12 pb-4 md:pt-6 md:pb-2 sm:pt-4 sm:pb-1">
        {/* Flexbox: Büyük ekranda yan yana, küçük ekranda alt alta */}
        <div className="flex flex-col lg:flex-row justify-center flex-wrap text-center md:gap-y-4 sm:gap-y-3 gap-y-6 gap-12 md:justify-between">
          {/* Contact Us Section */}
          <div className="flex flex-col items-center">
            <Title className="font-dancing text-center text-3xl md:text-2xl sm:text-xl text-primary mb-4">
              Contact Us
            </Title>
            <div className="flex flex-col items-center lg:items-start gap-2 mt-2">
              <div className="flex items-center gap-2 text-[14px] sm:text-[12px] cursor-pointer hover:text-primary transition-all">
                <FaLocationDot className="text-lg text-primary" />
                <span className="inline-block ml-2">
                  1234 Street, City, Country
                </span>
              </div>
              <div className="flex items-center gap-2 text-[14px] sm:text-[12px] cursor-pointer hover:text-primary transition-all">
                <FaPhoneAlt className="text-lg text-primary" />
                <span className="inline-block ml-2">+01 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] sm:text-[12px] cursor-pointer hover:text-primary transition-all">
                <IoMail className="text-lg text-primary" />
                <span className="inline-block ml-2">info@example.com</span>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="md:flex-1 flex flex-col items-center">
            <Title className="font-dancing text-center text-3xl md:text-2xl sm:text-xl text-primary mb-4">
              About Us
            </Title>
            <p className="mt-2 text-[21px] sm:text-[12px] leading-relaxed text-center">
              Necessary, making this the first true generator on the Internet.
              It uses a dictionary of over 200 Latin words, combined with.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <FaFacebookSquare className="text-xl sm:text-lg cursor-pointer hover:text-primary transition-all" />
              <FaSquareTwitter className="text-xl sm:text-lg cursor-pointer hover:text-primary transition-all" />
              <FaLinkedin className="text-xl sm:text-lg cursor-pointer hover:text-primary transition-all" />
              <FaInstagramSquare className="text-xl sm:text-lg cursor-pointer hover:text-primary transition-all" />
              <FaPinterestSquare className="text-xl sm:text-lg cursor-pointer hover:text-primary transition-all" />
            </div>
          </div>

          {/* Opening Hours Section */}
          <div className="md:flex-1 flex flex-col items-center">
            <Title className="font-dancing text-center text-3xl md:text-2xl sm:text-xl text-primary mb-4">
              Opening Hours
            </Title>
            <div className="flex flex-col items-center lg:items-start gap-2 text-[14px] sm:text-[12px]">
              <span className="mt-2 text-[14px] sm:text-[12px] text-center">
                Monday - Friday: 10:00 AM - 10:00 PM
              </span>
              <span className="mt-2 text-[14px] sm:text-[12px] text-center">
                Saturday - Sunday: 12:00 PM - 11:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-600 pt-5 mb-10">
          <p className="text-center text-[14px] text-gray-400">
            © 2025 All Rights Reserved By Your Company
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
