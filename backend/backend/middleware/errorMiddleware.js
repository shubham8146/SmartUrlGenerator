const errorMiddleware = (error, req, res, next) => {
    console.error('Error:', error);

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation error',
            details: Object.values(error.errors).map(e => e.message)
        });
    }

    if (error.code === 11000) {
        return res.status(400).json({
            error: 'Duplicate field error',
            field: Object.keys(error.keyValue)[0]
        });
    }

    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};

module.exports = errorMiddleware;
