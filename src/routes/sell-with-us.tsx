import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Home,
  Castle,
  LandPlot,
  Store,
  Warehouse,
  Building,
  DoorOpen,
  UploadCloud,
  X,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  BedDouble,
  Bath,
  Ruler,
  Layers,
  Compass,
  FileText,
  Car,
  Sofa,
  UtensilsCrossed,
  ShieldCheck,
  Plug,
  Trees,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { SellServicesBand } from "@/components/sell-services-band";
import { SellWizardSteps, type WizardStep } from "@/components/sell-wizard-steps";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { companyInfo } from "@/lib/company";
import { states, citiesInfo } from "@/lib/locations";
import { saveListing } from "@/lib/listings";

export const Route = createFileRoute("/sell-with-us")({
  head: () => ({
    meta: [
      { title: "Sell With Us | Zenrth" },
      {
        name: "description",
        content:
          "List your property on Zenrth with a guided listing flow, immersive Matterport 360° tours, and reach verified buyers across India.",
      },
    ],
  }),
  component: SellWithUsPage,
});

type SellPropertyType =
  | "Apartments / Flats"
  | "Independent Houses"
  | "Villas"
  | "Residential Plots / Land"
  | "Commercial Spaces"
  | "Bungalows"
  | "Row Houses / Townhouses"
  | "Studio Apartments";

const propertyTypes: { label: SellPropertyType; icon: typeof Building2 }[] = [
  { label: "Apartments / Flats", icon: Building2 },
  { label: "Independent Houses", icon: Home },
  { label: "Villas", icon: Castle },
  { label: "Residential Plots / Land", icon: LandPlot },
  { label: "Commercial Spaces", icon: Store },
  { label: "Bungalows", icon: Warehouse },
  { label: "Row Houses / Townhouses", icon: Building },
  { label: "Studio Apartments", icon: DoorOpen },
];

// ── Schema-driven "Property Details" fields, one set per property type ────────

type FieldKind = "text" | "textarea" | "number" | "select" | "price" | "toggle";

type FieldDef = {
  key: string;
  label: string;
  kind: FieldKind;
  required: boolean;
  placeholder?: string;
  unit?: string;
  options?: string[];
  maxLength?: number;
  helpText?: string;
};

const yesNo = ["Yes", "No"];
const facingOptions = [
  "North",
  "South",
  "East",
  "West",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];
const furnishingOptions = ["Unfurnished", "Semi-Furnished", "Fully Furnished"];
const bhkOptions = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const propertyAgeOptions = [
  "Under Construction",
  "0-1 years",
  "1-5 years",
  "5-10 years",
  "10+ years",
];

const title: FieldDef = {
  key: "title",
  label: "Property Title",
  kind: "text",
  required: true,
  placeholder: "Enter property title",
};
const description: FieldDef = {
  key: "description",
  label: "Property Description",
  kind: "textarea",
  required: false,
  placeholder: "Describe the property",
  maxLength: 300,
};
const plotArea: FieldDef = {
  key: "plotArea",
  label: "Plot Area",
  kind: "number",
  required: true,
  unit: "Sq. ft.",
  placeholder: "Plot area",
};
const builtUpArea: FieldDef = {
  key: "builtUpArea",
  label: "Built-up Area",
  kind: "number",
  required: true,
  unit: "Sq. ft.",
  placeholder: "Built-up area",
};
const carpetAreaOptional: FieldDef = {
  key: "carpetArea",
  label: "Carpet Area",
  kind: "number",
  required: false,
  unit: "Sq. ft.",
  placeholder: "Carpet area",
};
const carpetAreaRequired: FieldDef = { ...carpetAreaOptional, required: true };
const totalFloors: FieldDef = {
  key: "totalFloors",
  label: "Total Floors",
  kind: "number",
  required: true,
  placeholder: "Total floors",
};
const totalFloorsOptional: FieldDef = { ...totalFloors, required: false };
const bhk: FieldDef = {
  key: "bhk",
  label: "BHK Configuration",
  kind: "select",
  required: true,
  options: bhkOptions,
  placeholder: "Select BHK configuration",
};
const bathrooms: FieldDef = {
  key: "bathrooms",
  label: "Bathrooms",
  kind: "number",
  required: true,
  placeholder: "No. of bathrooms",
};
const balconiesOptional: FieldDef = {
  key: "balconies",
  label: "Balconies",
  kind: "number",
  required: false,
  placeholder: "No. of balconies",
};
const balconiesRequired: FieldDef = { ...balconiesOptional, required: true };
const furnishing: FieldDef = {
  key: "furnishing",
  label: "Furnishing Status",
  kind: "select",
  required: true,
  options: furnishingOptions,
  placeholder: "Select furnishing",
};
const expectedPrice: FieldDef = {
  key: "expectedPrice",
  label: "Expected Price",
  kind: "price",
  required: true,
  placeholder: "Enter total price",
};
const priceNegotiable: FieldDef = {
  key: "priceNegotiable",
  label: "Price Negotiable",
  kind: "select",
  required: true,
  options: yesNo,
  placeholder: "Is the price negotiable?",
};
const propertyAge: FieldDef = {
  key: "propertyAge",
  label: "Property Age",
  kind: "select",
  required: true,
  options: propertyAgeOptions,
  placeholder: "Select property age",
};
const facingOptional: FieldDef = {
  key: "facing",
  label: "Facing",
  kind: "select",
  required: false,
  options: facingOptions,
  placeholder: "Select facing",
};
const parkingSlotsOptional: FieldDef = {
  key: "parkingSlots",
  label: "Parking Slots",
  kind: "number",
  required: false,
  placeholder: "No. of parking slots",
};
const bedrooms: FieldDef = {
  key: "bedrooms",
  label: "Bedrooms",
  kind: "number",
  required: true,
  placeholder: "No. of bedrooms",
};

