"use client";

import { Link } from "./link";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
      <div className="flex gap-2 text-sm">
        <Link href="/">Home</Link>
        <Link href="/img-to-text">Image to text</Link>
      </div>
    </>
  );
};

export { Navbar };
