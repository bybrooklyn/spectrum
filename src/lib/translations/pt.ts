import type { Translation } from '../locale-types.js';

export default {
  title: 'Espectro de Gênero e Sexualidade',
  description: 'Onde você está no Espectro de Gênero e Sexualidade?',
  keywords:
    'gênero, identidade, expressão, sexualidade, orientação, impulso, romântico, desejo, relacionamento, homem, não-binário, mulher, masculino, feminino, heterossexual, bi, pan, gay, assexual, ace, arromântico, romântico, monogamia, poliamor, baunilha, bdsm',
  generate: 'Compartilhe o seu',
  generateHelper: '(mova os sliders para selecionar valores)',
  mine: 'Meu Espectro de Gênero e Sexualidade',
  translation: {
    attribution: 'Traduzido por',
    name: 'Diogo de Souza',
    link: 'https://gitlab.com/sozua'
  },
  axes: {
    genderIdentity: {
      label: 'Identidade de Gênero',
      farLeft: 'Homem',
      left: 'Homem',
      middle: 'Não-binário',
      right: 'Mulher',
      farRight: 'Mulher'
    },
    genderExpression: {
      label: 'Expressão de Gênero',
      farLeft: 'Hipermasculino',
      left: 'Hipermasculino',
      middle: 'Andrógino',
      right: 'Hiperfeminino',
      farRight: 'Hiperfeminino'
    },
    sexualOrientation: {
      label: 'Orientação Sexual',
      farLeft: 'Heterossexual',
      left: 'Heterossexual',
      middle: 'Bi',
      right: 'Gay',
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
      label: 'Desejo Sexual',
      farLeft: 'Nenhum',
      left: 'Nenhum',
      middle: 'Regular',
      right: 'Alto',
      farRight: 'Alto'
    },
    romanticDesire: {
      label: 'Desejo Romântico',
      farLeft: 'Nenhum',
      left: 'Nenhum',
      middle: 'Regular',
      right: 'Alto',
      farRight: 'Alto'
    },
    relationshipAttitude: {
      label: 'Atitude em relação ao relacionamento',
      farLeft: 'Monogâmico',
      left: 'Monogâmico',
      middle: 'Aberto',
      right: 'Poliamoroso',
      farRight: 'Poliamoroso'
    },
    sexualExploration: {
      label: 'Exploração sexual',
      farLeft: 'Tradicional',
      left: 'Tradicional',
      middle: 'Brincadeiras leves',
      right: 'BDSM pesado',
      farRight: 'BDSM pesado'
    }
  },
  // TODO(i18n): native review of radar strings
  radar: {
    title: 'Resumo',
    show: 'Mostrar resumo',
    hide: 'Ocultar resumo',
    vertices: {
      genderSelf: { label: 'Gênero' },
      expression: { label: 'Expressão' },
      orientation: { label: 'Orientação' },
      desire: { label: 'Desejo' },
      relationships: { label: 'Relações' },
      kink: { label: 'Kink' }
    }
  },
  share: {
    facebook: 'Compartilhe no Facebook',
    x: 'Compartilhe no X',
    text: 'Este é o meu Espectro de Gênero e Sexualidade. Qual o seu?',
    copy: 'Copiar para a área de transferência'
  },
  // TODO(i18n): native review of footer strings
  footer: {
    source: 'Código fonte',
    rights: 'Todos os direitos reservados'
  },
  disclaimer: {
    header: 'Aviso:',
    author:
      'Não sou o autor do conceito original desses eixos. ' +
      "Eles estavam circulando online na forma de uma imagem sem marca d'água " +
      '– tornando praticamente impossível encontrar o autor. ' +
      'Eu apenas fiz uma versão interativa disso, com alguns ajustes.',
    issues:
      'Estou ciente de que esta representação de gênero e sexualidade não é perfeita – mas nenhuma é! ' +
      'Os seres humanos são mais complexos do que apenas alguns eixos!',
    examples: 'Mas é uma aproximação.'
  }
} satisfies Translation;
