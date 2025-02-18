// update the user with given details as PATCH req, this can be done after the first login

const express = require("express");
const { User } = require("../models");

const router = express.Router();

// PATCH request to update a user
router.patch("/:userId", async (req, res) => {
    const { userId } = req.params;
    const updateFields = req.body; // Only update the fields provided in req.body

    try {
        // Find user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found", success: false });
        }

        // Update only specified fields
        await user.update(updateFields);

        res.json({ success: true, message: "User updated successfully", user });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
});

module.exports = router;
