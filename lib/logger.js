'use strict'

const logLevels = {
  debug:  0,
  info:   1,
  warn:   2,
  error:  3,
  fatal:  4,
  silent: 5,
}

const Logger = function (level) {
  this._level = logLevels[level]
}

Logger.prototype.debug = function(msg) {
  if (logLevels.debug < this._level) {
    return
  }
  console.log(msg)
}

Logger.prototype.error = function(err, msg = undefined) {
  if (logLevels.error < this._level) {
    return
  }

  if (err) {
    if (msg) {
      console.error(`error: ${msg} - ${err.message}`)
    } else {
      console.error(`error: ${err.message}`)
    }
  } else {
    console.error(`error: ${msg}`)
  }
}

Logger.prototype.fatal = function(err, msg = undefined) {
  if (logLevels.silent < this._level) {
    process.exit(1)
  }
  if (msg) {
    console.error(`${msg} - ${err.message}`)
  } else {
    console.error(`error: ${err.message}`)
  }
  process.exit(1)
}

Logger.prototype.info = function(msg) {
  if (logLevels.info < this._level) {
    return
  }
  console.log(msg)
}

Logger.prototype.setLevel = function(l) {
  this._level = logLevels[l]
}

Logger.prototype.warn = function(msg) {
  if (logLevels.warn < this._level) {
    return
  }
}

module.exports = Logger
