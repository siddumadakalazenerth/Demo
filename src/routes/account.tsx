import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { LogOut, User as UserIcon, Building2, Heart, MessageSquare } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { BrandLoader } from "@/components/brand-loader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PropertyCard } from "@/components/property-card";
import { getSession, saveSession, clearSession, initials, type UserSession } from "@/lib/auth";
import { getFavoriteIds } from "@/lib/favorites";
import { getListings, removeListing, type MyListing } from "@/lib/listings";
import { getEnquiries, type Enquiry } from "@/lib/enquiries";
import { properties } from "@/lib/properties";

const tabValues = ["profile", "properties", "favorites", "enquiries"] as const;
const searchSchema = z.object({ tab: z.enum(tabValues).optional() });

export const Route = createFileRoute("/account")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "My Account | Zenrth" }, { name: "robots", content: "noindex" }],
  }),
  component: AccountPage,
});

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function EmptyState({
  icon: Icon,
  text,
  ctaLabel,
  ctaTo,
}: {
  icon: typeof Heart;
  text: string;
  ctaLabel: string;
  ctaTo: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary p-8 text-center">
      <Icon className="mx-auto size-6 text-muted-foreground" />
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
      <Link
        to={ctaTo}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

function ProfileTab({
  session,
  onUpdate,
}: {
  session: UserSession;
  onUpdate: (s: UserSession) => void;
}) {
  const [values, setValues] = useState({
    name: session.name,
    email: session.email,
    phone: session.phone ?? "",
  });

  function save(e: React.FormEvent) {
    e.preventDefault();
    const next: UserSession = {
      ...session,
      name: values.name.trim() || session.name,
      email: values.email.trim() || session.email,
      phone: values.phone.trim() || undefined,
    };
    saveSession(next);
    onUpdate(next);
    toast.success("Profile updated");
  }

  return (
    <div className="max-w-md">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="font-display text-lg">{initials(session.name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{session.name}</p>
          <p className="text-xs capitalize text-muted-foreground">
            {session.provider} account · joined{" "}
            {new Date(session.joinedAt).toLocaleDateString("en-IN")}
          </p>
        </div>
      </div>
      <form onSubmit={save} className="mt-6 space-y-4">
        <Field label="Full name">
          <input
            className={inputClass}
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            className={inputClass}
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </Field>
        <Field label="Phone">
          <input
            className={inputClass}
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            placeholder="+91 98450 12345"
          />
        </Field>
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

function PropertiesTab() {
  const [listings, setListings] = useState<MyListing[]>(() => getListings());

  function remove(id: string) {
    removeListing(id);
    setListings(getListings());
    toast.success("Listing removed");
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        text="You haven't listed any properties yet."
        ctaLabel="List a property"
        ctaTo="/sell-with-us"
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {listings.map((l) => (
        <div key={l.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
          {l.photoUrl ? (
            <img src={l.photoUrl} alt={l.title} className="h-32 w-full object-cover" />
          ) : (
            <div className="grid h-32 place-items-center bg-secondary text-xs text-muted-foreground">
              No photo
            </div>
          )}
          <div className="p-4">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
              {l.status}
            </span>
            <p className="mt-2 font-medium">{l.title}</p>
            <p className="text-xs text-muted-foreground">
              {l.propertyType}
              {l.city ? ` · ${l.city}` : ""}
            </p>
            {l.price && (
              <p className="mt-1 text-sm font-medium">₹{Number(l.price).toLocaleString("en-IN")}</p>
            )}
            <button
              type="button"
              onClick={() => remove(l.id)}
              className="mt-3 text-xs text-destructive hover:underline"
            >
              Remove listing
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FavoritesTab() {
  const [ids] = useState<string[]>(() => getFavoriteIds());
  const favProps = properties.filter((p) => ids.includes(p.id));

  if (favProps.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        text="No favorites yet — tap the heart on any listing to save it here."
        ctaLabel="Browse properties"
        ctaTo="/properties"
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {favProps.map((p) => (
        <PropertyCard key={p.id} p={p} />
      ))}
    </div>
  );
}

function EnquiriesTab() {
  const [list] = useState<Enquiry[]>(() => getEnquiries());

  if (list.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        text="You haven't contacted any listings yet."
        ctaLabel="Browse properties"
        ctaTo="/properties"
      />
    );
  }

  return (
    <div className="space-y-3">
      {list.map((e) => (
        <div
          key={e.id}
          className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3.5"
        >
          <div>
            <p className="text-sm font-medium">{e.propertyName}</p>
            <p className="text-xs text-muted-foreground">{e.city}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(e.date).toLocaleDateString("en-IN")}
          </p>
        </div>
      ))}
    </div>
  );
}

function AccountPage() {
  const navigate = useNavigate({ from: "/account" });
  const search = Route.useSearch();
  const [session, setSession] = useState<UserSession | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({ to: "/login", search: { redirect: "/account" }, replace: true });
      return;
    }
    setSession(s);
    setChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSignOut() {
    clearSession();
    toast.success("Signed out");
    navigate({ to: "/" });
  }

  if (!checked || !session) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <BrandLoader label="Loading account" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">My account</p>
              <h1 className="mt-2 font-display text-3xl font-light md:text-4xl">
                Hi, {session.name.split(" ")[0]}
              </h1>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <Tabs
            defaultValue={search.tab ?? "profile"}
            className="mt-8"
            onValueChange={(v) =>
              navigate({ search: { tab: v as (typeof tabValues)[number] }, replace: true })
            }
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="profile">
                <UserIcon className="mr-1.5 size-3.5" /> Profile
              </TabsTrigger>
              <TabsTrigger value="properties">
                <Building2 className="mr-1.5 size-3.5" /> My Properties
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="mr-1.5 size-3.5" /> Favorites
              </TabsTrigger>
              <TabsTrigger value="enquiries">
                <MessageSquare className="mr-1.5 size-3.5" /> Enquiries
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <ProfileTab session={session} onUpdate={setSession} />
            </TabsContent>
            <TabsContent value="properties" className="mt-6">
              <PropertiesTab />
            </TabsContent>
            <TabsContent value="favorites" className="mt-6">
              <FavoritesTab />
            </TabsContent>
            <TabsContent value="enquiries" className="mt-6">
              <EnquiriesTab />
            </TabsContent>
          </Tabs>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  );
}
