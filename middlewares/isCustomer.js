module.exports = {

    isCustomer: (req, res, next) => {
        if (req.session.role != 'cusntomer') {
            return res.status(401).json({
                message: 'you need to login first'
            })
        }
        next();
    }
}