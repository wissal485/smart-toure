'use client';

import { useState } from "react";
import Navbar from "@/app/navbar/nav";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/utilisateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/ld+json",
        },
        body: JSON.stringify({
          email,
          nom,
          prenom,
          plainPassword: password, // ✅ API Platform يستخدم غالبًا plainPassword
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData["hydra:description"] || "Erreur lors de l'inscription"
        );
      }

      alert("Inscription réussie !");

      // ✅ التوجيه حسب الدور
      if (role === "admin") {
        window.location.href = "http://127.0.0.1:8000/admin";
      } else if (role === "guide") {
        window.location.href = "/guide";
      } else {
        window.location.href = "/";
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="py-10 mx-2">
        <div className="p-6 max-w-md mx-auto">
          <h1 className="text-xl font-bold mb-4">Inscription</h1>

          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full mb-2 p-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full mb-2 p-2 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 p-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded-lg"
          />

          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 p-2 border rounded-lg"
          >
            <option value="">Inscrire comme ?</option>
            <option value="tourriste">Tourriste</option>
            <option value="guide">Guide</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleSignup}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </>
  );
}
