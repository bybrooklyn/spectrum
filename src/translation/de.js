module.exports = {
    title: 'Geschlechtliches & Sexuelles Spektrum',
    description: 'Wo befindest du dich auf dem Spektrum von Geschlecht und Sexualität?',
    keywords: 'geschlecht, identität, ausdruck, sexuell, orientierung, trieb, romantik, wunsch, beziehung, männlich, nicht-binär, weiblich, maskulin, feminin, hetero, bi, pan, schwul, asexuell, ace, aromantisch, romantik, monogamie, polyamorie, vanilla, bdsm',
    generate: 'Teile deins',
    generateHelper: '(Klicke auf die Schieberegler, um Werte auszuwählen)',
    mine: 'Mein Geschlechtliches & Sexuelles Spektrum',
    author: {
        name: 'Andrea Vos',
        email: 'andrea@avris.it',
        attribution: 'Gemacht mit 💜 von Andrea Vos',
        support: 'Spendiere mir ein Bier',
    },
    translation: {
        attribution: 'Übersetzt von',
        name: 'Feuerhamster',
        link: 'https://gitlab.com/feuerhamster',
    },
    source: 'Quellcode',
    axes: {
        genderIdentity: {
            label: 'Geschlechtliche Identität',
            left: 'Männlich',
            middle: 'Nicht-Binär',
            right: 'Weiblich',
        },
        genderExpression: {
            label: 'Geschlechtlicher Ausdruck',
            left: 'Hyper-Maskulin',
            middle: 'Androgyn',
            right: 'Hyper-Feminin',
        },
        sexualOrientation: {
            label: 'Sexuelle Orientierung',
            left: 'Heterosexuell',
            middle: 'Bi / Pan',
            right: 'Homosexuell',
        },
        sexualDrive: {
            label: 'Sexualtrieb',
            left: 'Kein',
            middle: 'Regelmäßig',
            right: 'Hoch',
        },
        romanticDesire: {
            label: 'Romantische Wünsche',
            left: 'Keine',
            middle: 'Regelmäßige',
            right: 'Hohe',
        },
        relationshipAttitude: {
            label: 'Beziehungstyp',
            left: 'Monogam',
            middle: 'Offen',
            right: 'Polyamourös',
        },
        sexualExploration: {
            label: 'Sexuelle Vorlieben',
            left: 'Vanilla',
            middle: 'Leichte Fetische',
            right: 'Hartes BDSM',
        },
    },
    share: {
        facebook: 'Teile auf Facebook',
        twitter: 'Teile auf Twitter',
        text: 'Hier ist mein Geschlecht & Spektrum. Was ist deins?',
        copy: 'In die Zwischenablage kopieren',
    },
    privacy: {
        header: 'Datenschutz',
        noData: 'Alle Informationen über die von Ihnen gewählten Optionen sind in der URL kodiert und werden nirgendwo gespeichert.',
        tracking: 'Ich verwende Plausible, um den Verkehr auf der Website zu analysieren. Alle Besucherdaten sind anonymisiert.',
        contact: 'Wenn Sie Fragen oder Wünsche in Bezug auf Ihre persönlichen Daten haben, können Sie mich unter folgender Adresse kontaktieren',
    },
    otherProjects: {
        cake: 'Attraction Layer Cake',
    },
    disclaimer: {
        header: 'Disclaimer:',
        author: 'Ich bin nicht de Autore des ursprünglichen Konzepts für diese Achsen. ' +
            'Sie zirkulierten online in Form eines Bildes ohne Wasserzeichen ' +
            ' - was es praktisch unmöglich macht, den Urheber zu finden. ' +
            'Ich habe gerade eine interaktive Version davon erstellt, mit einigen Anpassungen',
        issues: 'Ich bin mir bewusst, dass diese Darstellung von Geschlecht und Sexualität nicht perfekt ist - aber das ist keine! ' +
            'Menschen sind komplexer als nur ein paar Achsen!',
        examples: 'Ja, wir nicht-binären Menschen sind nicht unbedingt <em>zwischen</em> "männlich" und "weiblich", ' +
            'ja, Bisexualität und Pansexualität in einen Topf zu werfen ist nicht ideal, etc. etc. etc. ' +
            'Aber es ist eine Annäherung. ' +
            'Wenn du eine bessere Idee hast, würde ich gerne eine App dafür machen 😉',
    },
};
