/**
 * Module to decript overbuff API
 * @module utils/overbuffApiDecriptor.js
 */
const atob = require('atob');
const constants = require('./constants');
const validator = require('./validator');

/**
 * Overbuff decriptor
 * Use to decript info received from overbuff crazy API
 *
 * @param {object} encriptedData - Api data
 * @return {string} - Array with heroes info
 * @throws {object} - Returns err that indicates a fail
 * 
 */
module.exports = function(encriptedData){
  return new Promise((resolve, reject) => {
    if (!validator.isValidString(encriptedData))
      return reject(constants.messages.error.INVALID_OVERBUFF_API_DATA);
    try {
      encriptedData = encriptedData.replace(constants.overbuff.decriptor.NEWLINE_REGEX, '');
      encriptedData = encriptedData.replace(constants.overbuff.decriptor.BRACKET_REGEX, '=');
      let decriptedData = atob(encriptedData.split('').reverse().join(''))
        .split('').reverse().join('');
      decriptedData.replace('?', '');
      return resolve(JSON.parse(decriptedData));

    } catch (err){
      return reject(err);
    }   
  });
};
