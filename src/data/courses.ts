/**
 * Course catalogue — mirrors the "Courses" menu on the client's current website.
 * Only the Diploma of Leadership and Management is rebuilt as an inner page in
 * this demo; other courses are listed without links.
 */
import type { StaticImageData } from "next/image";
import { images, portraits } from "./images";

export type CategoryId =
  | "entrepreneur"
  | "marketer"
  | "leader"
  | "projects"
  | "web-developer"
  | "cyber-security"
  | "trade";

export type CourseLink = {
  code: string;
  title: string;
  /** Every course links to the demo course page (see DEMO_COURSE_HREF) */
  href: string;
  /** The course this demo page was built for — highlighted in menus/cards */
  featured?: boolean;
};

type CourseEntry = Pick<CourseLink, "code" | "title">;
type CategoryEntry = Omit<CourseCategory, "courses"> & { courses: CourseEntry[] };

export type CourseCategory = {
  id: CategoryId;
  name: string;
  /** One-line summary used on homepage cards */
  blurb: string;
  courses: CourseLink[];
};

export const LEADERSHIP_SLUG = "diploma-of-leadership-and-management";

/**
 * Demo: only one course page is built, so every course opens it as a sample.
 * When the remaining pages exist, give each course its own href here.
 */
export const DEMO_COURSE_HREF = `/courses/${LEADERSHIP_SLUG}`;
const FEATURED_CODE = "BSB50420";

const categories: CategoryEntry[] = [
  {
    id: "entrepreneur",
    name: "Entrepreneur",
    blurb: "Turn an idea into a commercial or social enterprise.",
    courses: [
      { code: "BSB40120", title: "Certificate IV in Business" },
      { code: "11210NAT", title: "Diploma of Entrepreneurship and Innovation" },
    ],
  },
  {
    id: "marketer",
    name: "Marketer",
    blurb: "Digital, content and strategic marketing for the real world.",
    courses: [
      { code: "BSB40820", title: "Certificate IV in Marketing and Communication" },
      { code: "BSB50620", title: "Diploma of Marketing and Communication" },
      { code: "BSB60520", title: "Advanced Diploma of Marketing and Communication" },
    ],
  },
  {
    id: "leader",
    name: "Leader",
    blurb: "Lead people, teams and strategy with confidence.",
    courses: [
      { code: "BSB50420", title: "Diploma of Leadership and Management" },
      { code: "BSB60420", title: "Advanced Diploma of Leadership and Management" },
      { code: "BSB80120", title: "Graduate Diploma of Management (Learning)" },
      { code: "BSB80320", title: "Graduate Diploma of Strategic Leadership" },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    blurb: "Scope and deliver projects across any industry.",
    courses: [
      { code: "BSB50820", title: "Diploma of Project Management" },
    ],
  },
  {
    id: "web-developer",
    name: "Web Developer",
    blurb: "Build, test and ship modern software and websites.",
    courses: [
      { code: "ICT60220", title: "Advanced Diploma of Information Technology" },
      { code: "ICT50220", title: "Diploma of Information Technology Coding" },
    ],
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    blurb: "Detect, assess and respond to network security threats.",
    courses: [
      { code: "ICT50220", title: "Diploma of Information Technology Cyber" },
    ],
  },
  {
    id: "trade",
    name: "Trade",
    blurb: "Hands-on construction, building and finishing trades.",
    courses: [
      { code: "MSF30422", title: "Certificate III in Glass and Glazing" },
      { code: "MSF40422", title: "Certificate IV in Glass and Glazing" },
      { code: "MSF30322", title: "Certificate III in Cabinet Making and Timber Technology" },
      { code: "CPC30620", title: "Certificate III in Painting and Decorating" },
      { code: "CPC30220", title: "Certificate III in Carpentry" },
      { code: "CPC50220", title: "Diploma of Building and Construction (Building)" },
      { code: "RII60520", title: "Advanced Diploma of Civil Construction Design" },
    ],
  },
];

export const courseCategories: CourseCategory[] = categories.map((category) => ({
  ...category,
  courses: category.courses.map((course) => ({
    ...course,
    href: DEMO_COURSE_HREF,
    featured: course.code === FEATURED_CODE,
  })),
}));

export const totalCourses = courseCategories.reduce((n, c) => n + c.courses.length, 0);

/* ───────────────────────── Course detail pages ───────────────────────── */

export type CourseDetail = {
  slug: string;
  code: string;
  title: string;
  categoryId: CategoryId;
  quote: [string, string];
  overview: string[];
  facts: {
    cricos: string;
    duration: string;
    studyPeriods: string;
    campus: string;
    delivery: string;
  };
  entryRequirements: string[];
  careers: string[];
  heroImage: StaticImageData;
  heroImageAlt: string;
  testimonial: {
    name: string;
    portrait: StaticImageData;
    paragraphs: string[];
  };
};

/** Content from the current Diploma of Leadership and Management page */
export const courseDetails: CourseDetail[] = [
  {
    slug: LEADERSHIP_SLUG,
    code: "BSB50420",
    title: "Diploma of Leadership and Management",
    categoryId: "leader",
    quote: ["The most dangerous leadership myth", "is that leaders are born."],
    overview: [
      "Our Diploma of Leadership and Management has been designed to give you the skills to develop initiative and judgment in planning, organizing, implementing, and monitoring your own workload and the workload of others.",
      "It also develops communication skills to support individuals and teams to meet organizational or enterprise requirements and strategies. You will learn how to plan, design, apply, and evaluate solutions to unpredictable problems and to identify, analyze, and synthesise information from a variety of sources.",
    ],
    facts: {
      cricos: "104324D",
      duration: "52 weeks",
      studyPeriods: "4 terms",
      campus: "Sydney & Melbourne",
      delivery: "Blended",
    },
    entryRequirements: [
      "Australian Year 12 or equivalent.",
      "Must be at least 18 years of age at course commencement.",
      "International learners must demonstrate they hold an IELTS 5.5 or equivalent.",
    ],
    careers: ["Frontline Manager", "Middle Manager", "Supervisor", "Business Operator"],
    heroImage: images.collaborate,
    heroImageAlt: "Students collaborating around a laptop",
    testimonial: {
      name: "Carlos Gomez",
      portrait: portraits.carlos,
      paragraphs: [
        "There is one word that summarizes my experience at Laneway; Inspiring!",
        "First of all, the school is located in one of the most inspiring buildings, where real startups are developing or creating their businesses.",
        "Then, the teachers are entrepreneurs or/and business coaches, that share their valuable knowledge with us.",
        "Finally, the community of students. People from all around the world that inspires you with their different backgrounds and points of view.",
      ],
    },
  },
];

export function getCourseDetail(slug: string) {
  return courseDetails.find((c) => c.slug === slug);
}

export function getCategory(id: CategoryId) {
  return courseCategories.find((c) => c.id === id);
}
