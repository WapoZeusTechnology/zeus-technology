/**
 * Function that returns a promise that will resolve after the provided delay
 * @param {Number} ms Time in milliseconds to delay
 * @return {Promise} Promise that will resolve after `ms` delay.
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Function that returns a promise that will reject with an Error containing the message after the
 * provided delay
 * @param {String} message Message to
 * @param {Number} ms Time in milliseconds to delay
 * @return {Promise} Promise that will reject with {Error} after `ms` delay.
 */
export const timeout = (message, ms) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
