'use strict'

const Fs = require('fs')
const Path = require('path')

const defaultPath = './styles'

/*
Takes a name and an options object and returns a string representing a css
style sheet. The name can optionally carry the `.css' postfix. By default style
sheets will be retrieved from the default style sheet location: `./styles'. The
default location can be changed via the options object.

params
  name [string] The name of the style sheet to return.
  opts [Object]
    - path [string] The path of the style sheet. This can be absolute or
      relative. The default path will be used if not supplied.
    - uglify [bool] Uglify the style sheet by removing comments, whitespace and
      newlines.

returns
  [null|string] If the style sheet cannot be found (or there was an error
  retrieving the style sheet) null is returned.
*/
function get(name, opts) {
  return new Promise((resolve, reject) => {
    if (!name || name === '')
    {
      reject()
    }

    if (!opts) { opts = {} }

    name = name.trim()
    if (!name.endsWith('.css')) {
      name = name.concat('.css')
    }

    let filePath; if (opts.path) {
      if (!Path.isAbsolute(opts.path)) {
        filePath = Path.join(process.cwd(), opts.path, name)
      } else {
        filePath = Path.join(opts.path, name)
      }
    } else {
      filePath = Path.join(process.cwd(), defaultPath, name)
    }

    Fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data)
    })
  })
}

module.exports = {
  get,
}
