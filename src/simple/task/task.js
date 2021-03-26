'use strict';

const {common} = require('jhg-common');
const Joi = require('joi');
const taskCategories = require('./taskCategories');
const timeWindows = require('./timeWindows'); // the braces are absolutely critical.

const {
  datetime,
  title
} = common.utils;


const taskCategoryValues = Object.values(taskCategories);
const timeWindowValues = Object.values(timeWindows);

const schema = Joi.object({
  taskTitle: title.schema,
  taskCreated: datetime.schema,
  priority: Joi.number().required(),
  taskCategory: Joi.string().valid(...taskCategoryValues),
  taskWindow: Joi.string().valid(...timeWindowValues).default(''),
});


const Task = (taskInfo = {}) => {
  const validTask = schema.validate(taskInfo, {abortEarly: false});
  return Object.freeze(validTask);
};



module.exports = {
  Task,
  schema
};
