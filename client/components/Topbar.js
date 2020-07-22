import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { GiCarambola } from 'react-icons/gi';
import { AppBar, 
	Toolbar, 
	Button,
	Typography } from '@material-ui/core';
import Menu from './Menu';
import Searchbar from './Searchbar';
import paletteController from '../PaletteController';

const styles = {
	topbar: {
		position: 'relative'
	},
	logoContainer: {
		position: 'absolute',
		display: 'flex',
		marginLeft: 26,
		color: 'white',
		zIndex: 1
	},
	logoText: {
		marginLeft: 5,
		fontSize: 40,
		fontFamily: 'ComicAndy'
	},
	logoIcon: {
		marginTop: 15
	},
	newsFeedTab: {
		marginLeft: '16%'
	},
	musicTab: {
		marginLeft: '5%'
	},
	moviesTab: {
		marginLeft: '5%'
	},
	searchbar: {
		marginLeft: '10%'
	},
	menu: {
		position: 'absolute',
		zIndex: 5,
		right: '8%'
	}
};

const Topbar = withRouter(({ history }) => {
	const [ activeTab, setActiveTab ] = React.useState('');

	React.useEffect(() => {
		getTab();
	});

	const getTab = () => {
		if(history.location.pathname === '/') setActiveTab('newsfeed');
		if(history.location.pathname === '/music') setActiveTab('music');
		if(history.location.pathname === '/movies') setActiveTab('movies');
	};

	return (
		<AppBar position='sticky'>
			<Toolbar 
				style={{
					backgroundColor: paletteController.mainColor, 
					...styles.topbar
				}}
			>
				<Link to='/' style={styles.logoContainer}>
					<GiCarambola style={styles.logoIcon} size={33}/>
					<Typography style={styles.logoText}>Karambol</Typography>
				</Link>
				<Button
					id='newsfeed-tab'
					onClick={() => location.replace('/')}
					style={{
						color: activeTab === 'newsfeed' ? 'white': paletteController.tabsTextColor, 
						textShadow: activeTab === 'newsfeed' ? '1px 1px 2px white' : false,
						...styles.newsFeedTab
					}}
				>
                    News Feed
				</Button>
				<Button
					id='music-tab'
					onClick={() => location.replace('/music')}
					style={{
						color: activeTab === 'music' ? 'white': paletteController.tabsTextColor,
						textShadow: activeTab === 'music' ? '1px 1px 2px white' : false,
						...styles.musicTab
					}}
				>
                    Music
				</Button>
				<Button
					id='movies-tab'
					onClick={() => location.replace('/movies')}
					style={{
						color: activeTab === 'movies' ? 'white': paletteController.tabsTextColor,
						textShadow: activeTab === 'movies' ? '1px 1px 2px white' : false,
						...styles.moviesTab
					}}
				>
                    Movies
				</Button>
				<div style={styles.searchbar}>
					<Searchbar activeTab={activeTab}/>
				</div>
				<div style={styles.menu}>
					<Menu/>
				</div>
			</Toolbar>
		</AppBar>
	);
});

export default Topbar;
