import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, LogOut, User, Building2, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuth, clearSession, initials } from "@/lib/auth";

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Property List", to: "/properties" },
  { label: "Sell My Property", to: "/sell-with-us" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function SiteNav({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const session = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    clearSession();
    toast.success("Signed out");
    setOpen(false);
    navigate({ to: "/" });
  }

  return (
    <nav className={`${overlay ? "absolute inset-x-0 top-0 z-20" : "relative"} px-6 py-5 md:px-10`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="shrink-0" aria-label="Zenrth home">
          <img
            src={logo}
            alt="Zenrth"
            width={44}
            height={44}
            className="size-10 rounded-full object-cover"
          />
        </Link>

        <div
          className={`hidden items-center gap-1 rounded-full p-1 md:flex ${
            overlay ? "bg-primary-foreground/10 backdrop-blur-md" : "bg-secondary"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm transition-colors"
              inactiveProps={{
                className: overlay
                  ? "text-primary-foreground/85 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              }}
              activeProps={{
                className: "bg-primary text-primary-foreground",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="My account" className="rounded-full">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
                      {initials(session.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="truncate text-sm font-medium">{session.name}</p>
                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {session.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" search={{ tab: "profile" }}>
                    <User className="size-4" /> My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" search={{ tab: "properties" }}>
                    <Building2 className="size-4" /> My Properties
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" search={{ tab: "favorites" }}>
                    <Heart className="size-4" /> Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut}>
                  <LogOut className="size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Sign In
            </Link>
          )}
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className={`grid size-10 place-items-center rounded-full md:hidden ${
              overlay ? "bg-primary-foreground/10 text-primary-foreground" : "bg-secondary"
            }`}
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-6xl animate-fade-in rounded-2xl bg-surface p-2 shadow-lg md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-foreground hover:bg-secondary"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-1 border-t border-border pt-1">
            {session ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-foreground hover:bg-secondary"
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-destructive hover:bg-secondary"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-foreground hover:bg-secondary"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
