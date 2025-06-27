import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../ui/Title";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutubeSquare,
  FaPinterestSquare,
  FaSnapchatSquare,
  FaTiktok,
  FaWhatsappSquare,
  FaTelegramPlane,
  FaRedditSquare,
  FaDiscord,
  FaHome,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import {
  FaSquareTwitter,
  FaSquareInstagram,
  FaSquareFacebook,
  FaSquareYoutube,
  FaSquareSnapchat,
  FaSquareGithub,
  FaSquareWhatsapp,
} from "react-icons/fa6";

// Global flag to prevent multiple footer instances
let footerMounted = false;

const Footer = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if footer is already mounted
    if (footerMounted) {
      console.log("Footer already mounted, preventing duplicate");
      return;
    }

    // Mark footer as mounted
    footerMounted = true;
    setShouldRender(true);

    // Fetch footer data from API
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        if (response.data && response.data[0]) {
          setFooterData(response.data[0]);
        } else {
          // Fallback data if API fails
          setFooterData({
            location: "1234 Street, City, Country",
            phoneNumber: "123456789",
            email: "info@example.com",
            desc: "Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with.",
            socialMedia: [
              { _id: 1, icon: "fab fa-facebook-f", link: "#" },
              { _id: 2, icon: "fab fa-twitter", link: "#" },
              { _id: 3, icon: "fab fa-instagram", link: "#" },
              { _id: 4, icon: "fab fa-linkedin", link: "#" },
              { _id: 5, icon: "fab fa-youtube", link: "#" },
              { _id: 6, icon: "fab fa-tiktok", link: "#" },
              { _id: 7, icon: "fab fa-whatsapp", link: "#" },
              { _id: 8, icon: "fas fa-home", link: "#" },
            ],
            openingHours: {
              day: "Monday - Sunday",
              hour: "10:00 AM - 10:00 PM",
            },
          });
        }
      } catch (error) {
        console.error("Footer API error:", error);
        // Set fallback data on error
        setFooterData({
          location: "1234 Street, City, Country",
          phoneNumber: "123456789",
          email: "info@example.com",
          desc: "Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with.",
          socialMedia: [
            { _id: 1, icon: "fab fa-facebook-f", link: "#" },
            { _id: 2, icon: "fab fa-twitter", link: "#" },
            { _id: 3, icon: "fab fa-instagram", link: "#" },
            { _id: 4, icon: "fab fa-linkedin", link: "#" },
            { _id: 5, icon: "fab fa-youtube", link: "#" },
            { _id: 6, icon: "fab fa-tiktok", link: "#" },
            { _id: 7, icon: "fab fa-whatsapp", link: "#" },
            { _id: 8, icon: "fas fa-home", link: "#" },
          ],
          openingHours: {
            day: "Monday - Sunday",
            hour: "10:00 AM - 10:00 PM",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();

    // Cleanup on unmount
    return () => {
      footerMounted = false;
    };
  }, []);

  // Don't render if another footer instance exists or still loading
  if (!shouldRender || loading) {
    return null;
  }

  // Don't render if no data
  if (!footerData) {
    return null;
  }

  // Icon mapping for social media - Comprehensive icon library
  const getIconComponent = (iconClass) => {
    const iconMap = {
      // Facebook variants
      "fab fa-facebook-f": FaFacebookSquare,
      "fab fa-facebook": FaFacebookSquare,
      "fab fa-facebook-square": FaSquareFacebook,
      "fas fa-facebook": FaFacebookSquare,

      // Twitter variants
      "fab fa-twitter": FaSquareTwitter,
      "fab fa-twitter-square": FaSquareTwitter,
      "fas fa-twitter": FaTwitterSquare,

      // Instagram variants
      "fab fa-instagram": FaInstagramSquare,
      "fab fa-instagram-square": FaSquareInstagram,
      "fas fa-instagram": FaInstagramSquare,

      // LinkedIn variants
      "fab fa-linkedin": FaLinkedin,
      "fab fa-linkedin-in": FaLinkedin,
      "fas fa-linkedin": FaLinkedin,

      // YouTube variants
      "fab fa-youtube": FaYoutubeSquare,
      "fab fa-youtube-square": FaSquareYoutube,
      "fas fa-youtube": FaYoutubeSquare,

      // Pinterest variants
      "fab fa-pinterest": FaPinterestSquare,
      "fab fa-pinterest-square": FaPinterestSquare,
      "fas fa-pinterest": FaPinterestSquare,

      // Snapchat variants
      "fab fa-snapchat": FaSnapchatSquare,
      "fab fa-snapchat-square": FaSquareSnapchat,
      "fas fa-snapchat": FaSnapchatSquare,

      // TikTok variants
      "fab fa-tiktok": FaTiktok,
      "fas fa-tiktok": FaTiktok,

      // WhatsApp variants
      "fab fa-whatsapp": FaWhatsappSquare,
      "fab fa-whatsapp-square": FaSquareWhatsapp,
      "fas fa-whatsapp": FaWhatsappSquare,

      // Telegram variants
      "fab fa-telegram": FaTelegramPlane,
      "fab fa-telegram-plane": FaTelegramPlane,
      "fas fa-telegram": FaTelegramPlane,

      // Reddit variants
      "fab fa-reddit": FaRedditSquare,
      "fab fa-reddit-square": FaRedditSquare,
      "fas fa-reddit": FaRedditSquare,

      // Discord variants
      "fab fa-discord": FaDiscord,
      "fas fa-discord": FaDiscord,

      // GitHub variants
      "fab fa-github": FaSquareGithub,
      "fab fa-github-square": FaSquareGithub,
      "fas fa-github": FaSquareGithub,

      // Generic variants
      "fas fa-home": FaHome,
      "fa fa-home": FaHome,
      "fas fa-user": FaUser,
      "fa fa-user": FaUser,
      "fas fa-envelope": FaEnvelope,
      "fa fa-envelope": FaEnvelope,
    };

    const IconComponent = iconMap[iconClass];

    // If exact match not found, try to find partial matches
    if (!IconComponent) {
      const lowerIcon = iconClass.toLowerCase();

      if (lowerIcon.includes("facebook")) return FaFacebookSquare;
      if (lowerIcon.includes("twitter")) return FaSquareTwitter;
      if (lowerIcon.includes("instagram")) return FaInstagramSquare;
      if (lowerIcon.includes("linkedin")) return FaLinkedin;
      if (lowerIcon.includes("youtube")) return FaYoutubeSquare;
      if (lowerIcon.includes("pinterest")) return FaPinterestSquare;
      if (lowerIcon.includes("snapchat")) return FaSnapchatSquare;
      if (lowerIcon.includes("tiktok")) return FaTiktok;
      if (lowerIcon.includes("whatsapp")) return FaWhatsappSquare;
      if (lowerIcon.includes("telegram")) return FaTelegramPlane;
      if (lowerIcon.includes("reddit")) return FaRedditSquare;
      if (lowerIcon.includes("discord")) return FaDiscord;
      if (lowerIcon.includes("github")) return FaSquareGithub;
      if (lowerIcon.includes("home")) return FaHome;
      if (lowerIcon.includes("user")) return FaUser;
      if (lowerIcon.includes("envelope") || lowerIcon.includes("mail"))
        return FaEnvelope;

      // Default fallback
      return FaFacebookSquare;
    }

    return IconComponent;
  };

  // Get hover color for social icons - More comprehensive color mapping
  const getHoverColor = (iconClass) => {
    const lowerIcon = iconClass.toLowerCase();

    const colorMap = {
      // Facebook - Blue
      facebook: "group-hover:text-blue-500",

      // Twitter - Light Blue
      twitter: "group-hover:text-blue-400",

      // Instagram - Pink/Purple gradient effect
      instagram: "group-hover:text-pink-500",

      // LinkedIn - Professional Blue
      linkedin: "group-hover:text-blue-600",

      // YouTube - Red
      youtube: "group-hover:text-red-500",

      // Pinterest - Red
      pinterest: "group-hover:text-red-500",

      // Snapchat - Yellow
      snapchat: "group-hover:text-yellow-400",

      // TikTok - Pink/Black
      tiktok: "group-hover:text-pink-400",

      // WhatsApp - Green
      whatsapp: "group-hover:text-green-500",

      // Telegram - Blue
      telegram: "group-hover:text-blue-400",

      // Reddit - Orange
      reddit: "group-hover:text-orange-500",

      // Discord - Purple
      discord: "group-hover:text-purple-500",

      // GitHub - Gray/Black
      github: "group-hover:text-gray-600",

      // Generic
      home: "group-hover:text-blue-500",
      user: "group-hover:text-green-500",
      envelope: "group-hover:text-blue-500",
      mail: "group-hover:text-blue-500",
    };

    // Find matching color
    for (const [platform, color] of Object.entries(colorMap)) {
      if (lowerIcon.includes(platform)) {
        return color;
      }
    }

    // Default hover color
    return "group-hover:text-blue-500";
  };

  return (
    <>
      {/* CSS to hide duplicate footers if they somehow render */}
      <style jsx global>{`
        footer:not(:last-of-type) {
          display: none !important;
        }

        /* Ensure only one footer is visible */
        body > div > div > footer ~ footer {
          display: none !important;
        }
      `}</style>

      <footer
        className="bg-gradient-to-b from-secondary to-gray-800 text-white relative overflow-hidden"
        id="main-footer-unique"
        data-footer-instance="single"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto pt-12 pb-6 md:pt-10 md:pb-4 sm:pt-8 sm:pb-3 relative z-10">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 sm:gap-4 text-center lg:text-left">
            {/* Contact Us Section */}
            <div className="space-y-4">
              <Title className="font-dancing text-3xl md:text-2xl sm:text-xl text-primary mb-4 relative">
                Contact Us
                <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-12 h-0.5 bg-primary rounded-full"></div>
              </Title>
              <div className="space-y-3">
                <a
                  href={footerData.location || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-xs group hover:text-primary transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  <FaLocationDot className="text-lg text-primary group-hover:scale-110 transition-transform" />
                  <span>
                    {footerData.location || "1234 Street, City, Country"}
                  </span>
                </a>
                <a
                  href={`tel:+90${footerData.phoneNumber}`}
                  className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-xs group hover:text-primary transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  <FaPhoneAlt className="text-lg text-primary group-hover:scale-110 transition-transform" />
                  <span>+90 {footerData.phoneNumber || "123 456 7890"}</span>
                </a>
                <a
                  href={`mailto:${footerData.email}`}
                  className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-xs group hover:text-primary transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                >
                  <IoMail className="text-lg text-primary group-hover:scale-110 transition-transform" />
                  <span>{footerData.email || "info@example.com"}</span>
                </a>
              </div>
            </div>

            {/* About Us Section */}
            <div className="space-y-4">
              <Title className="font-dancing text-3xl md:text-2xl sm:text-xl text-primary mb-4 relative">
                About Us
                <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-12 h-0.5 bg-primary rounded-full"></div>
              </Title>
              <p className="text-sm sm:text-xs leading-relaxed text-gray-300 max-w-md mx-auto lg:mx-0">
                {footerData.desc ||
                  "Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with."}
              </p>

              {/* Social Media Icons */}
              {footerData.socialMedia && footerData.socialMedia.length > 0 && (
                <div className="flex justify-center lg:justify-start gap-4 pt-2">
                  {footerData.socialMedia.map((social) => {
                    const IconComponent = getIconComponent(social.icon);
                    const hoverColor = getHoverColor(social.icon);

                    return (
                      <a
                        key={social._id}
                        href={social.link || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="group"
                      >
                        <IconComponent
                          className={`text-2xl sm:text-xl text-gray-400 ${hoverColor} transition-all duration-300 group-hover:scale-110`}
                        />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Opening Hours Section */}
            <div className="space-y-4">
              <Title className="font-dancing text-3xl md:text-2xl sm:text-xl text-primary mb-4 relative">
                Opening Hours
                <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-12 h-0.5 bg-primary rounded-full"></div>
              </Title>
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-xs p-2 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">
                    {footerData.openingHours?.day || "Monday - Friday"}
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-xs p-2 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">
                    {footerData.openingHours?.hour || "10:00 AM - 10:00 PM"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 md:mt-10 sm:mt-8 pt-6 border-t border-gray-600/50">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <p className="text-sm sm:text-xs text-gray-400">
                © {new Date().getFullYear()} All Rights Reserved By{" "}
                <span className="text-primary font-medium">
                  {footerData.brandName || "Your Company"}
                </span>
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
