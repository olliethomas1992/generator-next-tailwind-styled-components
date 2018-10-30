const glob = require('glob-all');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const PurgecssPlugin = require('purgecss-webpack-plugin');


/* Load in correct config.
---------------------------------------------------- */
if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
} else {
	require('dotenv').config({ path: './.env.production' });
}

/* Tailwind Extractor for Purge Css
---------------------------------------------------- */
class TailwindExtractor {
	static extract (content) {
		return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
	}
}


/* Config
---------------------------------------------------- */
module.exports = withCSS(withFonts(withImages({

	/* WEBPACK CONFIGURATION
	---------------------------------------------------- */
	webpack (config, { buildId, dev, isServer, defaultLoaders }) {

		// Plugins
		config.plugins.push(

			// Purge Css Config
			new PurgecssPlugin({
				paths: glob.sync([
					"./pages/*.js",
					"./global/**/*.js"
				]),
				extractors: [
					{
						extractor: TailwindExtractor,
						extensions: ["js"]
					}
				],
				whitelistPatternsChildren: [/nprogress$/]
			}),
		);


		return config;
	},

	/* BUILD CONFIGURATION
	---------------------------------------------------- */
	serverRuntimeConfig: {
	},
	publicRuntimeConfig: {
		staticFolder: '/static',
		appUrl: process.env.APP_URL,
		isProduction: (process.env.NODE_ENV === "production")
	}
})));