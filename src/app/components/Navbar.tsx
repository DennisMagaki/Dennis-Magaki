"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Work", href: "/work" },
    { label: "Clients", href: "/clients" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Games", href: "/games" },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  if (pathname === "/") return null;

  // Split links into main and extra for separator
  const mainLinks = navLinks.slice(0, 6);
  const extraLinks = navLinks.slice(6);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#000000]/20 text-[#ffffff] z-100 backdrop-blur-xl">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <span className="font-bold text-3xl tracking-wide font-montserrat uppercase">
              Dennis Magaki
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {mainLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative group transition ease-in-out duration-300 font-montserrat uppercase text-sm ${
                  pathname === href ? "font-semibold" : ""
                }`}
              >
                {label}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] bg-[#ffffff] transition-all duration-300 
                    ${pathname === href ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                ></span>
              </Link>
            ))}

            {/* Separator */}
            <span className="w-px h-6 bg-gray-400 mx-3"></span>

            {extraLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative group transition ease-in-out duration-300 font-montserrat uppercase text-sm font-bold ${
                  pathname === href ? "font-semibold" : ""
                }`}
              >
                {label}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] bg-transparent transition-all duration-300 
                    ${pathname === href ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed top-15 right-0 w-full h-screen bg-black text-[#ffffff] px-6 pt-16 pb-4 md:hidden font-montserrat uppercase"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.2,
                  },
                },
                hidden: {
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.2,
                    staggerDirection: -1,
                  },
                },
              }}
              className="space-y-10 text-center"
            >
              {/* Main links */}
              {mainLinks.map(({ href, label }) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="block hover:text-white text-lg transition"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}

              {/* Separator */}
              <li>
                <span className="block w-full h-px bg-gray-400 my-4"></span>
              </li>

              {/* Extra links */}
              {extraLinks.map(({ href, label }) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="block hover:text-white text-lg transition font-bold"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
