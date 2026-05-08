import VendorCard from "./VendorCard";
import Image from "../assets/img/eventhub-bg.avif";

const vendors = [
  {
    name: "Elite Catering",
    category: "Catering",
    rating: "4.8",
    image: { src: Image, alt: "Elite Catering" },
  },
  {
    name: "Flash Photography",
    category: "Photography",
    rating: "4.7",
    image: { src: Image, alt: "Flash Photography" },
  },
  {
    name: "Decor Dreams",
    category: "Decoration",
    rating: "4.3",
    image: { src: Image, alt: "Decor Dreams" },
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
