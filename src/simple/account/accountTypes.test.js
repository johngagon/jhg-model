
import {
  AccountType,
  generateRandom,
  jsonSchema,
  SIDE,
  LEVEL
} from './accountTypes';

describe('accountType', () => {
  describe('AccountType', () => {
    it('validates with correct data', ()=>{
      const accountTypeInfo = {
        title: 'Assets',
        side: 'DR',
        level: LEVEL.BALANCE
      };
      const result = AccountType(accountTypeInfo);
      expect(result.error).toBeUndefined();
      expect(result.value).toMatchObject(accountTypeInfo);
    });
    it('validates with missing data', ()=>{
      const accountTypeInfo = {
        title: undefined,
        side: 'invalid',
        level: 'invalid'
      };
      const result = AccountType(accountTypeInfo);

      expect(result.error.details.length).toEqual(3);
      expect(result.value).toMatchObject(accountTypeInfo);
    });
    it('validates with bad title', ()=>{
      // alphabet, number, space, underscore, period, comma, bang, quotes forward slash dollar
      const testTitle1 = 'aAbC123 _xyz. How!, "it was" \'zzz\' $10.00 /other %%% stuff.';
      const unknowns = "~`!@#$%^&*\(\)_+-=\[\]\{\}|\\ABC abc :;<>?/";
      const accountTypeInfo = {
        title: unknowns,
        side: SIDE.DR,
        level: LEVEL.BALANCE
      };
      const result = AccountType(accountTypeInfo);
      expect(result.error).toBeDefined();
      expect(result.error.details.length).toEqual(1);
    });
  });
  describe('generateRandom', () => {
    it('generates a valid random account type', ()=>{
      const {error, value} = generateRandom();
      expect(error).toBeUndefined();

      expect(value).toBeDefined();
    });
  });
  describe('jsonSchema', () => {
    it('create the schema for the account type model', ()=>{
      const result = jsonSchema();
      console.log(result);

    });
  });      
});
