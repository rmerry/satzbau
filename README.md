# Satzbau

Satzbau is a static syntax highlighter for code blocks within HTML files. Is built on top of (Highlight.js)[https://highlightjs.org] and (Cheerio)[https://github.com/cheeriojs/cheerio].

## Why?

If you run a small blog or other generic technical website, you may want to have code highlighting within your code blocks. Traditionally this has been achieved by bundling a client side highlighting library with your web pages; but this has the disadvantage of adding to page loading times and depriving people who have Javascript disabled. Satzbau leverages the very powerful _Highlightjs_ library to embed the highlighting tags directly into your HTML files, eliminating the need for a client side libraries.

## How?

It's really simple. Satzbau is a simple command line application can that can take one or many file names and or directories and perform the syntax highlighting logic over all files that match the target criteria; the files are then save back to disk and you're done. If for example you use a static website generator, you might consider adding _Satzbau_ as a post processing step.

## Installation

`npm install -g satzbau`

## Usage

Once installed you can execute _Satzbau_ from the command line like so:

`satzbau ./website`

The above command would run satzbau over the `./website` directory. By default if no command line options are given, satzbau will search for 


