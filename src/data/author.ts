export interface AuthorWork {
  id: string;
  titleAr: string;
  titleFr: string;
  categoryAr: string;
  categoryFr: string;
  filterCategory: 'qiraat' | 'tajweed' | 'waqf' | 'tahrirat' | 'manzuma';
  descriptionAr: string;
  descriptionFr: string;
  isPrimary?: boolean;
  type: 'book' | 'manzuma' | 'study';
}

export interface AuthorData {
  nameAr: string;
  nameFr: string;
  honorificAr: string;
  honorificFr: string;
  subtitleAr: string;
  subtitleFr: string;
  birthNoteAr: string;
  birthNoteFr: string;
  deathDateAr: string;
  deathDateFr: string;
  introParagraphsAr: string[];
  introParagraphsFr: string[];
  teachers: {
    nameAr: string;
    nameFr: string;
    roleAr: string;
    roleFr: string;
    isPrimary: boolean;
  }[];
  works: AuthorWork[];
  manzumaCollection: {
    titleAr: string;
    titleFr: string;
    descriptionAr: string;
    descriptionFr: string;
    bibliographicNoteAr: string;
    bibliographicNoteFr: string;
  };
  risalaFocus: {
    titleAr: string;
    titleFr: string;
    textAr: string;
    textFr: string;
    stats: {
      kallaCount: number;
      balaCount: number;
      totalCount: number;
    };
  };
  deathSection: {
    titleAr: string;
    titleFr: string;
    textAr: string;
    textFr: string;
    prayerAr: string;
    prayerFr: string;
  };
  sources: {
    titleAr: string;
    titleFr: string;
    descriptionAr: string;
    descriptionFr: string;
  }[];
  attributionDisclaimerAr: string;
  attributionDisclaimerFr: string;
}

