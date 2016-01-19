/**
 * Get the type of an object
 * @param  {object} obj Object
 * @return {string}     Type
 */
export default obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()