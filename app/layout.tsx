"use client"; // Mark this component as a Client Component
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "./MainLayout";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Define metadata for each language
const metadataByLang: { [key: string]: { title: string; description: string } } = {
  en: {
    title: "This Person Does Not Exist - AI-Generated Faces",
    description: "Explore AI-generated faces and fake person images. Perfect for design tools and creative projects.",
  },
  es: {
    title:"Esta persona no existe 2025",
    description:"¡Descubre el poder de la IA con nuestro generador de imágenes de rostros! Nuestro generador de imágenes de IA utiliza redes generativas adversariales, visión por ordenador, algoritmos de aprendizaje automático y algoritmos de aprendizaje profundo. Nuestra última tecnología puede crear imágenes realistas de caras falsas. Crea una variedad de expresiones faciales diferentes con nuestro generador de imágenes de IA.",
  },
  ar: {
    title: "هذا الشخص غير موجود 2025",
    description: " شبكات الخصومة التوليدية ورؤية الكمبيوتر وخوارزميات التعلم الآلي وخوارزميات التعلم العميق -  يمكن لأحدث تقنياتنا إنشاء صور واقعية لوجوه مزيفة. أنشئ مجموعة متنوعة من تعبيرات الوجه المختلفة باستخدام منشئ الصور المزود بتقنية الذكاء الاصطناعي",

  },
  bg: {
    title: "Това лице не съществува 2025",
    description:"Открийте силата на изкуствения интелект с нашия генератор на изображения на лица с изкуствен интелект! Нашият AI генератор на изображения използва генеративни мрежи, компютърно зрение, алгоритми за машинно обучение и алгоритми за дълбоко обучение.Нашата най-нова технология може да създава реалистични изображения на фалшиви лица. Създавайте различни изражения на лицето с нашия AI генератор на изображения.Нашата най-нова технология може да създава реалистични изображения на фалшиви лица. Създавайте различни изражения на лицето с нашия AI генератор на изображения. ",


  },
  ru: {
    title: "Этого человека не существует 2025",
    description:"Откройте для себя возможности искусственного интеллекта с помощью нашего генератора изображений лиц с искусственным интеллектом! Наш генератор изображений ИИ использует генеративные состязательные сети, компьютерное зрение, алгоритмы машинного обучения и алгоритмы глубокого обучения. Наша новейшая технология позволяет создавать реалистичные изображения поддельных лиц. Создайте множество различных выражений лица с помощью нашего генератора изображений ИИ.",
  },
  it: {
    title:"Questa persona non esiste 2025",
    description:"Scoprite la potenza dell'intelligenza artificiale con il nostro generatore di immagini di volti! Il nostro generatore di immagini AI utilizza reti generative avversarie, computer vision, algoritmi di apprendimento automatico e algoritmi di apprendimento profondo. La nostra ultima tecnologia è in grado di creare immagini realistiche di volti finti. Create una varietà di espressioni facciali diverse con il nostro generatore di immagini AI.",
  },
  fr: {
    title:"Cette personne n'existe pas 2025",
    description:"Découvrez la puissance de l'IA avec notre générateur d'images de visages ! Notre générateur d'images d'IA utilise des réseaux adversaires génératifs, la vision par ordinateur, des algorithmes d'apprentissage automatique et des algorithmes d'apprentissage profond. Notre dernière technologie peut créer des images réalistes de faux visages. Créez une variété d'expressions faciales différentes avec notre générateur d'images d'IA.",
  },
  tr: {
    title:"Bu Kişi Mevcut Değil 2025",
    description:"Yüzlerin Yapay Zeka Görüntü Oluşturucusu ile yapay zekanın gücünü keşfedin! Yapay zeka görüntü oluşturucumuz, üretken düşman ağları, bilgisayarla görme, makine öğrenimi algoritmaları ve derin öğrenme algoritmaları kullanır. En son teknolojimiz sahte yüzlerin gerçekçi görüntülerini oluşturabilir. Yapay zeka görüntü oluşturucumuzla çeşitli farklı yüz ifadeleri oluşturun.",
  },
  ro: {
    title:"Această persoană nu există 2025",
    description:"Descoperiți puterea inteligenței artificiale cu generatorul nostru de imagini AI de fețe! Generatorul nostru de imagini AI utilizează rețele adversative generative, viziune computerizată, algoritmi de învățare automată și algoritmi de învățare profundă. Cea mai recentă tehnologie a noastră poate crea imagini realiste ale unor fețe false. Creați o varietate de expresii faciale diferite cu generatorul nostru de imagini AI.",
  },
  zh: {
    title:"此人不存在 2025",
    description:"使用我们的人工智能人脸图像生成器，探索人工智能的力量！我们的人工智能图像生成器采用生成对抗网络、计算机视觉、机器学习算法和深度学习算法。 我们的最新技术可以创建逼真的假脸图像。使用我们的人工智能图像生成器，创建各种不同的面部表情。",
  },
  sv: {
    title:"Denna person existerar inte 2025",
    description:"Upptäck kraften i AI med vår AI-bildgenerator för ansikten! Vår AI-bildgenerator använder generativa kontradiktoriska nätverk, datorseende, maskininlärningsalgoritmer och djupinlärningsalgoritmer. Vår senaste teknik kan skapa realistiska bilder av fejkade ansikten. Skapa en mängd olika ansiktsuttryck med vår AI-bildgenerator.",
  },
  uk: {
    title:"Цієї людини не існує 2025",
    description:"Відкрийте для себе можливості ШІ за допомогою нашого генератора зображень облич! Наш генератор зображень ШІ використовує генеративні змагальні мережі, комп'ютерний зір, алгоритми машинного навчання та алгоритми глибокого навчання. Наші новітні технології дозволяють створювати реалістичні зображення фальшивих облич. Створюйте різноманітні вирази обличчя за допомогою нашого генератора зображень зі штучним інтелектом.",
  },
  el: {
    title:"Αυτό το άτομο δεν υπάρχει 2025",
    description:"Ανακαλύψτε τη δύναμη της Τεχνητής Νοημοσύνης με τη Γεννήτρια εικόνων προσώπων Τεχνητής Νοημοσύνης! Η δική μας γεννήτρια εικόνων AI χρησιμοποιεί γεννητικά αντιθετικά δίκτυα, όραση υπολογιστών, αλγόριθμους μηχανικής μάθησης και αλγόριθμους βαθιάς μάθησης. Η πιο πρόσφατη τεχνολογία μας μπορεί να δημιουργήσει ρεαλιστικές εικόνες ψεύτικων προσώπων. Δημιουργήστε μια ποικιλία διαφορετικών εκφράσεων προσώπου με τη γεννήτρια εικόνων AI μας.",
  },
  id: {
    title:"Orang Ini Tidak Ada 2025",
    description:"Temukan kekuatan AI dengan Generator Gambar Wajah AI kami! Generator gambar AI kami menggunakan jaringan lawan generatif, visi komputer, algoritma pembelajaran mesin, dan algoritma pembelajaran mendalam. Teknologi terbaru kami dapat membuat gambar realistis dari wajah palsu. Buat berbagai ekspresi wajah yang berbeda dengan generator gambar AI kami.",
  },
  no: {
    title:"Denne personen eksisterer ikke 2025",
    description:"Oppdag kraften i kunstig intelligens med vår AI-bildegenerator for ansikter! Vår AI-bildegenerator bruker generative kontradiktoriske nettverk, datasyn, maskinlæringsalgoritmer og dyplæringsalgoritmer. Vår nyeste teknologi kan skape realistiske bilder av falske ansikter. Lag en rekke ulike ansiktsuttrykk med vår AI-bildegenerator.",
  },
  ja: {
    title:"この人物は存在しない 2025",
    description:"私たちの顔のAI画像ジェネレータでAIの力を発見してください！私たちのAI画像ジェネレーターは、生成的敵対的ネットワーク、コンピュータビジョン、機械学習アルゴリズム、ディープラーニングアルゴリズムを使用しています。 私たちの最新技術は、偽の顔のリアルな画像を作成することができます。私たちのAI画像ジェネレーターで様々な表情を作ってみましょう。",
  },
  nl: {
    title:"Deze persoon bestaat niet 2025",
    description:"Ontdek de kracht van AI met onze AI beeldgenerator van gezichten! Onze AI beeldgenerator maakt gebruik van generative adversarial networks, computer vision, machine learning algoritmes en deep learning algoritmes. Onze nieuwste technologie kan realistische afbeeldingen van nepgezichten maken. Creëer verschillende gezichtsuitdrukkingen met onze AI-afbeeldingengenerator.",
  },
  sl: {
    title:"Ta oseba ne obstaja 2025",
    description:"Odkrijte moč umetne inteligence z našim generatorjem slik obrazov z umetno inteligenco! Naš generator slik obrazov umetne inteligence uporablja generativne nasprotne mreže, računalniški vid, algoritme strojnega učenja in algoritme globokega učenja. Naša najnovejša tehnologija lahko ustvari realistične podobe lažnih obrazov. Z našim generatorjem slik umetne inteligence ustvarite različne izraze obraza.",
  },
  et: {
    title:"Seda isikut ei ole olemas 2025",
    description:"Avastage AI võimsus meie AI nägude pildigeneraatoriga! Meie AI-pildigeneraator kasutab generatiivseid vastandvõrke, arvutinägemist, masinõppe algoritme ja süvaõppe algoritme. Meie uusim tehnoloogia suudab luua realistlikke pilte võltsitud nägudest. Looge meie tehisintellekti pildigeneraatoriga erinevaid näoilminguid.",
  },
  pl: {
    title:"Ta osoba nie istnieje 2025",
    description:"Odkryj moc sztucznej inteligencji dzięki naszemu generatorowi obrazów twarzy! Nasz generator obrazów AI wykorzystuje generatywne sieci przeciwstawne, wizję komputerową, algorytmy uczenia maszynowego i algorytmy głębokiego uczenia. Nasza najnowsza technologia może tworzyć realistyczne obrazy fałszywych twarzy. Twórz różne wyrazy twarzy za pomocą naszego generatora obrazów AI.",
  },
  ko: {
    title:"이 사람은 존재하지 않습니다 2025",
    description:"AI 얼굴 이미지 생성기로 AI의 힘을 경험해 보세요! 저희의 AI 이미지 생성기는 생성적 적대 신경망, 컴퓨터 비전, 머신러닝 알고리즘, 딥러닝 알고리즘을 사용합니다. 최신 기술로 가짜 얼굴의 사실적인 이미지를 생성할 수 있습니다. AI 이미지 생성기로 다양한 얼굴 표정을 만들어 보세요.",
  },
  de: {
    title:"Diese Person gibt es nicht 2025",
    description:"Entdecken Sie die Macht der KI mit unserem KI-Bildgenerator für Gesichter! Unser KI-Bildgenerator verwendet generative adversarische Netzwerke, Computer Vision, Algorithmen des maschinellen Lernens und Deep Learning Algorithmen. Unsere neueste Technologie kann realistische Bilder von gefälschten Gesichtern erstellen. Erstellen Sie eine Vielzahl von verschiedenen Gesichtsausdrücken mit unserem KI-Bildgenerator.",
  },
  fi: {
    title:"Tätä henkilöä ei ole olemassa 2025",
    description:"Tutustu tekoälyn voimaan kasvojen tekoälykuvageneraattorin avulla! Tekoälykuvageneraattorimme käyttää generatiivisia vastakkaisverkkoja, tietokonenäköä, koneoppimisalgoritmeja ja syväoppimisalgoritmeja. Uusin teknologiamme voi luoda realistisia kuvia väärennetyistä kasvoista. Luo erilaisia kasvonilmeitä tekoälykuvageneraattorillamme.",
  },
  pt: {
    title:"Esta pessoa não existe 2025",
    description:"Descubra o poder da IA com nosso gerador de imagens de rostos com IA! Nosso gerador de imagens de IA usa redes adversárias generativas, visão computacional, algoritmos de aprendizado de máquina e algoritmos de aprendizado profundo. Nossa tecnologia mais recente pode criar imagens realistas de rostos falsos. Crie uma variedade de expressões faciais diferentes com nosso gerador de imagens de IA.",
  },
};

// ✅ Root Layout Component
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

  return (
    <html lang={selectedLanguage}>
      <head>
        {/* Set the title and description dynamically */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Preload critical fonts for faster rendering */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Inline critical CSS to prevent render-blocking */}
        <style>
          {`
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              text-align: center;
              margin: 0;
              font-family: ${inter.className}, sans-serif;
            }
          `}
        </style>
      </head>

      <body>
        <MainLayout lang={selectedLanguage}>{children}</MainLayout>

        {/* ✅ Defer non-critical scripts */}
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