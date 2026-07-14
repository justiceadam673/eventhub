// import VendorCard from "./VendorCard";
// import Image from "../assets/img/eventhub-bg.avif";

// const vendors = [
//   {
//     name: "Elite Catering",
//     category: "Catering",
//     rating: "4.8",
//     image: { src: Image, alt: "Elite Catering" },
//   },
//   {
//     name: "Flash Photography",
//     category: "Photography",
//     rating: "4.7",
//     image: { src: Image, alt: "Flash Photography" },
//   },
//   {
//     name: "Decor Dreams",
//     category: "Decoration",
//     rating: "4.3",
//     image: { src: Image, alt: "Decor Dreams" },
//   },
// ];

// const FeaturedVendors = () => {
//   return (
//     <section className='py-16 px-8'>
//       <h2 className='text-2xl font-bold mb-10 text-center'>Featured Vendors</h2>

//       <div className='grid md:grid-cols-3 gap-6'>
//         {vendors.map((vendor, index) => (
//           <VendorCard key={index} vendor={vendor} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedVendors;

import VendorCard from "./VendorCard";

const vendors = [
  {
    name: "Elite Catering",
    category: "Catering",
    rating: "4.8",
    image: {
      src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      alt: "Gourmet catering spread with hors d'oeuvres",
    },
  },
  {
    name: "Flash Photography",
    category: "Photography",
    rating: "4.7",
    image: {
      src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
      alt: "Professional camera setup at an event",
    },
  },
  {
    name: "Decor Dreams",
    category: "Decoration",
    rating: "4.3",
    image: {
      // Swapped to a rock-solid, beautiful wedding/event decoration image
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      alt: "Elegant wedding banquet hall setup with floral centerpieces and warm lighting",
    },
  },
];

const FeaturedVendors = () => {
  return (
    <section className='py-16 px-8'>
      <h2 className='text-2xl font-bold mb-10 text-center'>Featured Vendors</h2>

      <div className='grid md:grid-cols-3 gap-6'>
        {vendors.map((vendor, index) => (
          <VendorCard key={index} vendor={vendor} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedVendors;
