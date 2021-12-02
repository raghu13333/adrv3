const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const cookieParser = require('cookie-parser');
const mysql = require('mysql');

require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const router = express.Router();
const db = require("../../models");
const Image = db.images;
router.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));


/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	Bucket: process.env.AWS_BUCKET
});


router.use( express.urlencoded( { extended: false } ) );
router.use( express.json() );

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType( file, cb ){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
	// Check mime
	const mimetype = filetypes.test( file.mimetype );
	if( mimetype && extname ){
		return cb( null, true );
	} else {
		cb( 'Error: Images Only!' );
	}
}


/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET,
		
		acl: 'public-read',
		key: function (req, file, cb) {
			cb( null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
		}
	}),
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).array( 'galleryImage', 40 );

    


/**
 * @route POST /api/profile/multiple-file-upload
 * @desc Upload business Gallery images
 * @access public
 */
router.post('/multiple-file-upload', ( req, res ) => {
	uploadsBusinessGallery( req, res, async ( error ) => {
		console.log( 'files', req.files );
		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.files === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				let fileArray = req.files,
					fileLocation,mimetype;
				const galleryImgLocationArray = [];
				for ( let i = 0; i < fileArray.length; i++ ) {
					fileLocation = fileArray[ i ].location;
					fileName = fileArray[i].originalname;
					mimetype - fileArray[i].mimetype;
					title = req.body.title;
					uname = req.signedCookies.name;
					model = req.body.model;
					console.log( 'filename', fileLocation );
					galleryImgLocationArray.push( fileLocation )
					await Image.create( {
						name: fileName,
						path: fileLocation,
						dataset: title,
						username: uname,
						model: model
						
					} );
				}
				res.json( {
					filesArray: fileArray,
					locationArray: galleryImgLocationArray,
					model:model
					
				} );
				
				// Save the file name into database
				
			}
		}
	});
});

module.exports = router;