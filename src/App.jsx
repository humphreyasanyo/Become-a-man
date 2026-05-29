import { useState } from "react";

// ─── Universal Meals ───────────────────────────────────────────────────────────
const universalMeals = [
  {
    time: "🌅 Breakfast",
    options: [
      { name: "Oats + banana + black tea (no sugar)", calories: "~350 cal", tags: ["Budget", "Quick"] },
      { name: "2 boiled eggs + whole wheat bread", calories: "~300 cal", tags: ["High Protein"] },
      { name: "Mandazi + uji (porridge)", calories: "~280 cal", tags: ["Kenyan", "Budget"] },
      { name: "Smoothie: banana + milk + peanut butter", calories: "~400 cal", tags: ["Energy Boost"] },
    ],
  },
  {
    time: "🕙 Mid-Morning Snack",
    options: [
      { name: "1 avocado + lemon", calories: "~160 cal", tags: ["Healthy Fats"] },
      { name: "Mixed fruits (mango, orange, pawpaw)", calories: "~120 cal", tags: ["Vitamins"] },
      { name: "Handful of groundnuts", calories: "~180 cal", tags: ["Protein", "Budget"] },
    ],
  },
  {
    time: "☀️ Lunch",
    options: [
      { name: "Ugali + sukuma wiki + grilled chicken", calories: "~550 cal", tags: ["Kenyan", "Balanced"] },
      { name: "Brown rice + beans + steamed veggies", calories: "~480 cal", tags: ["Vegan", "Budget"] },
      { name: "Chapati + lentil stew (dal)", calories: "~500 cal", tags: ["Filling"] },
      { name: "Sweet potato + fish + kachumbari", calories: "~460 cal", tags: ["High Protein"] },
      { name: "Pasta + tomato sauce + tuna", calories: "~520 cal", tags: ["Universal"] },
    ],
  },
  {
    time: "🕓 Afternoon Snack",
    options: [
      { name: "Green tea + 2 digestive biscuits", calories: "~100 cal", tags: ["Light"] },
      { name: "Yogurt (plain) + honey", calories: "~150 cal", tags: ["Gut Health"] },
      { name: "1 boiled egg + water", calories: "~80 cal", tags: ["Protein"] },
    ],
  },
  {
    time: "🌙 Dinner",
    options: [
      { name: "Vegetable soup + 1 slice brown bread", calories: "~250 cal", tags: ["Light", "Sleep Well"] },
      { name: "Steamed veggies + grilled fish", calories: "~320 cal", tags: ["Clean Eating"] },
      { name: "Githeri (beans + maize) — light portion", calories: "~350 cal", tags: ["Kenyan", "Budget"] },
      { name: "Stir-fry vegetables + tofu or eggs", calories: "~280 cal", tags: ["Vegan"] },
    ],
  },
  {
    time: "💧 Hydration Rules",
    options: [
      { name: "Drink 2–3 litres of water daily", calories: "0 cal", tags: ["Essential"] },
      { name: "Lemon water every morning (detox)", calories: "~10 cal", tags: ["Detox"] },
      { name: "Avoid sodas and sugary drinks", calories: "—", tags: ["Rule"] },
    ],
  },
];

const tagColor = (tag) => {
  const map = {
    Budget: "#4CAF50", Quick: "#2196F3", "High Protein": "#FF6B35",
    Kenyan: "#FF9800", "Energy Boost": "#FFD166", "Healthy Fats": "#8BC34A",
    Vitamins: "#E91E8C", Protein: "#00BCD4", Balanced: "#9C27B0",
    Vegan: "#4CAF50", Filling: "#FF5722", Universal: "#607D8B",
    Light: "#78909C", "Gut Health": "#66BB6A", "Clean Eating": "#26A69A",
    Essential: "#EF5350", Detox: "#AB47BC", Rule: "#EF5350", "Sleep Well": "#5C6BC0",
  };
  return map[tag] || "#555";
};

