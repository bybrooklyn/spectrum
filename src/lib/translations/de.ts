import type { Translation } from '../locale-types.js';

export default {
  title: 'Geschlechtliches & Sexuelles Spektrum',
  description: 'Wo befindest du dich auf dem Spektrum von Geschlecht und Sexualität?',
  keywords:
    'geschlecht, identität, ausdruck, sexuell, orientierung, trieb, romantik, wunsch, beziehung, männlich, nicht-binär, weiblich, maskulin, feminin, hetero, bi, pan, schwul, asexuell, ace, aromantisch, romantik, monogamie, polyamorie, vanilla, bdsm',
  generate: 'Teile deins',
  generateHelper: '(Regler verschieben, um Werte 1–9 zu wählen; ✕ setzt zurück)',
  mine: 'Mein Geschlechtliches & Sexuelles Spektrum',
  translation: {
    attribution: 'Übersetzt von',
    name: 'Feuerhamster',
    link: 'https://gitlab.com/feuerhamster'
  },
  axes: {
    genderIdentity: {
      label: 'Geschlechtliche Identität',
      farLeft: 'Männlich',
      left: 'Männlich',
      middle: 'Nicht-Binär',
      right: 'Weiblich',
      farRight: 'Weiblich'
    },
    genderExpression: {
      label: 'Geschlechtlicher Ausdruck',
      farLeft: 'Hyper-Maskulin',
      left: 'Hyper-Maskulin',
      middle: 'Androgyn',
      right: 'Hyper-Feminin',
      farRight: 'Hyper-Feminin'
    },
    sexualOrientation: {
      label: 'Sexuelle Orientierung',
      farLeft: 'Heterosexuell',
      left: 'Heterosexuell',
      middle: 'Bi',
      right: 'Homosexuell',
      farRight: 'Pansexuell'
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
      label: 'Sexualtrieb',
      farLeft: 'Kein',
      left: 'Kein',
      middle: 'Regelmäßig',
      right: 'Hoch',
      farRight: 'Hoch'
    },
    romanticDesire: {
      label: 'Romantische Wünsche',
      farLeft: 'Keine',
      left: 'Keine',
      middle: 'Regelmäßige',
      right: 'Hohe',
      farRight: 'Hohe'
    },
    relationshipAttitude: {
      label: 'Beziehungstyp',
      farLeft: 'Monogam',
      left: 'Monogam',
      middle: 'Offen',
      right: 'Polyamourös',
      farRight: 'Polyamourös'
    },
    sexualExploration: {
      label: 'Sexuelle Vorlieben',
      farLeft: 'Vanilla',
      left: 'Vanilla',
      middle: 'Leichte Fetische',
      right: 'Hartes BDSM',
      farRight: 'Hartes BDSM'
    }
  },
  // TODO(i18n): native review of radar strings
  radar: {
    title: 'Überblick',
    show: 'Übersicht zeigen',
    hide: 'Übersicht ausblenden',
    vertices: {
      genderSelf: { label: 'Geschlecht' },
      expression: { label: 'Ausdruck' },
      orientation: { label: 'Orientierung' },
      desire: { label: 'Verlangen' },
      relationships: { label: 'Beziehungen' },
      kink: { label: 'Kink' }
    }
  },
  share: {
    facebook: 'Teile auf Facebook',
    x: 'Teile auf X',
    text: 'Hier ist mein Geschlecht & Spektrum. Was ist deins?',
    copy: 'In die Zwischenablage kopieren'
  },
  // TODO(i18n): native review of footer strings
  footer: {
    source: 'Quellcode',
    rights: 'Alle Rechte vorbehalten'
  },
  disclaimer: {
    header: 'Disclaimer:',
    author:
      'Ich bin nicht de Autore des ursprünglichen Konzepts für diese Achsen. ' +
      'Sie zirkulierten online in Form eines Bildes ohne Wasserzeichen ' +
      ' - was es praktisch unmöglich macht, den Urheber zu finden. ' +
      'Ich habe gerade eine interaktive Version davon erstellt, mit einigen Anpassungen',
    issues:
      'Ich bin mir bewusst, dass diese Darstellung von Geschlecht und Sexualität nicht perfekt ist - aber das ist keine! ' +
      'Menschen sind komplexer als nur ein paar Achsen!',
    examples:
      'Ja, wir nicht-binären Menschen sind nicht unbedingt <em>zwischen</em> "männlich" und "weiblich", ' +
      'ja, Bisexualität in die Mitte und Pansexualität ans Ende einer einzigen Linie zu setzen ist eine Vereinfachung, etc. etc. etc. ' +
      'Aber es ist eine Annäherung. ' +
      'Wenn du eine bessere Idee hast, würde ich gerne eine App dafür machen 😉'
  }
} satisfies Translation;