const typeFieldSchemas: Record<SellPropertyType, FieldDef[]> = {
  "Independent Houses": [
    title,
    description,
    plotArea,
    builtUpArea,
    carpetAreaOptional,
    totalFloors,
    bhk,
    bathrooms,
    balconiesOptional,
    furnishing,
    expectedPrice,
    priceNegotiable,
    propertyAge,
    facingOptional,
  ],
  "Apartments / Flats": [
    {
      key: "multipleListing",
      label: "Multiple Listing?",
      kind: "toggle",
      required: false,
      helpText:
        "Enable this if you're listing an entire residential project with multiple floor plans (e.g., 2BHK, 3BHK, 4BHK)",
    },
    {
      key: "buildingName",
      label: "Building / Project Name",
      kind: "text",
      required: true,
      placeholder: "Building / Project / Society name",
    },
    description,
    {
      key: "possessionStatus",
      label: "Availability Status",
      kind: "select",
      required: true,
      options: ["Under Construction", "Ready to Move"],
      placeholder: "Select possession status",
    },
    bhk,
    {
      key: "superBuiltUpArea",
      label: "Super Built-up Area",
      kind: "number",
      required: true,
      unit: "Sq. ft.",
      placeholder: "Super built-up area",
    },
    carpetAreaRequired,
    expectedPrice,
    {
      key: "pricePerSqft",
      label: "Price per Sq.Ft",
      kind: "price",
      required: true,
      placeholder: "Enter amount",
    },
    {
      key: "floorNo",
      label: "Floor No",
      kind: "number",
      required: true,
      placeholder: "Enter floor number",
    },
    bathrooms,
    balconiesRequired,
    furnishing,
  ],
  Villas: [
    title,
    description,
    plotArea,
    builtUpArea,
    carpetAreaOptional,
    expectedPrice,
    priceNegotiable,
    {
      key: "villaType",
      label: "Villa Type",
      kind: "select",
      required: true,
      options: ["Independent Villa", "Villa in Gated Community", "Duplex Villa", "Row Villa"],
      placeholder: "Select villa type",
    },
    totalFloors,
    bedrooms,
    bathrooms,
    balconiesOptional,
    furnishing,
    parkingSlotsOptional,
    facingOptional,
  ],
  "Residential Plots / Land": [
    title,
    description,
    plotArea,
    {
      key: "plotAreaUnit",
      label: "Plot Area Unit",
      kind: "select",
      required: true,
      options: ["Sq. ft.", "Sq. yd.", "Acres", "Guntha", "Cents"],
      placeholder: "Select unit",
    },
    {
      key: "plotLength",
      label: "Plot Length (ft)",
      kind: "number",
      required: true,
      placeholder: "Plot length",
    },
    {
      key: "plotWidth",
      label: "Plot Width (ft)",
      kind: "number",
      required: true,
      placeholder: "Plot width",
    },
    {
      key: "plotType",
      label: "Plot Type",
      kind: "select",
      required: true,
      options: ["Residential", "Agricultural", "Industrial", "Mixed Use"],
      placeholder: "Select plot type",
    },
    {
      key: "roadWidth",
      label: "Road Width (ft)",
      kind: "number",
      required: false,
      placeholder: "Road width",
    },
    facingOptional,
    {
      key: "boundaryMarked",
      label: "Boundary Marked",
      kind: "select",
      required: false,
      options: yesNo,
      placeholder: "Select option",
    },
    {
      key: "gatedLayout",
      label: "Gated Layout",
      kind: "select",
      required: false,
      options: yesNo,
      placeholder: "Select option",
    },
    {
      key: "ownershipType",
      label: "Ownership Type",
      kind: "select",
      required: true,
      options: ["Freehold", "Leasehold", "Power of Attorney"],
      placeholder: "Select ownership type",
    },
    {
      key: "landUse",
      label: "Land Use",
      kind: "select",
      required: true,
      options: ["Residential", "Commercial", "Agricultural", "Mixed"],
      placeholder: "Select land use",
    },
    expectedPrice,
    priceNegotiable,
    {
      key: "possessionStatus",
      label: "Possession Status",
      kind: "select",
      required: true,
      options: ["Immediate", "Within 3 months", "Within 6 months", "Future"],
      placeholder: "Select possession status",
    },
  ],
  "Commercial Spaces": [
    title,
    description,
    {
      key: "commercialType",
      label: "Commercial Type",
      kind: "select",
      required: true,
      options: [
        "Office Space",
        "Retail Shop",
        "Showroom",
        "Warehouse",
        "Co-working Space",
        "Restaurant / Café Space",
      ],
      placeholder: "Select commercial type",
    },
    builtUpArea,
    carpetAreaRequired,
    {
      key: "floorNo",
      label: "Floor Number",
      kind: "number",
      required: true,
      placeholder: "Floor number",
    },
    totalFloorsOptional,
    {
      key: "washrooms",
      label: "Washrooms",
      kind: "select",
      required: true,
      options: ["1", "2", "3", "4+"],
      placeholder: "Select washroom count",
    },
    furnishing,
    {
      key: "fireSafety",
      label: "Fire Safety Compliance",
      kind: "select",
      required: false,
      options: ["NOC Available", "In Process", "Not Available"],
      placeholder: "Select fire safety compliance",
    },
    {
      key: "ceilingHeight",
      label: "Ceiling Height (ft)",
      kind: "number",
      required: false,
      placeholder: "Enter ceiling height in feet",
    },
    expectedPrice,
    priceNegotiable,
    {
      key: "parkingAvailability",
      label: "Parking Availability",
      kind: "select",
      required: true,
      options: ["Available", "Not Available", "Paid Parking"],
      placeholder: "Select parking availability",
    },
  ],
  Bungalows: [
    title,
    description,
    plotArea,
    builtUpArea,
    carpetAreaOptional,
    totalFloors,
    bedrooms,
    bathrooms,
    balconiesOptional,
    furnishing,
    parkingSlotsOptional,
    {
      key: "privateGarden",
      label: "Private Garden",
      kind: "select",
      required: false,
      options: yesNo,
      placeholder: "Select option",
    },
    facingOptional,
    {
      key: "storeRoom",
      label: "Store Room",
      kind: "select",
      required: false,
      options: yesNo,
      placeholder: "Select option",
    },
    propertyAge,
    expectedPrice,
    priceNegotiable,
  ],
  "Row Houses / Townhouses": [
    title,
    description,
    plotArea,
    builtUpArea,
    carpetAreaOptional,
    {
      key: "unitType",
      label: "Unit Type",
      kind: "select",
      required: true,
      options: ["End Unit", "Middle Unit", "Corner Unit"],
      placeholder: "Select unit type",
    },
    totalFloors,
    bathrooms,
    balconiesOptional,
    furnishing,
    bhk,
    parkingSlotsOptional,
    facingOptional,
    expectedPrice,
    priceNegotiable,
  ],
  "Studio Apartments": [
    title,
    description,
    builtUpArea,
    carpetAreaOptional,
    furnishing,
    {
      key: "floorNo",
      label: "Floor Number",
      kind: "number",
      required: false,
      placeholder: "Enter floor number",
    },
    totalFloorsOptional,
    bathrooms,
    {
      key: "pantry",
      label: "Pantry / Kitchenette",
      kind: "select",
      required: true,
      options: yesNo,
      placeholder: "Select option",
    },
    {
      key: "parking",
      label: "Parking",
      kind: "select",
      required: false,
      options: ["Available", "Not Available"],
      placeholder: "Select parking",
    },
    expectedPrice,
    priceNegotiable,
  ],
};

