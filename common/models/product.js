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
    callback(null, results);

  };

  // NOTE: Validate minimal length of the name
  Product.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters',
    },
  });

  // NOTE: Validate Uniqueness
  Product.validatesUniquenessOf('name');



  // NOTE: Validate positive integer
  const positiveInteger = /^[0-9]*$/;

  const validatePositiveInteger = function(error) {
    if (!positiveInteger.test(this.price)) {
      error();
    }
  };

  Product.validate('price', validatePositiveInteger, {
    message: 'Price should be a positive integer',
  });



  // NOTE: Validate minimal price
  function validateMinimalPrice(err, done) {
    const price = this.price;

    process.nextTick(() => {
      const minimalPriceFromDB = 99;

      if (price < minimalPriceFromDB) {
        err();
      }
      done();
    });
  }

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should be higher than the minimal price in the DB'
  });









};
