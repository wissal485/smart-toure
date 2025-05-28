import Navbar from "./navbar/nav";
import Link from "next/link";
import Image from "next/image";
 
import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const signup = async (data: any) => {
  const response = await axios.post(`${API_BASE}/utilisateurs`, data);
  return response.data;
};

export const login = async (data: any) => {
  const response = await axios.post(`${API_BASE}/login`, data); // غيّر المسار حسب الي عندك
  return response.data;
};


export default function Home() {


  return (
    <>
      <Navbar />

      <div className="grid grid-cols-3 gap-4 py-20 mx-40">
        {/* مثال: Zaghouan */}
        <Link
          href="/tours/zaghouan"
          className="relative group aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image/AdobeStock_751577594_Preview.jpeg"
              alt="Zaghouan"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
              <h2 className="text-white text-3xl font-bold text-center px-4">Zaghouan</h2>
            </div>
          </div>
        </Link>

        {/* Sidi Bou Said */}
        <Link
          href="/tours/sidibou"
          className="relative group aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image/AdobeStock_96005425_Preview.jpeg"
              alt="Sidi Bou Said"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
              <h2 className="text-white text-3xl font-bold text-center px-4">Sidi Bou Saïd</h2>
            </div>
          </div>
        </Link>

        {/* Djerba */}
        <Link
          href="/tours/djerba"
          className="relative group aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image/AdobeStock_174561060_Preview.jpeg"
              alt="Djerba"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
              <h2 className="text-white text-3xl font-bold text-center px-4">Djerba</h2>
            </div>
          </div>
        </Link>

        {/* Matmata */}
        <Link
          href="/tours/matmata"
          className=" w-6/6  h-50 relative group col-span-2 aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image/AdobeStock_20088081_Preview.jpeg"
              alt="Matmata"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
              <h2 className="text-white text-3xl font-bold text-center px-4">Matmata</h2>
            </div>
          </div>
        </Link>

        {/* Gabès */}
        <Link
          href="/tours/gebes"
          className="w-6/6  h-50 relative group aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image/AdobeStock_93980874_Preview.jpeg"
              alt="Gabès"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
              <h2 className="text-white text-3xl font-bold text-center px-4">Gabès</h2>
            </div>
          </div>
        </Link>

        {/* Tunis */}
        <Link
          href="/tours/tunis"
          className="w-6/6  h-50  relative group aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image/AdobeStock_418280787_Preview_Editorial_Use_Only.jpeg"
              alt="Tunis"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
              <h2 className="text-white text-3xl font-bold text-center px-4">Tunis</h2>
            </div>
          </div>
        </Link>

        {/* Kebili */}
        <Link
          href="/tours/kebili"
          className=" w-6/6  h-50 relative group col-span-2 aspect-[4/3] overflow-hidden rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image/AdobeStock_261062293_Preview.jpeg"
              alt="Kebili"
              fill
              className="object-cover h-50"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
              <h2 className="text-white text-3xl font-bold text-center px-4">Kebili</h2>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
