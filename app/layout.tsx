"use client"; // Mark this component as a Client Component
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "./MainLayout";
import Script from "next/script";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"], display: "swap" });

// Define metadata for each language
const metadataByLang: { [key: string]: { title: string; description: string; keywords: string; } } = {
  en: {
    title: "This Person Does Not Exist - AI-Generated Faces",
    description: "Explore AI-generated faces and fake person images. Perfect for design tools and creative projects.",
    keywords:"This person does not exist, Random face generator, Fake face generator, Random person image, AI face image",

  },
  es: {
    title:"Esta persona no existe 2025",
    description:"¡Descubre el poder de la IA con nuestro generador de imágenes de rostros! Nuestro generador de imágenes de IA utiliza redes generativas adversariales, visión por ordenador, algoritmos de aprendizaje automático y algoritmos de aprendizaje profundo. Nuestra última tecnología puede crear imágenes realistas de caras falsas. Crea una variedad de expresiones faciales diferentes con nuestro generador de imágenes de IA.",
    keywords:"Esta persona no existe, Generador de rostros aleatorios, Generador de rostros falsos, Imagen de persona aleatoria, Imagen de rostro generada por IA",
  },
  ar: {
    title: "هذا الشخص غير موجود 2025",
    description: " .أنشئ مجموعة متنوعة من تعبيرات الوجه المختلفة باستخدام منشئ الصور المزود بتقنية الذكاء الاصطناعي",
    keywords:"هذا الشخص غير موجود, مولد وجوه عشوائي, مولد وجوه مزيفة, صورة شخص عشوائي, صورة وجه بواسطة الذكاء الاصطناعي",
  },
  bg: {
    title: "Това лице не съществува 2025",
    description:"Открийте силата на изкуствения интелект с нашия генератор на изображения на лица с изкуствен интелект!",
    keywords:"Този човек не съществува, Генератор на случайни лица, Генератор на фалшиви лица, Изображение на случайни хора, Изображение на лице с изкуствен интелект",

  },
  ru: {
    title: "Этого человека не существует 2025",
    description:"Откройте для себя возможности искусственного интеллекта с помощью нашего генератора изображений лиц с искусственным интеллектом! Наш генератор изображений ИИ использует генеративные состязательные сети, компьютерное зрение, алгоритмы машинного обучения и алгоритмы глубокого обучения. Наша новейшая технология позволяет создавать реалистичные изображения поддельных лиц. Создайте множество различных выражений лица с помощью нашего генератора изображений ИИ.",
    keywords:"Этот человек не существует, Генератор случайных лиц, Генератор поддельных лиц, Случайное изображение человека, Изображение лица с ИИ",

  },
  it: {
    title:"Questa persona non esiste 2025",
    description:"Scoprite la potenza dell'intelligenza artificiale con il nostro generatore di immagini di volti! Il nostro generatore di immagini AI utilizza reti generative avversarie, computer vision, algoritmi di apprendimento automatico e algoritmi di apprendimento profondo. La nostra ultima tecnologia è in grado di creare immagini realistiche di volti finti. Create una varietà di espressioni facciali diverse con il nostro generatore di immagini AI.",
    keywords:"Questa persona non esiste, Generatore di volti casuali, Generatore di volti falsi, Immagine di persona casuale, Immagine di volto generata da IA",

  },
  fr: {
    title:"Cette personne n'existe pas 2025",
    description:"Découvrez la puissance de l'IA avec notre générateur d'images de visages ! Notre générateur d'images d'IA utilise des réseaux adversaires génératifs, la vision par ordinateur, des algorithmes d'apprentissage automatique et des algorithmes d'apprentissage profond. Notre dernière technologie peut créer des images réalistes de faux visages. Créez une variété d'expressions faciales différentes avec notre générateur d'images d'IA.",
    keywords:"Cette personne n'existe pas, Générateur de visages aléatoires, Générateur de faux visages, Image de personne aléatoire, Image de visage par IA",

  },
  tr: {
    title:"Bu Kişi Mevcut Değil 2025",
    description:"Yüzlerin Yapay Zeka Görüntü Oluşturucusu ile yapay zekanın gücünü keşfedin! Yapay zeka görüntü oluşturucumuz, üretken düşman ağları, bilgisayarla görme, makine öğrenimi algoritmaları ve derin öğrenme algoritmaları kullanır. En son teknolojimiz sahte yüzlerin gerçekçi görüntülerini oluşturabilir. Yapay zeka görüntü oluşturucumuzla çeşitli farklı yüz ifadeleri oluşturun.",
    keywords:"Bu kişi gerçek değil, Rastgele yüz üretici, Sahte yüz üretici, Rastgele kişi görseli, Yapay zeka yüz görseli", 

  },
  ro: {
    title:"Această persoană nu există 2025",
    description:"Descoperiți puterea inteligenței artificiale cu generatorul nostru de imagini AI de fețe! Generatorul nostru de imagini AI utilizează rețele adversative generative, viziune computerizată, algoritmi de învățare automată și algoritmi de învățare profundă. Cea mai recentă tehnologie a noastră poate crea imagini realiste ale unor fețe false. Creați o varietate de expresii faciale diferite cu generatorul nostru de imagini AI.",
    keywords:"Această persoană nu există, Generator de fețe aleatorii, Generator de fețe false, Imagine cu persoană aleatorie, Imagine de față generată de AI",

  },
  zh: {
    title:"此人不存在 2025-随机照片人脸生成器",
    description:"使用我们的人工智能人脸图像生成器，探索人工智能的力量！我们的人工智能图像生成器采用生成对抗网络、计算机视觉、机器学习算法和深度学习算法。 我们的最新技术可以创建逼真的假脸图像。使用我们的人工智能图像生成器，创建各种不同的面部表情。",
    keywords:"此人不存在, 随机面孔生成器, 假脸生成器, 随机人物图像, AI人脸图像",

  },
  sv: {
    title:"Denna person existerar inte 2025",
    description:"Upptäck kraften i AI med vår AI-bildgenerator för ansikten! Vår AI-bildgenerator använder generativa kontradiktoriska nätverk, datorseende, maskininlärningsalgoritmer och djupinlärningsalgoritmer. Vår senaste teknik kan skapa realistiska bilder av fejkade ansikten. Skapa en mängd olika ansiktsuttryck med vår AI-bildgenerator.",
    keywords:"Den här personen existerar inte, Slumpmässigt ansiktsgenerator, Falskt ansiktsgenerator, Slumpmässig personbild, AI-genererad ansiktsbild",

  },
  uk: {
    title:"Цієї людини не існує 2025",
    description:"Відкрийте для себе можливості ШІ за допомогою нашого генератора зображень облич! Наш генератор зображень ШІ використовує генеративні змагальні мережі, комп'ютерний зір, алгоритми машинного навчання та алгоритми глибокого навчання. Наші новітні технології дозволяють створювати реалістичні зображення фальшивих облич. Створюйте різноманітні вирази обличчя за допомогою нашого генератора зображень зі штучним інтелектом.",
    keywords:"Ця особа не існує, Генератор випадкових облич, Генератор підроблених облич, Зображення випадкової людини, Зображення обличчя зі штучним інтелектом",

  },
  el: {
    title:"Αυτό το άτομο δεν υπάρχει 2025",
        description:"Ανακαλύψτε τη δύναμη της Τεχνητής Νοημοσύνης με τη Γεννήτρια εικόνων προσώπων Τεχνητής Νοημοσύνης! ",
    keywords:"Αυτό το άτομο δεν υπάρχει, Γεννήτρια τυχαίων προσώπων, Γεννήτρια ψεύτικων προσώπων, Τυχαία εικόνα προσώπου, Εικόνα προσώπου με τεχνητή νοημοσύνη",

  },
  id: {
    title:"Orang Ini Tidak Ada 2025",
    description:"Temukan kekuatan AI dengan Generator Gambar Wajah AI kami! Generator gambar AI kami menggunakan jaringan lawan generatif, visi komputer, algoritma pembelajaran mesin, dan algoritma pembelajaran mendalam. Teknologi terbaru kami dapat membuat gambar realistis dari wajah palsu. Buat berbagai ekspresi wajah yang berbeda dengan generator gambar AI kami.",
    keywords:"Orang ini tidak ada, Generator wajah acak, Generator wajah palsu, Gambar orang acak, Gambar wajah AI",

  },
  no: {
    title:"Denne personen eksisterer ikke 2025",
    description:"Oppdag kraften i kunstig intelligens med vår AI-bildegenerator for ansikter! Vår AI-bildegenerator bruker generative kontradiktoriske nettverk, datasyn, maskinlæringsalgoritmer og dyplæringsalgoritmer. Vår nyeste teknologi kan skape realistiske bilder av falske ansikter. Lag en rekke ulike ansiktsuttrykk med vår AI-bildegenerator.",
    keywords:"Denne personen eksisterer ikke, Tilfeldig ansiktsgenerator, Falsk ansiktsgenerator, Tilfeldig personbilde, AI-ansiktsbilde",

  },
  ja: {
    title:"この人物は存在しない 2025",
    description:"私たちの顔のAI画像ジェネレータでAIの力を発見してください！。",
    keywords:"この人物は存在しません, ランダム顔生成器, 偽顔生成器, ランダム人物画像, AI顔画像",

  },
  nl: {
    title:"Deze persoon bestaat niet 2025",
    description:"Ontdek de kracht van AI met onze AI beeldgenerator van gezichten! Onze AI beeldgenerator maakt gebruik van generative adversarial networks, computer vision, machine learning algoritmes en deep learning algoritmes. Onze nieuwste technologie kan realistische afbeeldingen van nepgezichten maken. Creëer verschillende gezichtsuitdrukkingen met onze AI-afbeeldingengenerator.",
    keywords:"Deze persoon bestaat niet, Generator voor willekeurige gezichten, Generator voor nepgezichten, Willekeurige persoonafbeelding, AI-gegenereerd gezichtsbeeld",

  },
  sl: {
    title:"Ta oseba ne obstaja 2025",
    description:"Odkrijte moč umetne inteligence z našim generatorjem slik obrazov z umetno inteligenco! Naš generator slik obrazov umetne inteligence uporablja generativne nasprotne mreže, računalniški vid, algoritme strojnega učenja in algoritme globokega učenja. Naša najnovejša tehnologija lahko ustvari realistične podobe lažnih obrazov. Z našim generatorjem slik umetne inteligence ustvarite različne izraze obraza.",
    keywords:"Ta oseba ne obstaja, Generator naključnih obrazov, Generator lažnih obrazov, Slika naključne osebe, Slika obraza z umetno inteligenco",
  },
  et: {
    title:"Seda isikut ei ole olemas 2025",
    description:"Avastage AI võimsus meie AI nägude pildigeneraatoriga! Meie AI-pildigeneraator kasutab generatiivseid vastandvõrke, arvutinägemist, masinõppe algoritme ja süvaõppe algoritme. Meie uusim tehnoloogia suudab luua realistlikke pilte võltsitud nägudest. Looge meie tehisintellekti pildigeneraatoriga erinevaid näoilminguid.",
    keywords:"See inimene ei ole olemas, Juhusliku näo generaator, Võltsnäo generaator, Juhusliku inimese pilt, AI-ga loodud näopilt",

  },
  pl: {
    title:"Ta osoba nie istnieje 2025",
    description:"Odkryj moc sztucznej inteligencji dzięki naszemu generatorowi obrazów twarzy! Nasz generator obrazów AI wykorzystuje generatywne sieci przeciwstawne, wizję komputerową, algorytmy uczenia maszynowego i algorytmy głębokiego uczenia. Nasza najnowsza technologia może tworzyć realistyczne obrazy fałszywych twarzy. Twórz różne wyrazy twarzy za pomocą naszego generatora obrazów AI.",
    keywords:"Ta osoba nie istnieje, Generator losowych twarzy, Generator fałszywych twarzy, Losowe zdjęcie osoby, Obraz twarzy generowany przez AI",

  },
  ko: {
    title:"이 사람은 존재하지 않습니다 2025",
    description:"AI 얼굴 이미지 생성기로 AI의 힘을 경험해 보세요! 저희의 AI 이미지 생성기는 생성적 적대 신경망, 컴퓨터 비전, 머신러닝 알고리즘, 딥러닝 알고리즘을 사용합니다. 최신 기술로 가짜 얼굴의 사실적인 이미지를 생성할 수 있습니다. AI 이미지 생성기로 다양한 얼굴 표정을 만들어 보세요.",
    keywords:"이 사람은 존재하지 않습니다, 무작위 얼굴 생성기, 가짜 얼굴 생성기, 무작위 인물 이미지, AI 얼굴 이미지",

  },
  de: {
    title:"Diese Person gibt es nicht 2025",
    description:"Entdecken Sie die Macht der KI mit unserem KI-Bildgenerator für Gesichter! Unser KI-Bildgenerator verwendet generative adversarische Netzwerke, Computer Vision, Algorithmen des maschinellen Lernens und Deep Learning Algorithmen. Unsere neueste Technologie kann realistische Bilder von gefälschten Gesichtern erstellen. Erstellen Sie eine Vielzahl von verschiedenen Gesichtsausdrücken mit unserem KI-Bildgenerator.",
    keywords:"Diese Person existiert nicht, Zufallsgesicht-Generator, Gefälschtes Gesichtsgenerator, Zufälliges Personenbild, KI-Gesichtsbild",

  },
  fi: {
    title:"Tätä henkilöä ei ole olemassa 2025",
    description:"Tutustu tekoälyn voimaan kasvojen tekoälykuvageneraattorin avulla! Tekoälykuvageneraattorimme käyttää generatiivisia vastakkaisverkkoja, tietokonenäköä, koneoppimisalgoritmeja ja syväoppimisalgoritmeja. Uusin teknologiamme voi luoda realistisia kuvia väärennetyistä kasvoista. Luo erilaisia kasvonilmeitä tekoälykuvageneraattorillamme.",
    keywords:"Tätä henkilöä ei ole olemassa, Satunnainen kasvogeneraattori, Väärä kasvogeneraattori, Satunnainen henkilökuva, Tekoälyllä luotu kasvokuva",

  },
  pt: {
    title:"Esta pessoa não existe 2025",
    description:"Descubra o poder da IA com nosso gerador de imagens de rostos com IA!",
    keywords:"Esta pessoa não existe, Gerador de rostos aleatórios, Gerador de rostos falsos, Imagem de pessoa aleatória, Imagem de rosto gerado por IA",

  },
  hi:{
title: "यह आदमी मौजूद नहीं है - नकली चेहरा जनरेटर (2025)",
description:"यह व्यक्ति अस्तित्व में नहीं है, यह चेहरों का एक AI इमेज जनरेटर है। हमारी नवीनतम तकनीक नकली चेहरे की छवियाँ बनाती है। हमारे AI इमेज जनरेटर के साथ विभिन्न प्रकार के चेहरे के भाव बनाएँ।",
keywords:" यह आदमी मौजूद नहीं है - नकली चेहरा जनरेटर - नकली ऐ शकल - नकली शकल डाउनलोड - चेहरा की तस्वीर बनानी",
  },
};


