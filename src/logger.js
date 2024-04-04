const logger = (req, res, next)=>{
    const { name } = req.method; 

    next();
}

module.exports = {logger};