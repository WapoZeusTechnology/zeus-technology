/**
 * Object.entries polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill
 * This is because IE 11 doesn't support entries and core-js polyfill is 16kb versus this which is
 * about 30 bytes.
 */
if (!Object.entries) {
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

export { ZeusAdapter } from "./ZeusAdapter";
