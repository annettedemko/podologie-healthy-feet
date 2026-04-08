import type { Language } from "@/i18n/types";

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  locationId: string;
}

export const reviews: Record<Language, Review[]> = {
  de: [
    {
      name: "Maria S.",
      rating: 5,
      text: "Sehr professionelle Behandlung in einer angenehmen Atmosphäre. Meine Fußprobleme haben sich deutlich verbessert!",
      date: "Januar 2026",
      locationId: "augsburg",
    },
    {
      name: "Thomas K.",
      rating: 5,
      text: "Endlich ein Podologe, der sich wirklich Zeit nimmt. Die Nagelkorrektur war schmerzfrei und effektiv.",
      date: "Februar 2026",
      locationId: "augsburg",
    },
    {
      name: "Susanne W.",
      rating: 5,
      text: "Als Diabetikerin fühle ich mich hier bestens aufgehoben. Kompetentes Team und modernste Ausstattung.",
      date: "Dezember 2025",
      locationId: "augsburg",
    },
    {
      name: "Klaus M.",
      rating: 5,
      text: "Hervorragende Praxis! Die Terminbuchung ist super praktisch und die Wartezeiten minimal.",
      date: "März 2026",
      locationId: "augsburg",
    },
    {
      name: "Petra H.",
      rating: 5,
      text: "Sehr einfühlsame und kompetente Behandlung. Kann die Praxis jedem empfehlen, der Probleme mit den Füßen hat.",
      date: "November 2025",
      locationId: "augsburg",
    },
    {
      name: "Andreas R.",
      rating: 5,
      text: "Tolle Praxis mit modernem Equipment. Die Kryotherapie bei meiner Dornwarze hat perfekt gewirkt.",
      date: "Januar 2026",
      locationId: "augsburg",
    },
  ],
  en: [
    {
      name: "Maria S.",
      rating: 5,
      text: "Very professional treatment in a pleasant atmosphere. My foot problems have improved significantly!",
      date: "January 2026",
      locationId: "augsburg",
    },
    {
      name: "Thomas K.",
      rating: 5,
      text: "Finally a podiatrist who really takes time. The nail correction was painless and effective.",
      date: "February 2026",
      locationId: "augsburg",
    },
    {
      name: "Susanne W.",
      rating: 5,
      text: "As a diabetic, I feel in the best hands here. Competent team and state-of-the-art equipment.",
      date: "December 2025",
      locationId: "augsburg",
    },
    {
      name: "Klaus M.",
      rating: 5,
      text: "Excellent practice! Appointment booking is super convenient and waiting times are minimal.",
      date: "March 2026",
      locationId: "augsburg",
    },
    {
      name: "Petra H.",
      rating: 5,
      text: "Very empathetic and competent treatment. Can recommend the practice to anyone with foot problems.",
      date: "November 2025",
      locationId: "augsburg",
    },
    {
      name: "Andreas R.",
      rating: 5,
      text: "Great practice with modern equipment. The cryotherapy for my plantar wart worked perfectly.",
      date: "January 2026",
      locationId: "augsburg",
    },
  ],
  ru: [
    {
      name: "Мария С.",
      rating: 5,
      text: "Очень профессиональное лечение в приятной атмосфере. Мои проблемы со стопами значительно улучшились!",
      date: "Январь 2026",
      locationId: "augsburg",
    },
    {
      name: "Томас К.",
      rating: 5,
      text: "Наконец-то подолог, который действительно уделяет время. Коррекция ногтей была безболезненной и эффективной.",
      date: "Февраль 2026",
      locationId: "augsburg",
    },
    {
      name: "Сюзанна В.",
      rating: 5,
      text: "Как диабетик, я чувствую себя здесь в надёжных руках. Компетентная команда и современнейшее оборудование.",
      date: "Декабрь 2025",
      locationId: "augsburg",
    },
    {
      name: "Клаус М.",
      rating: 5,
      text: "Отличная практика! Запись на приём очень удобная, а время ожидания минимальное.",
      date: "Март 2026",
      locationId: "augsburg",
    },
    {
      name: "Петра Х.",
      rating: 5,
      text: "Очень чуткое и компетентное лечение. Могу рекомендовать практику всем, у кого проблемы со стопами.",
      date: "Ноябрь 2025",
      locationId: "augsburg",
    },
    {
      name: "Андреас Р.",
      rating: 5,
      text: "Отличная практика с современным оборудованием. Криотерапия моей подошвенной бородавки сработала идеально.",
      date: "Январь 2026",
      locationId: "augsburg",
    },
  ],
};
