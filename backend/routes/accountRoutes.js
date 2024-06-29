const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/authMiddleware");
const { Account } = require("../models/Account");

const router = require("express").Router();

// GET BALANCE
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    res.status(200).json({
      balance: account.balance,
    });
  } catch (err) {
    console.log("Error in Fetching balance !!");
    console.log(err);
    res.status(403).json({ message: "Error in Fetching Balance !!" });
  }
});

// Transfer Amount
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;
    const success = /^[0-9]+$/.test(req.body.amount);

    if (!success || amount <= 0) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Invalid Amount !!" });
    }

    console.log(amount);
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Insufficient Balance !!" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Invalid Account !!" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({ message: "Transfer Successfull !!" });
  } catch (err) {
    await session.abortTransaction();
    console.log("Error in Transfer !!");
    console.log(err);
    res.status(403).json({ message: "Error in Transfer !!" });
  }
});

module.exports = router;
