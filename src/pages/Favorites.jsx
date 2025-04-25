import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";

export default function Favorites() {
  const { favorites } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from favorites
  const categories = [
    "all",
    ...new Set(favorites.map((item) => item.category)),
  ];

  // Filter favorites based on search and category
  const filteredFavorites = favorites.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Heading */}
      <div className="flex items-center justify-center mb-8">
        <div className="h-px bg-primary-900 flex-1 mx-4" />
        <h1 className="text-3xl font-serif font-bold uppercase text-primary-900">
          My Favorites
        </h1>
        <div className="h-px bg-primary-900 flex-1 mx-4" />
      </div>
      <p className="text-center text-gray-600 mb-8">
        {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
      </p>

      {/* Search & Filter Panel */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-primary-600 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search your favorites..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-primary-600 mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFavorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <FaHeart className="mx-auto text-gray-300 text-6xl mb-4" />
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
            Your favorites list is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Start adding items to your favorites to keep track of products you
            love.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}
