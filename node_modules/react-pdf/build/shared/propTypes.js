'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventsProps = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.once');

var _lodash2 = _interopRequireDefault(_lodash);

var _events = require('./events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */

var eventsProps = exports.eventsProps = (0, _lodash2.default)(function () {
  var eventProps = {};

  [].concat(_events.mouseEvents, _events.touchEvents).forEach(function (eventName) {
    eventProps[eventName] = _propTypes2.default.func;
  });

  return eventProps;
});