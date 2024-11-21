import { Request, Response, NextFunction } from 'express'

export const cookieAuthCheck = (req: Request, res: Response, next: NextFunction) => {
    const { isAuthenticated } = req.signedCookies
    if (isAuthenticated) {
        next()
    } else {
        //res.status(403).send()
        res.status(403).json({ message: 'Authcheck: Please log in.' }).send()
    }
}