const typeSubheadings: Record<SellPropertyType, string> = {
  "Independent Houses": "Provide details of the standalone house",
  "Apartments / Flats": "Provide details of the apartment",
  Villas: "Provide complete details of the villa",
  "Residential Plots / Land": "Provide plot specifications and legal information",
  "Commercial Spaces": "Provide key specifications of the commercial property",
  Bungalows: "Provide complete information about the bungalow",
  "Row Houses / Townhouses": "Provide detailed information about the property",
  "Studio Apartments": "Provide details specific to studio apartments",
};

// ── Preview-step spec highlights — the 4 headline stats per type, with icons ──

type HighlightSpec = { key: string; icon: LucideIcon };

const highlightSpecs: Record<SellPropertyType, HighlightSpec[]> = {
  "Independent Houses": [
    { key: "bhk", icon: BedDouble },
    { key: "bathrooms", icon: Bath },
    { key: "plotArea", icon: Ruler },
    { key: "totalFloors", icon: Layers },
  ],
  "Apartments / Flats": [
    { key: "bhk", icon: BedDouble },
    { key: "bathrooms", icon: Bath },
    { key: "superBuiltUpArea", icon: Ruler },
    { key: "floorNo", icon: Layers },
  ],
  Villas: [
    { key: "bedrooms", icon: BedDouble },
    { key: "bathrooms", icon: Bath },
    { key: "plotArea", icon: Ruler },
    { key: "totalFloors", icon: Layers },
  ],
  "Residential Plots / Land": [
    { key: "plotArea", icon: Ruler },
    { key: "plotType", icon: LandPlot },
    { key: "facing", icon: Compass },
    { key: "ownershipType", icon: FileText },
  ],
  "Commercial Spaces": [
    { key: "builtUpArea", icon: Ruler },
    { key: "floorNo", icon: Layers },
    { key: "washrooms", icon: Bath },
    { key: "parkingAvailability", icon: Car },
  ],
  Bungalows: [
    { key: "bedrooms", icon: BedDouble },
    { key: "bathrooms", icon: Bath },
    { key: "plotArea", icon: Ruler },
    { key: "totalFloors", icon: Layers },
  ],
  "Row Houses / Townhouses": [
    { key: "bhk", icon: BedDouble },
    { key: "bathrooms", icon: Bath },
    { key: "builtUpArea", icon: Ruler },
    { key: "totalFloors", icon: Layers },
  ],
  "Studio Apartments": [
    { key: "bathrooms", icon: Bath },
    { key: "builtUpArea", icon: Ruler },
    { key: "furnishing", icon: Sofa },
    { key: "pantry", icon: UtensilsCrossed },
  ],
};

