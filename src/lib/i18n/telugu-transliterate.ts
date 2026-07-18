/**
 * Basic Telugu-script → Latin phonetic transliteration (ITRANS-like).
 * Good enough for product-name approximations (e.g. "కందిపప్పు" → "kandi pappu"),
 * not a linguistically complete transliteration scheme.
 */

const INDEPENDENT_VOWELS: Record<number, string> = {
  0x0c05: "a", 0x0c06: "aa", 0x0c07: "i", 0x0c08: "ii", 0x0c09: "u", 0x0c0a: "uu",
  0x0c0b: "ru", 0x0c0e: "e", 0x0c0f: "ee", 0x0c10: "ai", 0x0c12: "o", 0x0c13: "oo", 0x0c14: "au",
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
  0x0c3e: "aa", 0x0c3f: "i", 0x0c40: "ii", 0x0c41: "u", 0x0c42: "uu",
  0x0c43: "ru", 0x0c46: "e", 0x0c47: "ee", 0x0c48: "ai", 0x0c4a: "o", 0x0c4b: "oo", 0x0c4c: "au",
};

const VIRAMA = 0x0c4d;
const ANUSVARA = 0x0c02;
const VISARGA = 0x0c03;
const CHANDRABINDU = 0x0c00;

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
      out += "m";
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
