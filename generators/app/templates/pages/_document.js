import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render () {
		return (
			<html>
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}