import VendorCard from "./VendorCard";

const vendors = [
  {
    name: "Elite Catering",
    category: "Catering",
    rating: "4.8",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Flash Photography",
    category: "Photography",
    rating: "4.7",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Decor Dreams",
    category: "Decoration",
    rating: "4.3",
    image: "https://via.placeholder.com/300",
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
