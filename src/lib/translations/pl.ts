// Polish translations: existing axes translated, new axes + UI fall back to English via locale.js
import type { Translation } from '../locale-types.js';

export default {
  title: 'Spektrum Płci i Seksualności',
  description: 'Gdzie znajdujesz się na Spektrum Płci i Seksualności?',
  keywords:
    'gender, identity, expression, sexual, orientation, drive, romantic, desire, relationship, male, nonbinary, female, masculine, feminine, straight, bi, pan, gay, asexual, ace, aromantic, romantic, monogamy, polyamory, vanilla, bdsm',
  generate: 'Udostępnij',
  generateHelper: '(przesuń suwaki, aby wybrać wartości 1–9; ✕ czyści oś.)',
  mine: 'Moje Spektrum Płci i Seksualności',
  translation: {
    attribution: 'Polskie tłumaczenie:',
    name: 'Avis Drożniak',
    link: 'https://zaimki.pl/@avis'
  },
  axes: {
    genderIdentity: {
      label: 'Identyfikacja płciowa',
      farLeft: 'Mężczyzna',
      left: 'Mężczyzna',
      middle: 'Niebinarnie',
      right: 'Kobieta',
      farRight: 'Kobieta'
    },
    genderExpression: {
      label: 'Wyrażenie płci',
      farLeft: 'Bardziej męskie',
      left: 'Bardziej męskie',
      middle: 'Androgyniczne',
      right: 'Bardziej kobiece',
      farRight: 'Bardziej kobiece'
    },
    sexualOrientation: {
      label: 'Orientacja seksualna',
      farLeft: 'Hetero',
      left: 'Hetero',
      middle: 'Bi',
      right: 'Homo',
      farRight: 'Pan'
    },
    // TODO(i18n): native review of romanticOrientation + pan terms
    romanticOrientation: {
      label: 'Romantic orientation',
      farLeft: 'Heteroromantic',
      left: 'Mostly heteroromantic',
      middle: 'Biromantic',
      right: 'Homoromantic',
      farRight: 'Panromantic'
    },
    sexualDrive: {
      label: 'Pociąg seksualny',
      farLeft: 'Brak',
      left: 'Brak',
      middle: 'Przeciętny',
      right: 'Wysoki',
      farRight: 'Wysoki'
    },
    romanticDesire: {
      label: 'Pociąg romantyczny',
      farLeft: 'Brak',
      left: 'Brak',
      middle: 'Przeciętny',
      right: 'Wysoki',
      farRight: 'Wysoki'
    },
    relationshipAttitude: {
      label: 'Postawa w związku',
      farLeft: 'Monogamia',
      left: 'Monogamia',
      middle: 'Otwarty',
      right: 'Poliamoria',
      farRight: 'Poliamoria'
    },
    sexualExploration: {
      label: 'Preferencje seksualne',
      farLeft: 'Delikatny seks',
      left: 'Delikatny seks',
      middle: 'Lekkie BDSM',
      right: 'Silne BDSM',
      farRight: 'Silne BDSM'
    }
  },
  // TODO(i18n): native review of radar strings
  radar: {
    title: 'Przegląd',
    show: 'Pokaż podsumowanie',
    hide: 'Ukryj podsumowanie',
    vertices: {
      genderSelf: { label: 'Płeć' },
      expression: { label: 'Ekspresja' },
      orientation: { label: 'Orientacja' },
      desire: { label: 'Pożądanie' },
      relationships: { label: 'Relacje' },
      kink: { label: 'Kink' }
    }
  },
  share: {
    facebook: 'Udostępnij na Facebooku',
    x: 'Udostępnij na X',
    text: 'Oto moje Spektrum Płci i Seksualności. A jakie jest twoje?',
    copy: 'Skopiuj do schowka'
  },
  // TODO(i18n): native review of footer strings
  footer: {
    source: 'Kod źródłowy',
    rights: 'Wszelkie prawa zastrzeżone'
  },
  disclaimer: {
    header: 'Zastrzeżenie:',
    author:
      'Nie jestem autorum pomysłu tych osi. ' +
      'Krążyły w sieci w postaci obrazu bez znaku wodnego, ' +
      'przez co niemożliwym było znalezienie autora. ' +
      'Stworzyłum interaktywną wersję, z kilkoma poprawkami...',
    issues:
      'Zdaję sobie sprawę, że ta reprezentacja płci i seksualności nie jest idealna - ale żadna nie jest! ' +
      'Ludzie są bardziej złożeni niż parę osi!',
    examples:
      'Tak, my, osoby niebinarne, niekoniecznie jesteśmy <em>pomiędzy</em> „mężczyzną” a „kobietą”, ' +
      'tak, ułożenie bi pośrodku, a pan na końcu jednej linii to uproszczenie, itd. ' +
      'Ale to tylko przybliżenie. ' +
      'Jeżeli pokażesz lepszą metodę, z radością zrobię dla niej aplikację 😉'
  }
} satisfies Translation;
