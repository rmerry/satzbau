'use strict'

const Cheerio = require('cheerio')
const Hljs    = require('highlightjs')

// the full list of supported languages
const languages = [
  '1c',         'abnf',         'accesslog',  'actionscript', 'ada',           'apache',     'applescript',
  'arduino',    'armasm',       'asciidoc',   'aspectj',      'autohotkey',    'autoit',     'avrasm',
  'awk',        'axapta',       'bash',       'basic',        'bnf',           'brainfuck',  'cal',
  'capnproto',  'ceylon',       'clean',      'clojure',      'clojure-repl',  'cmake',      'coffeescript',
  'coq',        'cos',          'cpp',        'crmsh',        'crystal',       'cs',         'csp',
  'css',        'dart',         'delphi',     'diff',         'django',        'd',          'dns',
  'dockerfile', 'dos',          'dsconfig',   'dts',          'dust',          'ebnf',       'elixir',
  'elm',        'erb',          'erlang',     'erlang-repl',  'excel',         'fix',        'flix',
  'fortran',    'fsharp',       'gams',       'gauss',        'gcode',         'gherkin',    'glsl',
  'go',         'golo',         'gradle',     'groovy',       'haml',          'handlebars', 'haskell',
  'haxe',       'hsp',          'htmlbars',   'http',         'hy',            'inform7',    'ini',
  'irpf90',     'java',         'javascript', 'jboss-cli',    'json',          'julia',      'julia-repl',
  'kotlin',     'lasso',        'ldif',       'leaf',         'less',          'lisp',       'livecodeserver',
  'livescript', 'llvm',         'lsl',        'lua',          'makefile',      'markdown',   'mathematica',
  'matlab',     'maxima',       'mel',        'mercury',      'mipsasm',       'mizar',      'mojolicious',
  'monkey',     'moonscript',   'n1ql',       'nginx',        'nimrod',        'nix',        'nsis',
  'objectivec', 'ocaml',        'openscad',   'oxygene',      'parser3',       'perl',       'pf',
  'php',        'pony',         'powershell', 'processing',   'profile',       'prolog',     'protobuf',
  'puppet',     'purebasic',    'python',     'q',            'qml',           'rib',        'r',
  'roboconf',   'routeros',     'rsl',        'ruby',         'ruleslanguage', 'rust',       'scala',
  'scheme',     'scilab',       'scss',       'shell',        'smali',         'smalltalk',  'sml',
  'sqf',        'sql',          'stan',       'stata',        'step21',        'stylus',     'subunit',
  'swift',      'taggerscript', 'tap',        'tcl',          'tex',           'thrift',     'tp',
  'twig',       'typescript',   'vala',       'vbnet',        'vbscript-html', 'vbscript',   'verilog',
  'vhdl',       'vim',          'x86asm',     'xl',           'xml',           'xquery',     'yaml',
  'zephir'
]

/*
Takes a HTML document string and an options object and scans the document for
elements with a `satzbau-language' attribute. Highlighting is applied to the
contents of the elements with a `satzbau-language' attribute iff the specified
language is supported.

params
  doc [String] The HTML document string
  opts [Object]
    - fallbackLanguage [String] Fallback language if `satzbau-language`
      attribute stipulates an unsupported language. If this is not specified
      highlighting will not be applied to a tag where the language is
      unsupported.
    - language [String] The language for which to perform the syntax highlightinThe language for which to perform the syntax highlighting.
    - removeAttrs [bool] Remove `satzbau-x` attrs after applying highlighting.

returns
  [null/Object] null if no highlighting is applied otherwise Object
    - document [String] The updated document string.
    - count [number] The count of blocks that were highlighted.
    - languages [Array|String] List of languages for which highlighting was applied.
*/
function highlight(doc, opts) {
  if (!opts) { return null }

  // validate the language
  if (!supported(opts.language)) {
    if (!opts.fallbackLanguage) { return null }
    opts.language = opts.fallbackLanguage
  }

  try {
    // the second parameter to `highlight()' must be a string at it
    // unfortunately performs no runtime type checking and will
    // fall over
		console.log(doc)
    const res = Hljs.highlight(opts.language, doc, true)

    // the css classes leave he highlightjs library with a `hljs' prefix, we
    // replace that with `satzbau'
    return res.value.replace(/<span class="hljs-/g, '<span class="satzbau-')
  } catch (err) {
    // TODO: handle the error here
    console.log(`error with language: ${language}`)
    console.log('error: ', err)
  }
}

/*
Takes a language string and returns true if the language is on the list of
supported languages for which highlighting can be applied
*/
function supported(language) {
  return languages.includes(language)
}

module.exports = {
  highlight,
}
