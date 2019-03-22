import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";

import getPageContext from "../utils/getPageContext";
import "../static/scss/material-kit-pro-react.scss";
// import withData from "../utils/withData";
import withApollo from "../utils/withApollo";
import Page from "../components/Page";

class MyApp extends App {
	constructor() {
		super();
		this.pageContext = getPageContext();
	}
	componentDidMount() {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}
	// static async getInitialProps({ Component, ctx, router }) {
	// 	let pageProps = {};

	// 	if (Component.getInitialProps) {
	// 		pageProps = await Component.getInitialProps(ctx);
	// 	}

	// 	pageProps.query = ctx.query;

	// 	return { pageProps };
	// }

	render() {
		const { Component, apollo, pageProps, apolloClient } = this.props;

		return (
			<Container>
				<JssProvider
					registry={this.pageContext.sheetsRegistry}
					generateClassName={this.pageContext.generateClassName}
				>
					<MuiThemeProvider
						theme={this.pageContext.theme}
						sheetsManager={this.pageContext.sheetsManager}
					>
						<CssBaseline />
						<ApolloProvider client={apolloClient}>
							<ApolloHooksProvider client={apolloClient}>
								<Page>
									<Component pageContext={this.pageContext} {...pageProps} />
								</Page>
							</ApolloHooksProvider>
						</ApolloProvider>
					</MuiThemeProvider>
				</JssProvider>
			</Container>
		);
	}
}

export default withApollo(MyApp);
