'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCancellable = exports.displayCORSWarning = exports.errorOnDev = exports.warnOnDev = exports.getPixelRatio = exports.callIfDefined = exports.isParamObject = exports.isDataURI = exports.isFile = exports.isBlob = exports.isArrayBuffer = exports.isString = exports.isProvided = exports.isDefined = exports.isProduction = exports.isLocalFileSystem = exports.isBrowser = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if we're running in a browser environment.
 */
var isBrowser = exports.isBrowser = typeof window !== 'undefined';

/**
 * Checks whether we're running from a local file system.
 */
var isLocalFileSystem = exports.isLocalFileSystem = isBrowser && window.location.protocol === 'file:';

/**
 * Checks whether we're running on a production build or not.
 */
var isProduction = exports.isProduction = process.env.NODE_ENV === 'production';

/**
 * Checks whether a variable is defined.
 *
 * @param {*} variable Variable to check
 */
var isDefined = exports.isDefined = function isDefined(variable) {
  return typeof variable !== 'undefined';
};

/**
 * Checks whether a variable is defined and not null.
 *
 * @param {*} variable Variable to check
 */
var isProvided = exports.isProvided = function isProvided(variable) {
  return isDefined(variable) && variable !== null;
};

/**
 * Checkes whether a variable provided is a string.
 *
 * @param {*} variable Variable to check
 */
var isString = exports.isString = function isString(variable) {
  return typeof variable === 'string';
};

/**
 * Checks whether a variable provided is an ArrayBuffer.
 *
 * @param {*} variable Variable to check
 */
var isArrayBuffer = exports.isArrayBuffer = function isArrayBuffer(variable) {
  return variable instanceof ArrayBuffer;
};

/**
 * Checkes whether a variable provided is a Blob.
 *
 * @param {*} variable Variable to check
 */
var isBlob = exports.isBlob = function isBlob(variable) {
  if (!isBrowser) {
    throw new Error('Attempted to check if a variable is a Blob on a non-browser environment.');
  }

  return variable instanceof Blob;
};

/**
 * Checkes whether a variable provided is a File.
 *
 * @param {*} variable Variable to check
 */
var isFile = exports.isFile = function isFile(variable) {
  if (!isBrowser) {
    throw new Error('Attempted to check if a variable is a Blob on a non-browser environment.');
  }

  return variable instanceof File;
};

/**
 * Checks whether a string provided is a data URI.
 *
 * @param {String} str String to check
 */
var isDataURI = exports.isDataURI = function isDataURI(str) {
  return isString(str) && /^data:/.test(str);
};

var isParamObject = exports.isParamObject = function isParamObject(file) {
  return file instanceof Object && ('data' in file || 'range' in file || 'url' in file);
};

/**
 * Calls a function, if it's defined, with specified arguments
 * @param {Function} fn
 * @param {Object} args
 */
var callIfDefined = exports.callIfDefined = function callIfDefined(fn, args) {
  if (fn && typeof fn === 'function') {
    fn(args);
  }
};

var getPixelRatio = exports.getPixelRatio = function getPixelRatio() {
  return window.devicePixelRatio || 1;
};

var consoleOnDev = function consoleOnDev(method) {
  for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    message[_key - 1] = arguments[_key];
  }

  if (!isProduction) {
    var _console;

    // eslint-disable-next-line no-console
    (_console = console)[method].apply(_console, message);
  }
};

var warnOnDev = exports.warnOnDev = function warnOnDev() {
  for (var _len2 = arguments.length, message = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    message[_key2] = arguments[_key2];
  }

  return consoleOnDev.apply(undefined, ['warn'].concat(message));
};

var errorOnDev = exports.errorOnDev = function errorOnDev() {
  for (var _len3 = arguments.length, message = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    message[_key3] = arguments[_key3];
  }

  return consoleOnDev.apply(undefined, ['error'].concat(message));
};

var displayCORSWarning = exports.displayCORSWarning = function displayCORSWarning() {
  if (isLocalFileSystem) {
    // eslint-disable-next-line no-console
    warnOnDev('Loading PDF as base64 strings/URLs might not work on protocols other than HTTP/HTTPS. On Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.');
  }
};

var makeCancellable = exports.makeCancellable = function makeCancellable(promise) {
  var isCancelled = false;

  var wrappedPromise = new _promise2.default(function (resolve, reject) {
    promise.then(function () {
      return isCancelled ? reject('cancelled') : resolve.apply(undefined, arguments);
    }, function (error) {
      return isCancelled ? reject('cancelled') : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      isCancelled = true;
    }
  };
};