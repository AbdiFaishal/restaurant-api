const { vendor, dish, tag } = require('../../models');
const Joi = require('joi');

// Controller for getting the specific dishes that owned by vendor name
exports.getVendorDishes = async (req, res) => {
  try {
    // Create schema for validation (max character less than 128, must be string, cant be empty)
    const schema = Joi.object({
      vendorName: Joi.string().max(127).required(),
    });

    const { error } = schema.validate({
      vendorName: req.body.vendorName,
    });

    // Simple validation to check if vendorName is passed validation or no
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    // Find vendor name
    const vendorName = await vendor.findOne({
      where: {
        name: req.body.vendorName,
      },
    });

    // If vendor name is not found then return error
    if (!vendorName) {
      return res.send({
        message: "Vendor's menu doesn't exist",
        data: {},
      });
    }

    // If vendor name is found then return success + the dishes
    const dishes = await dish.findAll({
      where: {
        vendorId: vendorName.id,
      },
      attributes: {
        exclude: ['vendorId', 'tagId', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      message: 'Fetching dishes is success',
      data: dishes,
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

exports.filterByTags = async (req, res) => {
  try {
    const foundTag = await tag.findOne({
      where: {
        name: req.query.tags,
      },
    });

    if (!foundTag) {
      return res.status(400).send({
        error: {
          message: "Tags doesn't exist",
        },
      });
    }

    const dishes = await dish.findAll({
      where: {
        tagId: foundTag.id,
      },
      include: [
        {
          model: tag,
          as: 'tag',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'tagId', 'vendorId'],
      },
    });

    res.send({
      message: 'Fetching dishes by tag is success',
      data: dishes,
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
