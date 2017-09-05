'use strict'

const FS   = require('fs')
const MM   = require('micromatch')
const Path = require('path')

// walk takes a list of files and or directories and
// searchs through them (recursively if stipulated) for
// filenames matching the supplied pattern. It returns
// an array of matches, or an empty array if no match
// are found. All matches are specifed as absolute paths
//
// {
//   recursive: true,
//   max-depth: 1
//
function walk(opts) {

  return new Promise((resolve, reject) => {

    function walkSync(dirs, depth, filelist = []) {
      if (dirs.length === 0) {
        return filelist
      }

      const dir = dirs.pop()

      let stat
      try {
        stat = FS.lstatSync(dir)
      } catch (err) {
        opts.log.fatal(err)
      }

      if (stat.isDirectory()) {
        // if the depth is 0 it means it's a directory THAT WAS PASSED IN ON THE
        // COMMAND LINE so we should always walk through it; otherwise it's a
        // directory that we are about to recurse through so we should check the
        // recursive flag and max depth
        if (depth === 0 || (opts.recursive && depth < opts.maxDepth)) {
          opts.log.debug(`descending into directory: ${dir}`)
          // get the list of files in the directory
          try {
            const ls = FS.readdirSync(dir).map(f => Path.join(dir, f))
            ls.forEach(f => filelist = filelist.concat(walkSync(Array.isArray(f) ? f : [f], depth+1)))
          } catch (err) {
            opts.log.error(err, `error reading directory: ${dir}`)
          }
        }

      } else if (stat.isFile()) {
        // it's a regular file, add to list if it's a match
        if (MM.isMatch(Path.basename(dir), opts.glob)) {
          opts.log.debug(`[MATCH] ${dir}`)
          filelist.push(dir)
        } else {
          opts.log.debug(`[NON-MATCH] ${dir}`)
        }
      } else {
        opts.log.debug(`[SKIPPED] ${dir}`)
      }

      return walkSync(dirs, depth, filelist)
    }

    // opts.log.info(`searching${opts.recursive ? ' recursively' : ''} for files matching pattern (\`${opts.glob}')`)
    // opts.log.info(`found ${filelist.length} file${filelist.length !== 1 ? 's' : ''} matching criteria`)
    const filelist = walkSync(opts.files, 0)

    resolve(filelist)
  })
}

module.exports = {
  walk,
}
