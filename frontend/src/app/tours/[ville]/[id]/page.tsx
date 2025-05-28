"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/navbar/nav";
import ChatBox from "@/app/components/ChatBox";

import './style.css';

type UtilisateurData = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  photo_de_profil?: string;
};

type Guide = {
  biographie: string;
  Utilisateur: string;
  utilisateurData?: UtilisateurData;
};

type Tour = {
  id: number;
  titre: string;
  description: string;
  prix: number;
  dateDispo: string;
  ville: string;
  noteMoyenne: number;
  img: string;
  guide: string;
  guideData?: Guide;
};

type Message = {
  id: number;
  sender: "user" | "guide";
  content: string;
  date: string;
};

function Stars({ rating }: { rating: number }) {
  const stars = [];
  const roundedRating = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{ color: i <= roundedRating ? '#fbbf24' : '#d1d5db', fontSize: '24px', cursor: 'default' }}
      >
        ★
      </span>
    );
  }
  return <div>{stars}</div>;
}

export default function TourDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const userId = 1; // ← عدّل هذا حسب المستخدم المتصل
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 👇 متغيرات الشات
  const [chatOpen, setChatOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!id) return;

    async function fetchTourDetails() {
      try {
        const tourRes = await axios.get(`http://localhost:8000/api/tours/${id}`);
        const tourData: Tour = tourRes.data;

        const guideRes = await axios.get(`http://localhost:8000${tourData.guide}`);
        const guideData: Guide = guideRes.data;

        const utilisateurRes = await axios.get(`http://localhost:8000${guideData.Utilisateur}`);
        const utilisateurData: UtilisateurData = utilisateurRes.data;

        guideData.utilisateurData = utilisateurData;
        tourData.guideData = guideData;

        setTour(tourData);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement des détails du tour.");
        setLoading(false);
      }
    }

    fetchTourDetails();
  }, [id]);

  const handlePayment = () => {
    router.push(`/payment/${tour?.id}`);
  };

  const handleSend = async () => {
  if (!messageContent.trim()) return;

  try {
    await axios.post("http://localhost:8000/api/messages", {
      contenu: messageContent,
      date_envoi: new Date().toISOString().split("T")[0],
      utilisateur1: `/api/utilisateurs/${userId}`,
      utilisateur2: `/api/utilisateurs/${tour?.guideData?.utilisateurData?.id}`,
    },  {
          headers: {
            "Content-Type": "application/ld+json",
            "Accept": "application/ld+json"
          }

        });

    setMessageContent(""); // vider l'input après l'envoi
  } catch (error) {
    console.error("Erreur lors de l'envoi du message", error);
  }
};



  if (loading) return <div className="p-10">Chargement des détails...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!tour) return <div className="p-10">Aucun détail trouvé.</div>;

  const utilisateur1_id = userId;
  const utilisateur2_id = tour.guideData?.utilisateurData?.id ?? 0;

  return (
    <>
      <Navbar />
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{tour.titre}</h1>

        <div className="mb-6">
          <img
            src={`http://localhost:8000/images/tours/${tour.img}`}
            alt={tour.titre}
            className="w-full h-64 object-cover rounded-lg shadow"
          />
        </div>

        <p className="mb-4 text-gray-700">{tour.description}</p>
        <div className="mb-4"><strong>Ville:</strong> {tour.ville}</div>

        <div className="mb-4 flex items-center space-x-2">
          <strong>Note moyenne:</strong>
          <Stars rating={tour.noteMoyenne} />
          <span className="ml-2 text-yellow-500">{tour.noteMoyenne.toFixed(1)}</span>
        </div>

        <div className="mb-4"><strong>Prix:</strong> {tour.prix} TND</div>
        <div className="mb-4"><strong>Date disponible:</strong> {new Date(tour.dateDispo).toLocaleDateString()}</div>

        <div className="mb-6">
          <strong>Guide:</strong>
          {tour.guideData?.utilisateurData ? (
            <div className="flex items-center space-x-4 mt-2">
              <img
                src={`http://localhost:8000/images/tours/${tour.guideData.utilisateurData.photo_de_profil || "default.jpg"}`}
                alt={tour.guideData.utilisateurData.nom}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div>{tour.guideData.utilisateurData.nom} {tour.guideData.utilisateurData.prenom}</div>
                <div className="text-sm text-gray-500">{tour.guideData.biographie}</div>
              </div>
            </div>
          ) : (
            <p>Aucun guide disponible.</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Réserver maintenant
          </button>

          <button
            onClick={() => setChatOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Contacter le guide
          </button>
        </div>
      </div>

      <ChatBox
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        onSend={handleSend}
        messages={messages}
        setMessages={setMessages}
        utilisateur1_id={utilisateur1_id}
        utilisateur2_id={utilisateur2_id}
      />
    </>
  );
}
