// Example: How to Add New Services to EventHub Explore Page

// File: src/data/services.js

export const services = [
  // Existing services...

  // NEW SERVICE EXAMPLE 1: Luxury Transportation
  {
    id: 13,
    name: "Luxury Transportation",
    category: "Transportation", // New category
    description: "Premium chauffeur services and luxury vehicle rentals",
    icon: "🚗",
    color: "from-gray-600 to-slate-700", // Dark luxury color
    lightColor: "bg-slate-50",
    textColor: "text-slate-600",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800",
    features: ["Professional drivers", "Luxury vehicles", "Punctual arrival"],
  },

  // NEW SERVICE EXAMPLE 2: Makeup & Hair
  {
    id: 14,
    name: "Makeup & Hair Styling",
    category: "Beauty", // New category
    description: "Professional hair and makeup artists for your special day",
    icon: "💄",
    color: "from-fuchsia-500 to-purple-600",
    lightColor: "bg-fuchsia-50",
    textColor: "text-fuchsia-600",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&q=80&w=800",
    features: [
      "Trial sessions available",
      "Travel available",
      "Bridal specialist",
    ],
  },

  // NEW SERVICE EXAMPLE 3: Guest Accommodations
  {
    id: 15,
    name: "Guest Accommodations",
    category: "Lodging", // New category
    description: "Curated hotel partnerships for your event guests",
    icon: "🏨",
    color: "from-teal-500 to-cyan-500",
    lightColor: "bg-teal-50",
    textColor: "text-teal-600",
    image:
      "https://images.unsplash.com/photo-1631049307038-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
    features: ["Group rates", "Prime locations", "Easy booking"],
  },
];

// COLOR REFERENCE FOR NEW SERVICES
const colorOptions = {
  // Warm colors
  orange: "from-orange-500 to-red-500",
  amber: "from-amber-500 to-orange-500",

  // Cool colors
  blue: "from-blue-500 to-cyan-500",
  teal: "from-teal-500 to-cyan-500",

  // Purple/Pink
  purple: "from-purple-500 to-indigo-500",
  pink: "from-pink-500 to-rose-500",

  // Nature colors
  green: "from-green-500 to-emerald-500",
  lime: "from-lime-500 to-green-500",

  // Luxury colors
  slate: "from-slate-600 to-gray-700",
  indigo: "from-indigo-600 to-blue-700",

  // Premium colors
  fuchsia: "from-fuchsia-500 to-purple-600",
  rose: "from-rose-500 to-pink-500",
};

// ICON OPTIONS (Emoji)
const iconOptions = {
  // Vehicles
  car: "🚗",
  limousine: "🚙",
  bus: "🚌",
  helicopter: "🚁",

  // Beauty & Wellness
  makeup: "💄",
  haircut: "✂️",
  spa: "💆",
  nail: "💅",

  // Lodging
  hotel: "🏨",
  homestead: "🏡",
  castle: "🏰",
  tent: "⛺",

  // Entertainment
  circus: "🎪",
  game: "🎮",
  sports: "⚽",
  magic: "🎩",

  // Food & Drink
  restaurant: "🍽️",
  bar: "🍸",
  coffee: "☕",
  cake: "🎂",

  // Activities
  hiking: "🥾",
  adventure: "🧗",
  sports: "🏃",
  yoga: "🧘",

  // Misc
  gift: "🎁",
  card: "🎴",
  balloon: "🎈",
  flower: "🌹",
  candle: "🕯️",
  ring: "💍",
  heart: "💕",
  star: "⭐",
};

// CATEGORY SUGGESTIONS
const suggestedCategories = [
  // Existing
  "Catering",
  "Photography",
  "Decoration",
  "DJ & Music",

  // New categories to consider
  "Transportation",
  "Beauty",
  "Lodging",
  "Entertainment",
  "Flowers & Arrangements",
  "Wedding Attire",
  "Gifts & Favors",
  "Invitations",
  "Rentals",
  "Games & Activities",
  "Officiant Services",
  "Planning & Coordination",
  "Venues",
  "Lighting",
  "Sounds System",
];

// FEATURE TEMPLATES FOR COMMON SERVICES
const featureTemplates = {
  catering: ["Custom menus", "Professional staff", "Dietary accommodations"],
  photography: [
    "High-resolution images",
    "Quick turnaround",
    "Professional editing",
  ],
  decoration: [
    "Theme customization",
    "Setup included",
    "Professional installation",
  ],
  music: ["Custom playlist", "Professional equipment", "Live mixing"],
  transportation: [
    "Professional drivers",
    "Luxury vehicles",
    "Punctual arrival",
  ],
  beauty: ["Trial sessions", "Travel available", "Expert specialists"],
  planning: ["Full coordination", "Vendor management", "Budget tracking"],
  entertainment: [
    "Interactive activities",
    "Professional team",
    "Customizable packages",
  ],
};

// EXAMPLE: Adding a full category of beauty services
export const beautyServices = [
  {
    id: 16,
    name: "Bridal Hair & Makeup",
    category: "Beauty",
    description: "Specialized bridal beauty services to make you feel radiant",
    icon: "👰",
    color: "from-rose-500 to-pink-500",
    lightColor: "bg-rose-50",
    textColor: "text-rose-600",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&q=80&w=800",
    features: [
      "Trial sessions available",
      "Airbrush makeup option",
      "Professional updos",
    ],
  },
  {
    id: 17,
    name: "Guest Makeup Stations",
    category: "Beauty",
    description: "On-site makeup application for your guests",
    icon: "💅",
    color: "from-fuchsia-500 to-purple-500",
    lightColor: "bg-fuchsia-50",
    textColor: "text-fuchsia-600",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&q=80&w=800",
    features: ["Multiple artists", "Quick turnaround", "Makeup stations"],
  },
];

// EXPORT FUNCTION TO ADD NEW SERVICES PROGRAMMATICALLY
export function addService(newService) {
  // Validates and adds a new service to the array
  if (!newService.id || !newService.name || !newService.category) {
    console.error("Service must have id, name, and category");
    return false;
  }
  services.push(newService);
  return true;
}

// USAGE EXAMPLE:
/*
const newService = {
  id: 20,
  name: "Wedding Favors",
  category: "Gifts",
  description: "Personalized favors for your guests",
  icon: "🎁",
  color: "from-purple-500 to-pink-500",
  lightColor: "bg-purple-50",
  textColor: "text-purple-600",
  image: "https://example.com/favors.jpg",
  features: ["Custom designs", "Bulk orders", "Fast shipping"],
};

addService(newService);
*/

// MOCK API FUNCTION (for future API integration)
export async function fetchServicesFromAPI() {
  try {
    const response = await fetch("/api/services");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return services; // Fallback to mock data
  }
}

// SEARCH & FILTER HELPERS
export function searchServices(query, serviceList = services) {
  return serviceList.filter(
    (service) =>
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase()) ||
      service.category.toLowerCase().includes(query.toLowerCase())
  );
}

export function filterByCategory(category, serviceList = services) {
  if (category === "All") return serviceList;
  return serviceList.filter((service) => service.category === category);
}

export function filterByPriceRange(min, max, serviceList = services) {
  // Extend services with price data for this to work
  return serviceList.filter(
    (service) => service.price >= min && service.price <= max
  );
}

// RATING HELPERS
export function filterByMinRating(minRating, serviceList = services) {
  // Extend services with rating data for this to work
  return serviceList.filter((service) => service.rating >= minRating);
}
