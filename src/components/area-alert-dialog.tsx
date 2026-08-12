import { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const KEY = "zenrth:areaAlerts";

function readAlerts(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** Roadmap 3.3 — subscribe to an area for new-listing notifications (demo: localStorage + toast). */
export function AreaAlertDialog({ city }: { city: string }) {
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(readAlerts().includes(city));
  }, [city]);

  function subscribe() {
    const next = Array.from(new Set([...readAlerts(), city]));
    window.localStorage.setItem(KEY, JSON.stringify(next));
    setSubscribed(true);
    setOpen(false);
    toast.success(`You'll be notified about new listings in ${city}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
            subscribed
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-secondary"
          }`}
        >
          {subscribed ? <BellRing className="size-4" /> : <Bell className="size-4" />}
          {subscribed ? "Alerts on" : `Get alerts for ${city}`}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get notified about {city}</DialogTitle>
          <DialogDescription>
            We'll let you know when new listings matching this area go live. This is a demo — no
            real email/SMS is sent, the subscription is only remembered in this browser.
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={subscribe}
          className="mt-2 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Subscribe to {city} alerts
        </button>
      </DialogContent>
    </Dialog>
  );
}
