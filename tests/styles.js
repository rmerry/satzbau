'use strict'

const Assert = require('assert')
const Fs     = require('fs')
const Path   = require('path')
const Styles = require('../lib/styles.js')

describe('styles', () => {

  let requestedFilePath

  describe('get', () => {

    describe('(valid path)', () => {

      const originalReadFile = Fs.readFile

      before(() => {
        Fs.readFile = function (filename, encoding, callback) {
          requestedFilePath = filename
          return callback(undefined, new Buffer(''))
        }
      })

      after(() => {
        Fs.readFile = originalReadFile
      })

      describe('with no path', () => {
        it('should use default styles path', (done) => {
          const promise = Styles.get('github')
          promise.then(style => {
            const expectedFilePath = Path.join(process.cwd(), 'styles', 'github.css')
            Assert.equal(requestedFilePath, expectedFilePath)

            done()
          }).catch(done)
        })
      })

      describe('with absolute path', () => {
        it('should use provided path', (done) => {
          const promise = Styles.get('github', { path: '/fakepath' })
          promise.then(style => {
            const expectedFilePath = Path.join('/fakepath', 'github.css')
            Assert.equal(requestedFilePath, expectedFilePath)

            done()
          }).catch(done)
        })
      })

      describe('with relative path', () => {
        it('should prepend path with cwd', (done) => {
          const promise = Styles.get('github', { path: 'fakepath' })
          promise.then(style => {
            const expectedFilePath = Path.join(process.cwd(), 'fakepath', 'github.css')
            Assert.equal(requestedFilePath, expectedFilePath)

            done()
          }).catch(done)
        })
      })

      describe('with .css prefix', () => {
        it('should request correct filename', (done) => {
          const promise = Styles.get('github.css')
          promise.then(style => {
            const requestedFilename = Path.basename(requestedFilePath)
            Assert.equal(requestedFilename, 'github.css')

            done()
          }).catch(done)
        })
      })

      describe('without .css prefix', () => {
        it('should request correct filename', (done) => {
          const promise = Styles.get('github')
          promise.then(style => {
            const requestedFilename = Path.basename(requestedFilePath)
            Assert.equal(requestedFilename, 'github.css')

            done()
          }).catch(done)
        })
      })
    })

    describe('invalid style name', () => {

      it('should return error', (done) => {
        const promise = Styles.get('non-existent-style')
        promise
          .then(done)
          .catch(err => {
            Assert.equal('ENOENT', err.code)
            done()
          })
      })
    })

    describe('invalid path', () => {

      it('should return error', (done) => {
        const promise = Styles.get('github', { path: '/non-existent-styles' })
        promise
          .then(done)
          .catch(err => {
            Assert.equal('ENOENT', err.code)
            done()
          })
      })
    })
  })
})

// before(() => {
//   Fs.readFile = function (filename, encoding, callback) {
//     requestedFilePath = filename

//     return callback(new Buffer(`
//       .satzbau {
//         display: block;
//         overflow-x: auto;
//         padding: 0.5em;
//         background: #474949;
//         color: #d1d9e1;`), undefined)
//   }
// })

