/**
 * Set the necessary CORS headers for cross-origin requests
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function cors(req, res, next) {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
}

/**
 * Handle server errors by logging them and sending a response
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function handleError(err, req, res, next) {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: "Internal Server Error" });
}

/**
 * Handle requests to undefined routes (404 errors)
 * @param {object} req
 * @param {object} res
 */
function notFound(req, res) {
    res.status(404).json({ error: "Route Not Found" });
}

module.exports = {
    cors,
    notFound,
    handleError,
};
