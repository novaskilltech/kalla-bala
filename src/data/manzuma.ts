import { ManzumaVerse } from '@/types';

export const manzumaIntro = {
  titleAr: 'منظومة الوقف على «كَلَّا» و«بَلَى»',
  titleFr: 'Le poème didactique sur l\'arrêt sur « Kallā » et « Balā »',
  authorAr: 'للشيخ المقرئ علي بن محمد توفيق النحاس',
  authorFr: 'Par le Cheikh Ali ibn Muhammad Tawfiq Al-Nahhas',
  descriptionAr: 'أبيات تعليمية جامعة لضبط مواضع «كلا» و«بلى» في القرآن الكريم حفظًا واستحضارًا.',
  descriptionFr: 'Vers mnémotechniques résumant les règles et la répartition des 55 occurrences coraniques.',
};

export const manzumaVerses: ManzumaVerse[] = [
  {
    number: 1,
    sadr: 'بَدَأْتُ بِحَمْدِ اللهِ فِي الْبَدْءِ أَوَّلَا',
    ajuz: 'وَأَزْكَى صَلَاةٍ لِلنَّبِيِّ وَمَنْ تَلَا',
    explanationAr: 'استفتاح المنظومة بحمد الله عز وجل والصلاة على رسوله الكريم صلى الله عليه وسلم وتاليه.',
    explanationFr: 'Ouverture du poème par la louange à Allah et la prière sur Son Prophète et les récitateurs.',
  },
  {
    number: 2,
    sadr: 'وَبَعْدُ فَخُذْ نَظْمًا لِكَلَّا وَأُخْتِهَا',
    ajuz: '«بَلَى» لِتَحُوزَ الْفَضْلَ فِيهِمَا مُجْمَلَا',
    explanationAr: 'الدعوة لتعلم هذا النظم الجامع لمواضع كلا وبلى لنيل فضل إتقان الوقف والابتداء.',
    explanationFr: 'Invitation à retenir ce poème réunissant les occurrences des deux particules pour parfaire sa récitation.',
  },
  {
    number: 3,
    sadr: 'فَمَا كَلَّا فِي النِّصْفِ الْأَوَّلِ أُثْبِتَتْ',
    ajuz: 'وَفِي النِّصْفِ مِنْ بَعْدٍ ثَلَاثُونَ أُعْمِلَا',
    explanationAr: 'قاعدة ذهبية: لم ترد «كَلَّا» إطلاقًا في النصف الأول من القرآن (قبل سورة مريم)، وكلها في النصف الثاني.',
    explanationFr: 'Règle d\'or : « Kallā » n\'apparaît jamais dans la première moitié du Coran ; ses 33 apparitions sont toutes dans la seconde moitié.',
  },
  {
    number: 4,
    sadr: 'وَثَلَاثَةٌ مِنْ بَعْدِ ذَاكَ تَمَامُهَا',
    ajuz: 'فَخَمْسَةَ عَشْرٍ قِفْ عَلَيْهَا مُفَصَّلَا',
    explanationAr: 'مجموعها ثلاث وثلاثون؛ خُص منها خمسة عشر موضعًا يحسن الوقف عليها لتمام المعنى والردع.',
    explanationFr: 'Sur un total de 33, quinze occurrences reçoivent l\'arrêt (waqf) pour signifier le rejet catégorique d\'une assertion fausse.',
    relatedCategory: 'stop',
  },
  {
    number: 5,
    sadr: 'وَثَمَانِيَةٌ مَعْ عَشْرَةٍ قَدْ تَوَاصَلَتْ',
    ajuz: 'فَلَا تَقِفَنْ فِيهَا وَصِلْهَا لِتَعْدِلَا',
    explanationAr: 'ثمانية عشر موضعًا حكمها الوصل بما بعدها؛ لأنها استئنافية بمعنى «حقًا» أو متعلقة بما بعدها لفظًا.',
    explanationFr: 'Dix-huit occurrences se lisent en liaison continue (wasl) car elles introduisent une affirmation solennelle (« en vérité »).',
    relatedCategory: 'connect',
  },
  {
    number: 6,
    sadr: 'وَأَمَّا «بَلَى» فَاثْنَانِ عِشْرُونَ عَدُّهَا',
    ajuz: 'فَخَمْسٌ بِلَا وَقْفٍ لَدَى مَنْ تَأَمَّلَا',
    explanationAr: '«بَلَى» مجموعها 22 موضعًا؛ استُثني منها 5 مواضع لا يقف القارئ عليها لشدة التعلق بما بعدها.',
    explanationFr: 'Quant à « Balā » (22 au total), 5 positions seulement excluent impérativement l\'arrêt en raison de la liaison syntaxique.',
    relatedCategory: 'connect',
  },
  {
    number: 7,
    sadr: 'وَأَرْبَعَةٌ فِيهَا الْجَوَازَانِ وَالَّذِي',
    ajuz: 'يُرَجَّحُ فِيهَا الْوَصْلُ فَاظْفَرْ بِهِ جَلَا',
    explanationAr: 'أربعة مواضع يجوز فيها الوجهان (الوقف والوصل) والوصل أولى وأرجح عند الشيخ توفيق النحاس.',
    explanationFr: 'Quatre positions admettent les deux manières (arrêt ou liaison), avec une préférence accordée à la continuité.',
    relatedCategory: 'prefer_connect',
  },
  {
    number: 8,
    sadr: 'وَثَلَاثَةُ عَشْرٍ قِفْ عَلَيْهَا مُسَدَّدًا',
    ajuz: 'تَنَلْ بِاتِّبَاعِ الْحَقِّ أَجْرًا مُكَمَّلَا',
    explanationAr: 'باقي مواضع «بلى» وهي ثلاثة عشر موضعًا يحسن الوقف عليها لتمام جواب النفي واستقلال ما بعدها.',
    explanationFr: 'Les 13 positions restantes reçoivent l\'arrêt méritoire, la réponse négative étant parachevée avant la nouvelle phrase.',
    relatedCategory: 'stop',
  },
];