// Define metadata for specific pages
const pageMetadata: { [key: string]: { title: string; description: string; keywords: string } } = {
  "/contact-us": {
    title: "Contact Us - This Person Does Not Exist",
    description: "Contact this person does not exist. Contact us using the form below or via email on this page given below.",
    keywords: "Contact us, This person does not exist contact, AI face generator contact",
  },
  "/privacy-policy": {
    title: "Privacy Policy - This Person Does Not Exist",
    description: "Read our privacy policy to understand how we handle your data.",
    keywords: "Privacy policy, This person does not exist privacy, AI face generator privacy",
  },
  "/algorithm": {
    title: "AI Face Generation Algorithm | StyleGAN/StyleGAN2 Explained | This Person Does Not Exist",
    description: "Explore NVIDIA's StyleGAN and StyleGAN2 algorithms powering our AI-generated human faces. Technical details on convolutional networks, noise injection, and public dataset availability. Updated January 2025.",
    keywords: "AI face generation algorithm, StyleGAN, StyleGAN2, This person does not exist algorithm",
  },
};

// Function to generate JSON-LD structured data with pretty-printing
const generateSchema = (pagePath: string, metadata: { title: string; description: string }) => {
  const baseUrl = "https://thispersondoesnotexist.cc";

  // Default schema for the homepage
  if (pagePath === "/") {
    return JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": metadata.title,
        "description": metadata.description,
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      null, // Replacer function (null for no filtering)
      2 // Number of spaces for indentation
    );
  }

  // Schema for other pages
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": metadata.title,
      "description": metadata.description,
      "url": `${baseUrl}${pagePath}`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": metadata.title,
            "item": `${baseUrl}${pagePath}`,
          },
        ],
      },
    },
    null, // Replacer function (null for no filtering)
    2 // Number of spaces for indentation
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Extract the language from the URL
  const languageSegment = pathname.split("/")[1] || "en";

  // Map legacy language codes to new ones
  const languageMap: { [key: string]: string } = {
    ae: "ar",
    br: "pt",
    cn: "zh",
    gr: "el",
    jp: "ja",
    kr: "ko",
    si: "sl",
    ua: "uk",
  };

  // Get the selected language
  const selectedLanguage = languageMap[languageSegment] || languageSegment || "en";

  // Get metadata for the selected language
  const metadata = metadataByLang[selectedLanguage] || metadataByLang.en;

  // Construct the full path for the current page (e.g., /en/contact-us)
  const pagePath = `/${selectedLanguage}${pathname.split("/").slice(2).join("/")}`;

  // Check if the current path matches a specific page
  const pageMeta = pageMetadata[pagePath];

  // Generate JSON-LD structured data
  const schemaData = generateSchema(pagePath, pageMeta || metadata);

  return (
    <html lang={selectedLanguage}>
      <head>
        {/* Apply page-specific metadata if available, otherwise use default metadata */}
        {pageMeta ? (
          <>
            <title>{pageMeta.title}</title>
            <meta name="description" content={pageMeta.description} />
            <meta name="keywords" content={pageMeta.keywords} />
            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={pageMeta.title} />
            <meta property="og:description" content={pageMeta.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://thispersondoesnotexist.cc${pagePath}`} />
            <meta property="og:image" content="https://thispersondoesnotexist.cc/og-image.png" />
            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageMeta.title} />
            <meta name="twitter:description" content={pageMeta.description} />
            <meta name="twitter:image" content="https://thispersondoesnotexist.cc/og-image.png" />
          </>
        ) : (
          <>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={metadata.keywords} />
            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://thispersondoesnotexist.cc/${selectedLanguage}`} />
            <meta property="og:image" content="https://thispersondoesnotexist.cc/og-image.png" />
            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:image" content="https://thispersondoesnotexist.cc/og-image.png" />
          </>
        )}

        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
        <link rel="icon" href="/favicon.png" type="image/png" />

        {/* Always include these meta tags */}
        <meta name="google-site-verification" content="noDxY7-Iw_ArIQTqmhnxSTTwPxM1R78uf9FxSnmJ_e0" />
        <meta name="yandex-verification" content="5424a42e25dece6b" />
        <meta name="msvalidate.01" content="394BAB3426D3AA6C5DF8FE0E8A95469B" />
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>

      {/* Apply the Inter font to the body */}
      <body className={inter.className}>
        <MainLayout lang={selectedLanguage}>{children}</MainLayout>

        {/* Defer non-critical scripts */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2712755007538822"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <Script
          id="canonical-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const canonicalUrlElement = document.getElementById('canonical-url');
              if (canonicalUrlElement) {
                const { canonicalUrl } = JSON.parse(canonicalUrlElement.textContent);
                const link = document.createElement('link');
                link.rel = 'canonical';
                link.href = canonicalUrl;
                document.head.appendChild(link);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}