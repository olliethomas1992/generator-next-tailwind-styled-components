import App, { Container } from "next/app";
import Head from 'next/head';
import getConfig from 'next/config';
import styled from "react-emotion";
import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import emotionNormalize from 'emotion-normalize';
import theme from '../tailwind';
import Nprogress from '../components/global/Nprogress';
import Navigation from '../components/global/Navigation';
// import Favicon from '../components/global/Favicon';

const AppContainer = styled.div`
	${tw` p-4 `}
`

const { publicRuntimeConfig: config } = getConfig();

injectGlobal`
	${emotionNormalize}
	${Nprogress(theme)}
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
					{/** <Favicon /> */}
				</Head>
				<ThemeProvider theme={theme}>
					<>
						<Navigation />
						<AppContainer>
							<Component {...pageProps} />
						</AppContainer>
					</>
				</ThemeProvider>
			</Container>
		);
	}
}

export default <%= appName %>;
