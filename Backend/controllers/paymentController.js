const instance = require('../index')

const checkout = async (req, res) => {

    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };

        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error in checkout function:", error); // Log the exact error
        res.status(500).json({ success: false, message: "Checkout failed", error: error.message });
    }
};


const paymentverification = async (req, res) => {
    res.status(200).json({
        success: true,
    });
};

module.exports = { checkout, paymentverification };
