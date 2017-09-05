'use strict'

const Assert = require('assert')
const Dom    = require('../lib/dom.js')
const Fs     = require('fs')

describe('new dom', () => {

  describe('satzbauBlocks', () => {

    before(() => {
      Fs.readFileSync = function (filename) {
        return new Buffer(`
          <code satzbau-language="go">abc</code>
          <code satzbau-language="go">abc</code>
          <code satzbau-language="go">abc</code>
          <code satzbau-language="go">abc</code>
          <code satzbau-language="go">abc</code>
          <code satzbau-language="go">abc</code>
          <code satzbau-language="go">abc</code>
          <code satzbau-language="go">abc</code>`)
      }
    })

    describe('retreival', () => {
      it('should should return correct number of blocks', () => {
        const dom = new Dom('file')
        Assert.equal(8, dom.satzbauBlocks().length)
      })
    })

    describe('reading from', () => {
      it('should return correct block content', () => {
        const dom = new Dom('file')
        const blocks = dom.satzbauBlocks()

        Assert.equal(blocks[0].text, 'abc')
      })
    })

    describe('writing to', () => {
      it('should modify the block\'s contents', () => {
        const dom = new Dom('file')
        const blocks = dom.satzbauBlocks()

        Assert.equal(blocks[0].text, 'abc')

        blocks[0].text = 'xyz'

        Assert.equal(blocks[0].text, 'xyz')
      })
    })
  })
})
