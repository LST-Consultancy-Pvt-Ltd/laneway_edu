/**
 * Homepage content — from the client's current website (Home, Our Why, International
 * Students and course pages). No invented copy, stats, fees or dates.
 */
import type { StaticImageData } from "next/image";
import { images, partnerLogos, portraits } from "./images";

export const hero = {
  eyebrow: "Sydney & Melbourne",
  title: ["Educational", "Experiences for", "Curious Minds"],
  disciplines: ["Entrepreneurship", "Marketing", "Leadership", "Project Management", "Coding", "Cyber Security"],
  image: images.heroMural,
  imageAlt: "A student floats in front of painted wings on a teal laneway wall",
};

export const intro = {
  eyebrow: "Welcome to Laneway",
  title: "We empower students to think like entrepreneurs and innovators.",
  body: [
    "We’ve thrown out the old classroom rules and challenge our students to engage with real-world problems and opportunities in a creative way. We believe this transforms our students into active, lifelong learners.",
    "When faced with a problem to solve and a mix of choices and responsibilities, the learning experience becomes deep and long-lasting.",
  ],
};

export const methodology = {
  eyebrow: "How we do it",
  title: "Project-based learning, design thinking and networking.",
  lead: "Our methodology combines project-based learning, design thinking and networking. This has created a one of a kind learning experience that focuses on real world outcomes, business innovation and industry engagement.",
  body: "Our classes and workshops are led by entrepreneurs, business coaches, experienced technical experts and start-up founders; who all share their wealth of knowledge and experience. Our students have the option to focus on their own business dream, or work on one of our real-world business projects throughout their studies. In both cases, they will learn and use cutting-edge techniques to harness their creativity and find innovative solutions to business problems.",
  pillars: [
    { title: "Project-based learning", text: "Work on your own business dream or one of our real-world business projects." },
    { title: "Design thinking", text: "Use cutting-edge techniques to find innovative solutions to business problems." },
    { title: "Networking", text: "Learn alongside entrepreneurs, business coaches and start-up founders." },
  ],
  image: images.methodology,
  imageAlt:
    "Venn diagram: project-based learning, design thinking and networking overlap at the Laneway monogram",
};

export const values = {
  eyebrow: "Our why",
  title: "We live our values every day.",
  lead: "We challenge traditional approaches by delivering innovative training methods. Our focus is on student experience and graduate outcomes.",
  items: [
    {
      title: "We raise the bar",
      text: "We go above and beyond, putting our students at the centre of everything we do. We deliver on our promise – every single time. Even when no one is watching.",
    },
    {
      title: "We’re open",
      text: "We embrace diversity and know that when great minds work together, anything is possible. And yes, we want to know if you love it or hate it.",
    },
    {
      title: "We’re ambitious",
      text: "We have a vision, a big one. And we chase it daily. We take smart risks and we own our mistakes. We empower our students to create their own success.",
    },
    {
      title: "We’re agile",
      text: "We are curious about what’s next. We recognise that people learn and work differently and we adapt our style to meet their needs.",
    },
  ],
  image: images.journey,
  imageAlt: "A rider in a yellow jacket on a winding road",
};

export const socialPurpose = {
  eyebrow: "Our social purpose",
  title: "Every Laneway student is making a difference.",
  body: "We’re proud to support the UN Sustainable Development Goal of Education through UNICEF’s Education for Every Girl initiative. For every ten enrolments at Laneway Education, we fund a ‘School-in-a-box’ for a classroom of girls.",
  detail:
    "Each box contains enough exercise books, pencils, erasers and scissors for a class of 40 children, plus a wind-up solar radio and blackboard.",
  stats: [
    { value: 10, label: "enrolments fund one School-in-a-box" },
    { value: 40, label: "children equipped by every box" },
  ],
  partnerLabel: "In partnership with UNICEF’s Education for Every Girl",
};

export const concierge = {
  eyebrow: "Student concierge",
  title: "Stronger together.",
  body: "Through our student concierge, every student is treated like a VIP — with a 360˚ support network to make sure your time with us is enjoyable and productive, especially if you’re studying far from family.",
  services: [
    "Designated team members that speak a variety of languages",
    "Language and academic support",
    "1-on-1 mentoring",
    "On-arrival welcome and orientation programs",
    "Health & Wellbeing Counsellor",
    "Student accommodation services",
    "Employment services",
  ],
  image: images.sneakers,
  imageAlt: "Friends sitting side by side, sneakers dangling over a ledge",
};

export type Testimonial = {
  name: string;
  course: string;
  quote: string;
  portrait: StaticImageData;
};

/** Real student quotes from Laneway course pages */
export const testimonials: Testimonial[] = [
  {
    name: "Carlos Gomez",
    course: "Diploma of Leadership and Management",
    quote:
      "There is one word that summarizes my experience at Laneway; Inspiring! The teachers are entrepreneurs or business coaches that share their valuable knowledge with us.",
    portrait: portraits.carlos,
  },
  {
    name: "Samantha Tune",
    course: "Diploma of Project Management",
    quote:
      "Making the decision to study at Laneway has been one of the most positively impactful decisions I have ever made.",
    portrait: portraits.samantha,
  },
  {
    name: "Ros Rosli",
    course: "Graduate Diploma of Management (Learning)",
    quote: "Laneway has definitely catapulted my journey in establishing not just a business idea.",
    portrait: portraits.ros,
  },
  {
    name: "Aline Silvestre",
    course: "Diploma of Marketing and Communication",
    quote: "I love the fact that everyone who works at school is very kind and reachable.",
    portrait: portraits.aline,
  },
  {
    name: "Monika Grinskyte",
    course: "Advanced Diploma of Marketing and Communication",
    quote: "A place where everyone has an ability to find their own path and are supported along the way.",
    portrait: portraits.monika,
  },
  {
    name: "Yukiko Kanemura",
    course: "Certificate IV in Business",
    quote: "The teachers and staff are always supporting me with my studies and my business idea.",
    portrait: portraits.yukiko,
  },
  {
    name: "Milagros Ceballos",
    course: "Graduate Diploma of Strategic Leadership",
    quote: "I love how much I learn from my teacher's knowledge and experiences.",
    portrait: portraits.milagros,
  },
  {
    name: "Elisa Juventia",
    course: "Advanced Diploma of Leadership and Management",
    quote: "Laneway is a great school, I absolutely love this college.",
    portrait: portraits.elisa,
  },
];

export const partners = {
  title: "Some of the companies our students work with",
  logos: [
    { name: "TSL", image: partnerLogos.tsl },
    { name: "TGP", image: partnerLogos.tgp },
    { name: "Sticklar", image: partnerLogos.sticklar },
    { name: "Spark Festival", image: partnerLogos.spark },
  ],
};

export const getStarted = {
  title: "Ready to get started?",
  body: "We’re on a mission to disrupt education because we know there’s a better way. We’ve thrown out the old classroom rules and empower our students to engage in real-world problems and opportunities in a creative way.",
};

export const newsletter = {
  title: "Stay connected with us",
  privacyNote: "By sharing your email, you agree to our",
};
