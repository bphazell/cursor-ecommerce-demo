import type { Product } from "@/lib/types";

/**
 * Build an Unsplash CDN URL for a product photo.
 *
 * Photos are credited inline alongside each product. All images are used
 * under the Unsplash License (https://unsplash.com/license).
 */
const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  {
    id: "p_001",
    slug: "ridgeline-shell-jacket",
    name: "Ridgeline Shell Jacket",
    tagline: "Three-layer waterproof shell for unpredictable forecasts.",
    description:
      "Built around a recycled three-layer membrane, the Ridgeline keeps weather out while letting heat escape. Articulated elbows and a helmet-compatible hood mean you can wear it from a damp commute to a windy summit.",
    price: 248,
    compareAtPrice: 295,
    category: "outerwear",
    image: img("1559022488-570ad0c1e43c"),
    colors: ["Slate", "Moss", "Ember"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 184,
    inStock: true,
    isBestseller: true,
    features: [
      "Three-layer waterproof membrane (20k/20k)",
      "Fully taped seams",
      "Helmet-compatible storm hood",
      "Recycled face fabric",
    ],
    materials: "100% recycled nylon face, PFC-free DWR",
  },
  {
    id: "p_002",
    slug: "alder-flannel",
    name: "Alder Heavyweight Flannel",
    tagline: "Brushed organic cotton with a lifetime of softness baked in.",
    description:
      "We brushed an organic cotton twill on both sides for a flannel that feels broken-in from the first wear. Roomy through the chest, tapered through the hem, and finished with corozo buttons.",
    price: 118,
    category: "tops",
    image: img("1604936509922-a0ae4fd19e3e"),
    colors: ["Rust Plaid", "Spruce Plaid", "Dune Plaid"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    isBestseller: true,
    features: [
      "12 oz brushed organic cotton",
      "Corozo nut buttons",
      "Locker loop and pen pocket",
    ],
    materials: "100% organic cotton",
  },
  {
    id: "p_003",
    slug: "field-tee",
    name: "Field Tee",
    tagline: "The everyday tee, weighted and built to last.",
    description:
      "A 6.5 oz long-staple cotton jersey with a relaxed fit and a hem that sits exactly where you want it. Sold in three-packs because you'll want backups.",
    price: 38,
    category: "tops",
    image: img("1627225793904-a2f900a6e4cf"),
    colors: ["Bone", "Slate", "Moss", "Ember", "Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 1248,
    inStock: true,
    features: [
      "6.5 oz long-staple cotton",
      "Garment-dyed for softness",
      "Reinforced shoulder seams",
    ],
    materials: "100% cotton",
  },
  {
    id: "p_004",
    slug: "summit-down-vest",
    name: "Summit Down Vest",
    tagline: "Featherweight 800-fill for shoulder-season layering.",
    description:
      "Responsibly sourced 800-fill down stuffed into a recycled ripstop shell. Packs into its own chest pocket and weighs less than a paperback.",
    price: 175,
    category: "outerwear",
    image: img("1573513500284-ca52c282f78a"),
    colors: ["Slate", "Ember", "Bone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 96,
    inStock: true,
    isNew: true,
    features: [
      "800-fill RDS-certified down",
      "Recycled 20D ripstop shell",
      "Packs into chest pocket",
    ],
    materials: "Recycled nylon shell, 800-fill down",
  },
  {
    id: "p_005",
    slug: "trailwright-pant",
    name: "Trailwright Pant",
    tagline: "Stretch nylon pants that don't look like trail pants.",
    description:
      "A four-way stretch nylon with the drape of a chino. Gusseted crotch and articulated knees mean you can crouch, climb, or sit cross-legged at a coffee shop without complaint.",
    price: 128,
    category: "bottoms",
    image: img("1473966968600-fa801b869a1a"),
    colors: ["Slate", "Olive", "Bone"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    rating: 4.7,
    reviewCount: 421,
    inStock: true,
    isBestseller: true,
    features: [
      "Four-way stretch nylon",
      "Gusseted crotch, articulated knees",
      "Zippered thigh pocket",
    ],
    materials: "94% nylon, 6% elastane",
  },
  {
    id: "p_006",
    slug: "harbor-shorts",
    name: "Harbor Shorts",
    tagline: "Quick-drying shorts for water, trail, or porch.",
    description:
      "A 7-inch inseam, four-way stretch, and a hidden zip pocket. Wear them in the ocean, then walk straight into dinner.",
    price: 78,
    category: "bottoms",
    image: img("1719473458937-d42f1f9aad00"),
    colors: ["Slate", "Sand", "Spruce"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 162,
    inStock: true,
    features: [
      "7-inch inseam",
      "Quick-dry recycled nylon",
      "Hidden zip pocket",
    ],
  },
  {
    id: "p_007",
    slug: "scout-sneaker",
    name: "Scout Low Sneaker",
    tagline: "A cleaner, lighter take on the daily trainer.",
    description:
      "A merino-lined upper sits on top of a cork-blend midsole and natural rubber outsole. Nothing flashy. Goes with everything you already own.",
    price: 168,
    category: "footwear",
    image: img("1625860191460-10a66c7384fb"),
    colors: ["Bone", "Slate", "Moss"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    rating: 4.6,
    reviewCount: 287,
    inStock: true,
    isNew: true,
    features: [
      "Merino wool lining",
      "Cork-blend midsole",
      "Natural rubber outsole",
    ],
    materials: "Merino wool, recycled poly, natural rubber",
  },
  {
    id: "p_008",
    slug: "basecamp-boot",
    name: "Basecamp Boot",
    tagline: "Resoleable leather boots, built to outlast a decade.",
    description:
      "Full-grain Horween leather, Goodyear-welt construction, and a Vibram sole. Resole as many times as you need to.",
    price: 325,
    category: "footwear",
    image: img("1620827252031-146d52644aac"),
    colors: ["Walnut", "Black"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    rating: 4.9,
    reviewCount: 73,
    inStock: true,
    features: [
      "Horween full-grain leather",
      "Goodyear-welt construction",
      "Vibram lug outsole",
    ],
    materials: "Full-grain leather, Vibram rubber",
  },
  {
    id: "p_009",
    slug: "carryall-tote",
    name: "Carryall Waxed Tote",
    tagline: "Waxed canvas tote with a leather base.",
    description:
      "12 oz waxed canvas, a vegetable-tanned leather base, and brass hardware. Holds a laptop, groceries, or an embarrassing number of books.",
    price: 148,
    category: "accessories",
    image: img("1758818005874-f555e0932ef3"),
    colors: ["Field Tan", "Charcoal"],
    rating: 4.8,
    reviewCount: 209,
    inStock: true,
    features: [
      "12 oz waxed canvas",
      "Vegetable-tanned leather base",
      "Solid brass hardware",
    ],
  },
  {
    id: "p_010",
    slug: "foundry-cap",
    name: "Foundry 5-Panel Cap",
    tagline: "A simple, low-profile cap. That's it.",
    description:
      "Cotton twill, an unstructured crown, and a curved brim. Comes in three colors that go with literally everything.",
    price: 42,
    category: "accessories",
    image: img("1720534490358-bc2ad29d51d5"),
    colors: ["Bone", "Slate", "Moss"],
    rating: 4.5,
    reviewCount: 318,
    inStock: true,
    features: ["Cotton twill", "Unstructured crown", "Adjustable strap"],
  },
  {
    id: "p_011",
    slug: "merino-crew-socks",
    name: "Merino Crew Socks (3-Pack)",
    tagline: "The only socks you'll want to put on tomorrow.",
    description:
      "A merino-nylon blend that wicks moisture, regulates temperature, and survives a wash cycle without complaint.",
    price: 38,
    category: "accessories",
    image: img("1664735245539-69a4846823ce"),
    colors: ["Mixed Earth", "Mixed Slate", "All Black"],
    sizes: ["S/M", "L/XL"],
    rating: 4.7,
    reviewCount: 612,
    inStock: true,
    isBestseller: true,
    features: ["75% merino wool blend", "Reinforced heel and toe", "Arch support band"],
  },
  {
    id: "p_012",
    slug: "kettle-coffee",
    name: "Pour-Over Kettle",
    tagline: "Goose-neck stovetop kettle for slow morning rituals.",
    description:
      "Brushed stainless steel, a counter-balanced handle, and a precise goose-neck spout. Looks as good on the stove as it does in the cupboard.",
    price: 95,
    category: "home",
    image: img("1768674150936-1d2044ba32d6"),
    colors: ["Brushed Steel", "Matte Black"],
    rating: 4.6,
    reviewCount: 142,
    inStock: true,
    features: [
      "Stovetop and induction compatible",
      "1.0L capacity",
      "Counter-balanced handle",
    ],
  },
  {
    id: "p_013",
    slug: "wool-throw",
    name: "Highland Wool Throw",
    tagline: "A heavyweight lambswool throw for cold rooms.",
    description:
      "Woven in Scotland from 100% lambswool. Fringed edges, a generous 55x70 size, and a weight that says 'stay on the couch.'",
    price: 198,
    category: "home",
    image: img("1764004821025-b2c13a764c75"),
    colors: ["Charcoal", "Oat", "Rust"],
    rating: 4.9,
    reviewCount: 88,
    inStock: false,
    features: ["100% lambswool", "Woven in Scotland", "55in x 70in"],
  },
  {
    id: "p_014",
    slug: "ceramic-mug",
    name: "Stoneware Mug Set",
    tagline: "A set of four hand-thrown stoneware mugs.",
    description:
      "Each mug is slightly different, because each one is hand-thrown. 12 oz, microwave and dishwasher safe.",
    price: 62,
    category: "home",
    image: img("1598099968270-f7a302af6d50"),
    colors: ["Sand", "Stone"],
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    isNew: true,
    features: ["Hand-thrown stoneware", "12 oz capacity", "Set of four"],
  },
  {
    id: "p_015",
    slug: "trail-beanie",
    name: "Trail Watch Cap",
    tagline: "A merino watch cap that does everything well.",
    description:
      "A medium-weight merino knit cap with a folded cuff. Warm enough for cold mornings, breathable enough you'll forget you have it on.",
    price: 48,
    category: "accessories",
    image: img("1664289321767-8442abbd5e26"),
    colors: ["Slate", "Moss", "Bone", "Ember"],
    rating: 4.6,
    reviewCount: 178,
    features: ["100% merino wool", "Folded cuff", "Tagless interior"],
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = products.find((p) => p.id === productId);
  if (!current) return [];
  return products
    .filter((p) => p.id !== productId && p.category === current.category)
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.isBestseller).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}
