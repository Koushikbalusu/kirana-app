/**
 * Best-effort Latin/transliteration → Telugu script reconstruction.
 * Approximate by nature (dental vs retroflex t/d/n can't be told apart
 * from Latin spelling alone, vowel length is dropped, conjuncts like
 * "ksh" aren't specially handled) -- used only as a fallback when the
 * curated glossary (src/lib/i18n/grocery-glossary.ts) doesn't already
 * have an exact match. Callers should flag results from this as
 * unverified/approximate rather than presenting them as authoritative.
 */

const VOWEL_CLUSTERS: [string, number, number][] = [
  // [latin, independentVowelCodepoint, matraCodepoint(0 = inherent 'a', no matra)]
  ["ai", 0x0c10, 0x0c48],
  ["au", 0x0c14, 0x0c4c],
  ["aa", 0x0c05, 0], // long a collapses to short/inherent, matches our simplified transliteration scheme
  ["ee", 0x0c0f, 0x0c47],
  ["ii", 0x0c07, 0x0c3f],
  ["oo", 0x0c13, 0x0c4a],
  ["uu", 0x0c09, 0x0c41],
  ["a", 0x0c05, 0],
  ["i", 0x0c07, 0x0c3f],
  ["u", 0x0c09, 0x0c41],
  ["e", 0x0c0e, 0x0c46],
  ["o", 0x0c12, 0x0c4a],
];

const CONSONANT_CLUSTERS: [string, number][] = [
  ["chh", 0x0c1b],
  ["ksh", 0x0c15], // approximate: renders as "k" + following vowel, drops the conjunct's "sh"
  ["ph", 0x0c2b],
  ["bh", 0x0c2d],
  ["gh", 0x0c18],
  ["kh", 0x0c16],
  ["jh", 0x0c1d],
  ["dh", 0x0c27],
  ["th", 0x0c25],
  ["sh", 0x0c36],
  ["ch", 0x0c1a],
  ["ng", 0x0c19],
  ["ny", 0x0c1e],
  ["k", 0x0c15],
  ["g", 0x0c17],
  ["j", 0x0c1c],
  ["t", 0x0c24],
  ["d", 0x0c26],
  ["n", 0x0c28],
  ["p", 0x0c2a],
  ["b", 0x0c2c],
  ["m", 0x0c2e],
  ["y", 0x0c2f],
  ["r", 0x0c30],
  ["l", 0x0c32],
  ["v", 0x0c35],
  ["w", 0x0c35],
  ["s", 0x0c38],
  ["h", 0x0c39],
];

const VIRAMA = 0x0c4d;

function matchLongest(clusters: [string, ...number[]][], text: string, pos: number): [string, ...number[]] | null {
  for (const cluster of clusters) {
    const key = cluster[0] as string;
    if (text.startsWith(key, pos)) return cluster;
  }
  return null;
}

function transliterateWord(word: string): string {
  const text = word.toLowerCase();
  let out = "";
  let i = 0;

  while (i < text.length) {
    const consonant = matchLongest(CONSONANT_CLUSTERS as [string, ...number[]][], text, i);
    if (consonant) {
      const [key, codepoint] = consonant;
      out += String.fromCodePoint(codepoint as number);
      i += (key as string).length;

      const vowel = matchLongest(VOWEL_CLUSTERS as [string, ...number[]][], text, i);
      if (vowel) {
        const [vkey, , matra] = vowel;
        if (matra) out += String.fromCodePoint(matra as number);
        i += (vkey as string).length;
      } else {
        // No vowel follows -- suppress the inherent 'a' unless we're at
        // the end of the word (bare trailing consonants are rare/odd in
        // Telugu; treating word-final consonants as keeping the inherent
        // vowel reads more naturally for casual transliterations).
        if (i < text.length) out += String.fromCodePoint(VIRAMA);
      }
      continue;
    }

    const vowel = matchLongest(VOWEL_CLUSTERS as [string, ...number[]][], text, i);
    if (vowel) {
      const [vkey, independent] = vowel;
      out += String.fromCodePoint(independent as number);
      i += (vkey as string).length;
      continue;
    }

    // Unrecognized character (digits, punctuation, hyphens): pass through
    out += text[i];
    i++;
  }

  return out;
}

export function transliterateLatinToTelugu(input: string): string {
  return input
    .trim()
    .split(/\s+/)
    .map(transliterateWord)
    .join(" ");
}
