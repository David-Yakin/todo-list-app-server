const Joi = require("joi");

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    priority: Joi.string().required(),
    category: Joi.string().min(2).max(256).required(),
    dueDate: Joi.date().required(),
    remarks: Joi.string().min(2).max(1024),
    inResponsibilityOf: Joi.string().min(2).max(256).required(),
  });
  return schema.validate(todo);
}

exports.validateTodo = validateTodo;