// ─── Payment Methods ───────────────────────────────────────────────────────────
const paymentMethods = [
  {
    id: "mpesa", label: "M-Pesa", icon: "📲", color: "#4CAF50",
    desc: "Safaricom M-Pesa STK Push",
    fields: [{ id: "phone", label: "Safaricom Number", placeholder: "e.g. 0712 345 678", type: "tel" }],
    validate: (v) => /^(07|01|\+2547|\+2541)[0-9]{8}$/.test(v.replace(/\s/g, "")) ? null : "Enter a valid Safaricom number e.g. 0712345678",
    instruction: "You will receive an M-Pesa prompt on your phone. Enter your PIN to complete.",
  },
  {
    id: "airtel", label: "Airtel Money", icon: "📱", color: "#FF0000",
    desc: "Airtel Money Push Payment",
    fields: [{ id: "phone", label: "Airtel Number", placeholder: "e.g. 0733 345 678", type: "tel" }],
    validate: (v) => /^(073|074|075|078)[0-9]{7}$/.test(v.replace(/\s/g, "")) ? null : "Enter a valid Airtel number e.g. 0733345678",
    instruction: "You will receive an Airtel Money prompt. Approve the payment to continue.",
  },
  {
    id: "card", label: "Debit / Credit Card", icon: "💳", color: "#2196F3",
    desc: "Visa · Mastercard · Any bank card",
    fields: [
      { id: "cardnum", label: "Card Number", placeholder: "1234 5678 9012 3456", type: "tel", maxLen: 19 },
      { id: "expiry", label: "Expiry Date", placeholder: "MM / YY", type: "tel", maxLen: 7, half: true },
      { id: "cvv", label: "CVV", placeholder: "123", type: "tel", maxLen: 3, half: true },
      { id: "name", label: "Cardholder Name", placeholder: "As on card", type: "text" },
    ],
    validate: (vals) => {
      if (!vals.cardnum || vals.cardnum.replace(/\s/g, "").length < 16) return "Enter a valid 16-digit card number";
      if (!vals.expiry || vals.expiry.length < 5) return "Enter expiry date";
      if (!vals.cvv || vals.cvv.length < 3) return "Enter CVV";
      if (!vals.name) return "Enter cardholder name";
      return null;
    },
    instruction: "Your payment is encrypted and processed securely via 3D Secure.",
  },
  {
    id: "bank", label: "Bank Transfer", icon: "🏦", color: "#9C27B0",
    desc: "Direct bank transfer / EFT",
    fields: [],
    validate: () => null,
    instruction: null,
    manual: true,
    details: [
      { label: "Bank Name", value: "Equity Bank Kenya" },
      { label: "Account Name", value: "GlowPlans Digital KE" },
      { label: "Account Number", value: "0123456789101" },
      { label: "Branch", value: "Nairobi CBD" },
      { label: "Swift Code", value: "EQBLKENA" },
    ],
  },
  {
    id: "paypal", label: "PayPal", icon: "🌐", color: "#003087",
    desc: "International PayPal payments",
    fields: [{ id: "email", label: "PayPal Email", placeholder: "your@email.com", type: "email" }],
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid PayPal email address",
    instruction: "You will receive a payment request to your PayPal account.",
  },
  {
    id: "crypto", label: "Crypto (USDT)", icon: "₿", color: "#F7931A",
    desc: "USDT · BTC · ETH accepted",
    fields: [],
    validate: () => null,
    instruction: null,
    manual: true,
    details: [
      { label: "Network", value: "TRC20 (TRON)" },
      { label: "USDT Address", value: "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
      { label: "Amount", value: "Equivalent in USDT at current rate" },
      { label: "Note", value: "Send screenshot as proof of payment" },
    ],
  },
];

// ─── Plan Data ─────────────────────────────────────────────────────────────────
const plans = {
  workout: {
    id: "workout", emoji: "💪",
    title: "8-Week Home Workout Plan",
    subtitle: "No gym. No excuses. Just results.",
    tagline: "Transform your body from home — zero equipment needed.",
    price: "$4.99", priceUSD: "", priceNum: 500,
    color: "#FF6B35", accent: "#FFD166", bg: "#0D0D0D",
    features: ["8-Week Full Program", "Daily Exercise Plans", "Universal Meal Guide", "Pro Tips & Tricks", "Progress Tracker"],
    weeks: [
      {
        week: "Week 1–2", theme: "Foundation", icon: "🔥",
        days: [
          { day: "Monday", exercises: ["20 Squats × 3 sets", "15 Push-ups × 3 sets", "30s Plank × 3 sets", "20 Jumping Jacks × 3 sets"] },
          { day: "Tuesday", exercises: ["Rest or 30min Walk", "10min Stretching", "Deep breathing exercises"] },
          { day: "Wednesday", exercises: ["20 Lunges × 3 sets", "10 Tricep Dips × 3 sets", "15 Glute Bridges × 3 sets", "20 High Knees × 3 sets"] },
          { day: "Thursday", exercises: ["Rest or Yoga", "15min Light stretching"] },
          { day: "Friday", exercises: ["25 Squats × 3 sets", "20 Push-ups × 3 sets", "40s Plank × 3 sets", "Burpees × 10 × 3 sets"] },
          { day: "Saturday", exercises: ["30min Brisk Walk or Jog", "Core circuit × 3 rounds"] },
          { day: "Sunday", exercises: ["Full Rest Day", "Hydrate well", "Meal prep for next week"] },
        ],
      },
      {
        week: "Week 3–4", theme: "Build", icon: "⚡",
        days: [
          { day: "Monday", exercises: ["30 Squats × 4 sets", "20 Push-ups × 4 sets", "45s Plank × 3 sets", "Mountain Climbers × 20 × 3"] },
          { day: "Wednesday", exercises: ["Jump Squats × 15 × 3", "Diamond Push-ups × 10 × 3", "Side Plank 30s each × 3", "Bicycle Crunches × 20 × 3"] },
          { day: "Friday", exercises: ["Full body HIIT 30 mins", "10 Burpees × 4 sets", "30 Squats × 4 sets", "20 Push-ups × 4 sets"] },
        ],
      },
      {
        week: "Week 5–6", theme: "Intensify", icon: "🏋️",
        days: [
          { day: "Monday", exercises: ["40 Squats × 4 sets", "25 Push-ups × 4 sets", "60s Plank × 3 sets", "20 Jump Lunges × 3 sets"] },
          { day: "Wednesday", exercises: ["Pistol Squat attempts × 5 each", "Wide Push-ups × 20 × 4", "V-Sit hold 20s × 4", "Sprint in place 45s × 5"] },
          { day: "Friday", exercises: ["45min HIIT session", "Tabata circuits", "Cooldown stretching 15mins"] },
        ],
      },
      {
        week: "Week 7–8", theme: "Peak", icon: "🏆",
        days: [
          { day: "Monday", exercises: ["50 Squats × 4 sets", "30 Push-ups × 4 sets", "90s Plank × 3 sets", "Full body circuit"] },
          { day: "Wednesday", exercises: ["Advanced HIIT 40mins", "Plyometric exercises", "Core destruction circuit"] },
          { day: "Friday", exercises: ["Test your max reps", "Compare with Week 1", "Celebrate your progress! 🎉"] },
        ],
      },
    ],
    tips: ["Drink 2–3 litres of water daily", "Sleep 7–8 hours — this is when muscles grow", "Take progress photos every 2 weeks", "Skip junk food on weekdays", "Consistency beats intensity"],
  },

  heartbreak: {
    id: "heartbreak", emoji: "💔",
    title: "30-Day Heartbreak Recovery",
    subtitle: "Heal. Grow. Glow Up.",
    tagline: "Turn your pain into your most powerful transformation yet.",
    price: "$2.99", priceUSD: "", priceNum: 300,
    color: "#E91E8C", accent: "#FF6EB4", bg: "#0A0A14",
    features: ["30-Day Recovery Roadmap", "4 Healing Phases", "Daily Affirmations", "Glow Up Checklist", "Universal Meal Guide"],
    phases: [
      {
        phase: "Phase 1: Feel It (Days 1–7)", icon: "🌧️", color: "#7B6EF6",
        description: "Don't suppress. Process your emotions safely.",
        daily: ["Morning: Write 3 things you're feeling (journal — no filter)", "Afternoon: 20min walk alone, no phone, just breathe", "Evening: Read 10 pages of any self-help book", "Night: Write what you learned about yourself today"],
        affirmations: ["I am allowed to grieve", "This pain is temporary", "I am not what happened to me"],
        doNot: ["Don't stalk their social media", "Don't text them", "Don't make big life decisions yet"],
      },
      {
        phase: "Phase 2: Rebuild (Days 8–17)", icon: "🌱", color: "#06C270",
        description: "Start investing in yourself again.",
        daily: ["Morning: 20min workout or walk + cold shower", "Afternoon: Learn one new skill (YouTube, free course)", "Evening: Cook something new or try a hobby", "Night: List 3 things you're grateful for"],
        affirmations: ["I am becoming someone amazing", "My future is bright", "I choose to invest in me"],
        doNot: ["Don't rush into a new relationship", "Don't isolate completely", "Don't neglect your health"],
      },
      {
        phase: "Phase 3: Glow Up (Days 18–25)", icon: "✨", color: "#FF6B35",
        description: "Level up every area of your life.",
        daily: ["Morning: Affirmations + 30min workout", "Afternoon: Work on a goal (business, career, skill)", "Evening: Dress up and go out — even alone", "Night: Visualize your ideal future self"],
        affirmations: ["I am magnetic and attractive", "Good things are coming to me", "I radiate confidence"],
        doNot: ["Don't compare your healing to others", "Don't go back out of loneliness", "Don't shrink yourself"],
      },
      {
        phase: "Phase 4: Rise (Days 26–30)", icon: "🚀", color: "#E91E8C",
        description: "You've transformed. Now own it.",
        daily: ["Morning: Set 3 goals for the next 90 days", "Afternoon: Reach out to someone you've neglected", "Evening: Do something that scares you (apply, post, speak)", "Night: Write a letter to your future self"],
        affirmations: ["I am whole on my own", "I attract what I deserve", "I am ready for what's next"],
        doNot: ["Don't minimize your growth", "Don't forget your worth", "Don't settle ever again"],
      },
    ],
    glowChecklist: ["Get a new haircut or hairstyle", "Update your wardrobe (even one new outfit)", "Start a fitness routine", "Reconnect with old friends", "Learn a new skill or start a side hustle", "Delete/archive old photos (when ready)", "Set new personal goals", "Travel somewhere new (even within Kenya)", "Start journaling daily", "Celebrate every small win"],
  },

  richonline: {
    id: "richonline", emoji: "💰",
    title: "Make Money Online Blueprint",
    subtitle: "From Zero to Income — Global Edition",
    tagline: "Legit ways to earn online starting with just your phone.",
    price: "$5.99", priceUSD: "", priceNum: 700,
    color: "#00C853", accent: "#69F0AE", bg: "#030D07",
    features: ["5 Proven Income Methods", "Step-by-Step Guides", "Free Tools List", "Mistakes to Avoid", "Universal Meal Guide"],
    methods: [
      { name: "Freelancing", icon: "🖥️", potential: "$80–600/mo", timeline: "1–3 months", description: "Sell skills like writing, design, coding, video editing online.", platforms: ["Fiverr.com", "Upwork.com", "PeoplePerHour", "Toptal"], steps: ["Pick ONE skill you have or can learn fast", "Create a Fiverr profile — use a professional photo", "Create 3 gigs with clear descriptions", "Start at low prices to get first 5 reviews", "Deliver excellent work → get 5-star reviews", "Raise prices after 10+ reviews", "Withdraw via Payoneer → M-Pesa or Equity Bank"] },
      { name: "Content Creation", icon: "📱", potential: "$40–1,500/mo", timeline: "3–6 months", description: "Create TikTok, YouTube, or Instagram content and monetize.", platforms: ["TikTok", "YouTube", "Instagram", "Facebook"], steps: ["Pick a niche: comedy, finance, fitness, cooking, Kenyan life", "Post consistently — 3–5 times per week minimum", "Grow to 1,000+ followers/subscribers", "Join TikTok Creator Fund or YouTube Partner Program", "Get brand deals from Kenyan companies", "Sell your own products to your audience"] },
      { name: "Reselling", icon: "📦", potential: "$120–800/mo", timeline: "2–4 weeks", description: "Buy low, sell high — or sell without holding stock.", platforms: ["Jumia", "Facebook Marketplace", "WhatsApp", "Instagram Shop"], steps: ["Find trending products (electronics, fashion, beauty)", "Source from Alibaba, local wholesalers, or Gikomba", "List on Jumia or create a WhatsApp catalog", "Market on social media with photos/videos", "Collect M-Pesa, deliver via G4S or own rider", "Reinvest profits to scale inventory"] },
      { name: "Digital Products", icon: "📄", potential: "$40–400/mo", timeline: "1 week", description: "Create once, sell forever — ebooks, templates, courses.", platforms: ["Selar.co", "Gumroad", "WhatsApp", "Payhip"], steps: ["Create a PDF guide or mini course on Canva", "Set up a Selar.co account (accepts M-Pesa)", "Price between $2–12", "Market on TikTok, Instagram, Facebook groups", "Use testimonials to boost credibility", "Create multiple products for passive income"] },
      { name: "Affiliate Marketing", icon: "🔗", potential: "$25–320/mo", timeline: "1–2 months", description: "Promote other products and earn commissions.", platforms: ["Jumia Affiliate", "Amazon Associates", "ClickBank", "Local brands"], steps: ["Sign up for Jumia Affiliate Program (free)", "Get your unique referral links", "Share in WhatsApp groups, Facebook, TikTok", "Earn 3–11% commission on every sale", "Scale by building a trusting audience"] },
    ],
    tools: [
      { name: "Canva", use: "Design graphics, PDFs, thumbnails", cost: "Free" },
      { name: "Selar.co", use: "Sell digital products with M-Pesa", cost: "Free (5% commission)" },
      { name: "Payoneer", use: "Receive international payments", cost: "Free to sign up" },
      { name: "ChatGPT", use: "Write content, emails, descriptions", cost: "Free tier available" },
      { name: "CapCut", use: "Edit videos for TikTok/YouTube", cost: "Free" },
      { name: "Google Workspace", use: "Docs, Sheets, Drive for business", cost: "Free" },
    ],
    mistakes: ["Trying 5 things at once — pick ONE and master it first", "Expecting money in week 1 — give it 30–90 days minimum", "Falling for get-rich-quick schemes and pyramid schemes", "Not reinvesting early profits back into the business", "Giving up before seeing results"],
  },
};

// ─── Shared: Meal Guide ────────────────────────────────────────────────────────
function MealGuide({ planColor }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ color: planColor, fontSize: 20, margin: "0 0 4px", letterSpacing: 1 }}>🥗 UNIVERSAL MEAL GUIDE</h2>
      <p style={{ color: "#555", fontSize: 12, margin: "0 0 20px", fontFamily: "'DM Sans',sans-serif" }}>Works for all goals — fitness, healing, productivity</p>
      {universalMeals.map((section, si) => (
        <div key={si} style={{ marginBottom: 8 }}>
          <button onClick={() => setOpenIdx(openIdx === si ? -1 : si)} style={{ width: "100%", background: openIdx === si ? `${planColor}18` : "#1a1a1a", border: `1px solid ${openIdx === si ? planColor : "#2a2a2a"}`, borderRadius: openIdx === si ? "10px 10px 0 0" : 10, padding: "13px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: openIdx === si ? planColor : "#ccc", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600 }}>{section.time}</span>
            <span style={{ color: planColor, fontSize: 20, fontWeight: 300 }}>{openIdx === si ? "−" : "+"}</span>
          </button>
          {openIdx === si && (
            <div style={{ background: "#111", border: `1px solid #2a2a2a`, borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              {section.options.map((opt, oi) => (
                <div key={oi} style={{ padding: "12px 16px", borderBottom: oi < section.options.length - 1 ? "1px solid #1e1e1e" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: "#ddd", fontFamily: "'DM Sans',sans-serif", fontSize: 13, flex: 1, paddingRight: 8 }}>{opt.name}</span>
                    <span style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 11, flexShrink: 0 }}>{opt.calories}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {opt.tags.map((tag) => <span key={tag} style={{ background: `${tagColor(tag)}22`, color: tagColor(tag), padding: "2px 8px", borderRadius: 20, fontSize: 10, fontFamily: "'DM Sans',sans-serif", border: `1px solid ${tagColor(tag)}44` }}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Payment Screen ────────────────────────────────────────────────────────────
function PaymentScreen({ plan, onSuccess }) {
  const [step, setStep] = useState("method");   // method → details → processing → done
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [error, setError] = useState("");
  const [dots, setDots] = useState(1);

  const method = paymentMethods.find(m => m.id === selectedMethod);

  const formatCard = (val) => val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, "");
    return d.length >= 2 ? d.slice(0, 2) + " / " + d.slice(2, 4) : d;
  };

  const handleFieldChange = (id, raw) => {
    let val = raw;
    if (id === "cardnum") val = formatCard(raw);
    if (id === "expiry") val = formatExpiry(raw);
    if (id === "cvv") val = raw.replace(/\D/g, "").slice(0, 3);
    setFieldValues(v => ({ ...v, [id]: val }));
    setError("");
  };

  const handlePay = () => {
    if (!method) return;
    let err = null;
    if (method.id === "card") {
      err = method.validate(fieldValues);
    } else if (method.fields.length > 0) {
      err = method.validate(fieldValues[method.fields[0].id] || "");
    }
    if (err) { setError(err); return; }
    setStep("processing");
    let d = 1;
    const iv = setInterval(() => { d = (d % 3) + 1; setDots(d); }, 500);
    setTimeout(() => { clearInterval(iv); setStep("done"); }, 3200);
  };

  // Done
  if (step === "done") return (
    <div style={{ minHeight: "100vh", background: plan.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>✅</div>
      <h2 style={{ color: plan.color, fontFamily: "'DM Sans',sans-serif", fontSize: 26, margin: "0 0 8px", fontWeight: 800 }}>Payment Confirmed!</h2>
      <p style={{ color: "#aaa", fontFamily: "'DM Sans',sans-serif", fontSize: 14, margin: "0 0 6px" }}>You paid <strong style={{ color: "#fff" }}>{plan.price}</strong> via <strong style={{ color: method?.color }}>{method?.label}</strong></p>
      <p style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 13, margin: "0 0 32px" }}>Access granted instantly</p>
      <button onClick={onSuccess} style={{ background: plan.color, color: "#000", border: "none", borderRadius: 12, padding: "16px 32px", fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, cursor: "pointer", width: "100%" }}>
        Open {plan.title} →
      </button>
    </div>
  );

  // Processing
  if (step === "processing") return (
    <div style={{ minHeight: "100vh", background: plan.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 60, height: 60, borderRadius: "50%", border: `3px solid ${plan.color}33`, borderTop: `3px solid ${plan.color}`, animation: "spin 1s linear infinite", marginBottom: 24 }} />
      <h3 style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 18, margin: "0 0 8px" }}>Processing{".".repeat(dots)}</h3>
      <p style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 13, margin: "0 0 20px" }}>{method?.instruction || "Please wait..."}</p>
      <div style={{ background: "#1a1a1a", borderRadius: 12, padding: "12px 20px", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: method?.color, fontSize: 20 }}>{method?.icon}</span>
        <span style={{ color: "#aaa", fontFamily: "'DM Sans',sans-serif", fontSize: 12 }}>{method?.label} · {plan.price}</span>
      </div>
    </div>
  );

  // Method selection
  if (step === "method") return (
    <div style={{ minHeight: "100vh", background: plan.bg, padding: "0" }}>
      <div style={{ background: `linear-gradient(160deg, ${plan.bg} 0%, #111 100%)`, padding: "40px 24px 28px", borderBottom: `2px solid ${plan.color}33`, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 10 }}>{plan.emoji}</div>
        <h1 style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 22, margin: "0 0 6px", fontWeight: 800 }}>{plan.title}</h1>
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: 6, marginTop: 10, background: `${plan.color}18`, border: `1px solid ${plan.color}44`, borderRadius: 12, padding: "8px 20px" }}>
          <span style={{ color: plan.color, fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 900 }}>{plan.price}</span>
          <span style={{ color: "#555", fontSize: 12 }}></span>
        </div>
      </div>

      <div style={{ padding: "24px 20px" }}>
        <p style={{ color: "#444", fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 16px", textAlign: "center" }}>Choose Payment Method</p>
        {paymentMethods.map((m) => (
          <button key={m.id} onClick={() => { setSelectedMethod(m.id); setStep(m.manual ? "manual" : "details"); setFieldValues({}); setError(""); }}
            style={{ width: "100%", background: "#111", border: `1px solid #222`, borderRadius: 14, padding: "16px 18px", marginBottom: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = m.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#222"}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${m.color}18`, border: `1px solid ${m.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{m.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700 }}>{m.label}</div>
              <div style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 12, marginTop: 2 }}>{m.desc}</div>
            </div>
            <span style={{ color: "#333", fontSize: 18 }}>›</span>
          </button>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 16 }}>
          <span style={{ fontSize: 14 }}>🔒</span>
          <span style={{ color: "#333", fontFamily: "'DM Sans',sans-serif", fontSize: 11 }}>256-bit SSL Encryption · Payments are secure</span>
        </div>
      </div>
    </div>
  );

  // Manual payment (bank / crypto)
  if (step === "manual" && method) return (
    <div style={{ minHeight: "100vh", background: plan.bg, padding: "32px 24px" }}>
      <button onClick={() => setStep("method")} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, marginBottom: 24, padding: 0 }}>← Back</button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${method.color}18`, border: `1px solid ${method.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{method.icon}</div>
        <div>
          <h2 style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 20, margin: 0, fontWeight: 800 }}>{method.label}</h2>
          <p style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 13, margin: 0 }}>Manual transfer — send {plan.price}</p>
        </div>
      </div>
      <div style={{ background: "#1a1a1a", borderRadius: 14, overflow: "hidden", border: "1px solid #2a2a2a", marginBottom: 20 }}>
        {method.details.map((d, i) => (
          <div key={i} style={{ padding: "14px 18px", borderBottom: i < method.details.length - 1 ? "1px solid #2a2a2a" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 12 }}>{d.label}</span>
            <span style={{ color: "#ddd", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, maxWidth: "60%", textAlign: "right" }}>{d.value}</span>
          </div>
        ))}
      </div>
      <div style={{ background: `${method.color}12`, borderRadius: 12, padding: "14px 16px", border: `1px solid ${method.color}33`, marginBottom: 24 }}>
        <p style={{ color: "#aaa", fontFamily: "'DM Sans',sans-serif", fontSize: 13, margin: 0 }}>
          After sending payment, <strong style={{ color: "#fff" }}>WhatsApp us your proof of payment</strong> to receive instant access to your plan.
        </p>
      </div>
      <a href="https://wa.me/254700000000?text=I%20just%20paid%20for%20a%20plan%20on%20GlowPlans"
        style={{ display: "block", width: "100%", background: "#25D366", color: "#000", border: "none", borderRadius: 12, padding: "16px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
        📲 Send Proof via WhatsApp
      </a>
      <button onClick={handlePay} style={{ width: "100%", background: "transparent", border: `1px solid ${method.color}`, color: method.color, borderRadius: 12, padding: "14px", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 10 }}>
        I've Already Paid — Give Me Access
      </button>
    </div>
  );

  // Details step (phone / card / email)
  if (step === "details" && method) return (
    <div style={{ minHeight: "100vh", background: plan.bg, padding: "32px 24px" }}>
      <button onClick={() => setStep("method")} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, marginBottom: 24, padding: 0 }}>← Back</button>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${method.color}18`, border: `1px solid ${method.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{method.icon}</div>
        <div>
          <h2 style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 20, margin: 0, fontWeight: 800 }}>{method.label}</h2>
          <p style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 13, margin: 0 }}>Pay {plan.price} · {plan.priceUSD}</p>
        </div>
      </div>

      {/* Fields */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
        {method.fields.map((field) => (
          <div key={field.id} style={{ width: field.half ? "calc(50% - 6px)" : "100%", boxSizing: "border-box" }}>
            <label style={{ color: "#555", fontSize: 10, fontFamily: "'DM Sans',sans-serif", display: "block", marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>{field.label}</label>
            <input
              type={field.type || "text"}
              value={fieldValues[field.id] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLen}
              style={{ width: "100%", background: "#1a1a1a", border: `1px solid ${error ? "#ff444466" : "#2a2a2a"}`, borderRadius: 10, padding: "13px 14px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
      </div>
      {error && <p style={{ color: "#ff4444", fontSize: 12, fontFamily: "'DM Sans',sans-serif", margin: "0 0 16px" }}>{error}</p>}

      {method.instruction && (
        <div style={{ background: `${method.color}12`, borderRadius: 10, padding: "12px 14px", border: `1px solid ${method.color}33`, marginBottom: 20 }}>
          <p style={{ color: "#aaa", fontFamily: "'DM Sans',sans-serif", fontSize: 12, margin: 0 }}>{method.instruction}</p>
        </div>
      )}

      <button onClick={handlePay} style={{ width: "100%", background: `linear-gradient(135deg, ${method.color}, ${plan.color})`, color: "#000", border: "none", borderRadius: 12, padding: "16px", fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, cursor: "pointer", marginBottom: 14 }}>
        Pay {plan.price} via {method.label} →
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
        <span style={{ fontSize: 14 }}>🔒</span>
        <span style={{ color: "#333", fontFamily: "'DM Sans',sans-serif", fontSize: 11 }}>Secured · Encrypted · Safe</span>
      </div>
    </div>
  );

  return null;
}

// ─── Plan Content Components ───────────────────────────────────────────────────
function WorkoutContent({ plan }) {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("workout");
  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600;800&display=swap');`}</style>
      <div style={{ background: "linear-gradient(135deg,#0D0D0D 0%,#1a0a00 100%)", padding: "32px 24px 24px", borderBottom: `3px solid ${plan.color}` }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>{plan.emoji}</div>
        <h1 style={{ fontSize: 28, color: plan.color, margin: 0, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 2 }}>{plan.title}</h1>
        <p style={{ color: "#aaa", fontSize: 13, margin: "6px 0 0" }}>{plan.tagline}</p>
      </div>
      <div style={{ background: "#111", display: "flex", borderBottom: "1px solid #222" }}>
        {[{ id: "workout", label: "💪 Program" }, { id: "meals", label: "🥗 Meals" }, { id: "tips", label: "⚡ Tips" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "12px 4px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? plan.color : "transparent"}`, color: tab === t.id ? plan.color : "#555", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{t.label}</button>
        ))}
      </div>
      {tab === "workout" && (
        <>
          <div style={{ background: "#111", padding: "16px 24px 0" }}>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16 }}>
              {plan.weeks.map((w, i) => <button key={i} onClick={() => { setActiveWeek(i); setActiveDay(0); }} style={{ background: activeWeek === i ? plan.color : "#1a1a1a", color: activeWeek === i ? "#000" : "#aaa", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 600 }}>{w.icon} {w.week}</button>)}
            </div>
          </div>
          <div style={{ background: "#111", padding: "0 24px 20px" }}>
            <div style={{ background: `${plan.color}15`, borderRadius: 12, padding: 16, marginBottom: 16, border: `1px solid ${plan.color}33` }}>
              <h3 style={{ color: plan.color, margin: 0, fontSize: 18, fontFamily: "'Bebas Neue'" }}>{plan.weeks[activeWeek].icon} {plan.weeks[activeWeek].theme} Phase</h3>
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12 }}>
              {plan.weeks[activeWeek].days.map((d, i) => <button key={i} onClick={() => setActiveDay(i)} style={{ background: activeDay === i ? "#1a1a1a" : "transparent", color: activeDay === i ? plan.color : "#555", border: `1px solid ${activeDay === i ? plan.color : "#333"}`, padding: "6px 14px", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap", fontSize: 12 }}>{d.day.slice(0, 3)}</button>)}
            </div>
            {plan.weeks[activeWeek].days[activeDay] && (
              <div style={{ background: "#1a1a1a", borderRadius: 12, padding: 20, marginTop: 8 }}>
                <h4 style={{ color: "#fff", margin: "0 0 16px", fontSize: 15 }}>{plan.weeks[activeWeek].days[activeDay].day}</h4>
                {plan.weeks[activeWeek].days[activeDay].exercises.map((ex, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #2a2a2a" : "none" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${plan.color}22`, display: "flex", alignItems: "center", justifyContent: "center", color: plan.color, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ color: "#ddd", fontSize: 13 }}>{ex}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {tab === "meals" && <MealGuide planColor={plan.color} />}
      {tab === "tips" && <div style={{ padding: 24 }}>{plan.tips.map((tip, i) => <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}><span style={{ color: plan.color, flexShrink: 0 }}>→</span><span style={{ color: "#bbb", fontSize: 14 }}>{tip}</span></div>)}</div>}
    </div>
  );
}

function HeartbreakContent({ plan }) {
  const [activePhase, setActivePhase] = useState(0);
  const [checked, setChecked] = useState({});
  const [tab, setTab] = useState("phases");
  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;600;800&display=swap');`}</style>
      <div style={{ background: "linear-gradient(160deg,#0A0A14 0%,#1a0a1a 100%)", padding: "32px 24px 24px", borderBottom: `2px solid ${plan.color}` }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>{plan.emoji}</div>
        <h1 style={{ fontSize: 24, color: "#fff", margin: 0, fontFamily: "'Playfair Display',serif", lineHeight: 1.2 }}>{plan.title}</h1>
        <p style={{ color: plan.color, fontSize: 13, margin: "8px 0 0", fontStyle: "italic" }}>{plan.tagline}</p>
      </div>
      <div style={{ background: "#0f0d1a", display: "flex", borderBottom: "1px solid #222" }}>
        {[{ id: "phases", label: "🌙 Phases" }, { id: "meals", label: "🥗 Meals" }, { id: "glow", label: "✨ Glow Up" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "12px 4px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? plan.color : "transparent"}`, color: tab === t.id ? plan.color : "#555", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{t.label}</button>
        ))}
      </div>
      {tab === "phases" && (
        <div style={{ background: "#0f0d1a", padding: "20px 24px" }}>
          <div style={{ marginBottom: 16 }}>{plan.phases.map((p, i) => <button key={i} onClick={() => setActivePhase(i)} style={{ display: "block", width: "100%", textAlign: "left", background: activePhase === i ? `${p.color}22` : "transparent", border: `1px solid ${activePhase === i ? p.color : "#222"}`, borderRadius: 10, padding: "12px 16px", marginBottom: 8, cursor: "pointer" }}><span style={{ fontSize: 16 }}>{p.icon}</span><span style={{ color: activePhase === i ? p.color : "#777", fontSize: 13, fontWeight: 600, marginLeft: 10 }}>{p.phase}</span></button>)}</div>
          {(() => { const p = plan.phases[activePhase]; return <div><div style={{ background: `${p.color}15`, borderRadius: 12, padding: 16, border: `1px solid ${p.color}33`, marginBottom: 16 }}><p style={{ color: "#aaa", fontSize: 13, margin: 0, fontStyle: "italic" }}>{p.description}</p></div><h3 style={{ color: p.color, fontSize: 11, margin: "0 0 10px", letterSpacing: 2, textTransform: "uppercase" }}>Daily Routine</h3>{p.daily.map((item, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}><span style={{ color: p.color, flexShrink: 0 }}>◆</span><span style={{ color: "#ccc", fontSize: 13 }}>{item}</span></div>)}<h3 style={{ color: p.color, fontSize: 11, margin: "16px 0 10px", letterSpacing: 2, textTransform: "uppercase" }}>Affirmations</h3>{p.affirmations.map((aff, i) => <div key={i} style={{ background: "#1a1826", borderRadius: 8, padding: "12px 14px", marginBottom: 8, borderLeft: `3px solid ${p.color}` }}><p style={{ color: "#e0d0f0", fontFamily: "'Playfair Display',serif", fontSize: 13, margin: 0, fontStyle: "italic" }}>"{aff}"</p></div>)}<h3 style={{ color: "#ff4444", fontSize: 11, margin: "16px 0 10px", letterSpacing: 2, textTransform: "uppercase" }}>⚠️ Do NOT</h3>{p.doNot.map((item, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}><span style={{ color: "#ff4444", flexShrink: 0 }}>✗</span><span style={{ color: "#888", fontSize: 13 }}>{item}</span></div>)}</div>; })()}
        </div>
      )}
      {tab === "meals" && <div style={{ background: "#0A0A14" }}><MealGuide planColor={plan.color} /></div>}
      {tab === "glow" && <div style={{ background: "#0A0A14", padding: 24 }}><h2 style={{ color: plan.color, fontSize: 20, margin: "0 0 16px", fontFamily: "'Playfair Display',serif" }}>✨ Glow Up Checklist</h2>{plan.glowChecklist.map((item, i) => <label key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, cursor: "pointer" }}><div onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))} style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked[i] ? plan.color : "#444"}`, background: checked[i] ? plan.color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{checked[i] && <span style={{ color: "#000", fontSize: 11 }}>✓</span>}</div><span style={{ color: checked[i] ? plan.color : "#bbb", fontSize: 14, textDecoration: checked[i] ? "line-through" : "none" }}>{item}</span></label>)}<div style={{ marginTop: 16, background: `${plan.color}15`, borderRadius: 10, padding: 14, textAlign: "center" }}><span style={{ color: plan.color, fontSize: 13 }}>{Object.values(checked).filter(Boolean).length} / {plan.glowChecklist.length} completed</span></div></div>}
    </div>
  );
}

function RichOnlineContent({ plan }) {
  const [activeMethod, setActiveMethod] = useState(0);
  const [tab, setTab] = useState("methods");
  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=DM+Sans:wght@300;400;600;800&display=swap');`}</style>
      <div style={{ background: "linear-gradient(135deg,#030D07 0%,#001a0a 100%)", padding: "32px 24px 24px", borderBottom: `2px solid ${plan.color}` }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>{plan.emoji}</div>
        <h1 style={{ fontSize: 22, color: plan.color, margin: 0, fontFamily: "'Space Mono',monospace", lineHeight: 1.2 }}>{plan.title}</h1>
        <p style={{ color: "#666", fontSize: 13, margin: "6px 0 0" }}>{plan.tagline}</p>
      </div>
      <div style={{ background: "#0a150d", display: "flex", borderBottom: "1px solid #1a3320" }}>
        {[{ id: "methods", label: "💼 Methods" }, { id: "meals", label: "🥗 Fuel" }, { id: "tools", label: "🛠️ Tools" }].map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "12px 4px", background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? plan.color : "transparent"}`, color: tab === t.id ? plan.color : "#555", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{t.label}</button>)}
      </div>
      {tab === "methods" && <div style={{ background: "#0a150d" }}><div style={{ padding: "16px 24px 0" }}><div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16 }}>{plan.methods.map((m, i) => <button key={i} onClick={() => setActiveMethod(i)} style={{ background: activeMethod === i ? plan.color : "#0f1f13", color: activeMethod === i ? "#000" : "#777", border: `1px solid ${activeMethod === i ? plan.color : "#1a3320"}`, padding: "8px 14px", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 700 }}>{m.icon} {m.name}</button>)}</div></div><div style={{ padding: "0 24px 24px" }}>{(() => { const m = plan.methods[activeMethod]; return <div><div style={{ background: "#0f1f13", borderRadius: 12, padding: 18, border: "1px solid #1a3320", marginBottom: 18 }}><div style={{ display: "flex", gap: 20, marginBottom: 10 }}><div><div style={{ color: "#444", fontSize: 10, letterSpacing: 2 }}>POTENTIAL</div><div style={{ color: plan.color, fontSize: 13, fontWeight: 700 }}>{m.potential}</div></div><div><div style={{ color: "#444", fontSize: 10, letterSpacing: 2 }}>TIMELINE</div><div style={{ color: "#aaa", fontSize: 13 }}>{m.timeline}</div></div></div><p style={{ color: "#888", fontSize: 13, margin: 0 }}>{m.description}</p></div><h3 style={{ color: plan.color, fontSize: 11, margin: "0 0 12px", letterSpacing: 2, textTransform: "uppercase" }}>Step-by-Step</h3>{m.steps.map((step, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}><div style={{ width: 22, height: 22, borderRadius: 4, background: `${plan.color}22`, border: `1px solid ${plan.color}44`, display: "flex", alignItems: "center", justifyContent: "center", color: plan.color, fontSize: 10, flexShrink: 0, fontWeight: 700 }}>{i + 1}</div><span style={{ color: "#ccc", fontSize: 13, lineHeight: 1.5 }}>{step}</span></div>)}<h3 style={{ color: plan.color, fontSize: 11, margin: "16px 0 10px", letterSpacing: 2, textTransform: "uppercase" }}>Platforms</h3><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{m.platforms.map((p, i) => <span key={i} style={{ background: "#0f1f13", color: plan.accent, border: "1px solid #1a3320", padding: "5px 12px", borderRadius: 6, fontSize: 12 }}>{p}</span>)}</div></div>; })()}</div></div>}
      {tab === "meals" && <div style={{ background: "#030D07" }}><MealGuide planColor={plan.color} /></div>}
      {tab === "tools" && <div style={{ background: "#030D07", padding: 24 }}><h2 style={{ color: plan.color, fontSize: 18, margin: "0 0 16px", fontFamily: "'Space Mono',monospace" }}>🛠️ FREE TOOLS</h2>{plan.tools.map((t, i) => <div key={i} style={{ background: "#0a150d", borderRadius: 10, padding: "13px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #1a3320" }}><div><div style={{ color: plan.color, fontSize: 13, fontWeight: 700 }}>{t.name}</div><div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>{t.use}</div></div><span style={{ color: plan.accent, fontSize: 11, background: `${plan.color}15`, padding: "3px 10px", borderRadius: 20 }}>{t.cost}</span></div>)}<h2 style={{ color: "#ff4444", fontSize: 16, margin: "20px 0 12px", fontFamily: "'Space Mono',monospace" }}>⚠️ AVOID</h2>{plan.mistakes.map((m, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}><span style={{ color: "#ff4444", flexShrink: 0 }}>✗</span><span style={{ color: "#888", fontSize: 13 }}>{m}</span></div>)}</div>}
    </div>
  );
}

// ─── Landing Page ──────────────────────────────────────────────────────────────
function LandingPage({ onSelect, purchased }) {
  const planList = [plans.workout, plans.heartbreak, plans.richonline];
  return (
    <div style={{ minHeight: "100vh", background: "#080808" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600;800&display=swap'); @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }`}</style>
      <div style={{ padding: "44px 24px 32px", textAlign: "center", borderBottom: "1px solid #141414" }}>
        <div style={{ display: "inline-block", background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, padding: "4px 14px", marginBottom: 16 }}>
          <span style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 2 }}>DIGITAL PLANS STORE 🌍</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, color: "#fff", margin: "0 0 10px", letterSpacing: 3, lineHeight: 1 }}>TRANSFORM YOUR LIFE</h1>
        <p style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 14, margin: 0 }}>Choose a plan · Pay your way · Start today</p>
      </div>
      <div style={{ padding: "28px 20px 16px" }}>
        {/* Payment icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {paymentMethods.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 5, background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, padding: "4px 10px" }}>
              <span style={{ fontSize: 14 }}>{m.icon}</span>
              <span style={{ color: "#444", fontFamily: "'DM Sans',sans-serif", fontSize: 10 }}>{m.label}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#2a2a2a", fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, textTransform: "uppercase", textAlign: "center", margin: "0 0 16px" }}>Select a Plan</p>
        {planList.map((plan, i) => {
          const owned = purchased[plan.id];
          return (
            <div key={plan.id} onClick={() => onSelect(plan.id)}
              style={{ background: "#111", border: `1px solid ${owned ? plan.color + "55" : "#1e1e1e"}`, borderRadius: 16, padding: "20px", marginBottom: 14, cursor: "pointer", animation: `fadeUp 0.4s ease ${i * 0.1}s both`, position: "relative", overflow: "hidden", transition: "transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = plan.color; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = owned ? plan.color + "55" : "#1e1e1e"; }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${plan.color},${plan.accent})` }} />
              {owned && <div style={{ position: "absolute", top: 12, right: 12, background: `${plan.color}22`, border: `1px solid ${plan.color}`, borderRadius: 20, padding: "2px 10px" }}><span style={{ color: plan.color, fontSize: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}>✓ OWNED</span></div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, paddingRight: 8 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{plan.emoji}</div>
                  <h3 style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 16, margin: "0 0 4px", fontWeight: 800 }}>{plan.title}</h3>
                  <p style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 13, margin: "0 0 12px" }}>{plan.subtitle}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{plan.features.slice(0, 3).map(f => <span key={f} style={{ background: `${plan.color}15`, color: plan.color, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'DM Sans',sans-serif" }}>{f}</span>)}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: plan.color, fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 900 }}>{plan.price}</div>
                  <div style={{ color: "#333", fontFamily: "'DM Sans',sans-serif", fontSize: 10, marginBottom: 8 }}>{plan.priceUSD}</div>
                  <div style={{ background: owned ? `${plan.color}22` : `linear-gradient(135deg,${plan.color},${plan.accent})`, color: owned ? plan.color : "#000", border: owned ? `1px solid ${plan.color}` : "none", borderRadius: 8, padding: "8px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 800 }}>{owned ? "Open →" : "Buy →"}</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bundle */}
        <div style={{ background: "linear-gradient(135deg,#1a1200,#0d1a00,#0d0012)", border: "1px solid #FFD16655", borderRadius: 16, padding: "18px 20px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#FF6B35,#E91E8C,#00C853)" }} />
          <div style={{ position: "absolute", top: 12, right: 12, background: "#FFD16622", border: "1px solid #FFD16666", borderRadius: 20, padding: "2px 10px" }}><span style={{ color: "#FFD166", fontSize: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}>BEST VALUE</span></div>
          <h3 style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 16, margin: "0 0 4px", fontWeight: 800 }}>💎 All 3 Plans Bundle</h3>
          <p style={{ color: "#777", fontFamily: "'DM Sans',sans-serif", fontSize: 13, margin: "0 0 12px" }}>Everything included · Save $2.99</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: "#555", fontFamily: "'DM Sans',sans-serif", fontSize: 12, textDecoration: "line-through" }}>$11.99</span>
              <span style={{ color: "#FFD166", fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 900, marginLeft: 8 }}>$9.99</span>
            </div>
            <div style={{ background: "linear-gradient(135deg,#FFD166,#FF6B35)", color: "#000", borderRadius: 8, padding: "8px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>Get Bundle →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [purchased, setPurchased] = useState({});
  const selectedId = screen.includes(":") ? screen.split(":")[1] : null;
  const selectedPlan = selectedId ? plans[selectedId] : null;

  if (screen === "landing") return <div style={{ maxWidth: 480, margin: "0 auto" }}><LandingPage purchased={purchased} onSelect={(id) => setScreen(purchased[id] ? `content:${id}` : `pay:${id}`)} /></div>;

  if (screen.startsWith("pay:") && selectedPlan) return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: selectedPlan.bg, minHeight: "100vh" }}>
      <div style={{ background: "#080808", borderBottom: "1px solid #1a1a1a", padding: "10px 16px" }}>
        <button onClick={() => setScreen("landing")} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: 0 }}>← Back to Store</button>
      </div>
      <PaymentScreen plan={selectedPlan} onSuccess={() => { setPurchased(p => ({ ...p, [selectedId]: true })); setScreen(`content:${selectedId}`); }} />
    </div>
  );

  if (screen.startsWith("content:") && selectedPlan) return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: selectedPlan.bg, minHeight: "100vh" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#080808", borderBottom: "1px solid #1a1a1a", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={() => setScreen("landing")} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: 0 }}>← Store</button>
        <span style={{ color: "#222" }}>|</span>
        <span style={{ color: selectedPlan.color, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700 }}>{selectedPlan.emoji} {selectedPlan.title}</span>
      </div>
      {selectedId === "workout" && <WorkoutContent plan={selectedPlan} />}
      {selectedId === "heartbreak" && <HeartbreakContent plan={selectedPlan} />}
      {selectedId === "richonline" && <RichOnlineContent plan={selectedPlan} />}
      <div style={{ background: "#080808", padding: "20px 24px", borderTop: "1px solid #141414", textAlign: "center" }}>
        <p style={{ color: "#1e1e1e", fontFamily: "'DM Sans',sans-serif", fontSize: 11, margin: 0 }}>Sell on Selar.co · Accept M-Pesa · Market on TikTok</p>
      </div>
    </div>
  );

  return null;
}



