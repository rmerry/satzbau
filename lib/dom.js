'use strict'

const Cheerio = require('cheerio')
const Fs      = require('fs')

const satzbauAttr = 'satzbau'

const Dom = function (doc) {
  const $ = Cheerio.load(doc, {
    decodeEntities:          false,
    lowerCaseAttributeNames: false,
    normalizeWhitespace:     false,
    xmlMode:                 false,
  })

  this._$ = $
  return this
}

Dom.prototype.addStyleSheetLink = function(src) {
  const head = this._$('head')
  if (head.length > 0) {
    const headlinklast = head.find('link[rel=stylesheet]:last')
    const linkElement  = '<link rel="stylesheet" href="/css/masterBlaster.css" type="text/css" media="screen">'
    if (headlinklast.length > 0){
      headlinklast.after(linkElement)
    }
    else {
      head.append(linkElement)
    }
  }
}

Dom.prototype.embedStyleSheet = function(style) {
  const head = this._$('head')
  if (head.length > 0) {
    const headlinklast = head.find('link[rel=stylesheet]').last()
    const styleSheet = `<style>${style}</style>`
    head.append(styleSheet)
    // if (headlinklast){
    // 	headlinklast.after(styleSheet)
    // } else {
    // 	console.log('appending')
    // 	head.append(styleSheet)
    // 	console.log(head.html())
    // }
  }
}

Dom.prototype.removeSatzbauAttrs = function() {
  return this._$(`*[${satzbauAttr}]`).map((i, node) => {
    node.removeAttribute(satzbauAttr)
  })
}

/*
Searches though the DOM for all elements with a `satzbau' tag; returns an
array of objects where each object represents a satzbau code block.

returns
  [Array|Object]
    -language [String] The code block language.
    -text [getter/setter] The code block contents.
*/
Dom.prototype.satzbauBlocks = function() {
  const that = this

  const blocks = this._$(`*[${satzbauAttr}]`)

  return blocks.map((i, node) => {
    return {
      _node: node,
      language: node.attribs[satzbauAttr],

      get text() {
        return that._$(this._node).html()
      },
      set text(data) {
        // FIXME: how does this even work?
        this._node.children[0].data = data
      },
    }
  })
}

Dom.prototype.toString = function() {
  return this._$.html()
}

module.exports = Dom
