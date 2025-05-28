'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/app/navbar/nav";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const user = response.user;

      if (user.role === "admin") {
        router.push("http://127.0.0.1:8000/admin");
      } else if (user.role === "guide") {
        router.push("/guide");
      } else {
        router.push("/"); 
      }
    } catch (error) {
      alert("Login échoué !");
    }
  };

  return (
<>

  <Navbar />

    <div className="grid grid-cols-3 gap-4 py-40 mx-40">
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
    </>
  );
}
