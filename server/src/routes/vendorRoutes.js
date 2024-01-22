const express = require('express');
const router = express.Router();
const { mainPool } = require('../../db');
const { protect } = require('../middleware/authMiddleware'); // Import the middleware

// Handler to get leads for a vendor
const getVendorLeads = async (req, res) => {
    try {
        const vendorUsername = req.user.username; // Accessing username from the user object
        const query = 'SELECT * FROM lead WHERE label = $1';
        const { rows } = await mainPool.query(query, [vendorUsername]); // Use mainPool for querying

        // Log the data only if it's not empty
        if (rows.length > 0) {
            console.log(`Data fetched for user '${vendorUsername}':`, rows);
        } else {
            console.log(`No data found for user '${vendorUsername}'`);
        }

        res.json(rows);
    } catch (error) {
        const vendorUsername = req.user.username;
        console.log(`No data found for user '${vendorUsername}'`);
        console.error("Error fetching vendor leads:", error);
        // Send a JSON response in case of an error
        res.status(500).json({ message: 'Server error occurred while fetching vendor leads', error: error.toString() });
    }
};

// Apply the authMiddleware to the route
router.get('/leads', protect, getVendorLeads);

// Export the router
module.exports = router;