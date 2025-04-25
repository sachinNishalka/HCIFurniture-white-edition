import { useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import FurnitureModel from "../components/3d/FurnitureModel";
import { products } from "../data/products";
import {
  ShoppingCartIcon,
  HeartIcon,
  ViewfinderCircleIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToFavorites, removeFromFavorites, favorites } =
    useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isCustomizingColor, setIsCustomizingColor] = useState(false);
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(
    product?.specs?.color || "#FFFFFF"
  );

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Available colors for the product
  const availableColors = [
    "#FFFFFF", // White
    "#8B4513", // Brown
    "#808080", // Gray
    "#000000", // Black
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Information (moved left) */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary-900">
              {product.name}
            </h1>
            <p className="mt-2 text-2xl text-primary-700">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Tab navigation */}
          <div>
            <div className="flex border-b border-gray-300">
              <button
                className={`px-4 py-2 -mb-px ${
                  activeTab === "description"
                    ? "border-b-2 border-primary-900 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-4 py-2 -mb-px ml-4 ${
                  activeTab === "specs"
                    ? "border-b-2 border-primary-900 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("specs")}
              >
                Specifications
              </button>
            </div>
            {activeTab === "description" ? (
              <p className="pt-4 text-primary-600">{product.description}</p>
            ) : (
              <dl className="pt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-t pt-4">
                    <dt className="font-medium text-primary-900 capitalize">
                      {key}
                    </dt>
                    <dd className="mt-1 text-primary-600">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Add to Cart Section */}
          <div className="border-t pt-6 space-y-4">
            {/* Color Customization Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsCustomizingColor(!isCustomizingColor)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  isCustomizingColor
                    ? "bg-primary-100 border-primary-200 text-primary-900"
                    : "border-gray-300 text-primary-700 hover:bg-gray-50"
                }`}
              >
                <SwatchIcon className="h-5 w-5" />
                <span>Customize Color</span>
              </button>
            </div>

            {/* Color Selection (only shown when customizing) */}
            {isCustomizingColor && (
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-accent-600"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 flex items-center justify-center space-x-2"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`p-3 rounded-lg border ${
                  isFavorite
                    ? "bg-primary-100 border-primary-200 text-primary-900"
                    : "border-gray-300 text-primary-700 hover:bg-gray-50"
                }`}
              >
                <HeartIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() =>
                  navigate("/room-designer", {
                    state: {
                      product: {
                        ...product,
                        customizations: isCustomizingColor
                          ? {
                              color: selectedColor,
                              scale: 1,
                            }
                          : undefined,
                      },
                    },
                  })
                }
                className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2"
              >
                <ViewfinderCircleIcon className="h-5 w-5" />
                <span>View in 3D Room</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Model Viewer (moved right) */}
        <div className="space-y-4 flex flex-col items-center">
          <div
            className="overflow-hidden mx-auto border-2 border-primary-900 rounded-full"
            style={{ width: "100%", maxWidth: "600px", height: "400px" }}
          >
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 1, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FurnitureModel
                  modelPath={product.modelUrl}
                  scale={1}
                  color={isCustomizingColor ? selectedColor : undefined}
                  autoRotate
                />
                <OrbitControls />
                <Environment preset="apartment" />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
