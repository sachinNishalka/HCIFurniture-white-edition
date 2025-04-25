import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    user,
    isAdmin,
    getAllOrders,
    updateOrderStatus,
    products,
    setProducts,
  } = useAppContext();
  const [activeTab, setActiveTab] = useState("products");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Redirect if not admin
  if (!user || !isAdmin) {
    navigate("/login");
    return null;
  }

  const orders = getAllOrders();

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-medium text-primary-900 mb-4">Dashboard</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  activeTab === "products"
                    ? "bg-accent-50 text-accent-600"
                    : "text-primary-600 hover:bg-gray-50"
                }`}
              >
                <CubeIcon className="h-5 w-5" />
                <span>Products</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  activeTab === "orders"
                    ? "bg-accent-50 text-accent-600"
                    : "text-primary-600 hover:bg-gray-50"
                }`}
              >
                <ArrowPathIcon className="h-5 w-5" />
                <span>Orders</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-primary-900">
                  Products
                </h2>
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Product</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="relative border border-primary-900 rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-4 space-y-1">
                        <p className="font-serif font-semibold text-primary-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-primary-600 text-sm">
                          {product.category}
                        </p>
                        <p className="text-primary-700 font-medium">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        <PencilIcon className="h-5 w-5 text-accent-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        <TrashIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-primary-900">
                  Orders
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-primary-900 rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Order header */}
                    <div className="px-6 py-4 bg-primary-100 flex justify-between items-center">
                      <p className="text-sm font-medium text-primary-900">
                        Order #{order.id}
                      </p>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    {/* Order info */}
                    <div className="p-6 space-y-2">
                      <p className="text-sm text-primary-600">
                        Customer: {order.userEmail}
                      </p>
                      <p className="text-sm text-primary-600">
                        Date: {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="font-semibold text-primary-900">
                        Total: ${order.total.toFixed(2)}
                      </p>
                    </div>
                    {/* Actions */}
                    {order.status === "Pending" && (
                      <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateOrderStatus(order.id, "Completed")
                          }
                          className="text-green-600 hover:text-green-800"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateOrderStatus(order.id, "Cancelled")
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(isAddingProduct || selectedProduct) && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setIsAddingProduct(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onClose }) {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      category: "living-room",
      price: "",
      description: "",
      modelUrl: "",
      images: [],
      specs: {
        dimensions: "",
        material: "",
        color: "",
        weight: "",
      },
      inStock: true,
      featured: false,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-primary-900">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary-700">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-field mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="select-field mt-1"
            >
              <option value="living-room">Living Room</option>
              <option value="dining-room">Dining Room</option>
              <option value="bedroom">Bedroom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">
              Price
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="input-field mt-1"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-field mt-1"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700">
              3D Model URL
            </label>
            <input
              type="text"
              value={formData.modelUrl}
              onChange={(e) =>
                setFormData({ ...formData, modelUrl: e.target.value })
              }
              className="input-field mt-1"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData({ ...formData, inStock: e.target.checked })
                }
                className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-primary-700">In Stock</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-primary-700">Featured</span>
            </label>
          </div>

          <div className="pt-4 border-t">
            <button type="submit" className="btn-primary w-full">
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
