import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { getSession, saveSession } from "@/lib/auth";

const searchSchema = z.object({
  redirect: z.string().max(200).optional(),
  mode: z.enum(["signin", "signup"]).optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign In | Zenrth" },
      {
        name: "description",
        content:
          "Sign in or create a Zenrth account to save favorites, track enquiries and manage your listings.",
      },
    ],
  }),
  component: LoginPage,
});

const emailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { message: "Passwords don't match", path: ["confirm"] });

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const destination = search.redirect || "/account";

  useEffect(() => {
    if (getSession()) navigate({ to: destination, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [signinValues, setSigninValues] = useState({ email: "", password: "" });
  const [signinErrors, setSigninErrors] = useState<Partial<Record<"email" | "password", string>>>(
    {},
  );

  const [signupValues, setSignupValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [signupErrors, setSignupErrors] = useState<
    Partial<Record<"name" | "email" | "password" | "confirm", string>>
  >({});

  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [code, setCode] = useState("");

  function finishLogin(session: Parameters<typeof saveSession>[0], greeting: string) {
    saveSession(session);
    toast.success(greeting);
    navigate({ to: destination });
  }

  function submitSignin(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(signinValues);
    if (!parsed.success) {
      const next: typeof signinErrors = {};
      for (const issue of parsed.error.issues)
        next[issue.path[0] as "email" | "password"] = issue.message;
      setSigninErrors(next);
      return;
    }
    setSigninErrors({});
    finishLogin(
      {
        name: parsed.data.email.split("@")[0]!,
        email: parsed.data.email,
        provider: "email",
        joinedAt: new Date().toISOString(),
      },
      "Welcome back",
    );
  }

  function submitSignup(e: React.FormEvent) {
    e.preventDefault();
    const parsed = signupSchema.safeParse(signupValues);
    if (!parsed.success) {
      const next: typeof signupErrors = {};
      for (const issue of parsed.error.issues)
        next[issue.path[0] as keyof typeof signupErrors] = issue.message;
      setSignupErrors(next);
      return;
    }
    setSignupErrors({});
    finishLogin(
      {
        name: parsed.data.name,
        email: parsed.data.email,
        provider: "email",
        joinedAt: new Date().toISOString(),
      },
      "Account created",
    );
  }

  function continueWithGoogle() {
    finishLogin(
      {
        name: "Demo Google User",
        email: "demo.user@gmail.com",
        provider: "google",
        joinedAt: new Date().toISOString(),
      },
      "Signed in with Google (demo)",
    );
  }

  function sendOtp() {
    if (!/^\d{10}$/.test(phone.trim())) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    const generated = String(Math.floor(100000 + Math.random() * 900000));
    setSentCode(generated);
    setCode("");
    toast(`Demo OTP: ${generated}`, {
      description:
        "Shown here since this is a demo — no real SMS is sent. Enter it below to continue.",
    });
  }

  function verifyOtp() {
    if (!sentCode || code !== sentCode) {
      toast.error("That code doesn't match — check the demo OTP and try again");
      return;
    }
    finishLogin(
      {
        name: "Mobile User",
        email: `${phone}@demo.zenrth.in`,
        phone,
        provider: "phone",
        joinedAt: new Date().toISOString(),
      },
      "Signed in",
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-md px-6 pb-20 pt-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your account</p>
          <h1 className="mt-4 font-display text-3xl font-light leading-[1.1] md:text-4xl">
            Sign in to Zenrth
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Save favorites, track enquiries and manage your listings in one place.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 rounded-3xl bg-surface p-6 shadow-sm">
            <Tabs defaultValue={search.mode === "signup" ? "signup" : "signin"}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={submitSignin} noValidate className="mt-5 space-y-4">
                  <Field label="Email" error={signinErrors.email}>
                    <input
                      type="email"
                      className={inputClass}
                      value={signinValues.email}
                      onChange={(e) => setSigninValues((v) => ({ ...v, email: e.target.value }))}
                      placeholder="jane@example.com"
                    />
                  </Field>
                  <Field label="Password" error={signinErrors.password}>
                    <input
                      type="password"
                      className={inputClass}
                      value={signinValues.password}
                      onChange={(e) => setSigninValues((v) => ({ ...v, password: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    Sign in <ArrowRight className="size-4" />
                  </button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={submitSignup} noValidate className="mt-5 space-y-4">
                  <Field label="Full name" error={signupErrors.name}>
                    <input
                      className={inputClass}
                      value={signupValues.name}
                      onChange={(e) => setSignupValues((v) => ({ ...v, name: e.target.value }))}
                      placeholder="Jane Doe"
                    />
                  </Field>
                  <Field label="Email" error={signupErrors.email}>
                    <input
                      type="email"
                      className={inputClass}
                      value={signupValues.email}
                      onChange={(e) => setSignupValues((v) => ({ ...v, email: e.target.value }))}
                      placeholder="jane@example.com"
                    />
                  </Field>
                  <Field label="Password" error={signupErrors.password}>
                    <input
                      type="password"
                      className={inputClass}
                      value={signupValues.password}
                      onChange={(e) => setSignupValues((v) => ({ ...v, password: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </Field>
                  <Field label="Confirm password" error={signupErrors.confirm}>
                    <input
                      type="password"
                      className={inputClass}
                      value={signupValues.confirm}
                      onChange={(e) => setSignupValues((v) => ({ ...v, confirm: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    Create account <ArrowRight className="size-4" />
                  </button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-4 inline-flex items-start gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
              Demo mode — any valid-looking email &amp; password signs you in. No real account is
              created.
            </p>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={continueWithGoogle}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <GoogleMark /> Continue with Google
            </button>

            <div className="mt-4">
              {!showOtp ? (
                <button
                  type="button"
                  onClick={() => setShowOtp(true)}
                  className="w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Sign in with mobile OTP instead
                </button>
              ) : (
                <div className="rounded-2xl bg-secondary p-4">
                  <p className="text-sm font-medium">Sign in with mobile OTP</p>
                  <div className="mt-3 flex gap-2">
                    <input
                      className={inputClass}
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                      placeholder="10-digit mobile number"
                    />
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground"
                    >
                      Send OTP
                    </button>
                  </div>

                  {sentCode && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs text-muted-foreground">
                        Enter the 6-digit demo OTP
                      </p>
                      <InputOTP maxLength={6} value={code} onChange={setCode}>
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
                      >
                        Verify &amp; sign in <ArrowRight className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Just browsing?{" "}
          <Link to="/properties" className="underline underline-offset-4 hover:text-foreground">
            Explore listings without an account
          </Link>
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}
