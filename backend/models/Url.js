const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
        match: /^(https?:\/\/)?.+/
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    customAlias: {
        type: String,
        unique: true,
        sparse: true
    },
    expiresAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', urlSchema);
