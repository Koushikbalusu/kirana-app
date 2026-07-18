/**
 * Curated EN/Telugu-script/transliteration glossary for common kirana
 * grocery items. Generic machine translation (see /api/translate) is
 * unreliable for these — colloquial Indian grocery names like "Toor Dal"
 * often get phonetically transliterated ("టూర్ దాల్") instead of mapped to
 * the real native word ("కందిపప్పు"), because MT models don't have a
 * strong training signal for regional-language food/ingredient names.
 * A fixed vocabulary lookup beats general MT for exactly this kind of
 * small, well-known, domain-specific word list.
 */

export interface GlossaryEntry {
  en: string;
  teScript: string;
  teTransliteration: string;
}

export const GROCERY_GLOSSARY: GlossaryEntry[] = [
  { en: "Toor Dal", teScript: "కందిపప్పు", teTransliteration: "Kandi Pappu" },
  { en: "Moong Dal", teScript: "పెసర పప్పు", teTransliteration: "Pesara Pappu" },
  { en: "Chana Dal", teScript: "శనగ పప్పు", teTransliteration: "Shanaga Pappu" },
  { en: "Urad Dal", teScript: "మినప పప్పు", teTransliteration: "Minapa Pappu" },
  { en: "Masoor Dal", teScript: "మసూర్ పప్పు", teTransliteration: "Masoor Pappu" },
  { en: "Rice", teScript: "బియ్యం", teTransliteration: "Biyyam" },
  { en: "Sona Masoori Rice", teScript: "సోనా మసూరి బియ్యం", teTransliteration: "Sona Masoori Biyyam" },
  { en: "Wheat Flour", teScript: "గోధుమ పిండి", teTransliteration: "Godhuma Pindi" },
  { en: "Rice Flour", teScript: "బియ్యప్పిండి", teTransliteration: "Biyyappindi" },
  { en: "Sugar", teScript: "చక్కెర", teTransliteration: "Chakkera" },
  { en: "Salt", teScript: "ఉప్పు", teTransliteration: "Uppu" },
  { en: "Iodised Salt", teScript: "ఉప్పు", teTransliteration: "Uppu" },
  { en: "Turmeric Powder", teScript: "పసుపు", teTransliteration: "Pasupu" },
  { en: "Red Chilli Powder", teScript: "కారం", teTransliteration: "Karam" },
  { en: "Coriander Powder", teScript: "ధనియాల పొడి", teTransliteration: "Dhaniyala Podi" },
  { en: "Cumin Seeds", teScript: "జీలకర్ర", teTransliteration: "Jeelakarra" },
  { en: "Mustard Seeds", teScript: "ఆవాలు", teTransliteration: "Aavalu" },
  { en: "Sunflower Oil", teScript: "పొద్దుతిరుగుడు నూనె", teTransliteration: "Poddutirugudu Nune" },
  { en: "Groundnut Oil", teScript: "వేరుశనగ నూనె", teTransliteration: "Verusenaga Nune" },
  { en: "Ghee", teScript: "నెయ్యి", teTransliteration: "Neyyi" },
  { en: "Milk", teScript: "పాలు", teTransliteration: "Paalu" },
  { en: "Curd", teScript: "పెరుగు", teTransliteration: "Perugu" },
  { en: "Tea Powder", teScript: "టీ పొడి", teTransliteration: "Tea Podi" },
  { en: "Coffee Powder", teScript: "కాఫీ పొడి", teTransliteration: "Coffee Podi" },
  { en: "Onion", teScript: "ఉల్లిపాయ", teTransliteration: "Ullipaya" },
  { en: "Potato", teScript: "బంగాళదుంప", teTransliteration: "Bangaladumpa" },
  { en: "Tomato", teScript: "టమాటా", teTransliteration: "Tomato" },
  { en: "Garlic", teScript: "వెల్లుల్లి", teTransliteration: "Vellulli" },
  { en: "Ginger", teScript: "అల్లం", teTransliteration: "Allam" },
  { en: "Green Chilli", teScript: "పచ్చిమిర్చి", teTransliteration: "Pachimirchi" },
  { en: "Coconut", teScript: "కొబ్బరికాయ", teTransliteration: "Kobbarikaya" },
  { en: "Jaggery", teScript: "బెల్లం", teTransliteration: "Bellam" },
  { en: "Tamarind", teScript: "చింతపండు", teTransliteration: "Chintapandu" },
  { en: "Biscuit", teScript: "బిస్కెట్", teTransliteration: "Biscuit" },
  { en: "Parle-G Biscuit", teScript: "పార్లే-జి బిస్కెట్", teTransliteration: "Parle-G Biscuit" },
  { en: "Soap", teScript: "సబ్బు", teTransliteration: "Sabbu" },
  { en: "Detergent", teScript: "డిటర్జెంట్", teTransliteration: "Detergent" },
  { en: "Match Box", teScript: "అగ్గిపెట్టె", teTransliteration: "Aggipette" },
  { en: "Candle", teScript: "కొవ్వొత్తి", teTransliteration: "Kovvotti" },
  { en: "Egg", teScript: "గుడ్డు", teTransliteration: "Guddu" },
  { en: "Water Bottle", teScript: "నీళ్ల బాటిల్", teTransliteration: "Neella Bottle" },
  { en: "Bread", teScript: "బ్రెడ్", teTransliteration: "Bread" },
];

// Strips ALL whitespace and hyphens (not just collapsing it) since admins
// commonly type multi-word names as one word ("kandipappu", "toordal") --
// matching only on collapsed-but-still-spaced text would miss that.
function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[\s-]+/g, "");
}

export function lookupGlossary(
  field: "en" | "teScript" | "teTransliteration",
  value: string
): GlossaryEntry | null {
  const target = field === "teScript" ? value.trim() : normalize(value);
  return (
    GROCERY_GLOSSARY.find((entry) =>
      field === "teScript" ? entry.teScript === target : normalize(entry[field]) === target
    ) ?? null
  );
}
