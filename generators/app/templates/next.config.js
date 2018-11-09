const withFonts = require('next-fonts');
const withImages = require('next-images');

/* Load in correct config.
---------------------------------------------------- */
if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
} else {
	require('dotenv').config({ path: './.env.production' });
}

/* Config
---------------------------------------------------- */
module.exports = withFonts(withImages({

	/* WEBPACK CONFIGURATION
	---------------------------------------------------- */
	webpack (config, { buildId, dev, isServer, defaultLoaders }) {

		// Plugins
		// config.plugins.push(
		// );
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
}));