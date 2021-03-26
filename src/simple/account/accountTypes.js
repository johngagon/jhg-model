'use strict';

const {common} = require('jhg-common');

const {element} = common.utils.random;
const Joi = require('joi');
const RandExp = require('randexp');
const convert = require('joi-to-json');

const LEVEL = Object.freeze({
  BALANCE: 'B',
  PERIODIC: 'P'
});

const SIDE = Object.freeze({
  DR: 'DR', //Debit
  CR: 'CR'  //Credit
});

const schema = Joi.object({
  title: Joi.string().pattern(/[A-Za-z ]+$/, {name:'title'}).min(3).max(100).required(),
  level: Joi.string().required().valid(...Object.values(LEVEL)),
  side: Joi.string().required().valid(...Object.values(SIDE))
});

const validate = (accountTypeInfo) => {
  const result = schema.validate(accountTypeInfo, {abortEarly: false});
  return Object.freeze(result);
};

const jsonSchema = () => {
  return convert(schema);
};

const AccountType = function (accountTypeInfo = {}) {
  const validAccountType = validate(accountTypeInfo);
  return validAccountType;
};

const labels = () => {
  return {
    title: 'Title',
    side: 'Debit or Credit',
    level: 'Balance or Precision'
  };
}

const accountType = function(title, side, level) {
  return AccountType({title, side, level});
}

const generateRandom = () => {
  const title = new RandExp(/[A-Za-z ]{3,50}/).gen();
  const side = element(SIDE);
  const level = element(LEVEL);

  const result = AccountType({title, side, level});
  return result;
};

const exists = (accountTypeList, accountType) => {
  return accountTypeList.find((item) => { item.title === accountType.title});
}

const standardList = () => {
  const {DR, CR} = SIDE;
  const {BALANCE, PERIODIC} = LEVEL;
  const asset = accountType('Asset', DR, BALANCE);
  const liability = accountType('Liability', CR, BALANCE);
  const worth = accountType('Net Worth', CR, BALANCE);
  const income = accountType('Income', CR, PERIODIC);
  const expense = accountType('Expense', DR, PERIODIC);
  const accountList = [asset, liability, worth, income, expense];
  const results = [];
  const errors = [];
  accountList.forEach(acct => {
    if(acct.error) {
      errors.push(acct.error);
    } else {
      results.push(acct.value);
    }
  });
  return {results, errors};
};


module.exports = {
  AccountType,
  exists,
  generateRandom,
  standardList,
  jsonSchema,
  labels,
  SIDE,
  LEVEL
};