const amenityGroupIcons: Record<string, LucideIcon> = {
  "Security & safety": ShieldCheck,
  Convenience: Plug,
  "Recreation & lifestyle": Trees,
  Other: Sparkles,
  "Plot features": LandPlot,
  "Commercial features": Building2,
};

// ── Type-aware amenities — a much larger, grouped list per property category ──

type AmenityGroup = { heading: string; items: string[] };

const residentialAmenityGroups: AmenityGroup[] = [
  {
    heading: "Security & safety",
    items: [
      "24x7 Security",
      "CCTV Surveillance",
      "Gated Community",
      "Fire Safety",
      "Intercom Facility",
    ],
  },
  {
    heading: "Convenience",
    items: [
      "Power Backup",
      "Lift / Elevator",
      "24x7 Water Supply",
      "Rainwater Harvesting",
      "Piped Gas",
      "Visitor Parking",
      "Covered Parking",
      "Waste Disposal",
    ],
  },
  {
    heading: "Recreation & lifestyle",
    items: [
      "Swimming Pool",
      "Clubhouse",
      "Gymnasium",
      "Landscaped Garden",
      "Jogging Track",
      "Kids' Play Area",
      "Indoor Games Room",
      "Amphitheater",
      "Senior Citizen Sit-out",
      "Sports Court",
    ],
  },
  {
    heading: "Other",
    items: [
      "Pet Friendly",
      "Wi-Fi Connectivity",
      "Servant Room",
      "Solar Power",
      "EV Charging Point",
    ],
  },
];

const plotAmenityGroups: AmenityGroup[] = [
  {
    heading: "Plot features",
    items: [
      "Boundary Wall",
      "Gated Entry",
      "Street Lighting",
      "Water Connection Available",
      "Electricity Connection Available",
      "Underground Drainage",
      "Paved Roads",
      "Corner Plot",
      "Park Facing",
      "Nearby Development",
    ],
  },
];

const commercialAmenityGroups: AmenityGroup[] = [
  {
    heading: "Commercial features",
    items: [
      "Lift / Elevator",
      "Power Backup",
      "Central Air Conditioning",
      "Fire Safety Compliance",
      "CCTV Surveillance",
      "Reception Area",
      "Conference Room",
      "Cafeteria / Pantry",
      "Dedicated Parking",
      "High-Speed Internet Ready",
      "Loading / Unloading Bay",
      "24x7 Access",
    ],
  },
];

function amenityGroupsFor(type: SellPropertyType | ""): AmenityGroup[] {
  if (type === "Residential Plots / Land") return plotAmenityGroups;
  if (type === "Commercial Spaces") return commercialAmenityGroups;
  if (type === "") return [];
  return residentialAmenityGroups;
}

// ── Wizard state ────────────────────────────────────────────────────────────

type UnitVariant = { bhk: string; area: string; price: string };

type SellFormState = {
  propertyType: SellPropertyType | "";
  details: Record<string, string | boolean>;
  unitVariants: UnitVariant[];
  state: string;
  city: string;
  locality: string;
  customLocality: string;
  address: string;
  pincode: string;
  amenities: string[];
  matterportUrl: string;
};

const emptyForm: SellFormState = {
  propertyType: "",
  details: {},
  unitVariants: [],
  state: "",
  city: "",
  locality: "",
  customLocality: "",
  address: "",
  pincode: "",
  amenities: [],
  matterportUrl: "",
};

const steps: WizardStep[] = [
  { label: "Property Type" },
  { label: "Property Details" },
  { label: "Property Locality" },
  { label: "Amenities" },
  { label: "Uploads" },
  { label: "Preview" },
];

const DRAFT_KEY = "zenrth:sellDraft";

function isStepComplete(index: number, form: SellFormState, photoCount: number): boolean {
  switch (index) {
    case 0:
      return form.propertyType !== "";
    case 1: {
      if (form.propertyType === "") return false;
      const schema = typeFieldSchemas[form.propertyType];
      return schema
        .filter((f) => f.required)
        .every((f) => {
          const v = form.details[f.key];
          return typeof v === "boolean" ? true : (v ?? "").toString().trim() !== "";
        });
    }
    case 2:
      return (
        form.state !== "" &&
        form.city !== "" &&
        (form.locality !== "" || form.customLocality.trim() !== "") &&
        form.address.trim() !== ""
      );
    case 3:
      return true; // optional
    case 4:
      return photoCount > 0 || form.matterportUrl.trim() !== "";
    default:
      return false;
  }
}

