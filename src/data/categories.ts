import type { CategoryInfo } from "@/lib/types";

/**
 * Category tiles reuse product hero shots from `public/catalog/` so imagery
 * loads without a third-party CDN (offline demos, locked-down networks).
 */
const categoryImage = (slug: string) => `/catalog/products/${slug}.jpg`;

export const categories: CategoryInfo[] = [
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Layers built for the trail and the city.",
    image: categoryImage("ridgeline-shell-jacket"),
  },
  {
    id: "tops",
    name: "Tops",
    description: "Everyday essentials in considered fabrics.",
    image: categoryImage("alder-flannel"),
  },
  {
    id: "bottoms",
    name: "Bottoms",
    description: "Pants, shorts, and shells made to move.",
    image: categoryImage("trailwright-pant"),
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Trail-tested, road-ready, all day comfortable.",
    image: categoryImage("scout-sneaker"),
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Small details with outsized impact.",
    image: categoryImage("carryall-tote"),
  },
  {
    id: "home",
    name: "Home",
    description: "Objects for grounded, intentional spaces.",
    image: categoryImage("kettle-coffee"),
  },
];
