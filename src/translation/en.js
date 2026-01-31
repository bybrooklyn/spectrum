module.exports = {
    title: 'Gender & Sexuality Spectrum',
    description: 'Where are you on the Gender & Sexuality Spectrum?',
    keywords: 'gender, identity, expression, sexual, orientation, drive, romantic, desire, relationship, male, nonbinary, female, masculine, feminine, straight, bi, pan, gay, asexual, ace, aromantic, romantic, monogamy, polyamory, vanilla, bdsm',
    generate: 'Share yours',
    generateHelper: '(click on the sliders to select values)',
    mine: 'My Gender & Sexuality Spectrum',
    author: {
        name: 'Andrea Vos',
        email: 'andrea@avris.it',
        attribution: 'Made with 💜 by Andrea Vos',
        support: 'Buy me a beer',
    },
    source: 'Source code',
    axes: {
        genderIdentity: {
            label: 'Gender identity',
            left: 'Man',
            middle: 'Nonbinary',
            right: 'Woman',
        },
        genderExpression: {
            label: 'Gender expression',
            left: 'Hypermasculine',
            middle: 'Androgynous',
            right: 'Hyperfeminine',
        },
        sexualOrientation: {
            label: 'Sexual orientation',
            left: 'Straight',
            middle: 'Bi / Pan',
            right: 'Gay',
        },
        sexualDrive: {
            label: 'Sexual drive',
            left: 'None',
            middle: 'Regular',
            right: 'High',
        },
        romanticDesire: {
            label: 'Romantic desire',
            left: 'None',
            middle: 'Regular',
            right: 'High',
        },
        relationshipAttitude: {
            label: 'Relationship attitude',
            left: 'Monogamous',
            middle: 'Open',
            right: 'Polyamorous',
        },
        sexualExploration: {
            label: 'Sexual exploration',
            left: 'Vanilla',
            middle: 'Light play',
            right: 'Hard BDSM',
        },
    },
    share: {
        facebook: 'Share on Facebook',
        twitter: 'Share on Twitter',
        text: 'Here\'s my Gender &  Spectrum. What\'s yours?',
        copy: 'Copy to clipboard',
    },
    privacy: {
        header: 'Privacy',
        noData: 'All the information about the options you have selected are encoded in the URL and are not stored anywhere.',
        tracking: 'I use Plausible to analyse traffic on the website. All visitor data anonymised.',
        contact: 'If you have any questions or requests regarding your personal data, feel free to contact me at',
    },
    otherProjects: {
        cake: 'Attraction Layer Cake',
    },
    disclaimer: {
        header: 'Disclaimer:',
        author: 'I\'m not the author of the original concept of those axes. ' +
            'They were circulating online in form of a picture without a watermark ' +
            '– making it practically impossible to find the author. ' +
            'I just made an interactive version of it, with a few adjustments.',
        issues: 'I\'m aware that this representation of gender & sexuality is not perfect – but none is! ' +
            'Humans are more complex than just a few axes!',
        examples: 'Yes, us nonbinary folks aren\'t necessarily <em>in between</em> “men” and “women”, ' +
            'yes, lumping bisexuality and pansexuality together is not ideal, etc. etc. etc. ' +
            'But it\'s an approximation. ' +
            'If you come up with a better one, I\'d gladly make an app for it 😉',
    },
};
