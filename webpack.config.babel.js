import path from 'path';
import webpack from 'webpack';
import alias from 'whs/tools/alias';

alias['@ammo:modules'] = 'physics-module-ammonext/src/modules';

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
    /**
     * Application Main Entry Point
     */
    entry: './app/main.js',

    /**
     * Module definition
     */
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules\/(?!whs)|bower_components)/,
                loader: 'babel-loader',
                query: {
                    plugins: [
                        'add-module-exports',
                        'transform-decorators-legacy',
                        'transform-class-properties',
                        'transform-object-rest-spread',
                        ['transform-runtime', {helpers: false, polyfill: false, regenerator: true}]
                    ]
                }
            },
            {
                test: /\.wasm$/,
                loaders: ['wasm-loader']
            },
            {
                test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/
            },
            {
                test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/
            }
        ]
    },

    /**
     * Plugins
     */
    plugins: ENV_PRODUCTION
    ? [
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.UglifyJsPlugin()
    ] : [],

    /**
     * Output
     */
    output: {
        path: path.join(__dirname, './build/'),
        filename: 'bundle.js'
    },

    /**
     * Development Server
     */
    devServer: {
        publicPath: '/build/',
        stats: { chunks: true }
    },

    /**
     * Module Resolve and Aliases
     */
    resolve: {
        alias,
        symlinks: false,
        modules: [path.resolve('node_modules')]
    }
};

export {
  config as default
};
