const babel =  require('rollup-plugin-babel');

module.exports = {
    entry:'src/index.js',
    format:'cjs',
    dest:'dist/index.js',
    name:'srcStore',
    plugins:[
        babel({
            exclude:"node_modules/*"
        })
    ]
}