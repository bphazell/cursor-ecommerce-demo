import type { CategoryInfo } from "@/lib/types";

/**
 * Category banner imagery.
 *
 * Each category reuses the lead product's hero photo so the catalog feels
 * cohesive. All photos are hosted on the Unsplash CDN under the Unsplash
 * License (https://unsplash.com/license).
 */
const banner = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1400&q=80&auto=format&fit=crop`;

export const categories: CategoryInfo[] = [
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Layers built for the trail and the city.",
    image: banner("1559022488-570ad0c1e43c"),
  },
  {
    id: "tops",
    name: "Tops",
    description: "Everyday essentials in considered fabrics.",
    image: banner("1604936509922-a0ae4fd19e3e"),
  },
  {
    id: "bottoms",
    name: "Bottoms",
    description: "Pants, shorts, and shells made to move.",
    image: banner("1473966968600-fa801b869a1a"),
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Trail-tested, road-ready, all day comfortable.",
    image: banner("1620827252031-146d52644aac"),
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Small details with outsized impact.",
    image: banner("1758818005874-f555e0932ef3"),
  },
  {
    id: "home",
    name: "Home",
    description: "Objects for grounded, intentional spaces.",
    image: banner("1768674150936-1d2044ba32d6"),
  },
];
