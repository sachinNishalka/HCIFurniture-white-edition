export const products = [
  // New living-room items
  {
    id: 10,
    name: "Minimalist Sectional Sofa",
    category: "living-room",
    price: 1899.99,
    description: "Modular sectional sofa with hypoallergenic fabric covers",
    modelUrl: "/models/yellow_sofa.glb",
    images: ["/images/yellow_sofa.png", "/images/yellow-sofa-2.jpg"],
    specs: {
      dimensions: "300x200x80 cm",
      material: "Polyester, engineered wood",
      color: "Light Gray",
      weight: "70 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 11,
    name: "Vintage Armchair",
    category: "living-room",
    price: 649.99,
    description:
      "Vintage-inspired armchair with tufted upholstery and solid wood legs",
    modelUrl: "/models/vin_arm_chair.glb",
    images: [
      "/images/vintange_arm_chair.png",
      "/images/vintage-armchair-2.jpg",
    ],
    specs: {
      dimensions: "80x85x90 cm",
      material: "Linen, oak wood",
      color: "Beige",
      weight: "18 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 12,
    name: "Reclaimed Wood Coffee Table",
    category: "living-room",
    price: 499.99,
    description:
      "Eco-friendly coffee table crafted from reclaimed wood with metal accents",
    modelUrl: "/models/wooden_coffee_table.glb",
    images: [
      "/images/wooden_coffee_table.png",
      "/images/reclaimed-table-2.jpg",
    ],
    specs: {
      dimensions: "125x65x45 cm",
      material: "Reclaimed wood, steel",
      color: "Natural Brown",
      weight: "28 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 13,
    name: "Reclining Loveseat",
    category: "living-room",
    price: 899.99,
    description:
      "Cozy two-seater recliner loveseat with adjustable headrests and padded armrests",
    modelUrl: "/models/love_seat.glb",
    images: ["/images/loveseats.png", "/images/loveseat-2.jpg"],
    specs: {
      dimensions: "160x90x100 cm",
      material: "Fabric upholstery, steel frame",
      color: "Charcoal Gray",
      weight: "40 kg",
    },
    inStock: true,
    featured: true,
  },

  // New dining-room items
  {
    id: 14,
    name: "Glass Top Dining Table",
    category: "dining-room",
    price: 1099.99,
    description: "Elegant glass top dining table with stainless steel base",
    modelUrl: "/models/glass_dining_table.glb",
    images: [
      "/images/glass_dining_table.png",
      "/images/glass-dining-table-2.jpg",
    ],
    specs: {
      dimensions: "190x95x75 cm",
      material: "Tempered glass, stainless steel",
      color: "Clear/Silver",
      weight: "42 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 15,
    name: "Upholstered Dining Bench",
    category: "dining-room",
    price: 299.99,
    description:
      "Comfortable upholstered dining bench with storage compartment",
    modelUrl: "/models/dining_bench.glb",
    images: ["/images/dining_bench.png", "/images/dining-bench-2.jpg"],
    specs: {
      dimensions: "150x40x45 cm",
      material: "Engineered wood, fabric",
      color: "Charcoal Gray",
      weight: "20 kg",
    },
    inStock: true,
    featured: false,
  },
  {
    id: 16,
    name: "High Back Dining Chair",
    category: "dining-room",
    price: 249.99,
    description:
      "High back dining chairs with ergonomic support and channel tufting",
    modelUrl: "/models/high_back_chair.glb",
    images: ["/images/high_back_chair.png", "/images/high-back-chair-2.jpg"],
    specs: {
      dimensions: "50x60x100 cm",
      material: "Velvet, metal",
      color: "Emerald Green",
      weight: "8 kg (each)",
    },
    inStock: false,
    featured: true,
  },
  {
    id: 17,
    name: "Nesting Side Tables",
    category: "dining-room",
    price: 379.99,
    description:
      "Set of 2 nesting side tables perfect for compact dining spaces",
    modelUrl: "/models/nesting_tables.glb",
    images: ["/images/nesting_tables.png", "/images/nesting-tables-2.jpg"],
    specs: {
      dimensions: "Set: 90x45x50 cm / 60x35x45 cm",
      material: "MDF, oak veneer",
      color: "White/Oak",
      weight: "25 kg (set)",
    },
    inStock: true,
    featured: false,
  },

  // New bedroom items
  {
    id: 18,
    name: "Upholstered Storage Bed",
    category: "bedroom",
    price: 1799.99,
    description:
      "Upholstered storage bed with hydraulic lift and fabric headboard",
    modelUrl: "/models/storage_bed.glb",
    images: ["/images/storage_bed.png", "/images/storage-bed-2.jpg"],
    specs: {
      dimensions: "165x210x50 cm",
      material: "Engineered wood, polyester fabric",
      color: "Dark Gray",
      weight: "90 kg",
    },
    inStock: true,
    featured: true,
  },
  {
    id: 19,
    name: "Mirrored Dresser",
    category: "bedroom",
    price: 699.99,
    description: "Dresser with a full-width mirror and six soft-close drawers",
    modelUrl: "/models/mirrored_dresser.glb",
    images: ["/images/mirrored_dresser.png", "/images/mirrored-dresser-2.jpg"],
    specs: {
      dimensions: "150x45x120 cm",
      material: "MDF, mirror glass",
      color: "White/Chrome",
      weight: "65 kg",
    },
    inStock: true,
    featured: false,
  },
  {
    id: 20,
    name: "Linen Accent Chair",
    category: "bedroom",
    price: 329.99,
    description:
      "Comfortable linen accent chair perfect for bedroom reading corners",
    modelUrl: "/models/linen_chair.glb",
    images: ["/images/linen_chair.png", "/images/linen-chair-2.jpg"],
    specs: {
      dimensions: "75x80x90 cm",
      material: "Linen, solid beech wood",
      color: "Light Beige",
      weight: "17 kg",
    },
    inStock: true,
    featured: false,
  },
  {
    id: 21,
    name: "Floating Nightstand",
    category: "bedroom",
    price: 259.99,
    description:
      "Wall-mounted floating nightstand with one drawer and USB charging port",
    modelUrl: "/models/floating_nightstand.glb",
    images: [
      "/images/floating_nightstand.png",
      "/images/floating-nightstand-2.jpg",
    ],
    specs: {
      dimensions: "45x35x55 cm",
      material: "MDF, veneer",
      color: "Walnut",
      weight: "7 kg",
    },
    inStock: false,
    featured: true,
  },
];

export const categories = [
  {
    id: "living-room",
    name: "Living Room",
    description: "Sofas, coffee tables, and entertainment units",
    image: "/images/living_room.png",
    info: "Explore our exquisite living room furniture collection, featuring luxurious sofas, elegant coffee tables, and entertainment units crafted from premium materials. Transform your home with timeless designs that blend comfort and style.",
  },
  {
    id: "dining-room",
    name: "Dining Room",
    description: "Tables, chairs, and storage solutions",
    image: "/images/dining_room.png",
    info: "Discover modern dining room sets and storage solutions, including solid wood tables and ergonomic chairs, perfect for gathering and entertaining guests. Crafted with meticulous attention to detail for lasting elegance.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    description: "Beds, wardrobes, and nightstands",
    image: "/images/bedroom.png",
    info: "Reimagine your bedroom with our range of platform beds, spacious wardrobes, and bedside tables offering functional storage and sophisticated design. Create a serene retreat with quality furniture pieces.",
  },
];
