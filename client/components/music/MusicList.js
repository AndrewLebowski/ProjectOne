import React from 'react';
import { Box } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import InfiniteScroll from 'react-infinite-scroll-component';
import Music from './Music';
import NewMusicForm from './NewMusicForm';
import MusicGenreSelect from './MusicGenreSelect';
import DummyMusic from './DummyMusic';
import authenticationHelper from '../../helpers/authentication.helper';
import cookieHelper from '../../helpers/cookie.helper';
import musicApi from '../../api/music.api';

const MusicList = () => {
	const [ music, setMusic ] = React.useState([]);
	const [ genre, setGenre ] = React.useState('All');
	const [ skip, setSkip ] = React.useState(0);
	const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);
	const [ audioToPlay, setAudioToPlay ] = React.useState([{}]);

	React.useEffect(() => {
		const controller = new window.AbortController();
		const signal = controller.signal;
		if(cookieHelper.getCookie('OneProjectMusic')) {
			setGenre(cookieHelper.getCookie('OneProjectMusic'));
			loadMusic(cookieHelper.getCookie('OneProjectMusic'), signal);
		} else {
			setGenre('All');
			loadMusic('All', signal);
		}
		return function cleanup() {
			controller.abort();
		};
	}, [skip]);

	const loadMusic = async (genre, signal) => {
		let data = await musicApi.listMusic(genre, skip, signal);
		if(data === undefined) return;
		if(data.error) {
			console.log(data.error);
		} 
		else {
			setMusic([...music, ...data]);
			if(data.length === 0) {
				setShouldLoadMore(false);
			}
		}
	};

	const updateMusicList = (item) => {
		let updatedMusic = [...music];
		updatedMusic.unshift(item);
		setMusic(updatedMusic);
	};

	const handleChange = (event) => {
		setMusic('');
		setGenre(event.target.value);
		cookieHelper.setCookie('OneProjectMusic', event.target.value);
		location.reload();
	};

	const handleAutoplay = (musicId, currentAudio) => {
		const audiosToPlay = [];
		for(let item of music) {
			for(let audio of item.audios) {
				audiosToPlay.push({musicId: item._id, audio: audio});
			}
		}
		//audiosToPlay[audiosToPlay.length - 1].last = true;
		const nextAudio = audiosToPlay[audiosToPlay.findIndex((item) => {
			return  item.musicId === musicId && item.audio === currentAudio;
		}) + 1];
		setAudioToPlay(nextAudio);
		//console.log(audiosToPlay);
	};

	return (
		<Box>
			{authenticationHelper.isAuthenticated() ? (<NewMusicForm updateMusicList={updateMusicList}/>) : null}
			<MusicGenreSelect value={genre} handleChange={handleChange}/>
			<InfiniteScroll
				dataLength={music.length}
				hasMore={shouldLoadMore}
				next={() => setSkip(music.length)}
				style={{
					paddingRight: isMobile ? 0 : 10,
					paddingLeft: isMobile ? 0 : 10
				}}
			>
				{ 
					music.length === 0 ? 
						<DummyMusic/> 
						:
						music.map( (item, index) => (
							<Music music={item} key={index} handleAutoplay={handleAutoplay} audioToPlay={audioToPlay}/> 
						)) 
				}
			</InfiniteScroll>
		</Box>
	);
};

export default MusicList;
