const { order, dish } = require('../../models');
const Joi = require('joi');

// Controller to get all orders list
exports.getAllOrders = async (req, res) => {
  try {
    // Query to find all orders
    const orders = await order.findAll({
      include: [
        {
          model: dish,
          as: 'userOrder',
          attributes: {
            exclude: ['vendorId', 'tagId', 'createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['dishId', 'createdAt', 'updatedAt'],
      },
    });

    // return success
    res.send({
      message: `Fetching all orders is success`,
      data: orders,
    });
  } catch (err) {
    // If something error on the server then return error
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};

// Controller for create new order
exports.addOrder = async (req, res) => {
  try {
    // Simple validation for new order
    const schema = Joi.object({
      user: Joi.string().min(3).required(),
      dishId: Joi.number().integer().required(),
      orderQuantity: Joi.number().integer().greater(0).required(),
      specialRequest: Joi.string(),
    });

    const { error } = schema.validate(req.body);

    // Check if error is true (user input doesn't pass validation schema above)
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }
    // Query for creating a new order

    const newOrder = await order.create({
      ...req.body, // Destructuring the request body
    });

    // Return the success
    res.send({
      message: 'New order has been succefully added',
      data: newOrder,
    });
  } catch (err) {
    // If something error on the server then return error
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};
