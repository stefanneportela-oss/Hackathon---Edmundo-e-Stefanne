// Cards shown in the "Projetos em destaque" 3D arc carousel.
//
// Derived directly from the real project catalog (projects.js) so the carousel
// always mirrors the Projetos page — same names, images and areas. No separate
// placeholder list to keep in sync. The carousel only needs id/tag/title/desc/
// src (+ slug so a card can deep-link to its project detail page).
import { projects } from "./projects.js";

export const solutions = projects.map((p, i) => ({
  id: i + 1,
  slug: p.slug,
  tag: p.tags?.[0] ?? "",
  title: p.name,
  desc: p.description,
  src: p.image,
}));
