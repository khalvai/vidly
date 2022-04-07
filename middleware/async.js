const asyncMiddleware = function (handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (ex) {
        next(ex);
      }
    };
  };
  

  module.exports=asyncMiddleware;

      

