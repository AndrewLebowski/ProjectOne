/* eslint-disable react/prop-types */
import React from 'react';
import { Card,
	CardContent,
	Box,
	Typography,
	TextField,
	IconButton,
	Button,
	CardActions,
	Backdrop,
	CircularProgress } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import TagList from './TagList';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';
import paletteController from '../../PaletteController';

const styles = {
	card: {
		paddingTop: 50,
		paddingBottom: 50,
		paddingRight: 60,
		paddingLeft: 60,
		minHeight: 250,
		marginBottom: 80
	},
	titleInput: {
		marginTop: 30,
		width: '100%',
	},
	tagInput: {
		marginTop: 30,
		width: '100%',
	},
	tagListContainer: {
		marginTop: 25
	},
	addTagButton: {
		marginRight: 30,
		color: 'white'
	},
	textInput: {
		marginTop: 30,
		width: '100%'
	},
	cameraButton: {
		color: 'white',
		marginLeft: 4,
		marginRight: 20
	},
	imageInput: {
		display: 'flex',
		marginTop: 27,
	},
	imageName: {
		marginTop: 8,
	},
	deleteButton: {
		color: 'white',
		marginLeft: 20
	},
	addPostButton: {
		color: 'white',
		marginTop: 10,
		marginLeft: 5
	}
};

const NewPostForm = (props) => {
	const [ postTitle, setTitle ] = React.useState('');
	const [ titleError, setTitleError ] = React.useState('');
	const [ postTag, setTag ] = React.useState('');
	const [ addedTags, setAddedTags ] = React.useState([]);
	const [ postText, setText ] = React.useState('');
	const [ textError, setTextError ] = React.useState('');
	const [ postImage, setImage ] = React.useState('');
	const [ userId, setUserId ] = React.useState('');
	const [ isLoading, setLoading ] = React.useState(false);

	React.useEffect( () => {
		const user = authenticationHelper.isAuthenticated().user;
		setUserId(user._id);
	}, []);

	const createPost = async () => {
		setLoading(true);
		let postData = new FormData();
		postData.set('title', postTitle);
		postData.append('tags', JSON.stringify(addedTags));
		postData.set('text', postText);
		postData.set('image', postImage);
		postData.set('postedBy', userId);
		const token = authenticationHelper.isAuthenticated().accessToken;
		const data = await postApi.create(token, postData);
		setLoading(false);
		if(data.success) {
			setTitle('');
			setTag('');
			setAddedTags('');
			setText('');
			setImage('');
			setTitleError('');
			setTextError('');
			props.updateNewsFeed(data.success);
		} else {
			data.error.errors.title ? 
				setTitleError(data.error.errors.title.properties.message) : setTitleError('');
			data.error.errors.text ? 
				setTextError(data.error.errors.text.properties.message) : setTextError('');
		}
	};

	const deleteTag = (index) => {
		let updatedTags = [...addedTags];
		updatedTags.splice(index, 1);
		setAddedTags(updatedTags);
	};

	const isDisabled = !postTag || addedTags.length === 5;

	return (
		<Box>
			<Card
				raised
				style={{
					backgroundColor: paletteController.cardColor,
					...styles.card
				}}
			>
				<CardContent>
					<Typography
						id='page-title'
						variant='h5'
						style={{color: paletteController.textColor}}
					>
                        Create your post
					</Typography>
					<TextField 
						onChange={ 
							(event) => setTitle(event.target.value)
						}
						id='title-input'
						required
						label='Title'
						variant='outlined'
						placeholder='Type title...'
						value={postTitle}
						style={{
							color: paletteController.textColor,
							...styles.titleInput
						}}
					/>		
					<br/>
					{ titleError ? (<Typography id='title-error' color='error'>{titleError}</Typography>) : null }

					<TextField 
						onChange={ 
							(event) => setTag(event.target.value)
						}
						id='tag-input'
						label='Tag'
						variant='outlined'
						placeholder='Add tag...'
						value={postTag}
						style={{
							color: paletteController.textColor,
							...styles.tagInput
						}}
					/>

					<Box style={styles.tagListContainer}>
						<TagList
							postTag={postTag}
							setTag={setTag}
							addedTags={addedTags}
							setAddedTags={setAddedTags}
							deleteTag={deleteTag}
							isDisabled={isDisabled}
						/>
					</Box>

					<TextField
						id='text-input'
						required
						label='Text content'
						variant='outlined'
						placeholder='Type content...'
						multiline
						rows='20'
						value={postText}
						style={styles.textInput}
						onChange={ 
							(event) => setText(event.target.value)
						}
					/>
					<br/>
					{ textError ? (<Typography id='text-error' color='error'>{textError}</Typography>) : null }

					<Box style={styles.imageInput}>
						<input 
							accept='image/*' 
							style={{display: 'none'}}
							type='file'
							id='hidden-image-input'
							onChange={ 
								(event) => {
									setImage(event.target.files[0]);
									event.target.value = null;
								}
							}
						/>
						<label htmlFor='hidden-image-input'>
							<IconButton
								id='camera-button'
								style={{
									backgroundColor: paletteController.mainColor,
									...styles.cameraButton
								}} 
								component='span'
							>
								<PhotoCamera/>
							</IconButton>
						</label>
						{
							postImage ? (
								<div style={styles.imageName}>
									<Typography
										id='image-name'
										component='span'
										style={{color: paletteController.textColor}}
									>
										{postImage.name}
									</Typography>
									<IconButton 
										onClick={() => setImage('')}
										id='delete-image-button'
										size='small'
										style={{
											backgroundColor: paletteController.mainColor,
											...styles.deleteButton
										}}
									>
										<DeleteIcon/>
									</IconButton>
								</div>
							) 
								: 
								null
						}
					</Box>
					<br/>
				</CardContent>
				<CardActions>
					<Button 
						onClick={createPost}
						id='add-post-button'
						style={{
							backgroundColor: paletteController.mainColor,
							...styles.addPostButton
						}}
					>
                        ADD POST
					</Button>
				</CardActions>
			</Card>
			<Backdrop open={isLoading} style={styles.backdrop} >
				<CircularProgress style={{ color: paletteController.backgroundColor }} size={150} thickness={4}/>
			</Backdrop>
		</Box>
	);
};

export default NewPostForm;
