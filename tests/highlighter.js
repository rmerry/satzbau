'use strict'

const Assert      = require('assert')
const Highlighter = require('../lib/highlighter.js')

describe('highlight', () => {

  describe('with empty input', () => {
    it('should return null', () => {
      const res = Highlighter.highlight('', {})
      Assert.deepEqual(res, null)
    })
  })

  describe('targetting', () => {
    [
      {
        name: '1c',
        source: 'Name = "Alfred Aho"',
        expectedOutput: 'Name = <span class="hljs-string">"Alfred Aho"</span>',
      }, {
        name: 'abnf',
        source: 'last-name = *ALPHA',
        expectedOutput: '<span class="hljs-attribute">last-name</span> = *<span class="hljs-keyword">ALPHA</span>',
      }, {
        name: 'accesslog',
        source: '127.0.0.1 - - [28/Jul/2006:10:22:04 -0300] "GET / HTTP/1.0" 200 2216',
        expectedOutput: '<span class="hljs-number">127.0.0.1</span> - - <span class="hljs-string">[28/Jul/2006:10:22:04 -0300]</span> <span class="hljs-string">"<span class="hljs-keyword">GET</span> / HTTP/1.0"</span> <span class="hljs-number">200</span> <span class="hljs-number">2216</span>',
      }, {
        name: 'actionscript',
        source: 'var name:String = "Charles Babbage";',
        expectedOutput: '<span class="hljs-keyword">var</span> name:String = <span class="hljs-string">"Charles Babbage"</span>;',
      }, {
        name: 'ada',
        source: 'Name : String := "Alonzo Church";',
        expectedOutput: 'Name : <span class="hljs-type">String</span> := <span class="hljs-string">"Alonzo Church"</span>;',
      }, {
        name: 'apache',
        source: 'Define name "Haskell Curry"',
        expectedOutput: '<span class="hljs-attribute">Define</span> name <span class="hljs-string">"Haskell Curry"</span>',
      }, {
        name: 'applescript',
        source: 'set name to "Kurt Gödel"',
        expectedOutput: '<span class="hljs-keyword">set</span> <span class="hljs-built_in">name</span> <span class="hljs-keyword">to</span> <span class="hljs-string">"Kurt Gödel"</span>',
      }, {
        name: 'arduino',
        source: 'char Name[ ] = "Bill Joy";',
        expectedOutput: '<span class="hljs-keyword">char</span> Name[ ] = <span class="hljs-string">"Bill Joy"</span>;',
      }, {
        name: 'armasm',
        source: 'name SETS "Alan Kay"',
        expectedOutput: '<span class="hljs-symbol">name</span> <span class="hljs-meta">SETS</span> <span class="hljs-string">"Alan Kay"</span>',
      }, {
        name: 'asciidoc',
        source: '== Brian Kernighan',
        expectedOutput: '<span class="hljs-section">== Brian Kernighan</span>',
      }, {
        name: 'aspectj',
        source: 'String name = "Bob Kahn";',
        expectedOutput: 'String name = <span class="hljs-string">"Bob Kahn"</span>;',
      }, {
        name: 'autohotkey',
        source: 'Name := "Donald Knuth"',
        expectedOutput: 'Name := <span class="hljs-string">"Donald Knuth"</span>',
      }, {
        name: 'autoit',
        source: 'Local $name = "Douglas McIlroy"',
        expectedOutput: '<span class="hljs-keyword">Local</span> $name = <span class="hljs-string">"Douglas McIlroy"</span>',
      }, {
        name: 'avrasm',
        source: '.db "Allen Newell", 0x00',
        expectedOutput: '<span class="hljs-meta">.db</span> <span class="hljs-string">"Allen Newell"</span>, <span class="hljs-number">0x00</span>',
      }, {
        name: 'awk',
        source: 'name = "Claude Shannon"',
        expectedOutput: 'name = <span class="hljs-string">"Claude Shannon"</span>',
      }, {
        name: 'axapta',
        source: 'name = "Richard Stallman";',
        expectedOutput: 'name = <span class="hljs-string">"Richard Stallman"</span>;',
      }, {
        name: 'bash',
        source: 'name=$( echo "Guy L. Steele Jr." )',
        expectedOutput: 'name=$( <span class="hljs-built_in">echo</span> <span class="hljs-string">"Guy L. Steele Jr."</span> )',
      }, {
        name: 'basic',
        source: '10 PRINT "Linus Torvalds"',
        expectedOutput: '<span class="hljs-symbol">10 </span><span class="hljs-keyword">PRINT</span> <span class="hljs-string">"Linus Torvalds"</span>',
      }, {
        name: 'bnf',
        source: '<name> ::= <firstname> <space> <lastname>',
        expectedOutput: '<name> ::= <firstname> <space> <lastname/></space></firstname></name>',
      }, {
        name: 'brainfuck',
        source: '-[------->+<]>++.[--->++++<]>+.+++++++++.-[->+++++<]>-.>-[--->+<]>-.[---->+++++<]>-.+++++++.--.+++.+++.----.-.',
        expectedOutput: '<span class="hljs-literal">-</span><span class="hljs-title">[</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt;<span class="hljs-literal">+</span>&lt;<span class="hljs-title">]</span>&gt;<span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-string">.</span><span class="hljs-title">[</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt;<span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span>&lt;<span class="hljs-title">]</span>&gt;<span class="hljs-literal">+</span><span class="hljs-string">.</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-string">.</span><span class="hljs-literal">-</span><span class="hljs-title">[</span><span class="hljs-literal">-</span>&gt;<span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span>&lt;<span class="hljs-title">]</span>&gt;<span class="hljs-literal">-</span><span class="hljs-string">.</span>&gt;<span class="hljs-literal">-</span><span class="hljs-title">[</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt;<span class="hljs-literal">+</span>&lt;<span class="hljs-title">]</span>&gt;<span class="hljs-literal">-</span><span class="hljs-string">.</span><span class="hljs-title">[</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt;<span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span>&lt;<span class="hljs-title">]</span>&gt;<span class="hljs-literal">-</span><span class="hljs-string">.</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-string">.</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-string">.</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-string">.</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span><span class="hljs-string">.</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-string">.</span><span class="hljs-literal">-</span><span class="hljs-string">.</span>&lt;<span class="hljs-comment">/</span><span class="hljs-title">]</span>&gt;&lt;<span class="hljs-comment">/</span><span class="hljs-title">]</span>&gt;&lt;<span class="hljs-comment">/</span><span class="hljs-title">]</span>&gt;&lt;<span class="hljs-comment">/</span><span class="hljs-title">]</span>&gt;&lt;<span class="hljs-comment">/</span><span class="hljs-title">]</span>&gt;<]>++.[--->++++<]>+.+++++++++.-[->+++++<]>-.>-[--->+<]>-.[---->+++++<]>-.+++++++.--.+++.+++.----.-.</]></]></]></]></]>',
      },

      // FIXME: add additional tests for the following languages:
      // cal, capnproto, ceylon, clean, clojure, clojure-repl, cmake, coffeescript, coq, cos, cpp, crmsh,
      // crystal, cs, csp, css, dart, delphi, diff, django, d, dns, dockerfile, dos,
      // dsconfig, dts, dust, ebnf, elixir, elm, erb, erlang, erlang-repl, excel, fix, flix,
      // fortran, fsharp, gams, gauss, gcode, gherkin, glsl, go, golo, gradle, groovy, haml,
      // handlebars, haskell, haxe, hsp, htmlbars, http, hy, inform7, ini, irpf90, java, javascript,
      // jboss-cli, json, julia, julia-repl, kotlin, lasso, ldif, leaf, less, lisp, livecodeserver, livescript,
      // llvm, lsl, lua, makefile, markdown, mathematica, matlab, maxima, mel, mercury, mipsasm, mizar,
      // mojolicious, monkey, moonscript, n1ql, nginx, nimrod, nix, nsis, objectivec, ocaml, openscad, oxygene,
      // parser3, perl, pf, php, pony, powershell, processing, profile, prolog, protobuf, puppet, purebasic,
      // python, q, qml, rib, r, roboconf, routeros, rsl, ruby, ruleslanguage, rust, scala,
      // scheme, scilab, scss, shell, smali, smalltalk, sml, sqf, sql, stan, stata, step21,
      // stylus, subunit, swift, taggerscript, tap, tcl, tex, thrift, tp, twig, typescript, vala,
      // vbnet, vbscript-html, vbscript, verilog, vhdl, vim, x86asm, xl, xml, xquery, yaml, zephir

    ].forEach(language => {
      describe(`(${language.name}) language`, () => {
        const resultRegEx = /^<code satzbau-language="[^"]*">(.*)<\/code>$/g

        it(`should apply ${language.name} highlighting`, () => {
          const res = Highlighter.highlight(`<code satzbau-language="${language.name}">${language.source}</code>`, {})

          Assert.equal(res.count, 1)
          Assert.deepEqual(res.languages, [ language.name ])
          Assert.equal(language.expectedOutput, res.document.replace(resultRegEx, '\$1'))
        })
      })
    })
  })
})
