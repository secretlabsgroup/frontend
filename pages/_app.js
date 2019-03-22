import App, { Container } from "next/app";
import cookie from "cookie";

import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import withData from "../utils/withData";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../utils/getPageContext";
import "../static/scss/material-kit-pro-react.scss";

function parseCookies(req, options = {}) {
	return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);
}

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
	static async getInitialProps({ Component, ctx, router }) {
		let pageProps = {};
		let cookie;
		if (ctx && ctx.req && ctx.req.headers) {
			cookie = parseCookies(ctx.req).token;
			console.log(cookie, "cookie here");
		}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		pageProps.query = ctx.query;

		return { pageProps };
	}
	render() {
		const { Component, apollo, pageProps } = this.props;

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
						<ApolloProvider client={apollo}>
							<ApolloHooksProvider client={apollo}>
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

export default withData(MyApp);
