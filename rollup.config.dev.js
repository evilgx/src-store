const babel =  require('rollup-plugin-babel');
const Commonjs = require('rollup-plugin-commonjs');
var Resolve = require('rollup-plugin-node-resolve');
var Replace = require('rollup-plugin-replace');

module.exports = {
    entry:'demo/index.js',
    format:'iife',
    dest:'demo/demo.js',
    sourceMap:true,
    name:'demo',
    plugins:[
        babel({
            exclude:"node_modules/*"
        }),
        Resolve(),
        Commonjs(),
        Replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ]
}