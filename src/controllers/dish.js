const { vendor, dish, tag } = require('../../models');
const Joi = require('joi');

// For fetching all dishes
exports.getDishes = async (req, res) => {
  try {
    // Query for fetching all dishes
    const dishes = await dish.findAll({
      include: {
        model: tag,
        as: 'tag',
        attributes: ['name'],
      },
      attributes: {
        exclude: ['tagId', 'vendorId', 'createdAt', 'updatedAt'],
      },
    });

    // return all dishes
    res.send({
      message: 'Fetch all dishes is success',
      data: dishes,
    });
  } catch (err) {
    // if error on the server then return the error message
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};

// For fetching detail dish
exports.detailDish = async (req, res) => {
  try {
    // Query for fetching one dishes by id
    const foundDish = await dish.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: tag,
        as: 'tag',
        attributes: ['name'],
      },
      attributes: {
        exclude: ['vendorId', 'createdAt', 'updatedAt'],
      },
    });

    // If the dish is not found, return the message
    if (!foundDish) {
      return res.send({
        message: 'Dish not found',
        data: {},
      });
    }
    // if the dish is found then return success
    res.send({
      message: 'Fetch detail dish is succes',
      data: foundDish,
    });

    console.log('dish: ', foundDish);
  } catch (err) {
    // if error on the server then return the error message
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};

// For creating a new dish
exports.createDish = async (req, res) => {
  try {
    // validation for creating a new dish
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
      price: Joi.number().precision(2).positive().required(),
      vendorId: Joi.number().integer().required(),
      tagId: Joi.number().integer().required(),
    });

    const { error } = schema.validate(req.body, { convert: false });

    // if validation is fail then return the error message
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    // Query for creating a new dish
    const newDish = await dish.create(
      {
        ...req.body,
      },
      {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      }
    );
    // if success then return the newly created dish
    res.send({
      message: 'Add new dish is success',
      data: newDish,
    });
  } catch (err) {
    // if error on the server then return the error message
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};

// For updating the existing dish
exports.updateDish = async (req, res) => {
  try {
    // Query for updating a dish by id
    const updatedDish = await dish.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // check if the dish is not exist
    if (!updatedDish[0]) {
      return res.status(400).send({
        message: "Dish doesn't exist",
        data: {},
      });
    }

    const newDish = await dish.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: tag,
        as: 'tag',
        attributes: ['name'],
      },
      attributes: {
        exclude: ['vendorId', 'createdAt', 'updatedAt'],
      },
    });

    // return success
    res.send({
      message: 'Dish has beed updated successfully',
      data: newDish,
    });
  } catch (err) {
    // if error on the server then return the error message
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};

// For deleting the existing dish
exports.deleteDish = async (req, res) => {
  try {
    // Query for deleteing a dish by id
    const deleletedDish = await dish.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if the dish is not exist
    if (!deleletedDish) {
      return res.send({
        message: "Dish doesn't exist",
        data: {},
      });
    }

    const dishes = await dish.findAll();

    // return if success
    res.send({
      message: 'Dish successfully deleted',
      data: dishes,
    });
  } catch (err) {
    // if error on the server then return the error message
    console.log(err);
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};
