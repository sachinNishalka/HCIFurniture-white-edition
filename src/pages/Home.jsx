import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products, categories } from "../data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";

function HeroSection() {
  const swiperRef = useRef(null);

  return (
    <div className="relative h-[600px]">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="/images/slider_living_room.png"
              alt="Living Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-24 right-10 text-right">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl sm:text-6xl font-serif font-bold text-white"
              >
                Bring Your Living Room
                <br />
                to Life
              </motion.h1>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="/images/slider_dining_room.png"
              alt="Dining Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-24 right-10 text-right">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl sm:text-6xl font-serif font-bold text-white"
              >
                Dine in
                <br />
                Style
              </motion.h1>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src="/images/slider_bed_room.png"
              alt="Bedroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-24 right-10 text-right">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl sm:text-6xl font-serif font-bold text-white"
              >
                Dream Bedroom
                <br />
                Designs
              </motion.h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom navigation arrows */}
      <div className="absolute bottom-6 right-6 flex space-x-3 z-20">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-black/50 hover:bg-black/80 p-3 text-white rounded-full shadow-lg transition-colors"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-black/50 hover:bg-black/80 p-3 text-white rounded-full shadow-lg transition-colors"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function FeaturedProducts() {
  // Take first five featured products for best sellers layout
  const featured = products.filter((p) => p.featured).slice(0, 5);
  if (featured.length < 5) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 relative overflow-hidden">
      {/* Decorative corner gradients */}
      <div className="absolute top-0 left-0 w-48 h-32 bg-gradient-to-tr from-yellow-200 to-transparent transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-48 h-32 bg-gradient-to-tl from-yellow-200 to-transparent transform translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-primary-900 flex-1 mx-4"></div>
          <h2 className="text-3xl font-serif font-bold uppercase text-center">
            Best Sellers
          </h2>
          <div className="h-px bg-primary-900 flex-1 mx-4"></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Left stack */}
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <Link key={i} to={`/product/${featured[i].id}`} className="block">
                <div className="border border-primary-900 rounded-lg overflow-hidden">
                  <img
                    src={featured[i].images[0]}
                    alt={featured[i].name}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <p className="mt-2 text-center font-serif font-medium text-primary-900 uppercase">
                  {featured[i].name}
                </p>
              </Link>
            ))}
          </div>
          {/* Center large */}
          <div>
            <Link to={`/product/${featured[2].id}`} className="block">
              <div className="border-2 border-primary-900 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={featured[2].images[0]}
                  alt={featured[2].name}
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform"
                />
              </div>
              <p className="mt-2 text-center font-serif font-semibold text-primary-900 uppercase">
                {featured[2].name}
              </p>
            </Link>
          </div>
          {/* Right stack */}
          <div className="space-y-4">
            {[3, 4].map((i) => (
              <Link key={i} to={`/product/${featured[i].id}`} className="block">
                <div className="border border-primary-900 rounded-lg overflow-hidden">
                  <img
                    src={featured[i].images[0]}
                    alt={featured[i].name}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <p className="mt-2 text-center font-serif font-medium text-primary-900 uppercase">
                  {featured[i].name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading with side lines */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-primary-900 flex-1 mx-4"></div>
          <h2 className="text-3xl font-serif font-bold uppercase text-center">
            Categories
          </h2>
          <div className="h-px bg-primary-900 flex-1 mx-4"></div>
        </div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={24}
          navigation
          className="pb-8"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-serif font-semibold mb-4 uppercase">
                    {category.name}
                  </h3>
                  <Link
                    to={`/category/${category.id}`}
                    className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition"
                  >
                    SEE MORE
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const swiperRef = useRef(null);
  const testimonials = [
    {
      text: "Teak Elegance is one of the best places in Colombo to buy furniture. They have been the trusted brand for generations, and the staff helped furnish our entire home flawlessly.",
      author: "Mr. Boopathy Kahathuduwa",
      image: "/images/boopathi.png",
    },
    {
      text: "The 3D furniture previews were so realistic I could arrange my living room perfectly before purchasing. Exceptional service and quality!",
      author: "Ms. Samantha Lee",
      image: "/images/samantha.png",
    },
    {
      text: "My dining set arrived exactly as shown, and the assembly team was prompt. Highly recommend Teak Elegance for their seamless shopping experience!",
      author: "Mr. Rohan Kapoor",
      image: "/images/rohan.png",
    },
  ];

  return (
    <section className="relative py-16 bg-gray-800 overflow-hidden">
      {/* Right-side gradient overlay */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-yellow-200 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex items-center mb-8">
          <div className="h-px bg-white flex-1 mx-4" />
          <h2 className="text-3xl font-serif font-semibold uppercase text-white">
            Our Customers Say
          </h2>
          <div className="h-px bg-white flex-1 mx-4" />
        </div>

        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop
          className="space-y-8"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <p className="italic text-lg">{t.text}</p>
                  <p className="mt-4 font-semibold">{t.author}</p>
                </div>
                <div className="w-full border-2 border-white rounded-lg overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom slider navigation below content */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <TestimonialSection />
    </div>
  );
}
