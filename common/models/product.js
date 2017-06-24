'use strict';

module.exports = function(Product) {


  const validQuantity = quantity => Boolean(quantity > 0);

  /**
   * Buy this product
   * @param {number} quantity Number of products to buy
   * @param {Function(Error, object)} callback
   */

  Product.prototype.buy = function(quantity, callback) {
    if (!validQuantity(quantity)) {
      return callback(`Invalid quantity ${quantity}`);
    }
    const results = {
      status: `You bought ${quantity} product(s)`,
    };
    // TODO
    callback(null, results);
  };
};
