"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface Conversation { id: string; user: { id: string; name: string; avatar: string | null }; messages: { content: string; createdAt: string }[]; _count: { messages: number } }
interface Message { id: string; senderType: string; content: string; createdAt: string; read: boolean }

export default function MessagesPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchConversations() {
      try { const res = await fetch("/api/company/messages"); if (res.ok) setConversations(await res.json()); }
      catch (error) { console.error("Error:", error); }
      finally { setLoading(false); }
    }
    if (session) fetchConversations();
  }, [session]);

  useEffect(() => {
    async function fetchMessages() {
      if (!selectedId) return;
      try {
        const res = await fetch(`/api/company/messages/${selectedId}`);
        if (res.ok) { const data = await res.json(); setMessages(data.messages); }
      } catch (error) { console.error("Error:", error); }
    }
    fetchMessages();
  }, [selectedId]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedId || sending) return;
    setSending(true);
    try {
      const res = await fetch(`/api/company/messages/${selectedId}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: newMessage }),
      });
      if (res.ok) { const msg = await res.json(); setMessages([...messages, msg]); setNewMessage(""); }
    } catch (error) { toast({ title: "Error", variant: "destructive" }); }
    finally { setSending(false); }
  };

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  if (!session) return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Conversations List */}
      <div className="w-80 glass-panel rounded-2xl flex flex-col">
        <div className="p-4 border-b border-white/10"><h3 className="font-bold text-white">Messages</h3></div>
        <div className="flex-1 overflow-y-auto">
          {loading ? <div className="p-4 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-700 rounded-xl animate-pulse" />)}</div> : conversations.length === 0 ? (
            <div className="p-8 text-center"><span className="material-symbols-outlined text-4xl text-gray-600 mb-2">chat_bubble</span><p className="text-sm text-gray-400">No conversations yet</p></div>
          ) : (
            conversations.map((conv) => (
              <button key={conv.id} onClick={() => setSelectedId(conv.id)} className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors ${selectedId === conv.id ? "bg-white/10" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">{conv.user.avatar ? <img src={conv.user.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : conv.user.name.charAt(0)}</div>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="font-bold text-white text-sm truncate">{conv.user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{conv.messages[0]?.content || "No messages"}</p>
                </div>
                {conv._count.messages > 0 && <span className="w-5 h-5 rounded-full bg-neon-green text-background-dark text-xs font-bold flex items-center justify-center">{conv._count.messages}</span>}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-2xl flex flex-col">
        {!selectedId ? (
          <div className="flex-1 flex items-center justify-center"><div className="text-center"><span className="material-symbols-outlined text-5xl text-gray-600 mb-4">forum</span><p className="text-gray-400">Select a conversation</p></div></div>
        ) : (
          <>
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">{selectedConversation?.user.name.charAt(0)}</div>
              <div><p className="font-bold text-white">{selectedConversation?.user.name}</p></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderType === "company" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${msg.senderType === "company" ? "bg-neon-green text-background-dark rounded-br-none" : "bg-card-dark text-white rounded-bl-none"}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.senderType === "company" ? "text-background-dark/60" : "text-gray-500"}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none" />
                <button onClick={sendMessage} disabled={sending || !newMessage.trim()} className="px-6 py-3 bg-neon-green text-background-dark font-bold rounded-xl hover:bg-[#3cd612] disabled:opacity-50 transition-colors flex items-center justify-center min-w-[56px]">{sending ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">send</span>}</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
