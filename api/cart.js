export default function handler(req, res){
    req.status(200).json({
        method: req.method,
        hello: "Cart Service"
    })
}