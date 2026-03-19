"use client";

import { useState, useEffect } from "react";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: "read" | "unread";
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<"unread" | "read">("unread");
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch messages from server API
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact/messages");
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching messages:", data.error);
        return;
      }

      setMessages(data.messages);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Mark message as read
  const markAsRead = async (id: number) => {
    try {
      await fetch("/api/contact/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      // Update local state immediately
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg)),
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // Filter messages based on active tab
  const filteredMessages = messages.filter((msg) => msg.status === activeTab);

  return (
    <div className="p-10 bg-black text-white min-h-screen font-montserrat mt-20">
      <h1 className="text-3xl mb-6 font-semibold">Messages</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeTab === "unread"
              ? "bg-blue-500 text-black"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("unread")}
        >
          Unread ({messages.filter((m) => m.status === "unread").length})
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeTab === "read"
              ? "bg-green-500 text-black"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("read")}
        >
          Read ({messages.filter((m) => m.status === "read").length})
        </button>
      </div>

      {/* Loading state */}
      {loading && <p className="text-gray-400">Loading messages...</p>}

      {/* Messages List */}
      {!loading && filteredMessages.length === 0 && (
        <p className="text-gray-400">You have no unread messages.</p>
      )}

      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`border rounded-lg cursor-pointer transition-all ${
              msg.status === "unread"
                ? "bg-blue-900/20 border-blue-500"
                : "bg-gray-900/20 border-gray-700"
            }`}
            onClick={() => {
              setExpandedMessage(expandedMessage === msg.id ? null : msg.id);
              if (msg.status === "unread") markAsRead(msg.id);
            }}
          >
            <div className="p-4 flex justify-between items-center">
              <div>
                <p>
                  <strong>{msg.name}</strong> <span className="text-gray-400">{msg.email}</span>
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(msg.created_at).toLocaleString("en-KE", {
                    timeZone: "Africa/Nairobi",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-gray-300">
                {expandedMessage === msg.id ? "▲" : "▼"}
              </div>
            </div>

            {/* Expandable content */}
            {expandedMessage === msg.id && (
              <div className="px-4 pb-4 text-gray-200">
                <p>{msg.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
