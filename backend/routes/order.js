const Order = require("../models/Order");
const {
    verifyToken,
    isAuthorized,
    isAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyToken, isAuthorized, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body.order,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyToken, isAuthorized, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER Order
router.get("/find/:userId", verifyToken, isAuthorized, async (req, res) => {
    try {
        const Order = await Order.findOne({ userId: req.params.userId });
        res.status(200).json(Order);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL

router.get("/", verifyToken, isAdmin, async (req, res) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/income', verifyToken, isAdmin, async (req, res) => {
    const productId = req.query.productId;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth }, ...(productId && {
                        products: { $elemMatch: { productId } }
                    })
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: '$amount'
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }, {
                $sort: { _id: 1 }
            }
        ])

        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;