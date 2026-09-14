// Every new design must be assigned a reviewed category; images alone do not
// determine suitability. Filters are generated from these category values.
export type CatalogCategory = "Modern" | "Classic" | "Heartfelt" | "Natural" | "Children’s Memorials";
export type Design = {
  code: string;
  style: CatalogCategory;
  image: string;
  description: string;
  fullImage?: boolean;
};

export const DESIGNS: Design[] = [
  { code: "CGE33", style: "Modern", image: "/images/cge33.png", description: "A sculpted memorial with sweeping curves and a polished dark finish." },
  { code: "GCE34", style: "Modern", image: "/images/gce34.png", description: "An upright memorial with a curved corner detail and a contrasting stone base." },
  { code: "GCG42", style: "Modern", image: "/images/gcg42.png", description: "A distinctive two-tone memorial with sculptural cut-outs and a rose-toned base.", fullImage: true },
  { code: "GCG45", style: "Classic", image: "/images/gcg45.png", description: "A traditional upright memorial with a framed inscription and a blue-toned stone base.", fullImage: true },
  { code: "GCG21", style: "Modern", image: "/images/gcg21.png", description: "A flowing upright memorial with contrasting light accents and a curved silhouette.", fullImage: true },
  { code: "GCG25", style: "Modern", image: "/images/gcg25.png", description: "A sculptural upright memorial with angular panels and a bold circular cut-out.", fullImage: true },
  { code: "GCG28", style: "Classic", image: "/images/gcg28.png", description: "An open-book memorial with a gold-toned centre detail and a light stone base.", fullImage: true },
  { code: "GCG29", style: "Classic", image: "/images/gcg29.png", description: "A traditional open-book headstone with a framed surround and space for a personal tribute.", fullImage: true },
  { code: "GCD9", style: "Modern", image: "/images/gcd9.png", description: "A broad memorial with twin stone panels, a contrasting centre strip and an angular crown.", fullImage: true },
  { code: "GCD7", style: "Classic", image: "/images/gcd7.png", description: "Twin upright headstones joined by a central cross on a shared polished base.", fullImage: true },
  { code: "GCD8", style: "Classic", image: "/images/gcd8.png", description: "A light-toned memorial with a sheltered inscription panel and substantial stone pillars.", fullImage: true },
  { code: "GCD6", style: "Classic", image: "/images/gcd6.png", description: "A wide dark memorial with a contrasting central cross and a stepped floral base.", fullImage: true },
  { code: "GCB1", style: "Children’s Memorials", image: "/images/gcb1.png", description: "A gentle tribute with a pink character feature and a tall inscription panel.", fullImage: true },
  { code: "GCB3", style: "Children’s Memorials", image: "/images/gcb3.png", description: "A framed tribute with red-toned accents and a personal inscription panel.", fullImage: true },
  { code: "GCB4", style: "Children’s Memorials", image: "/images/gcb4.png", description: "An angel-shaped tribute with contrasting outlines and a separate name pillar.", fullImage: true },
  { code: "GCP22", style: "Modern", image: "/images/gcp22.png", description: "A two-tone memorial with an hourglass-inspired feature and a layered dark base.", fullImage: true },
  { code: "GCP23", style: "Classic", image: "/images/gcp23.png", description: "An arched memorial with contrasting pillars, a leaf-shaped detail and twin flower holders.", fullImage: true },
  { code: "GCP24", style: "Modern", image: "/images/gcp24.png", description: "An asymmetric memorial with a tall cylindrical pillar and sweeping, layered stone details.", fullImage: true },
  { code: "GCP25", style: "Modern", image: "/images/gcp25.png", description: "A warm-toned upright memorial set above a sculpted base of contrasting curved layers.", fullImage: true },
  { code: "GCE45", style: "Modern", image: "/images/gce45.png", description: "Twin sweeping upright forms with dove details above a light-toned stone base.", fullImage: true },
  { code: "GCE47", style: "Modern", image: "/images/gce47.png", description: "A layered upright memorial with a botanical accent and a rounded stone base.", fullImage: true },
  { code: "GCE48", style: "Classic", image: "/images/gce48.png", description: "A traditional peaked memorial with a contrasting vertical accent and blue-toned base.", fullImage: true },
  { code: "GCE49", style: "Classic", image: "/images/gce49.png", description: "A framed memorial with a peaked crown, slender pillars and cross details.", fullImage: true },
  { code: "GCB5", style: "Children’s Memorials", image: "/images/gcb5.png", description: "A gentle tribute with three rising panels, angel details and a central flower holder.", fullImage: true },
  { code: "GCB6", style: "Children’s Memorials", image: "/images/gcb6.png", description: "An arched tribute with a sheltered angel figure and a personal inscription panel.", fullImage: true },
  { code: "GCB7", style: "Classic", image: "/images/gcb7.png", description: "A green-toned upright memorial with an open-book motif and a separate name pillar.", fullImage: true },
  { code: "ISM-001", style: "Heartfelt", image: "/images/heartfelt-memorial-2.png", description: "An expressive tribute inspired by love and remembrance." },
  { code: "ISM-002", style: "Modern", image: "/images/modern-designs.png", description: "Clean lines and a contemporary approach to remembrance." },
  { code: "ISM-003", style: "Classic", image: "/images/classic-tributes.png", description: "Traditional forms with an enduring, dignified presence." },
  { code: "ISM-004", style: "Natural", image: "/images/natural-stone.png", description: "Organic textures for a quiet connection to nature." },
];
