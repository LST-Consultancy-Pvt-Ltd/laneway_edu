/**
 * College-level content and navigation. Components read everything from here,
 * so the same components can serve any college in the group.
 *
 * Content source: the client's current website (reviewed Nov 2026). The demo is
 * fully self-contained — it never links to or loads anything from production.
 */
import type { StaticImageData } from "next/image";
import { images } from "./images";

export type NavLink = { label: string; href: string; description?: string };

export type Campus = {
  id: string;
  name: string;
  city: string;
  address: [string, string];
  mapUrl: string;
  image: StaticImageData;
  imageAlt: string;
};

export type FooterColumn = { title: string; links: NavLink[] };

export const site = {
  name: "Laneway Education",
  shortName: "Laneway",
  tagline: "Educational experiences for curious minds",
  description:
    "Nationally recognised business, marketing, leadership, project management, IT and trade qualifications in Sydney and Melbourne — taught by entrepreneurs, coaches and industry experts.",
  mission: "We're on a mission to disrupt education because we know there's a better way.",
  /** Resolved from Vercel's env at build time; localhost in development. */
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",

  compliance: {
    rto: "41504",
    cricos: "03597G",
  },

  contact: {
    phone: "+61 3 9125 4489",
    phoneHref: "tel:+61391254489",
    email: "admissions@laneway.edu.au",
  },

  /** Primary call to action — the contact section in our own footer. */
  enquireHref: "/#contact",

  campusLinks: [
    { label: "Sydney", href: "/#campus-sydney", description: "George Street, Sydney CBD" },
    { label: "Melbourne", href: "/#campus-melbourne", description: "Fitzroy Street, St Kilda" },
  ] satisfies NavLink[],

  /** Primary navigation (Courses + Campuses are rendered as menus). */
  primaryNav: [
    { label: "Student Support", href: "/#student-support" },
    { label: "Our Why", href: "/#our-why" },
    { label: "Contact Us", href: "/#contact" },
  ] satisfies NavLink[],

  campuses: [
    {
      id: "campus-sydney",
      name: "Sydney Campus",
      city: "Sydney",
      address: ["Level 4, 532–540 George Street", "Sydney NSW 2000"],
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=532-540+George+Street+Sydney+NSW+2000",
      image: images.campusSydney,
      imageAlt: "Sydney Harbour Bridge and the city skyline",
    },
    {
      id: "campus-melbourne",
      name: "Melbourne Campus",
      city: "Melbourne",
      address: ["3, 201 Fitzroy Street", "St Kilda VIC 3182"],
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=201+Fitzroy+Street+St+Kilda+VIC+3182",
      image: images.campusMelbourne,
      imageAlt: "A busy Melbourne laneway lined with cafés",
    },
  ] satisfies Campus[],


  footerColumns: [
    {
      title: "Explore",
      links: [
        { label: "Courses", href: "/#courses" },
        { label: "How we teach", href: "/#how-we-teach" },
        { label: "Our Why", href: "/#our-why" },
        { label: "Campuses", href: "/#campuses" },
      ],
    },
    {
      title: "Students",
      links: [
        { label: "Student Support", href: "/#student-support" },
        { label: "Student Stories", href: "/#testimonials" },
        { label: "Partners", href: "/#partners" },
        { label: "Contact Us", href: "/#contact" },
      ],
    },
  ] satisfies FooterColumn[],

  acknowledgement:
    "Laneway Education acknowledges the Traditional Custodians of the lands on which we learn and work, and pays respect to Elders past and present.",

  copyrightYear: 2026,
} as const;
