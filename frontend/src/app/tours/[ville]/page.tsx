"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/navbar/nav";
import Link from "next/link";

type Tour = {
  id: number;
  titre: string;
  description: string;
  prix: number;
  dateDispo: string;
  ville: string;
};

export default function ToursByVille() {
  const params = useParams();
  const ville = params.ville?.toString().toLowerCase();

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tours")
      .then((res) => {
        const allTours = res.data.member;
        const filteredTours = allTours.filter(
          (tour: Tour) => tour.ville.toLowerCase() === ville
        );
        setTours(filteredTours);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [ville]);

  if (loading) return <div className="p-10">Chargement...</div>;

  return (
    <>
    <Navbar />
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Tours disponibles à {ville?.charAt(0).toUpperCase() + ville?.slice(1)}
      </h1>

      {tours.length === 0 ? (
        <p>Aucun tour disponible pour cette ville.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="border border-gray-300 rounded-lg p-6 shadow"
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
              <h2 className="text-2xl font-semibold mb-2">{tour.titre}</h2>
              <p className="mb-2 text-gray-700">{tour.description.slice(0, 150)}...</p>
              <p className="font-medium">📅 {new Date(tour.dateDispo).toLocaleDateString()}</p>
              <p className="font-bold text-green-600">💰 {tour.prix} DT</p>
              <Link
                href={`/tours/${tour.ville.toLowerCase()}/${tour.id}`}
                className="relative group aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              >
                more...
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
