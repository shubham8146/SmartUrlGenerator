const Url = require('../models/Url');
const generateCode = require('../utils/generateCode');

// Create short URL
exports.createShortUrl = async (req, res, next) => {
    try {
        const { originalUrl, customAlias } = req.body;
        const userId = req.user.userId;

        // Validation
        if (!originalUrl) {
            return res.status(400).json({ error: 'Original URL is required' });
        }

        // Check if custom alias already exists
        if (customAlias) {
            const existing = await Url.findOne({ customAlias });
            if (existing) {
                return res.status(400).json({ error: 'Custom alias already taken' });
            }
        }

        const shortCode = customAlias || generateCode();

        const url = new Url({
            userId,
            originalUrl,
            shortCode,
            customAlias
        });

        await url.save();

        res.status(201).json({
            message: 'Short URL created successfully',
            url: {
                id: url._id,
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl: `${process.env.BASE_URL || 'http://localhost:5000'}/api/urls/${url.shortCode}`
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get all URLs for a user
exports.getUserUrls = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const urls = await Url.find({ userId }).sort({ createdAt: -1 });

        res.json({
            message: 'URLs retrieved successfully',
            urls
        });
    } catch (error) {
        next(error);
    }
};

// Redirect to original URL
exports.redirectUrl = async (req, res, next) => {
    try {
        const { code } = req.params;
        const url = await Url.findOne({ shortCode: code });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Check expiration
        if (url.expiresAt && new Date() > url.expiresAt) {
            return res.status(410).json({ error: 'URL has expired' });
        }

        // Increment clicks
        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (error) {
        next(error);
    }
};

// Delete URL
exports.deleteUrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const url = await Url.findOneAndDelete({ _id: id, userId });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.json({ message: 'URL deleted successfully' });
    } catch (error) {
        next(error);
    }
};
