export type Category = "men" | "women";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  movement: string;
  caseSize: string;
  material: string;
  waterResistance: string;
  strap: string;
  description: string;
  image: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    slug: "meridian-chronograph",
    name: "Meridian Chronograph",
    category: "men",
    price: 2480,
    movement: "Automatic chronograph",
    caseSize: "42 mm",
    material: "Brushed steel",
    waterResistance: "200 m",
    strap: "Steel bracelet",
    description:
      "A deep blue dial with three counters and a ceramic bezel. Built for long days on the water and evenings that run late.",
    image: "/watches/meridian.jpg",
    featured: true,
  },
  {
    slug: "atlas-diver",
    name: "Atlas Diver",
    category: "men",
    price: 1890,
    movement: "Automatic",
    caseSize: "40 mm",
    material: "Steel",
    waterResistance: "300 m",
    strap: "Steel bracelet",
    description:
      "A quiet sports watch with a charcoal dial, applied indexes, and a bracelet that sits close to the wrist.",
    image: "/watches/atlas.jpg",
    featured: true,
  },
  {
    slug: "nocturne-chronograph",
    name: "Nocturne Chronograph",
    category: "men",
    price: 1640,
    movement: "Quartz chronograph",
    caseSize: "41 mm",
    material: "Rose gold tone",
    waterResistance: "50 m",
    strap: "Brown leather",
    description:
      "A cream dial and slim counters under a warm case. The leather strap softens a watch that still reads as formal.",
    image: "/watches/nocturne.jpg",
    featured: false,
  },
  {
    slug: "harbor-chrono",
    name: "Harbor Chrono",
    category: "men",
    price: 1280,
    movement: "Quartz chronograph",
    caseSize: "44 mm",
    material: "Black PVD steel",
    waterResistance: "100 m",
    strap: "Brown leather",
    description:
      "Textured black case, warm hands, and a date at six. A heavier evening watch with a workshop finish.",
    image: "/watches/harbor.jpg",
    featured: true,
  },
  {
    slug: "field-officer",
    name: "Field Officer",
    category: "men",
    price: 890,
    movement: "Quartz",
    caseSize: "38 mm",
    material: "Black steel",
    waterResistance: "50 m",
    strap: "Black mesh",
    description:
      "A small, matte field watch with a high-contrast dial. Easy to read and light enough for every day.",
    image: "/watches/field.jpg",
    featured: false,
  },
  {
    slug: "summit-chronograph",
    name: "Summit Chronograph",
    category: "men",
    price: 980,
    movement: "Quartz chronograph",
    caseSize: "44 mm",
    material: "Steel and resin",
    waterResistance: "200 m",
    strap: "Black rubber",
    description:
      "A sport chronograph with a tachymeter bezel and a strap that shrugs off weather. Made for travel days.",
    image: "/watches/summit.jpg",
    featured: false,
  },
  {
    slug: "luna-chronograph",
    name: "Luna Chronograph",
    category: "women",
    price: 3120,
    movement: "Automatic chronograph",
    caseSize: "41 mm",
    material: "Polished steel",
    waterResistance: "60 m",
    strap: "Brown alligator leather",
    description:
      "An ivory dial, open balance, and a strap the color of cognac. A statement piece that still feels tailored.",
    image: "/watches/luna.jpg",
    featured: true,
  },
  {
    slug: "solstice-automatic",
    name: "Solstice Automatic",
    category: "women",
    price: 1460,
    movement: "Automatic",
    caseSize: "38 mm",
    material: "Steel",
    waterResistance: "50 m",
    strap: "Black leather",
    description:
      "A black sunburst dial with a date window and pale stitching on the strap. Clean lines, no extra decoration.",
    image: "/watches/solstice.jpg",
    featured: false,
  },
  {
    slug: "pearl-numerals",
    name: "Pearl Numerals",
    category: "women",
    price: 1180,
    movement: "Quartz",
    caseSize: "32 mm",
    material: "Gold tone",
    waterResistance: "30 m",
    strap: "Tan leather",
    description:
      "A small gold-tone case with Arabic numerals and a pale dial. Meant to sit with jewelry, not over it.",
    image: "/watches/pearl.jpg",
    featured: true,
  },
  {
    slug: "aurora-dusk",
    name: "Aurora Dusk",
    category: "women",
    price: 1320,
    movement: "Quartz",
    caseSize: "36 mm",
    material: "Steel",
    waterResistance: "50 m",
    strap: "Black leather",
    description:
      "A slim dress watch with a dark dial that picks up the last light of the day. Quiet, and easy to wear.",
    image: "/watches/aurora.jpg",
    featured: true,
  },
  {
    slug: "celeste-blue",
    name: "Celeste Blue",
    category: "women",
    price: 1540,
    movement: "Automatic",
    caseSize: "36 mm",
    material: "Steel",
    waterResistance: "50 m",
    strap: "Navy leather",
    description:
      "A saturated blue dial, applied indexes, and a strap with a fine scale pattern. Bright without being loud.",
    image: "/watches/celeste.jpg",
    featured: false,
  },
  {
    slug: "ivory-minimal",
    name: "Ivory Minimal",
    category: "women",
    price: 740,
    movement: "Quartz",
    caseSize: "34 mm",
    material: "Rose gold tone",
    waterResistance: "30 m",
    strap: "Taupe leather",
    description:
      "An almost empty dial, a thin rose-gold case, and a soft strap. The simplest watch in the women’s edit.",
    image: "/watches/ivory.jpg",
    featured: true,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getByCategory(category: Category) {
  return products.filter((product) => product.category === category);
}

export function getFeatured() {
  return products.filter((product) => product.featured);
}

export function getRelated(product: Product, limit = 3) {
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function categoryLabel(category: Category) {
  return category === "men" ? "Men" : "Women";
}
