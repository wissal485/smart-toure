"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/app/navbar/nav";
type Tour = {
  id: number;
  ville: string;
  img: string;
};

export default function ToursPage() {
  const [uniqueTours, setUniqueTours] = useState<Tour[]>([]);
  const [search, setSearch] = useState("");

useEffect(() => {
  axios.get("http://localhost:8000/api/tours")
    .then((res) => {
      const data = res.data["hydra:member"] || res.data.member || res.data || [];

      if (!Array.isArray(data)) {
        console.error("Unexpected response format:", res.data);
        return;
      }

      const uniqueMap = new Map<string, Tour>();
      data.forEach((tour: Tour) => {
        if (!uniqueMap.has(tour.ville)) {
          uniqueMap.set(tour.ville, tour);
        }
      });

      setUniqueTours(Array.from(uniqueMap.values()));
    })
    .catch((err) => {
      console.error("Error fetching tours:", err);
    });
}, []);


  const filtered = uniqueTours.filter((tour) =>
    tour.ville.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Navbar />
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Découvrez nos destinations</h1>

      <input
        type="text"
        placeholder="Rechercher une ville..."
        className="border border-gray-300 rounded-md px-4 py-2 mb-6 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((tour) => (
          <Link
            key={tour.id}
            href={`/tours/${tour.ville.toLowerCase()}`}
            className="bg-white border hover:shadow-lg rounded-xl overflow-hidden"
          >
            <div className="w-full h-40 overflow-hidden">
              {tour.img && (
                <img
                  src={`http://localhost:8000/images/tours/${tour.img}`}
                  alt={tour.ville}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4 text-center font-semibold text-lg">
              {tour.ville}
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
