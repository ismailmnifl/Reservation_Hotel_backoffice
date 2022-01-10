module.exports = {

    isAdmin: (req, res, next) => {
        if (req.session.role != 'admin') {
            return res.status(401).json({
                message: 'only the admin can access this information'
            })
        }
        next();
    }
}