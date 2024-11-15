"use client";

import { log } from "console";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/instruments",
    label: "Instruments",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        <Image
          src="/musical-note.png"
          alt="Logo"
          className="w-[35px] h-[35px]"
          width={35}
          height={35}
        />
      </Link>
      <nav>
        <ul className="flex gap-5 text-[14px]  ">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={` ${
                  pathname === link.href ? "text-zinc-900" : "text-zinc-400"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
