"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieAuthCheck = void 0;
const cookieAuthCheck = (req, res, next) => {
    const { isAuthenticated } = req.signedCookies;
    if (isAuthenticated) {
        next();
    }
    else {
        //res.status(403).send()
        res.status(403).json({ message: 'Authcheck: Please log in.' }).send();
    }
};
exports.cookieAuthCheck = cookieAuthCheck;
