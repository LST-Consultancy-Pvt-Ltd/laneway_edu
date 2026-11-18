/**
 * Static image imports → next/image gets intrinsic size + blur placeholder.
 * Assets are stored locally in /public/images — nothing is loaded from external servers.
 * TODO: replace with a fresh, high-quality photo shoot of real campuses and students.
 */
import campusMelbourne from "../../public/images/campus-melbourne.jpg";
import campusSydney from "../../public/images/campus-sydney.jpg";
import heroMural from "../../public/images/home-2.jpg";
import collaborate from "../../public/images/course-leadership-bg.jpg";
import sneakers from "../../public/images/course-leadership-2.jpg";
import roadAhead from "../../public/images/hero-home.jpg";
import journey from "../../public/images/ourwhy-1.jpg";
import methodology from "../../public/images/methodology.png";
import logo from "../../public/images/brand/laneway-logo.png";

import aline from "../../public/images/testimonials/aline.jpg";
import carlos from "../../public/images/testimonials/carlos.jpg";
import elisa from "../../public/images/testimonials/elisa.jpg";
import milagros from "../../public/images/testimonials/milagros.jpg";
import monika from "../../public/images/testimonials/monika.jpg";
import ros from "../../public/images/testimonials/ros.jpg";
import samantha from "../../public/images/testimonials/samantha.jpg";
import yukiko from "../../public/images/testimonials/yukiko.jpg";

import spark from "../../public/images/partners/spark.jpg";
import sticklar from "../../public/images/partners/sticklar.jpg";
import tgp from "../../public/images/partners/tgp.jpg";
import tsl from "../../public/images/partners/tsl.png";

export const images = {
  logo,
  heroMural,
  campusSydney,
  campusMelbourne,
  collaborate,
  sneakers,
  roadAhead,
  journey,
  methodology,
} as const;

export const portraits = {
  aline,
  carlos,
  elisa,
  milagros,
  monika,
  ros,
  samantha,
  yukiko,
} as const;

export const partnerLogos = { spark, sticklar, tgp, tsl } as const;

export type PortraitKey = keyof typeof portraits;
export type ImageKey = keyof typeof images;
