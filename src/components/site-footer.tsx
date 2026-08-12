import { Link } from "@tanstack/react-router";
import { cities, budgetTierFor, properties } from "@/lib/properties";
import { companyInfo } from "@/lib/company";
import logo from "@/assets/logo.png";

/** Curated, computed city × tier permutations — stays accurate as the catalog grows. */
function popularSearchLinks() {
  const links: { label: string; city: string }[] = [];
  for (const city of cities.slice(0, 4)) {
    links.push({ label: `Homes in ${city}`, city });
  }
  const budgetCity = cities.find((c) =>
    properties.some((p) => p.city === c && budgetTierFor(p.price) === "Budget"),
  );
  if (budgetCity) links.push({ label: `Budget homes in ${budgetCity}`, city: budgetCity });
  return links;
}

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Properties", to: "/properties" },
  { label: "Explore Cities", to: "/explore" },
  { label: "Pricing & EMI", to: "/pricing" },
];

const trustLinks = [
  { label: "Builders", to: "/builders" },
  { label: "Recently Sold", to: "/sold" },
  { label: "Advice & Guides", to: "/advice" },
  { label: "FAQs", to: "/faq" },
  { label: "Seller Perks", to: "/seller-perks" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  const searchLinks = popularSearchLinks();

  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10">
      <div className="flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-start md:justify-between">
        <h2 className="max-w-lg font-display text-3xl font-light leading-tight md:text-4xl">
          Find Your Next <span className="text-muted-foreground">Home</span>
          <br />
          Anywhere in India
        </h2>
        <div className="text-sm text-muted-foreground">
          <p>{companyInfo.address}</p>
          <p className="mt-2">{companyInfo.phoneDisplay}</p>
          <p className="mt-0.5">{companyInfo.email}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <img
              src={logo}
              alt="Zenrth"
              width={36}
              height={36}
              className="size-8 rounded-full object-cover"
            />
            <span className="font-display text-base font-semibold">Zenrth</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Residential, commercial and luxury properties across India's fastest-growing cities.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Navigate
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {quickLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Trust &amp; support
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {trustLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Popular searches
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {searchLinks.map((l) => (
              <Link
                key={l.label}
                to="/properties"
                search={{ location: l.city }}
                className="hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
        <p>© 2026 Zenrth. All rights reserved.</p>
        <p>
          <Link to="/terms" className="hover:text-foreground">
            Terms &amp; Conditions
          </Link>
          {" | "}
          <Link to="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
