import type { Translation } from '../locale-types.js';

export default {
  title: 'Gender & Sexuality Spectrum',
  description: 'Where are you on the Gender & Sexuality Spectrum?',
  keywords:
    'gender, identity, expression, sexual, orientation, drive, romantic, desire, relationship, male, nonbinary, female, masculine, feminine, straight, bi, pan, gay, lesbian, asexual, ace, aromantic, romantic, monogamy, polyamory, vanilla, bdsm',
  generate: 'Share yours',
  generateHelper: '(move the sliders to select values, 1–9; ✕ clears an axis)',
  mine: 'My Gender & Sexuality Spectrum',
  skip: 'Skip to content',
  menu: 'Menu',
  axes: {
    genderIdentity: {
      label: 'Gender identity',
      farLeft: 'Man',
      left: 'Mostly man',
      middle: 'Nonbinary',
      right: 'Mostly woman',
      farRight: 'Woman'
    },
    genderExpression: {
      label: 'Gender expression',
      farLeft: 'Hypermasculine',
      left: 'Masculine',
      middle: 'Androgynous',
      right: 'Feminine',
      farRight: 'Hyperfeminine'
    },
    sexualOrientation: {
      label: 'Sexual orientation',
      farLeft: 'Straight',
      left: 'Mostly straight',
      middle: 'Bisexual/Pansexual',
      right: 'Mostly gay/lesbian',
      farRight: 'Gay/Lesbian'
    },
    romanticOrientation: {
      label: 'Romantic orientation',
      farLeft: 'Heteroromantic',
      left: 'Mostly heteroromantic',
      middle: 'Biromantic/Panromantic',
      right: 'Mostly homoromantic',
      farRight: 'Homoromantic'
    },
    sexualAttraction: {
      label: 'Sexual attraction',
      farLeft: 'None',
      left: 'Low',
      middle: 'Moderate',
      right: 'High',
      farRight: 'Very high'
    },
    sexualDrive: {
      label: 'Sexual drive (libido)',
      farLeft: 'None',
      left: 'Low',
      middle: 'Regular',
      right: 'High',
      farRight: 'Very high'
    },
    romanticDesire: {
      label: 'Romantic desire',
      farLeft: 'None',
      left: 'Low',
      middle: 'Regular',
      right: 'High',
      farRight: 'Very high'
    },
    relationshipAttitude: {
      label: 'Relationship attitude',
      farLeft: 'Monogamous',
      left: 'Mostly monogamous',
      middle: 'Open',
      right: 'Mostly polyamorous',
      farRight: 'Polyamorous'
    },
    genderComfort: {
      label: 'Gender comfort',
      farLeft: 'Strong dysphoria',
      left: 'Mild dysphoria',
      middle: 'Neutral',
      right: 'Comfortable',
      farRight: 'Euphoric'
    },
    kinkRole: {
      label: 'Kink role (power dynamic)',
      farLeft: 'Dominant',
      left: 'Dom-leaning',
      middle: 'Switch',
      right: 'Sub-leaning',
      farRight: 'Submissive'
    },
    sexualExploration: {
      label: 'Sexual exploration',
      farLeft: 'Vanilla',
      left: 'Curious',
      middle: 'Light play',
      right: 'Kinky',
      farRight: 'Hard BDSM'
    }
  },
  scale: {
    unset: 'Not set',
    value: 'Value'
  },
  radar: {
    title: 'Overview',
    hint: 'Average of each group’s set axes (1–9); unset axes are excluded.',
    empty: 'Set at least one slider to see your chart.',
    show: 'Show overview',
    hide: 'Hide overview',
    vertices: {
      genderSelf: { label: 'Gender self' },
      expression: { label: 'Expression' },
      orientation: { label: 'Orientation' },
      desire: { label: 'Desire' },
      relationships: { label: 'Relationships' },
      kink: { label: 'Kink' }
    }
  },
  // Kept for legacy ?sfw=1 result links; there is no SFW toggle in the UI.
  sfw: {
    hiddenNotice: 'NSFW axes are hidden in SFW mode and shared as unset.'
  },
  share: {
    copy: 'Copy to clipboard',
    copied: 'Copied!',
    text: "Here's my Gender & Sexuality Spectrum. What's yours?"
  },
  footer: {
    source: 'Source code',
    rights: 'All rights reserved'
  },
  disclaimer: {
    header: 'Disclaimer:',
    author:
      "I'm not the author of the original concept of those axes. " +
      'They were circulating online in form of a picture without a watermark ' +
      '– making it practically impossible to find the author. ' +
      'I just made an interactive version of it, with a few adjustments.',
    issues:
      "I'm aware that this representation of gender & sexuality is not perfect – but none is! " +
      'Humans are more complex than just a few axes!',
    examples:
      'Yes, us nonbinary folks aren\'t necessarily <em>in between</em> “men” and “women”, ' +
      'yes, placing bisexuality/pansexuality at the center and gay/lesbian identity at the end of a single line is a simplification, etc. etc. etc. ' +
      "But it's an approximation. " +
      "If you come up with a better one, I'd gladly make an app for it 😉"
  }
} satisfies Translation;
