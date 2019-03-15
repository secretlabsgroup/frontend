import JoinUs from "./joinus";
import Router from "next/router";
import Events from "../components/Home/Events";
import Header from "../components/Header";
import User, { isLoggedIn } from "../components/Queries/User";
import { ALL_EVENTS_QUERY } from "../components/Queries/AllEvents";
import redirect from "../utils/redirect";

const Home = ({ query }) => {
	return (
		<User>
			{({ data, loading }) => {
				if (loading) return <div />;
				if (!data.currentUser) return <JoinUs />;
				else
					return (
						<>
							<Header color="primary" currentUser={data.currentUser} />
							<Events />
						</>
					);
			}}
		</User>
	);
};

Home.getInitialProps = async ({ apolloClient }) => {
	try {
		const { data } = await apolloClient.readQuery({
			query: ALL_EVENTS_QUERY,
			fetchPolicy: "cache-and-network"
		});
		console.log(data.getEvents, "getEvents");
		console.log(data, "data");
		if (data.getEvents) {
			return { events: data.getEvents };
		}
	} catch (e) {
		console.log(e);
	}

	// 	if (!user.currentUser) {
	// 		console.log("no user logged in");
	// 		// redirect(ctx, '/joinus');
	// 	}
	// 	// 	//if (ctx.query.welcome)
	// 	// 	//console.log(!user.currentUser && router.pathname !== '/joinus');
	// 	// 	// if (!(user.currentUser && router.aspath != '/joinus')) {
	// 	// 	// 	redirect(ctx, '/joinus');
	// 	// 	// }
	return {};
};

export default Home;
