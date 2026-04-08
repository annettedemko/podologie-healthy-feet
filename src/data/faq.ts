import type { Language } from "@/i18n/types";

export interface FAQItem {
  translations: Record<Language, { question: string; answer: string }>;
}

export const faqs: FAQItem[] = [
  {
    translations: {
      de: {
        question: "Was ist Podologie?",
        answer: "Podologie ist die nichtärztliche Heilkunde am Fuß. Als geschützter Gesundheitsfachberuf umfasst sie die Prävention, Erkennung und Behandlung von Fußerkrankungen. Im Unterschied zur kosmetischen Fußpflege behandeln Podologen medizinische Fußprobleme mit sterilen Instrumenten.",
      },
      en: {
        question: "What is podiatry?",
        answer: "Podiatry is the non-medical healing art of the foot. As a protected health profession, it encompasses the prevention, detection, and treatment of foot diseases. Unlike cosmetic foot care, podiatrists treat medical foot problems with sterile instruments.",
      },
      ru: {
        question: "Что такое подология?",
        answer: "Подология – это немедицинское лечение стопы. Как защищённая медицинская профессия, она включает профилактику, выявление и лечение заболеваний стоп. В отличие от косметического ухода за ногами, подологи лечат медицинские проблемы стоп стерильными инструментами.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Ist Healthy Feet kassenzugelassen?",
        answer: "Ja, unsere Praxis ist kassenzugelassen. Bei medizinischer Notwendigkeit übernehmen die gesetzlichen Krankenkassen die Kosten für podologische Behandlungen. Ihr Arzt kann eine Heilmittelverordnung (Muster 13) ausstellen.",
      },
      en: {
        question: "Is Healthy Feet approved by health insurance?",
        answer: "Yes, our practice is approved by statutory health insurance. When medically necessary, statutory health insurance covers the costs of podiatric treatments. Your doctor can issue a medical prescription (Form 13).",
      },
      ru: {
        question: "Имеет ли Healthy Feet допуск к страховым компаниям?",
        answer: "Да, наша практика допущена к работе со страховыми компаниями. При медицинской необходимости государственные медицинские страховые компании покрывают расходы на подологические процедуры. Ваш врач может выписать направление (форма 13).",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Was muss ich zum ersten Termin mitbringen?",
        answer: "Bringen Sie bitte Ihre Versichertenkarte und, falls vorhanden, eine Heilmittelverordnung Ihres Arztes mit. Tragen Sie bequeme Schuhe und Socken, die leicht an- und auszuziehen sind.",
      },
      en: {
        question: "What should I bring to my first appointment?",
        answer: "Please bring your insurance card and, if available, a medical prescription from your doctor. Wear comfortable shoes and socks that are easy to put on and take off.",
      },
      ru: {
        question: "Что мне нужно взять на первый приём?",
        answer: "Пожалуйста, возьмите с собой страховую карту и, при наличии, направление от врача. Наденьте удобную обувь и носки, которые легко снимать и надевать.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Wie bekomme ich eine Verordnung für Podologie?",
        answer: "Ihr Hausarzt, Diabetologe oder Dermatologe kann eine Heilmittelverordnung (Muster 13) für podologische Behandlungen ausstellen. Voraussetzung ist eine medizinische Indikation wie Diabetes, eingewachsene Nägel oder chronische Wunden.",
      },
      en: {
        question: "How do I get a prescription for podiatry?",
        answer: "Your family doctor, diabetologist, or dermatologist can issue a medical prescription (Form 13) for podiatric treatments. A medical indication such as diabetes, ingrown nails, or chronic wounds is required.",
      },
      ru: {
        question: "Как получить направление на подологию?",
        answer: "Ваш семейный врач, диабетолог или дерматолог может выписать направление (форма 13) на подологические процедуры. Необходимо медицинское показание, такое как диабет, вросшие ногти или хронические раны.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Was kostet eine Behandlung ohne Verordnung?",
        answer: "Die Kosten für Privatleistungen variieren je nach Behandlung. Gerne beraten wir Sie telefonisch oder vor Ort zu den genauen Kosten. Kassenleistungen rechnen wir direkt mit Ihrer Krankenkasse ab.",
      },
      en: {
        question: "How much does a treatment without a prescription cost?",
        answer: "The costs for private services vary depending on the treatment. We are happy to advise you by phone or in person about the exact costs. Insurance services are billed directly to your health insurance.",
      },
      ru: {
        question: "Сколько стоит процедура без направления?",
        answer: "Стоимость частных услуг варьируется в зависимости от процедуры. Мы с удовольствием проконсультируем вас по телефону или лично о точных ценах. Страховые услуги мы рассчитываем напрямую с вашей страховой компанией.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Wie oft sollte ich zur Podologie?",
        answer: "Das hängt von Ihrem individuellen Bedarf ab. Diabetiker sollten alle 4–6 Wochen kommen. Bei Nagelkorrektur-Spangen sind Kontrolltermine alle 6–8 Wochen üblich. Zur allgemeinen Fußgesundheit empfehlen wir 4–6 Behandlungen pro Jahr.",
      },
      en: {
        question: "How often should I see a podiatrist?",
        answer: "That depends on your individual needs. Diabetics should come every 4–6 weeks. For nail correction braces, check-ups every 6–8 weeks are common. For general foot health, we recommend 4–6 treatments per year.",
      },
      ru: {
        question: "Как часто следует посещать подолога?",
        answer: "Это зависит от ваших индивидуальных потребностей. Диабетикам следует приходить каждые 4–6 недель. При коррекционных скобах для ногтей контрольные визиты каждые 6–8 недель являются обычными. Для общего здоровья ног мы рекомендуем 4–6 процедур в год.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Sind die Behandlungen schmerzhaft?",
        answer: "Unsere Behandlungen sind in der Regel schmerzfrei. Nagelkorrekturen mit modernen Spangensystemen sind deutlich schonender als operative Eingriffe. Bei der Kryotherapie kann ein kurzes Kältegefühl auftreten.",
      },
      en: {
        question: "Are the treatments painful?",
        answer: "Our treatments are generally painless. Nail corrections with modern brace systems are much gentler than surgical procedures. With cryotherapy, a brief cold sensation may occur.",
      },
      ru: {
        question: "Болезненны ли процедуры?",
        answer: "Наши процедуры, как правило, безболезненны. Коррекция ногтей с помощью современных скобочных систем значительно щадящее, чем хирургические вмешательства. При криотерапии может возникнуть кратковременное ощущение холода.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Behandeln Sie auch Kinder?",
        answer: "Ja, wir behandeln Patienten jeden Alters. Gerade bei Kindern sind eingewachsene Nägel und Warzen häufig. Kinder und Jugendliche unter 18 Jahren sind von der Zuzahlung bei Kassenleistungen befreit.",
      },
      en: {
        question: "Do you also treat children?",
        answer: "Yes, we treat patients of all ages. Ingrown nails and warts are particularly common in children. Children and adolescents under 18 are exempt from co-payments for insurance services.",
      },
      ru: {
        question: "Вы также лечите детей?",
        answer: "Да, мы лечим пациентов всех возрастов. У детей часто встречаются вросшие ногти и бородавки. Дети и подростки до 18 лет освобождены от доплаты по страховым услугам.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Was ist der Unterschied zwischen Podologie und Fußpflege?",
        answer: "Podologie ist ein geschützter medizinischer Fachberuf mit dreijähriger Ausbildung. Podologen dürfen medizinische Fußprobleme behandeln und mit Krankenkassen abrechnen. Kosmetische Fußpflege konzentriert sich auf Pflege und Ästhetik.",
      },
      en: {
        question: "What is the difference between podiatry and foot care?",
        answer: "Podiatry is a protected medical profession with three years of training. Podiatrists are allowed to treat medical foot problems and bill health insurance. Cosmetic foot care focuses on care and aesthetics.",
      },
      ru: {
        question: "В чём разница между подологией и уходом за ногами?",
        answer: "Подология – это защищённая медицинская профессия с трёхлетним обучением. Подологи имеют право лечить медицинские проблемы стоп и рассчитываться со страховыми компаниями. Косметический уход за ногами ориентирован на уход и эстетику.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Gibt es Parkplätze in der Nähe?",
        answer: "In der Nähe unserer Praxen gibt es öffentliche Parkplätze. Beide Standorte sind auch gut mit öffentlichen Verkehrsmitteln erreichbar.",
      },
      en: {
        question: "Is there parking nearby?",
        answer: "There are public parking spaces near both of our practices. Both locations are also easily accessible by public transport.",
      },
      ru: {
        question: "Есть ли рядом парковка?",
        answer: "Рядом с обеими нашими практиками есть общественные парковки. Оба филиала также легко доступны на общественном транспорте.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Kann ich meinen Termin online buchen?",
        answer: "Die Online-Terminbuchung wird in Kürze verfügbar sein. Aktuell können Sie Ihren Termin telefonisch unter 0821 450 798 37 vereinbaren.",
      },
      en: {
        question: "Can I book my appointment online?",
        answer: "Online appointment booking will be available soon. Currently, you can schedule your appointment by phone at 0821 450 798 37.",
      },
      ru: {
        question: "Могу ли я записаться на приём онлайн?",
        answer: "Онлайн-запись скоро будет доступна. В настоящее время вы можете записаться на приём по телефону 0821 450 798 37.",
      },
    },
  },
  {
    translations: {
      de: {
        question: "Was ist Plasmatherapie?",
        answer: "Die Plasmatherapie nutzt physikalisches Kaltplasma zur Behandlung von Nagelpilz, Wunden und Hautinfektionen. Das Verfahren ist schmerzfrei, antimikrobiell und fördert die Heilung. Es ist eine innovative Ergänzung zu klassischen Behandlungsmethoden.",
      },
      en: {
        question: "What is plasma therapy?",
        answer: "Plasma therapy uses physical cold plasma to treat nail fungus, wounds, and skin infections. The procedure is painless, antimicrobial, and promotes healing. It is an innovative complement to classic treatment methods.",
      },
      ru: {
        question: "Что такое плазмотерапия?",
        answer: "Плазмотерапия использует физическую холодную плазму для лечения грибка ногтей, ран и кожных инфекций. Процедура безболезненна, обладает антимикробным действием и способствует заживлению. Это инновационное дополнение к классическим методам лечения.",
      },
    },
  },
];
