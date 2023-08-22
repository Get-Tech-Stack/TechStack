import TerserPlugin from 'terser-webpack-plugin';

import {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getZipPlugins,
    getEntry,
    getResolves,
    getDefinePlugins,
    getCleanWebpackPlugins,
    config,
    getExtensionManifestPlugins,
    getEslintPlugins,
    getProgressPlugins,
    getExtensionReloaderPlugins,
    Directories,
    getAnalyzerPlugins,
} from './webpack.config.utils';

let generalConfig: any = {
    mode: config.NODE_ENV === 'production' || config.NODE_ENV === 'upload' ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        // options: {
                        //     transpileOnly: true,
                        // },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    resolve: getResolves(),
    entry: getEntry(Directories.SRC_DIR),
    output: getOutput(config.TARGET, config.OUTPUT_DIR),
};

let plugins: any[] = [
    ...getCleanWebpackPlugins(`${config.OUTPUT_DIR}/${config.TARGET}`, `${Directories.DIST_DIR}/${config.TARGET}`),
    ...getProgressPlugins(),
    ...getEslintPlugins(),
    ...getDefinePlugins(),
    ...getExtensionManifestPlugins(),
    ...getHTMLPlugins(config.TARGET, config.OUTPUT_DIR, Directories.SRC_DIR),
    ...getCopyPlugins(config.TARGET, config.OUTPUT_DIR, Directories.SRC_DIR),
];

if (config.NODE_ENV === 'development') {
    generalConfig = {
        ...generalConfig,
        devtool: 'source-map',
        stats: {
            all: false,
            builtAt: true,
            errors: true,
            hash: true,
        },
        watch: true,
        watchOptions: {
            aggregateTimeout: 200,
            poll: 1000,
        },
    };

    plugins = [...plugins, ...getExtensionReloaderPlugins()];
}

if (config.NODE_ENV === 'profile') {
    generalConfig = {
        ...generalConfig,
        devtool: 'source-map',
        stats: {
            all: false,
            builtAt: true,
            errors: true,
            hash: true,
        },
    };

    plugins = [...plugins, ...getAnalyzerPlugins()];
}

if (config.NODE_ENV === 'upload') {
    generalConfig = {
        ...generalConfig,
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },
    };

    plugins = [...plugins];
}

if (config.NODE_ENV === 'production') {
    generalConfig = {
        ...generalConfig,
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },
    };

    plugins = [...plugins, ...getZipPlugins(config.TARGET, Directories.DIST_DIR)];
}

export default [
    {
        ...generalConfig,
        plugins,
    },
];
