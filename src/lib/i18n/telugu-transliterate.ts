/**
 * Basic Telugu-script → Latin phonetic transliteration (ITRANS-like).
 * Good enough for product-name approximations (e.g. "కందిపప్పు" → "Kandi Pappu"),
 * not a linguistically complete transliteration scheme. Vowel length
 * (short/long) is intentionally collapsed to a single Latin letter to
 * match how these words are commonly spelled casually, rather than
 * doubling vowels (which reads as unnatural, e.g. "Godhuma" not "Goodhuma").
 */

const INDEPENDENT_VOWELS: Record<number, string> = {
  0x0c05: "a", 0x0c06: "a", 0x0c07: "i", 0x0c08: "i", 0x0c09: "u", 0x0c0a: "u",
  0x0c0b: "ru", 0x0c0e: "e", 0x0c0f: "e", 0x0c10: "ai", 0x0c12: "o", 0x0c13: "o", 0x0c14: "au",
};

const CONSONANTS: Record<number, string> = {
  0x0c15: "k", 0x0c16: "kh", 0x0c17: "g", 0x0c18: "gh", 0x0c19: "ng",
  0x0c1a: "ch", 0x0c1b: "chh", 0x0c1c: "j", 0x0c1d: "jh", 0x0c1e: "ny",
  0x0c1f: "t", 0x0c20: "th", 0x0c21: "d", 0x0c22: "dh", 0x0c23: "n",
  0x0c24: "t", 0x0c25: "th", 0x0c26: "d", 0x0c27: "dh", 0x0c28: "n",
  0x0c2a: "p", 0x0c2b: "ph", 0x0c2c: "b", 0x0c2d: "bh", 0x0c2e: "m",
  0x0c2f: "y", 0x0c30: "r", 0x0c31: "rr", 0x0c32: "l", 0x0c33: "l",
  0x0c35: "v", 0x0c36: "sh", 0x0c37: "sh", 0x0c38: "s", 0x0c39: "h",
};

const VOWEL_SIGNS: Record<number, string> = {
  0x0c3e: "a", 0x0c3f: "i", 0x0c40: "i", 0x0c41: "u", 0x0c42: "u",
  0x0c43: "ru", 0x0c46: "e", 0x0c47: "e", 0x0c48: "ai", 0x0c4a: "o", 0x0c4b: "o", 0x0c4c: "au",
};

const VIRAMA = 0x0c4d;
const ANUSVARA = 0x0c02;
const VISARGA = 0x0c03;
const CHANDRABINDU = 0x0c00;

// Anusvara (ం) nasalizes to match the place of articulation of the
// following consonant -- e.g. before ప/బ/మ it's "m" (Pindi not Pimdi
// would actually be wrong the other way; this fixes the reverse case:
// before త/ద/న it's "n", not always "m").
function anusvaraSound(nextConsonantCodepoint: number | undefined): string {
  if (nextConsonantCodepoint === undefined) return "m";
  if (nextConsonantCodepoint >= 0x0c15 && nextConsonantCodepoint <= 0x0c19) return "ng"; // velar
  if (nextConsonantCodepoint >= 0x0c1a && nextConsonantCodepoint <= 0x0c28) return "n"; // palatal/retroflex/dental
  if (nextConsonantCodepoint >= 0x0c2a && nextConsonantCodepoint <= 0x0c2e) return "m"; // labial
  return "m";
}

export function transliterateTeluguToLatin(input: string): string {
  const chars = Array.from(input);
  let out = "";

  for (let i = 0; i < chars.length; i++) {
    const cp = chars[i].codePointAt(0)!;

    if (CONSONANTS[cp]) {
      out += CONSONANTS[cp];
      const next = chars[i + 1]?.codePointAt(0);
      if (next === VIRAMA) {
        i++; // suppress inherent 'a', consume virama
      } else if (next !== undefined && VOWEL_SIGNS[next]) {
        out += VOWEL_SIGNS[next];
        i++;
      } else {
        out += "a"; // inherent vowel
      }
      continue;
    }

    if (INDEPENDENT_VOWELS[cp]) {
      out += INDEPENDENT_VOWELS[cp];
      continue;
    }

    if (cp === ANUSVARA) {
      out += anusvaraSound(chars[i + 1]?.codePointAt(0));
      continue;
    }
    if (cp === VISARGA) {
      out += "h";
      continue;
    }
    if (cp === CHANDRABINDU) {
      out += "n";
      continue;
    }

    // Spaces, punctuation, digits, anything outside the Telugu block: pass through
    out += chars[i];
  }

  return out
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
