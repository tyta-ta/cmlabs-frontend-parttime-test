"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: "Home", href: "/" },
    { name: "All Foods", href: "/food" },
  ];

  const isActive = (href: string) => {
    if (href === "/food") {
      return pathname.startsWith("/food") || pathname.startsWith("/category");
    }

    return pathname === href;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled
          ? "bg-neutral-200/90 backdrop-blur shadow-md"
          : "bg-neutral-200"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-black text-olive-600">
          Food Ingredients
        </Link>

        <div className="hidden gap-6 md:flex">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                isActive(item.href)
                  ? "font-semibold text-olive-800"
                  : "text-olive-500"
              } hover:text-olive-700`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-olive-700 transition ${
              isOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-olive-700 transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-olive-700 transition ${
              isOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-4 pb-4">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`py-2 transition ${
                isActive(item.href)
                  ? "font-semibold text-olive-800"
                  : "text-olive-500"
              } hover:text-olive-700`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}