import Events from "../components/Home/Events";
import Header from "../components/Header";
import { isLoggedIn } from "../components/Queries/User";
import { getAllEvents } from '../components/Queries/AllEvents';
import redirect from "../utils/redirect";

const Home = ({ query, currentUser  }) => {
	
	return (
		<>
			<Header color="primary" user={currentUser} />
			<Events  user={currentUser}/>
		</>
	)
};

Home.getInitialProps = async ctx => {
	const { currentUser } = await isLoggedIn(ctx.apolloClient);
	console.log(currentUser)
	if (!currentUser) {
		redirect(ctx, '/joinus');
		return {}
	}else {
		const getEvents = await getAllEvents(ctx.apolloClient, currentUser);
		return { currentUser, getEvents};
	}
	
};

export default Home;
