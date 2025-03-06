import User from "../models/user.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

export async function getDashboardStats(req, res) {
  try {
    // ✅ Count users by type
    const adminCount = await User.countDocuments({ type: "admin" });
    const customerCount = await User.countDocuments({ type: "customer" });
    const guestCount = await User.countDocuments({ type: "guest" });

    // ✅ Count transactions per hour from Orders
    const transactions = await Order.aggregate([
      {
        $group: {
          _id: { $hour: "$createdAt" },
          transactions: { $sum: 1 }, // Count number of orders
        },
      },
      { $sort: { _id: 1 } },
    ]).then((data) =>
      data.map((t) => ({
        time: `${t._id}:00`,
        transactions: t.transactions,
      }))
    );

    // ✅ Get geographical data (count users per country)
    const geographicalStats = await User.aggregate([
      {
        $group: {
          _id: "$country",
          users: { $sum: 1 },
        },
      },
      { $sort: { users: -1 } },
    ]).then((data) =>
      data.map((g) => ({
        country: g._id,
        users: g.users,
      }))
    );

    // ✅ Get fast-moving products from orders
    const fastMovingProducts = await Order.aggregate([
      { $unwind: "$items" }, // Flatten order items
      {
        $group: {
          _id: "$items.productName",
          sold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { sold: -1 } },
      { $limit: 4 }, // Get top 4 products
    ]).then((data) =>
      data.map((p) => ({
        product: p._id,
        sold: p.sold,
      }))
    );

    res.status(200).json({
      userStats: [
        { name: "Admins", count: adminCount, color: "#8884d8" },
        { name: "Customers", count: customerCount, color: "#82ca9d" },
        { name: "Guests", count: guestCount, color: "#ffc658" },
      ],
      transactions,
      geographicalStats,
      fastMovingProducts,
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
