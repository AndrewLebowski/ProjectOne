import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required !']
	},

	genre: {
		type: String,
		required: [true, 'Genre is required !']
	},

	description: {
		type: String,
		required: [true, 'Description is required !']
	},

	image: {
		// eslint-disable-next-line no-undef
		data: Buffer,
		contentType: String
	},

	postedBy: {
		type: String, 
		required: [true, 'Author is required !']
	},
    
	created: {
		type: Date,
		default: Date.now
	}
});

BookSchema.index({title: 'text'});

export default BookSchema;