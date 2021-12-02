const express = require( 'express' );
const path = require( 'path' );
const basicAuth = require('express-basic-auth');
const router = express.Router();
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config({ path: path.resolve(__dirname, './routes/api/.env') })
const aws = require( 'aws-sdk' );
const bodyParser = require('body-parser')
const cors = require("cors");
const mysql = require('mysql')
const { AppStreamClient, AssociateFleetCommand } = require("@aws-sdk/client-appstream");

var corsOptions = {
	origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));

const dbs = require("./models");

dbs.sequelize.sync({ force: false }).then(() => {
	console.log("Drop and re-sync db.");
  }).catch((err) => {
	console.log('Unable to connect to the database:', err);
});

  
  const db = mysql.createPool({
    host: process.env.HOST,
    user:"admin",
    password:process.env.PASS,
    connectionLimit: 5,
    database: "new_schema"
})

db.getConnection(err => {
    if(err){
        throw err
    }
    console.log('MYSQL Connected')
})
/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */

 // parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// We export the router so that the server.js file can pick it up
module.exports = router;

const profile = require( './routes/api/profile');

app.use( '/api/profile', profile );

// Combine react and node js servers while deploying( YOU MIGHT HAVE ALREADY DONE THIS BEFORE
// What you need to do is make the build directory on the heroku, which will contain the index.html of your react app and then point the HTTP request to the client/build directory



if ( process.env.NODE_ENV === 'production' ) {
	// Set a static folder
	app.use( express.static( 'client/build' ) );
	app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) );

}
const auth = basicAuth({
	users: {
	  admin: '123',
	  user: '456',
	},
  });


  const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	Bucket: process.env.AWS_BUCKET
});


  app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

  app.get('/authenticate', auth, (req, res) => {
	const options = {
	  httpOnly: true,
	  signed: true,
	};
  
	if (req.auth.user === 'admin') {
	  res.cookie('name', 'admin', options).send({ screen: 'admin' });
	} else if (req.auth.user === 'user') {
	  res.cookie('name', 'user', options).send({ screen: 'user' });
	}
  });
  app.get('/read-cookie', (req, res) => {
	if (req.signedCookies.name === 'admin') {
	  res.send({ screen: 'admin' });
	} else if (req.signedCookies.name === 'user') {
	  res.send({ screen: 'user' });
	} else {
	  res.send({ screen: 'auth' });
	}
  });
  
  app.get('/clear-cookie', (req, res) => {
	res.clearCookie('name').end();
  });

	app.get('/db',(req,res)=>{
		let sql ='select distinct dataset from new_schema.images'
		db.query(sql,(err,results) =>{
			if(err){
				throw err
			}
			console.log(results)
			res.send(results);
		})
	})
	app.get('/files', (req,res)=>{
		let id = req.signedCookies["name"];
	 let sql ="select * from new_schema.images" 
	 db.query(sql, (err,results) =>{
			if(err){
				throw err
			}
			// console.log(results)
			res.send(results);
		})
	})

	app.get('/model', (req,res)=>{
		let model = req.body.model;
	 let sql ="select * from new_schema.model_list,new_schema.images where model_name=  " + mysql.escape(model)
	 db.query(sql,model, (err,results) =>{
			if(err){
				throw err
			}
			 console.log(results)
			res.send(results);
		})
	})
	app.get('/model-list', (req,res)=>{
		let model = req.body.model;
		console.log(model)
	 let sql ="select * from new_schema.model_list"
	 db.query(sql, (err,results) =>{
			if(err){
				throw err
			}
			 console.log(results)
			res.send(results);
		})
	})


	app.get('/pdata',(req,res)=>{
		
		let sql ='select *from new_schema.images'
		db.query(sql,(err,results) =>{
			if(err){
				throw err
			}
			console.log(results)
			res.send(results);
		})
	})
	app.get('/tables',(req,res)=>{
		let sql ='show tables'
		db.query(sql,(err,results) =>{
			if(err){
				throw err
			}
			console.log(results)
			res.send(results);
		})
	})
	app.get('/', function (req, res) {
		// Cookies that have not been signed
	  console.log('hello: ',req.body)
		// Cookies that have been signed
		console.log('Signed Cookies: ', req.signedCookies.name)
	  })

	  app.post('/getmodel', (req, res) => {
		var model = req.body.model;
	
		console.log(model);
		//It shows model value here and you can able to use in the query
	
		let sql = "select * from new_schema.model_list,new_schema.images where model=  " + mysql.escape(model)
		db.query(sql, model, (err, results) => {
			if (err) {
				throw err
			}
			console.log(results)
			res.send(results);
			
		})
	
	});
	app.post('/getdata', (req, res) => {
		
		
	
		//console.log(model);
		
		console.log(req.body)
		console.log(req.headers)
		
		
		
	
	});
	app.get('/userlist',(req,res)=>{
		
		let sql ='select id,username,email,createdAt from new_schema.users'
		db.query(sql,(err,results) =>{
			if(err){
				throw err
			}
			console.log(results)
			res.send(results);
		})
	})

	/* const params = {
		"AuthenticationType": "USERPOOL",
		"FirstName": "Ragupathy",
		"LastName": "Mohan",
		"MessageAction": "",
		"UserName": "karthikkn446@gmail.com"
	 }
 */

	 

	
	
	app.post('/getmodell', (req, res) => {
		//const appStream = new AppStreamClient({region: 'ap-southeast-1'});
		var appstream = new aws.AppStream({apiVersion: '2016-12-01'});
	
	
	const params = {
		AuthenticationType: "USERPOOL",
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		UserName: req.body.UserName
		//MessageAction: "Null",
		
	 }
		//const associateFleetCommand = new AssociateFleetCommand(body);
		 appstream.createUser(params,  function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else     console.log("successful",data);           // successful response
		  })
		  res.send("Successful")
		 /* const paramss = {
			UserStackAssociations: [ 
			  {
				AuthenticationType: "USERPOOL", 
				StackName: 'DhvaniStacks', 
				UserName: 'karthikn1050@gmail.com', 
				SendEmailNotification: true 
			  },
			
			]
		  };
		appstream.batchAssociateUserStack (paramss, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else     console.log(data);           // successful response
		  }); */
		  
	})
	app.post('/stack', (req, res) => {
		var appstream = new aws.AppStream({apiVersion: '2016-12-01'});
		var paramss = {
			UserStackAssociations: [ 
			  {
				AuthenticationType: "USERPOOL", 
				StackName: req.body.stackname, 
				UserName: req.body.UserName, 
				SendEmailNotification: true 
			  },
			
			]
		  };
		  appstream.batchAssociateUserStack(paramss, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else     console.log("success");           // successful response
		  });
		 
		 res.send("successful")
	})



	//User Management Starts Here
	

	//User Management Ends Here


// Set up a port
const port = process.env.PORT || 5000;

app.listen( port, () => console.log( `Server running on port: ${port}` ) );