
'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from "react";




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const [user, setUser] = useState<any>(null);

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

  return (
    <nav className="bg-lime-800/20 shadow-md bg-fixed w-full z-50">

      
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-rose-600">
          SmartToure
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-rose-600 hover:text-rose-800">Accueil</Link>
          <Link href="/tours" className="text-rose-600 hover:text-rose-800">Tours</Link>
          <Link href="/contact" className="text-rose-600 hover:text-rose-800">Contact</Link>
        </div>
      {user ? (
        <div>
          <span className="mr-4">👋 {user.prenom}</span>
          {user.role === "admin" && <Link href="http://127.0.0.1:8000/admin">Admin</Link>}
          {user.role === "guide" && <Link href="/guide">Espace Guide</Link>}
          {user.role === "utilisateur" && <Link href="/">Accueil</Link>}
        </div>
      ) : (
        <div>
          <Link href="/login" className="mr-2">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      )}

        {/* Menu hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link href="/" className="block py-2 text-gray-600 hover:text-lime-600">Accueil</Link>
          <Link href="/tours" className="block py-2 text-gray-600 hover:text-lime-600">Tours</Link>
          <Link href="/contact" className="block py-2 text-gray-600 hover:text-lime-600">Contact</Link> 
        <div>
          <Link href="/login" className="mr-2">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
        </div>
        
      )}
    </nav>
  );
};

export default Navbar;

