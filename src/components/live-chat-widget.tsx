import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { BrandLoader } from "@/components/brand-loader";

type Msg = { from: "agent" | "user"; text: string };

const scripted: Record<string, string> = {
  "site visit":
    'You can book a free site visit from any listing\'s detail page — just tap "Schedule a visit" and pick a time that works for you.',
  emi: "Head to the Advice & Tools page for an EMI calculator — enter the price, down payment and tenure to see your monthly instalment.",
  documents:
    "Typical documents include sale deed, encumbrance certificate, property tax receipts and RERA approval. Our state-wise FAQ page has details specific to your city.",
  default:
    "Thanks for reaching out! One of our agents will follow up shortly. In the meantime, feel free to browse listings or check our Advice & FAQ pages.",
};

function reply(text: string): string {
  const key = Object.keys(scripted).find((k) => text.toLowerCase().includes(k));
  return (key ? scripted[key] : undefined) ?? scripted["default"]!;
}

/**
 * Demo-level live-agent affordance (roadmap 10.3) — canned, scripted responses,
 * no real chat backend.
 */
export function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "agent",
      text: "Hi! I'm the Zenrth virtual assistant. Ask me about site visits, EMI, or required documents.",
    },
  ]);

  function send() {
    if (!value.trim()) return;
    const userMsg: Msg = { from: "user", text: value.trim() };
    setMessages((m) => [...m, userMsg]);
    setValue("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "agent", text: reply(userMsg.text) }]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 flex h-[420px] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <p className="text-sm font-medium">Chat with Zenrth</p>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "agent"
                    ? "bg-secondary text-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
            {typing && <BrandLoader size={24} label="Agent is typing" />}
          </div>
          <div className="flex items-center gap-2 border-t border-border p-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about site visits, EMI…"
              className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button
              aria-label="Send"
              onClick={send}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>
    </div>
  );
}