function SellWithUsPage() {
  const [form, setForm] = useState<SellFormState>(emptyForm);
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);
  const [active, setActive] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      setForm({ ...emptyForm, ...JSON.parse(raw) });
    } catch {
      // ignore malformed draft
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, [form]);

  // Note: photo object URLs are intentionally NOT revoked on unmount — a submitted
  // listing's photoUrl (saved via saveListing) needs to stay valid after navigating
  // away to /account. They're only revoked when a photo is explicitly removed in
  // StepUploads, or naturally when the page is fully reloaded.

  // Drop amenity selections that no longer apply if the property type changes.
  useEffect(() => {
    const valid = new Set(amenityGroupsFor(form.propertyType).flatMap((g) => g.items));
    setForm((f) => {
      const next = f.amenities.filter((a) => valid.has(a));
      return next.length === f.amenities.length ? f : { ...f, amenities: next };
    });
  }, [form.propertyType]);

  const completedSteps = useMemo(
    () => steps.map((_, i) => isStepComplete(i, form, photos.length)),
    [form, photos.length],
  );

  const update = <K extends keyof SellFormState>(key: K, value: SellFormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setDetail = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, details: { ...f.details, [key]: value } }));

  const toggleAmenity = (a: string) =>
    update(
      "amenities",
      form.amenities.includes(a) ? form.amenities.filter((x) => x !== a) : [...form.amenities, a],
    );

  function handleSubmit() {
    const title =
      (form.details["title"] as string) ||
      (form.details["buildingName"] as string) ||
      "Untitled listing";
    saveListing({
      title,
      propertyType: form.propertyType || "Property",
      price: (form.details["expectedPrice"] as string) || undefined,
      city: form.city || undefined,
      locality: (form.locality === "__other__" ? form.customLocality : form.locality) || undefined,
      photoUrl: photos[0]?.url,
    });
    setSubmitted(true);
    window.localStorage.removeItem(DRAFT_KEY);
    toast.success("Your listing has been submitted for review");
  }

  const listingTitle =
    (form.details["title"] as string) ||
    (form.details["buildingName"] as string) ||
    "your property";

  if (submitted) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
          <Reveal>
            <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
              <CheckCircle2 className="size-6" />
            </span>
            <h1 className="mt-6 font-display text-3xl font-light md:text-4xl">
              Thanks — {listingTitle} is with our team
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A Zenrth advisor will review your listing and reach out within 24 hours at{" "}
              {companyInfo.phoneDisplay} or {companyInfo.email}. If you added a Matterport link,
              we'll verify it before your listing goes live.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm(emptyForm);
                setPhotos([]);
                setActive(0);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              List another property <ArrowRight className="size-4" />
            </button>
          </Reveal>
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sell with us</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.1] md:text-5xl">
            List your property in minutes
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground">
            Guided listing, immersive Matterport 360° tours, and verified buyer reach — all in one
            flow.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8">
            <SellServicesBand />
          </div>
          <Link
            to="/360-shoot"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2"
          >
            Prefer we shoot it for you? Book a 360° crew
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <SellWizardSteps
            steps={steps}
            activeIndex={active}
            completedSteps={completedSteps}
            onSelect={setActive}
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-6 rounded-2xl bg-surface p-6 shadow-sm md:p-8">
            {active === 0 && <StepPropertyType form={form} update={update} />}
            {active === 1 && <StepDetails form={form} setDetail={setDetail} update={update} />}
            {active === 2 && <StepLocality form={form} update={update} />}
            {active === 3 && <StepAmenities form={form} toggleAmenity={toggleAmenity} />}
            {active === 4 && (
              <StepUploads form={form} update={update} photos={photos} setPhotos={setPhotos} />
            )}
            {active === 5 && <StepPreview form={form} photos={photos} />}

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <button
                type="button"
                disabled={active === 0}
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
              >
                <ArrowLeft className="size-3.5" /> Back
              </button>

              {active < steps.length - 1 ? (
                <button
                  type="button"
                  disabled={!completedSteps[active]}
                  onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                >
                  Next <ArrowRight className="size-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!completedSteps[4]}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                >
                  Submit for review <CheckCircle2 className="size-4" />
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30";

function StepPropertyType({
  form,
  update,
}: {
  form: SellFormState;
  update: <K extends keyof SellFormState>(key: K, value: SellFormState[K]) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-medium">What type of property is it?</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {propertyTypes.map((t) => {
          const selected = form.propertyType === t.label;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => update("propertyType", t.label)}
              className={`rounded-2xl border p-4 text-center transition-colors ${
                selected ? "border-primary bg-secondary" : "border-border hover:bg-secondary"
              }`}
            >
              <span
                className={`mx-auto grid size-11 place-items-center rounded-full ${
                  selected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                <t.icon className="size-5" />
              </span>
              <p className="mt-3 text-xs font-medium leading-tight">{t.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DetailField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string | boolean | undefined;
  onChange: (v: string | boolean) => void;
}) {
  const label = `${field.label}${field.required ? " *" : " (Optional)"}`;

  if (field.kind === "toggle") {
    return (
      <div className="md:col-span-2">
        <label className="flex items-center gap-2.5 text-sm font-medium">
          <Switch checked={Boolean(value)} onCheckedChange={(v) => onChange(v)} />
          {field.label}
        </label>
        {field.helpText && <p className="mt-1 text-xs text-muted-foreground">{field.helpText}</p>}
      </div>
    );
  }

  if (field.kind === "textarea") {
    const text = (value as string) ?? "";
    return (
      <div className="md:col-span-2">
        <Field label={label}>
          <Textarea
            rows={3}
            maxLength={field.maxLength}
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        </Field>
        {field.maxLength && (
          <span className="mt-1 block text-right text-xs text-muted-foreground">
            {text.length}/{field.maxLength}
          </span>
        )}
      </div>
    );
  }

  if (field.kind === "select") {
    return (
      <Field label={label}>
        <select
          className={inputClass}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{field.placeholder}</option>
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
    );
  }

  if (field.kind === "price") {
    return (
      <Field label={label}>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
            INR
          </span>
          <input
            className={`${inputClass} pl-11`}
            inputMode="numeric"
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder={field.placeholder}
          />
        </div>
      </Field>
    );
  }

  // text / number
  return (
    <Field label={field.unit ? `${label} — in ${field.unit}` : label}>
      <input
        className={inputClass}
        inputMode={field.kind === "number" ? "numeric" : undefined}
        value={(value as string) ?? ""}
        onChange={(e) =>
          onChange(field.kind === "number" ? e.target.value.replace(/[^0-9]/g, "") : e.target.value)
        }
        placeholder={field.placeholder}
      />
    </Field>
  );
}

function StepDetails({
  form,
  setDetail,
  update,
}: {
  form: SellFormState;
  setDetail: (key: string, value: string | boolean) => void;
  update: <K extends keyof SellFormState>(key: K, value: SellFormState[K]) => void;
}) {
  if (form.propertyType === "") {
    return (
      <p className="text-sm text-muted-foreground">
        Choose a property type first to see the right fields.
      </p>
    );
  }

  const schema = typeFieldSchemas[form.propertyType];
  const showVariants =
    form.propertyType === "Apartments / Flats" && Boolean(form.details["multipleListing"]);

  function addVariant() {
    update("unitVariants", [...form.unitVariants, { bhk: "", area: "", price: "" }]);
  }
  function updateVariant(i: number, patch: Partial<UnitVariant>) {
    update(
      "unitVariants",
      form.unitVariants.map((v, idx) => (idx === i ? { ...v, ...patch } : v)),
    );
  }
  function removeVariant(i: number) {
    update(
      "unitVariants",
      form.unitVariants.filter((_, idx) => idx !== i),
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-medium">
        Basic Property Information ({form.propertyType})
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{typeSubheadings[form.propertyType]}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {schema.map((field) => (
          <DetailField
            key={field.key}
            field={field}
            value={form.details[field.key]}
            onChange={(v) => setDetail(field.key, v)}
          />
        ))}
      </div>

      {showVariants && (
        <div className="mt-6 rounded-2xl bg-secondary p-5">
          <p className="text-sm font-medium">Unit types in this project</p>
          <div className="mt-3 space-y-3">
            {form.unitVariants.map((v, i) => (
              <div
                key={i}
                className="grid gap-3 rounded-xl bg-surface p-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <select
                  className={inputClass}
                  value={v.bhk}
                  onChange={(e) => updateVariant(i, { bhk: e.target.value })}
                >
                  <option value="">BHK</option>
                  {bhkOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="Area (sqft)"
                  value={v.area}
                  onChange={(e) =>
                    updateVariant(i, { area: e.target.value.replace(/[^0-9]/g, "") })
                  }
                />
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="Price (INR)"
                  value={v.price}
                  onChange={(e) =>
                    updateVariant(i, { price: e.target.value.replace(/[^0-9]/g, "") })
                  }
                />
                <button
                  type="button"
                  onClick={() => removeVariant(i)}
                  aria-label="Remove unit type"
                  className="grid size-9 place-items-center justify-self-end rounded-full hover:bg-secondary"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Plus className="size-4" /> Add another unit type
          </button>
        </div>
      )}
    </div>
  );
}

function StepLocality({
  form,
  update,
}: {
  form: SellFormState;
  update: <K extends keyof SellFormState>(key: K, value: SellFormState[K]) => void;
}) {
  const cityOptions = states.find((s) => s.name === form.state)?.cities ?? [];
  const localityOptions = citiesInfo.find((c) => c.name === form.city)?.localities ?? [];

  return (
    <div>
      <h2 className="font-display text-xl font-medium">Where is it located?</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="State">
          <select
            className={inputClass}
            value={form.state}
            onChange={(e) => {
              update("state", e.target.value);
              update("city", "");
              update("locality", "");
            }}
          >
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>
        </Field>
        <Field label="City">
          <select
            className={inputClass}
            value={form.city}
            disabled={!form.state}
            onChange={(e) => {
              update("city", e.target.value);
              update("locality", "");
            }}
          >
            <option value="">{form.state ? "Select city" : "Choose a state first"}</option>
            {cityOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Locality">
          <select
            className={inputClass}
            value={form.locality}
            disabled={!form.city}
            onChange={(e) => update("locality", e.target.value)}
          >
            <option value="">{form.city ? "Select locality" : "Choose a city first"}</option>
            {localityOptions.map((l) => (
              <option key={l}>{l}</option>
            ))}
            <option value="__other__">Other — I'll type it in</option>
          </select>
        </Field>
        {form.locality === "__other__" && (
          <Field label="Your locality">
            <input
              className={inputClass}
              value={form.customLocality}
              onChange={(e) => update("customLocality", e.target.value)}
              placeholder="e.g. Kokapet"
            />
          </Field>
        )}
        <Field label="Pincode">
          <input
            className={inputClass}
            inputMode="numeric"
            value={form.pincode}
            onChange={(e) => update("pincode", e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="500081"
          />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Full address">
          <Textarea
            rows={3}
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Flat/House no., building name, street"
          />
        </Field>
      </div>
    </div>
  );
}

function StepAmenities({
  form,
  toggleAmenity,
}: {
  form: SellFormState;
  toggleAmenity: (a: string) => void;
}) {
  const groups = amenityGroupsFor(form.propertyType);

  if (groups.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Choose a property type first to see relevant amenities.
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-medium">What amenities does it have?</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Select all that apply — this is optional.
      </p>
      <div className="mt-5 space-y-5">
        {groups.map((g) => (
          <div key={g.heading}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {g.heading}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((a) => {
                const selected = form.amenities.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-secondary"
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepUploads({
  form,
  update,
  photos,
  setPhotos,
}: {
  form: SellFormState;
  update: <K extends keyof SellFormState>(key: K, value: SellFormState[K]) => void;
  photos: { name: string; url: string }[];
  setPhotos: React.Dispatch<React.SetStateAction<{ name: string; url: string }[]>>;
}) {
  function onFiles(fileList: FileList | null) {
    if (!fileList) return;
    const next = Array.from(fileList).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPhotos((p) => [...p, ...next]);
  }

  function removePhoto(url: string) {
    URL.revokeObjectURL(url);
    setPhotos((p) => p.filter((ph) => ph.url !== url));
  }

  return (
    <div>
      <h2 className="font-display text-xl font-medium">Photos &amp; virtual tour</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Add a few photos, or a Matterport 360° tour link — at least one is needed to continue.
      </p>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-8 text-center hover:bg-secondary">
        <UploadCloud className="size-6 text-muted-foreground" />
        <span className="text-sm font-medium">Click to upload photos</span>
        <span className="text-xs text-muted-foreground">
          JPG or PNG — stored only in this browser for this demo
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {photos.map((p) => (
            <div key={p.url} className="group relative overflow-hidden rounded-xl">
              <img src={p.url} alt={p.name} className="h-20 w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(p.url)}
                aria-label={`Remove ${p.name}`}
                className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-foreground/70 text-background opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Field label="Matterport 360° tour link (optional)">
          <input
            className={inputClass}
            value={form.matterportUrl}
            onChange={(e) => update("matterportUrl", e.target.value)}
            placeholder="https://my.matterport.com/show/?m=..."
          />
        </Field>
        <p className="mt-2 text-xs text-muted-foreground">
          Don't have a 360° tour yet?{" "}
          <Link to="/360-shoot" className="text-primary underline underline-offset-2">
            Book a professional shoot
          </Link>{" "}
          and we'll send you a link to paste here.
        </p>
      </div>
    </div>
  );
}

function formatFieldValue(field: FieldDef, value: string | boolean | undefined): string {
  if (value === undefined || value === "") return "";
  if (field.kind === "toggle") return value ? "Yes" : "No";
  if (field.kind === "price") return `₹${Number(value).toLocaleString("en-IN")}`;
  if (field.unit) return `${value} ${field.unit}`;
  return String(value);
}

function StepPreview({
  form,
  photos,
}: {
  form: SellFormState;
  photos: { name: string; url: string }[];
}) {
  const [activePhoto, setActivePhoto] = useState(0);

  const locality = form.locality === "__other__" ? form.customLocality : form.locality;
  const fullAddress = [form.address, locality, form.city, form.state].filter(Boolean).join(", ");
  const isEmbeddableTour = /^https?:\/\//i.test(form.matterportUrl.trim());

  const schema = form.propertyType ? typeFieldSchemas[form.propertyType] : [];
  const schemaByKey = new Map(schema.map((f) => [f.key, f]));
  const filledFields = schema.filter((f) => {
    const v = form.details[f.key];
    return f.kind === "toggle" ? false : v !== undefined && v !== "";
  });

  const titleValue =
    (form.details["title"] as string) ||
    (form.details["buildingName"] as string) ||
    "Untitled listing";
  const priceValue = form.details["expectedPrice"] as string | undefined;

  const highlights = form.propertyType ? highlightSpecs[form.propertyType] : [];
  const highlightKeys = new Set(highlights.map((h) => h.key));
  const descriptionValue = (form.details["description"] as string) ?? "";
  const otherFields = filledFields.filter(
    (f) => f.key !== "description" && !highlightKeys.has(f.key),
  );

  const selectedAmenityGroups = amenityGroupsFor(form.propertyType)
    .map((g) => ({ ...g, items: g.items.filter((i) => form.amenities.includes(i)) }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      <div>
        <h2 className="font-display text-xl font-medium">Review your listing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This is roughly how your listing will look to buyers once it's live.
        </p>
      </div>

      {/* Header: badges, title, address, price */}
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-secondary p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {form.propertyType && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                {form.propertyType}
              </span>
            )}
            {isEmbeddableTour && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <Video className="size-3" /> 360° Tour
              </span>
            )}
          </div>
          <h3 className="mt-3 font-display text-2xl font-medium">{titleValue}</h3>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" /> {fullAddress || "Address not set"}
          </p>
        </div>
        {priceValue && (
          <div className="text-right">
            <p className="font-display text-2xl font-medium">
              ₹{Number(priceValue).toLocaleString("en-IN")}
            </p>
            {form.details["priceNegotiable"] === "Yes" && (
              <p className="text-xs text-muted-foreground">Negotiable</p>
            )}
          </div>
        )}
      </div>

      {/* Gallery */}
      <div className="mt-5">
        {photos.length > 0 ? (
          <>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={photos[activePhoto]?.url ?? photos[0]!.url}
                alt={titleValue}
                className="h-64 w-full object-cover md:h-80"
              />
            </div>
            {photos.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {photos.map((p, i) => (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => setActivePhoto(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={`overflow-hidden rounded-lg transition-opacity ${
                      i === activePhoto ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={p.url} alt="" className="h-16 w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid h-48 place-items-center rounded-2xl bg-secondary text-sm text-muted-foreground">
            No photos added yet
          </div>
        )}
      </div>

      {/* Headline specs, type-specific */}
      {highlights.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map((h) => {
            const field = schemaByKey.get(h.key);
            if (!field) return null;
            const value = formatFieldValue(field, form.details[h.key]);
            if (!value) return null;
            return (
              <div key={h.key} className="rounded-2xl bg-secondary px-4 py-4">
                <h.icon className="size-4 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">{value}</p>
                <p className="text-xs text-muted-foreground">{field.label}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Description */}
      {descriptionValue && (
        <div className="mt-6">
          <h3 className="font-display text-lg font-medium">About this property</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{descriptionValue}</p>
        </div>
      )}

      {/* Remaining details not already shown as a headline spec */}
      {otherFields.length > 0 && (
        <div className="mt-6">
          <h3 className="font-display text-lg font-medium">Property details</h3>
          <dl className="mt-3 grid gap-x-6 gap-y-2 rounded-2xl bg-secondary p-4 sm:grid-cols-2">
            {otherFields.map((f) => (
              <div key={f.key} className="flex items-center justify-between gap-3 text-sm">
                <dt className="text-muted-foreground">{f.label}</dt>
                <dd className="font-medium">{formatFieldValue(f, form.details[f.key])}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Amenities, grouped with a category icon */}
      {selectedAmenityGroups.length > 0 && (
        <div className="mt-6">
          <h3 className="font-display text-lg font-medium">Amenities</h3>
          <div className="mt-3 space-y-3">
            {selectedAmenityGroups.map((g) => {
              const GroupIcon = amenityGroupIcons[g.heading] ?? Sparkles;
              return (
                <div key={g.heading} className="rounded-2xl bg-secondary p-4">
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <GroupIcon className="size-3.5" /> {g.heading}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((a) => (
                      <span key={a} className="rounded-full bg-surface px-3 py-1 text-xs">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Matterport 360° tour */}
      {form.matterportUrl.trim() !== "" && (
        <div className="mt-6">
          <h3 className="inline-flex items-center gap-1.5 font-display text-lg font-medium">
            <Video className="size-4" /> 360° tour preview
          </h3>
          {isEmbeddableTour ? (
            <div className="mt-3 overflow-hidden rounded-2xl border border-border">
              <iframe
                src={form.matterportUrl}
                title="Matterport 360° tour preview"
                className="h-72 w-full"
                allow="xr-spatial-tracking; gyroscope; accelerometer"
              />
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              Add a valid link starting with https:// to preview the tour here.
            </p>
          )}
        </div>
      )}

      {/* Location map */}
      {fullAddress && (
        <div className="mt-6">
          <h3 className="font-display text-lg font-medium">Location</h3>
          <div className="mt-3 overflow-hidden rounded-2xl bg-secondary">
            <iframe
              title={`Map of ${fullAddress}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=14&output=embed`}
              loading="lazy"
              className="h-64 w-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
