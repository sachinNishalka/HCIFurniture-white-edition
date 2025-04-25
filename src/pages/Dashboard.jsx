import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, getUserOrders, updateOrderStatus } = useAppContext();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  const orders = getUserOrders();

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="h-px bg-primary-900 flex-1 mx-4" />
          <h1 className="text-3xl font-serif font-bold uppercase text-primary-900">
            My Orders
          </h1>
          <div className="h-px bg-primary-900 flex-1 mx-4" />
        </div>
        <p className="text-center text-primary-600 mb-8">
          Welcome back, {user.name}
        </p>

        {orders.length === 0 ? (
          <div className="max-w-md mx-auto bg-white border border-primary-900 rounded-lg p-8 shadow-md text-center">
            <p className="text-primary-600 mb-4">
              No orders yet. Start shopping to place your first order!
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-primary-900 rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Order header */}
                <div className="px-6 py-4 bg-primary-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-primary-900">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-primary-700">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
                {/* Items */}
                <div className="p-6 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif font-semibold text-primary-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-primary-600 text-sm">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium text-primary-900">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <p className="text-lg font-semibold text-primary-900">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                      className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
