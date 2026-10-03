import type { Translation } from '../locale-types.js';

export default {
  title: 'الطيف الجنسي',
  description: 'أين أنت على الطيف الجنسي؟',
  keywords:
    'الجنس، الهوية، التعبير، الجنسي، التوجه، القيادة، رومانسي، الرغبة، العلاقة، ذكر، غير ثنائي، أنثى، مذكر، مؤنث، ثنائي، مثلي الجنس، لاجنسي، لارومانسي، رومانسي، الزواج الأحادي، الزواج المتعدد',
  rtl: true,
  generate: 'المشاركة',
  generateHelper: '(حرّك أشرطة التمرير لاختيار القيم)',
  mine: 'الطيف الجنسي الخاص بي',
  translation: {
    attribution: 'مُترجَمة من قِبَل',
    name: 'متطوع'
  },
  axes: {
    genderIdentity: {
      label: 'الهوية الجنسية',
      farLeft: 'ذكر',
      left: 'ذكر',
      middle: 'غير ثنائي',
      right: 'أنثى',
      farRight: 'أنثى'
    },
    genderExpression: {
      label: 'التعبير الجنسي',
      farLeft: 'فرط ذكوري',
      left: 'فرط ذكوري',
      middle: 'ما بين',
      right: 'فرط أنثوي',
      farRight: 'فرط أنثوي'
    },
    sexualOrientation: {
      label: 'التوجه الجنسي',
      farLeft: 'محب للجنس الآخر',
      left: 'محب للجنس الآخر',
      middle: 'ثنائي/ة',
      right: 'مثلي الجنس',
      farRight: 'بان'
    },
    // TODO(i18n): native review of romanticOrientation + bi/pan terms
    romanticOrientation: {
      label: 'Romantic orientation',
      farLeft: 'Heteroromantic',
      left: 'Mostly heteroromantic',
      middle: 'Biromantic',
      right: 'Homoromantic',
      farRight: 'Panromantic'
    },
    sexualDrive: {
      label: 'الرغبة الجنسية',
      farLeft: 'غير موجودة',
      left: 'غير موجودة',
      middle: 'متوسطة',
      right: 'عالية',
      farRight: 'عالية'
    },
    romanticDesire: {
      label: 'الرغبة الرومانسية',
      farLeft: 'غير موجودة',
      left: 'غير موجودة',
      middle: 'متوسطة',
      right: 'عالية',
      farRight: 'عالية'
    },
    relationshipAttitude: {
      label: 'موقف العلاقة',
      farLeft: 'أحادية',
      left: 'أحادية',
      middle: 'منفتحة',
      right: 'متعددة',
      farRight: 'متعددة'
    },
    sexualExploration: {
      label: 'الاستكشاف الجنسي',
      farLeft: 'خفيف',
      left: 'خفيف',
      middle: 'عادي',
      right: 'عنيف',
      farRight: 'عنيف'
    }
  },
  // TODO(i18n): native review of radar strings
  radar: {
    title: 'نظرة عامة',
    show: 'عرض النظرة العامة',
    hide: 'إخفاء النظرة العامة',
    vertices: {
      genderSelf: { label: 'الهوية' },
      expression: { label: 'التعبير' },
      orientation: { label: 'التوجه' },
      desire: { label: 'الرغبة' },
      relationships: { label: 'العلاقات' },
      kink: { label: 'كينك' }
    }
  },
  share: {
    facebook: 'المشاركة على الفيسبوك',
    x: 'المشاركة على X',
    text: 'هذا الطيف الجنسي الخاص بي. ماذا عنك؟',
    copy: 'نسخ الرابط'
  },
  // TODO(i18n): native review of footer strings
  footer: {
    source: 'الشفرة المصدرية',
    rights: 'جميع الحقوق محفوظة'
  },
  disclaimer: {
    header: 'تنبيه:',
    author:
      'أنا لست صاحب المفهوم الأصلي لتلك المحاور. ' +
      'وتم تداولها عبر الإنترنت على شكل صورة بدون علامة مائية  ' +
      ' - مما يجعله من المستحيل عمليًا العثور على المؤلف. ' +
      ' لقد قمت بعمل نسخة تفاعلية منه، مع بعض التعديلات. ',
    issues:
      ' أنا أدرك أن هذا التمثيل للجنس ليس مثاليًا - لكن لا شيء كذلك! ' +
      ' البشر أكثر تعقيدًا من مجرد بضعة محاور! ',
    examples: '  نعم، نحن الأشخاص غير الثنائيين لسنا بالضرورة أن نكون <em>بين</em> "الذكر" و"الأنثى"، وما إلى ذلك، لكنه تقريبي. '
  }
} satisfies Translation;