export const authorData: AuthorData = {
  nameAr: 'الشيخ علي بن محمد توفيق النحاس',
  nameFr: 'Cheikh ʿAlī ibn Muḥammad Tawfīq an-Naḥḥās',
  honorificAr: 'رحمه الله',
  honorificFr: 'qu’Allah lui fasse miséricorde',
  subtitleAr: 'عالم القراءات ومؤلف رسالة الوقف على كَلَّا وبَلَى',
  subtitleFr: 'Spécialiste des qirāʾāt et auteur de la Risāla sur Kallā et Balā',
  birthNoteAr: 'نحو 1939م – 2024م',
  birthNoteFr: 'vers 1939 – 2024',
  deathDateAr: 'توفي يوم الأربعاء 22 شوال 1445هـ الموافق 1 مايو 2024م',
  deathDateFr: 'Décédé le mercredi 22 Chawwāl 1445H (1er mai 2024G)',
  
  introParagraphsAr: [
    'الشيخ علي بن محمد توفيق النحاس رحمه الله أحد علماء القراءات والتجويد في مصر، ومن تلامذة الشيخ عامر السيد عثمان رحمه الله. عُرف بعنايته بعلم القراءات، والتحريرات، والوقف والابتداء، وله عدد من المؤلفات والمنظومات التعليمية في هذا الفن.',
    'ويعتمد هذا الموقع بصورة أساسية على رسالته في الوقف على «كَلَّا» و«بَلَى» وبعض الكلمات في القرآن العظيم، مع الرجوع إلى كتب أئمة الوقف والابتداء عند عرض مواضع الخلاف.'
  ],
  introParagraphsFr: [
    'Cheikh ʿAlī ibn Muḥammad Tawfīq an-Naḥḥās (qu’Allah lui fasse miséricorde) compte parmi les érudits égyptiens des qirāʾāt (lectures coraniques) et du tajwīd, et fut l’un des disciples du grand maître Cheikh ʿĀmir as-Sayyid ʿUthmān. Il s’est illustré par sa rigueur dans la science des lectures, les taḥrīrāt (vérification des voies de transmission) ainsi que le waqf et l’ibtidāʾ, laissant plusieurs manuels et poèmes didactiques de référence.',
    'Ce site éducatif repose principalement sur sa risāla consacrée au waqf sur « Kallā » et « Balā », tout en confrontant systématiquement les avis aux grands ouvrages de référence lors des divergences savantes.'
  ],

  teachers: [
    {
      nameAr: 'الشيخ عامر السيد عثمان رحمه الله',
      nameFr: 'Cheikh ʿĀmir as-Sayyid ʿUthmān',
      roleAr: 'من أبرز شيوخه في القراءات، وقد ظهر أثر مدرسته في عناية الشيخ علي توفيق النحاس بالأداء والتحريرات والقراءات.',
      roleFr: 'L’un de ses plus illustres maîtres dans les lectures coraniques. L’influence de son école rigoureuse est manifeste dans l’attention portée par Cheikh Tawfiq an-Nahhas à la précision de l’exécution (adāʾ), aux taḥrīrāt et aux voies de récitation.',
      isPrimary: true,
    }
  ],

  works: [
    {
      id: 'risala-kalla-bala',
      titleAr: 'رسالة في الوقف على كَلَّا وبَلَى وبعض الكلمات في القرآن العظيم',
      titleFr: 'Risāla fī al-Waqf ʿalā Kallā wa Balā',
      categoryAr: 'الوقف والابتداء',
      categoryFr: 'Waqf & Ibtidāʾ',
      filterCategory: 'waqf',
      descriptionAr: 'الرسالة التي يقوم عليها هذا المشروع التعليمي، وفيها جمع الشيخ أحكام الوقف على «كَلَّا» و«بَلَى» وشرحها وبيّن اختياراته في مواضعها في القرآن الكريم.',
      descriptionFr: 'Le traité fondamental au cœur de ce projet : le cheikh y recense les 55 occurrences de « Kallā » et « Balā », expose les règles d’arrêt et de liaison, et explicite ses choix scientifiques.',
      isPrimary: true,
      type: 'book'
    },
    {
      id: 'al-wajiz',
      titleAr: 'الوجيز في أحكام تلاوة الكتاب العزيز',
      titleFr: 'Al-Wajīz fī Aḥkām Tilāwat al-Kitāb al-ʿAzīz',
      categoryAr: 'التجويد',
      categoryFr: 'Tajwīd',
      filterCategory: 'tajweed',
      descriptionAr: 'كتاب تعليمي في أحكام تلاوة القرآن الكريم والتجويد.',
      descriptionFr: 'Manuel didactique concis exposant les règles de récitation et de tajwīd.',
      type: 'book'
    },
    {
      id: 'taarif-al-qurra',
      titleAr: 'تعريف بالقراء العشرة ورواتهم وأصول القراءات العشرة',
      titleFr: 'Taʿrīf bi-l-Qurrāʾ al-ʿAsharah wa Ruwātihim',
      categoryAr: 'القراءات',
      categoryFr: 'Qirāʾāt',
      filterCategory: 'qiraat',
      descriptionAr: 'تعريف بالقراء العشرة ورواتهم، مع عرض أصول القراءات العشر بأسلوب تعليمي.',
      descriptionFr: 'Présentation biographique des dix lecteurs canoniques, de leurs transmetteurs (ruwāt) et synthèse méthodique de leurs règles fondamentales (uṣūl).',
      type: 'book'
    },
    {
      id: 'al-risala-al-gharra',
      titleAr: 'الرسالة الغراء في الأوجه المقدمة في الأداء عن العشرة القراء',
      titleFr: 'Al-Risālah al-Gharrāʾ',
      categoryAr: 'القراءات والتحريرات',
      categoryFr: 'Qirāʾāt & Taḥrīrāt',
      filterCategory: 'tahrirat',
      descriptionAr: 'من مؤلفاته المتخصصة في الأوجه المقدمة في الأداء عند القراء العشرة.',
      descriptionFr: 'Ouvrage spécialisé recensant les variantes prioritaires (awjuh muqaddama) dans la pratique de récitation des dix lecteurs.',
      type: 'book'
    },
    {
      id: 'al-qasida-al-hasna',
      titleAr: 'القصيدة الحسناء في الأوجه المقدمة في الأداء عن العشرة القراء',
      titleFr: 'Al-Qaṣīdah al-Ḥasnāʾ',
      categoryAr: 'منظومة / قراءات',
      categoryFr: 'Manẓūma / Qirāʾāt',
      filterCategory: 'manzuma',
      descriptionAr: 'منظومة تعليمية مرتبطة بمسائل الأوجه المقدمة في أداء القراءات العشر.',
      descriptionFr: 'Poème didactique versifiant les règles des variantes prioritaires pour les dix lectures.',
      type: 'manzuma'
    },
    {
      id: 'al-tuhfa-al-saniyya',
      titleAr: 'التحفة السنية في تحرير طرق الشاطبية والدرة المضية',
      titleFr: 'Al-Tuḥfah al-Saniyyah',
      categoryAr: 'التحريرات والقراءات',
      categoryFr: 'Taḥrīrāt & Qirāʾāt',
      filterCategory: 'tahrirat',
      descriptionAr: 'كتاب في تحرير طرق القراءات المتعلقة بالشاطبية والدرة.',
      descriptionFr: 'Ouvrage de vérification et d’harmonisation des voies de transmission issues d’Ach-Chāṭibiyyah et Ad-Durrah.',
      type: 'book'
    },
    {
      id: 'tawdih-al-maalam',
      titleAr: 'توضيح المعالم في طرق حفص عن عاصم',
      titleFr: 'Tawḍīḥ al-Maʿālim fī Ṭuruq Ḥafṣ ʿan ʿĀṣim',
      categoryAr: 'رواية حفص / طرق',
      categoryFr: 'Riwāyah Ḥafṣ',
      filterCategory: 'qiraat',
      descriptionAr: 'مؤلف متخصص في طرق رواية حفص عن عاصم ومسائل الأداء المتعلقة بها.',
      descriptionFr: 'Traité méthodique dédié aux différentes voies (ṭuruq) de la lecture de Ḥafṣ d’après ʿĀṣim et aux particularités de récitation qui s’y rattachent.',
      type: 'book'
    },
    {
      id: 'fayd-al-alaa',
      titleAr: 'فيض الآلاء في الأوجه المقدمة لورش في الأداء',
      titleFr: 'Fayḍ al-Ālāʾ fī al-Awjuh al-Muqaddamah li-Warsh',
      categoryAr: 'رواية ورش',
      categoryFr: 'Riwāyah Warsh',
      filterCategory: 'qiraat',
      descriptionAr: 'عمل متخصص في الأوجه المقدمة في أداء رواية ورش.',
      descriptionFr: 'Travail ciblé détaillant les variantes préférentielles d’exécution pour la lecture de Warsh d’après Nāfiʿ.',
      type: 'book'
    },
    {
      id: 'al-bayan-al-muhaqqaq',
      titleAr: 'البيان المحقق فيما خالف فيه الأصبهاني الأزرق من الكفاية والتجريد',
      titleFr: 'Al-Bayān al-Muḥaqqaq',
      categoryAr: 'القراءات والتحريرات',
      categoryFr: 'Taḥrīrāt & Qirāʾāt',
      filterCategory: 'tahrirat',
      descriptionAr: 'عمل في مسائل الخلاف بين طرق الأصبهاني والأزرق وما يتعلق بكتب الطرق والتحريرات.',
      descriptionFr: 'Analyse rigoureuse des divergences entre les voies d’Al-Aṣbahānī et d’Al-Azraq d’après les ouvrages Al-Kifāyah et At-Tajrīd.',
      type: 'book'
    },
    {
      id: 'manzumat-al-idgham',
      titleAr: 'منظومة توضيح الإدغام الصغير والاستفهام المكرر من الشاطبية والدرة والطيبة',
      titleFr: 'Manẓūmat Tawḍīḥ al-Idghām al-Ṣaghīr',
      categoryAr: 'منظومة / قراءات',
      categoryFr: 'Manẓūma / Qirāʾāt',
      filterCategory: 'manzuma',
      descriptionAr: 'منظومة تعليمية في مسائل الإدغام الصغير والاستفهام المكرر في كتب القراءات.',
      descriptionFr: 'Poème didactique sur les questions d’assimilation mineure et de double interrogation dans les trois grands poèmes de qirāʾāt.',
      type: 'manzuma'
    },
    {
      id: 'rawae-al-bayan',
      titleAr: 'روائع البيان في رثاء الشيخ عامر السيد عثمان',
      titleFr: 'Rawāʾiʿ al-Bayān fī Rithāʾ al-Shaykh ʿĀmir',
      categoryAr: 'منظومة',
      categoryFr: 'Manẓūma / Poésie',
      filterCategory: 'manzuma',
      descriptionAr: 'منظومة نظمها الشيخ في رثاء شيخه الشيخ عامر السيد عثمان رحمه الله.',
      descriptionFr: 'Éloge funèbre poétique composé par le cheikh en hommage à son maître vénéré Cheikh ʿĀmir as-Sayyid ʿUthmān.',
      type: 'manzuma'
    },
    {
      id: 'al-radd-ala-man-manaa',
      titleAr: 'الرد على من منع قراءة حمزة والكسائي',
      titleFr: 'Al-Radd ʿalā Man Manaʿa Qirāʾat Ḥamzah wa-l-Kisāʾī',
      categoryAr: 'القراءات',
      categoryFr: 'Qirāʾāt',
      filterCategory: 'qiraat',
      descriptionAr: 'رسالة في الدفاع عن قراءة الإمامين حمزة والكسائي وبيان مشروعيتها في علم القراءات.',
      descriptionFr: 'Traité démontrant l’authenticité et la légitimité des lectures canoniques de Ḥamzah et Al-Kisāʾī.',
      type: 'book'
    },
    {
      id: 'tahqiq-al-qiraat-bukhari',
      titleAr: 'تحقيق القراءات القرآنية في كتاب الجامع الصحيح للبخاري',
      titleFr: 'Taḥqīq al-Qirāʾāt fī Ṣaḥīḥ al-Bukhārī',
      categoryAr: 'دراسات قرآنية / حديث',
      categoryFr: 'Études coraniques & Ḥadīth',
      filterCategory: 'qiraat',
      descriptionAr: 'دراسة للقراءات القرآنية الواردة في صحيح الإمام البخاري.',
      descriptionFr: 'Étude méthodique des lectures coraniques rapportées dans le Ṣaḥīḥ de l’Imam Al-Bukhārī.',
      type: 'study'
    }
  ],

  manzumaCollection: {
    titleAr: 'إتحاف الناس بمنظومات الشيخ النحاس',
    titleFr: 'Itḥāf an-Nās bi-Manẓūmāt ash-Shaykh an-Naḥḥās',
    descriptionAr: 'مجموعة تضم عددًا من منظومات الشيخ علي توفيق النحاس في القراءات والتحريرات والوقف والابتداء.',
    descriptionFr: 'Recueil colligeant plusieurs poèmes didactiques (manẓūmāt) du Cheikh Tawfīq an-Naḥḥās dans les lectures, les taḥrīrāt et le waqf.',
    bibliographicNoteAr: 'تنبيه توثيقي: هذا العنوان يمثل مجموعة تضم منظومات الشيخ المتفرقة في فنون القراءات، وليس مصنفًا نثريًا مستقلًا بذاته.',
    bibliographicNoteFr: 'Précision bibliographique : Ce titre désigne le recueil réunissant les poèmes didactiques du cheikh, et non un traité rédigé isolément sous ce nom.'
  },

  risalaFocus: {
    titleAr: 'رسالته في الوقف على كَلَّا وبَلَى',
    titleFr: 'Sa Risāla sur le Waqf de Kallā et Balā',
    textAr: 'تمثل هذه الرسالة الأساس العلمي والتعليمي لهذا الموقع. وقد جمع فيها الشيخ مواضع «كَلَّا» و«بَلَى» في القرآن الكريم، وبيّن ما يختاره من الوقف والوصل، مع مناقشة عدد من أقوال علماء الوقف والابتداء.',
    textFr: 'Ce traité constitue le socle scientifique et pédagogique de ce site. Le cheikh y a recensé avec minutie les occurrences coraniques de « Kallā » et « Balā », explicitant ses choix d’arrêt ou de liaison et discutant les avis des maîtres du domaine.',
    stats: {
      kallaCount: 33,
      balaCount: 22,
      totalCount: 55
    }
  },

  deathSection: {
    titleAr: 'وفاته',
    titleFr: 'Son décès',
    textAr: 'توفي الشيخ علي بن محمد توفيق النحاس رحمه الله يوم الأربعاء 22 شوال 1445هـ، الموافق 1 مايو 2024م، بعد حياة قضاها في خدمة القرآن الكريم وعلوم القراءات والتجويد.',
    textFr: 'Cheikh ʿAlī ibn Muḥammad Tawfīq an-Naḥḥās (qu’Allah lui fasse miséricorde) est décédé le mercredi 22 Chawwāl 1445H, correspondant au 1er mai 2024G, après une vie tout entière consacrée au service du Noble Coran et des sciences coraniques.',
    prayerAr: 'رحمه الله رحمة واسعة وجزاه عن القرآن وأهله خير الجزاء.',
    prayerFr: 'Qu’Allah lui accorde Sa vaste miséricorde et le rétribue grandement pour son dévouement au service du Coran et de ses adeptes.'
  },

  sources: [
    {
      titleAr: 'رسالة في الوقف على كَلَّا وبَلَى وبعض الكلمات في القرآن العظيم',
      titleFr: 'Risāla fī al-Waqf ʿalā Kallā wa Balā',
      descriptionAr: 'المصدر التعليمي المباشر لمواضع الوقف والمنظومة المعتمدة في هذا الموقع.',
      descriptionFr: 'Source pédagogique directe pour les positions d’arrêt et poème didactique associé.'
    },
    {
      titleAr: 'فهارس ودوريات تراجم علماء القراءات المعاصرين في مصر',
      titleFr: 'Notices bio-bibliographiques des érudits contemporains des qirāʾāt en Égypte',
      descriptionAr: 'توثيق تاريخ الوفاة ومسرد المؤلفات والمنظومات التعليمية المحققة.',
      descriptionFr: 'Documentation de la date de décès et recensement des ouvrages et manuels vérifiés.'
    },
    {
      titleAr: 'المصادر التراثية المعتمدة للمقارنة',
      titleFr: 'Ouvrages classiques de référence pour la comparaison des avis',
      descriptionAr: 'المكتفى للداني، إيضاح الوقف والابتداء لابن الأنباري، ومنار الهدى للأشموني.',
      descriptionFr: 'Al-Muktafā d’Ad-Dānī, Īḍāḥ d’Ibn Al-Anbārī, et Manār al-Hudā d’Al-Ashmūnī.'
    }
  ],

  attributionDisclaimerAr: 'تنبيه منهجي في التوثيق: تم الاقتصار في هذه الصفحة على الآثار والمؤلفات المحققة والمنسوبة يقينًا للشيخ رحمه الله، مع تمييز المنظومات والكتب المصنفة عن المجاميع والمراجعات تجنبًا لأي خلط في الفهارس.',
  attributionDisclaimerFr: 'Règle de rigueur bibliographique : Seuls figurent sur cette page les écrits et poèmes dont l’attribution au Cheikh an-Naḥḥās est rigoureusement attestée, en distinguant ses compositions propres des recueils de poèmes et des préfaces.'
};
