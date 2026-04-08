import type { Language } from "@/i18n/types";

export interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  zip: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  hours: Record<Language, { days: string; time: string }[]>;
  status: "active" | "coming-soon";
  coordinates: { lat: number; lng: number };
  googleMapsUrl: string;
  doctolibUrl?: string;
}

export const locations: Location[] = [
  {
    id: "muenchen",
    name: "Healthy Feet München",
    city: "München",
    address: "Baumkirchner Str. 19",
    zip: "81673 München",
    phone: "+498213490642",
    phoneDisplay: "0821 349 0642",
    email: "muenchen@podologie-healthyfeet.de",
    hours: {
      de: [
        { days: "Mo – Fr", time: "09:00 – 18:00" },
        { days: "Sa – So", time: "Geschlossen" },
      ],
      en: [
        { days: "Mon – Fri", time: "09:00 – 18:00" },
        { days: "Sat – Sun", time: "Closed" },
      ],
      ru: [
        { days: "Пн – Пт", time: "09:00 – 18:00" },
        { days: "Сб – Вс", time: "Закрыто" },
      ],
    },
    status: "active",
    coordinates: { lat: 48.1218, lng: 11.6181 },
    googleMapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.0!2d11.6159!3d48.1218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ddf0a1b2c3d4e%3A0x0!2sBaumkirchner+Str.+19%2C+81673+M%C3%BCnchen!5e0!3m2!1sde!2sde!4v1",
    doctolibUrl: "https://www.doctolib.de/podologie/muenchen/healthy-feet",
  },
  {
    id: "augsburg",
    name: "Healthy Feet Augsburg",
    city: "Augsburg",
    address: "Donauwörther Str. 49",
    zip: "86154 Augsburg",
    phone: "+498213490642",
    phoneDisplay: "0821 349 0642",
    email: "info@podologie-healthyfeet.de",
    hours: {
      de: [
        { days: "Mo – Fr", time: "09:00 – 17:00" },
        { days: "Sa – So", time: "Geschlossen" },
      ],
      en: [
        { days: "Mon – Fri", time: "09:00 – 17:00" },
        { days: "Sat – Sun", time: "Closed" },
      ],
      ru: [
        { days: "Пн – Пт", time: "09:00 – 17:00" },
        { days: "Сб – Вс", time: "Закрыто" },
      ],
    },
    status: "active",
    coordinates: { lat: 48.3891, lng: 10.8783 },
    googleMapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.0!2d10.8783!3d48.3891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDonauw%C3%B6rther+Str.+49%2C+86154+Augsburg!5e0!3m2!1sde!2sde!4v1",
    doctolibUrl: "https://www.doctolib.de/podologie/augsburg/healthy-feet",
  },
];

export function getLocation(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}

export function getActiveLocations(): Location[] {
  return locations.filter((l) => l.status === "active");
}

export const phoneDisplay = "0821 349 0642";
export const phoneHref = "tel:+498213490642";
