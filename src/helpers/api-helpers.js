/**
 * @desc - Receive object of parameters and parse it to query string.
 * For example:
 * {
 *   name: 'testName',
 *   description: 'testDescription',
 * }
 *
 * will be parsed to:
 * 'name=testName&description=testDescription'
 *
 * @params {Object} params - parameters to be parsed to params string.
 * @return {String} - query string of parameters.
 * */

export function buildQueryString(params) {
  let paramsList = [];
  for (let key in params) {
    paramsList.push(key + "=" + params[key]);
  }
  return paramsList.join("&");
}
