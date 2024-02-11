function handler(req, res) {
    res.status(200).json({
      method: req.method,
      hello: "Cart Service"
    });
  }


  module.exports = handler;