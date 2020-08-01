/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { GiCarambola } from 'react-icons/gi';
import { isMobile } from 'react-device-detect';
import AdminPanel from './components/user/AdminPanel';
import Topbar from './components/Topbar';
import NewsFeedList from './components/posts/NewsFeedList';
import PostListByTag from './components/posts/PostListByTag';
import SearchPost from './components/posts/SearchPost';
import MusicList from './components/music/MusicList';
import SearchMusic from './components/music/SearchMusic';
import MoviesList from './components/movies/MoviesList';
import SearchMovie from './components/movies/SearchMovie';
import Welcome from './components/Welcome';
import SignUpForm from './components/user/SignUpForm';
import LoginForm from './components/user/LoginForm';
import RecoveryForm from './components/user/RecoveryForm';
import ResetPasswordForm from './components/user/ResetPasswordForm';
import Profile from './components/user/Profile';
import Support from './components/Support';
import Settings from './components/Settings';
import Footer from './components/Footer';
import paletteController from './PaletteController';

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		paddingTop: '7%',
	},
	list: {
		width: 850,
		minHeight: '110vh',
		marginTop: '3%'
	},
	aside: {
		width: 350, 
		marginTop: '3%'
	},
	mobileHeader: {
		display:'flex',
		justifyContent: 'center',
		height: 70
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	logoText: {
		marginLeft: 10,
		fontSize: 40,
		fontFamily: 'ComicAndy'
	}
};

const RootComponent = (props) => {
	const [ showWelcome, setWelcome ] = React.useState(false);
	const [ showMobileHeader, setMobileHeader ] = React.useState(false);

	React.useEffect(() => {
		setMobileHeader(true);
		setWelcome(true);
	});

	return (
		<Box>
			{
				showMobileHeader && isMobile ?
					<Box style={{backgroundColor: paletteController.backgroundColor, ...styles.mobileHeader}}>
						<Link to='/' style={{color: paletteController.tagsColor, ...styles.logoContainer}}>
							<GiCarambola size={33}/>
							<Typography style={styles.logoText}>Karambol</Typography>
						</Link>
					</Box>
					:
					null
			}
			<Topbar/>
			<Box 
				style={{
					backgroundColor: paletteController.backgroundColor,
					paddingLeft: isMobile ? 0 : '14%',
					paddingRight: isMobile ? 0 : '8%',
					...styles.container
				}}
			>
				<Box 
					style={{
						margin: isMobile ? 0 : '3%',
						...styles.list
					}}
				>
					<Switch>    
						<Route exact path='/' component={NewsFeedList} />
						<Route exact path='/music' component={MusicList} />  
						<Route exact path='/movies' component={MoviesList} />  
						<Route path='/newsfeed/:postId' component={SearchPost} />
						<Route path='/tags/:postTag' component={PostListByTag} />
						<Route path='/music/:musicId' component={SearchMusic} />  
						<Route path='/movies/:movieId' component={SearchMovie} />  
						<Route path='/admin' component={AdminPanel} />
						<Route path='/signup' component={SignUpForm} />
						<Route path='/login' component={LoginForm} />
						<Route path='/recovery' component={RecoveryForm} />
						<Route path='/reset/:email/:resetToken' component={ResetPasswordForm} />
						<Route path='/profile/:userId' component={Profile} />
						<Route path='/support' component={Support} />
						<Route path='/settings' component={() => (
							<Settings palette={props.palette} setPalette={props.setPalette} />
						)}/>
					</Switch>
				</Box>
				{
					showWelcome && !isMobile ?
						<Box style={styles.aside}>
							<Welcome/>
						</Box>
						:
						null
				}
			</Box>
			<Footer/>
		</Box>
	);
};

export default RootComponent;
