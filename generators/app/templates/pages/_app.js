import "../assets/css/app.css";
import App, { Container } from "next/app";
import Router from "next/router";
import Head from 'next/head';
import getConfig from 'next/config';
import { ThemeProvider } from 'styled-components';
import NProgress from 'nprogress';
import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

import theme from '../tailwind';
// import Favicon from '../global/Favicon';

const { publicRuntimeConfig: config } = getConfig();

/* Next Router Hooks
---------------------------------------------------- */
Router.events.on('routeChangeStart', () => {
	NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});

Router.events.on('routeChangeError', () => {
	NProgress.done();
});

const GlobalStyle = createGlobalStyle`
	${styledNormalize}
	
	body {

	}
`;

class <%= appName %> extends App {

	static async getInitialProps ({ Component, router, ctx: context }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(context)
		}

		return {
			router,
			pageProps
		};
	}

	render () {
		const { Component, pageProps, router, server } = this.props;

		return (
			<Container>
				<Head>
					<title><%= title %></title>
				</Head>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</Container>
		);
	}
}

export default <%= appName %>;
