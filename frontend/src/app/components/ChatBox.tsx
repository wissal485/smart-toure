"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  contenu: string;
  date_envoi: string;
  utilisateur1: string; 
  utilisateur2: string; 
}

interface ChatBoxProps {
  utilisateur1_id: number;
  utilisateur2_id: number;
  isOpen: boolean;
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ utilisateur1_id, utilisateur2_id, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);

  // جلب الرسائل وتصفيتها حسب المستخدمين
useEffect(() => {
  if (!isOpen) return;

  async function fetchMessages() {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8000/api/messages");

      const allMessages = Array.isArray(res.data["hydra:member"])
        ? res.data["hydra:member"]
        : [];

      const filtered = allMessages.filter((msg: any) => {
        const u1 = msg.utilisateur1?.split("/").pop();
        const u2 = msg.utilisateur2?.split("/").pop();
        return (
          (u1 === utilisateur1_id.toString() && u2 === utilisateur2_id.toString()) ||
          (u1 === utilisateur2_id.toString() && u2 === utilisateur1_id.toString())
        );
      });

      setMessages(filtered);
    } catch (error) {
      console.error("Erreur lors du chargement des messages", error);
      setMessages([]); // لضمان أنه يكون array في كل الحالات
    } finally {
      setLoading(false);
    }
  }

  fetchMessages();
}, [isOpen, utilisateur1_id, utilisateur2_id]);


  // ارسال رسالة جديدة
  const handleSend = async () => {
    if (!messageContent.trim()) return;

    try {
      await axios.post(
        "http://localhost:8000/api/messages",
        {
          contenu: messageContent,
          date_envoi: new Date().toISOString().split("T")[0], // فقط التاريخ بدون الوقت
          utilisateur1: `/api/utilisateurs/${utilisateur1_id}`,
          utilisateur2: `/api/utilisateurs/${utilisateur2_id}`,
        },
        {
          headers: {
            "Content-Type": "application/ld+json",
            "Accept": "application/ld+json"
          }

        }
      );

      setMessageContent("");

      // تحديث الرسائل بعد الإرسال
      const res = await axios.get("http://localhost:8000/api/messages");
      const allMessages = Array.isArray(res.data["hydra:member"]) ? res.data["hydra:member"] : [];
      const filtered = allMessages.filter((msg: Message) => {
        const u1 = msg.utilisateur1?.split("/").pop();
        const u2 = msg.utilisateur2?.split("/").pop();
        return (
          (u1 === utilisateur1_id.toString() && u2 === utilisateur2_id.toString()) ||
          (u1 === utilisateur2_id.toString() && u2 === utilisateur1_id.toString())
        );
      });
      setMessages(filtered);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 w-96 bg-white border shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Chat avec le guide</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">×</button>
      </div>

      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {loading ? (
          <p>Chargement des messages...</p>
        ) : messages.length === 0 ? (
          <p>Aucun message.</p>
        ) : (
          messages.map((msg) => {
            const senderId = msg.utilisateur1?.split("/").pop();
            const isUser = senderId === utilisateur1_id.toString();
            return (
              <div key={msg.id} className={`mb-2 ${isUser ? "text-right" : "text-left"}`}>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    isUser ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  {msg.contenu}
                </p>
                <small className="block text-xs text-gray-400">
                  {new Date(msg.date_envoi).toLocaleDateString()}
                </small>
              </div>
            );
          })
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          className="flex-1 border rounded-l px-3 py-1"
          placeholder="Écrire un message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded-r">
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
