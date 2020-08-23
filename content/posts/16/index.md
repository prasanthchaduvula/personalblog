---
title: User signin/signup using Phone number, Otp in MERN stack
author: Chaduvula Prasanth
date: 2020-08-23
hero: ./images/signinotp.png
excerpt: This document helps in better understanding of basic work flow of user signin/signup using phone number and otp in Mern stack.
---

### User signin/signup using Phone number, Otp in MERN stack

After creating node app using express generator
we will use jwt auth for token and [msg91](https://msg91.com/in/startups) . We will register as startup and get free credentials for send otp

Our backend Node app folder stracture

        bin
        controllers
        models
        modules
        node_modules
        public
        views
        app.js
        package.json
        package-lock.json

Install mongoose to connect database with you app

    npm i mongoose -save

In your app.js

    var  createError = require("http-errors");
    var  express = require("express");
    var  path = require("path");
    var  cookieParser = require("cookie-parser");
    var  logger = require("morgan");
    const  bodyParser = require("body-parser");
    var  mongoose = require("mongoose");
    var  app = express();

    //setup your mongo database address here
    var  mongoServer = "mongodb+srv://***********************.mongodb.net/test?retryWrites=true&w=majority";

    // connect your mongo
    mongoose.connect(
        mongoServer,
        {
        useNewUrlParser:  true,
        useUnifiedTopology:  true,
        useFindAndModify:  false,
        useCreateIndex:  true
        },
        err  => {
        console.log(err ? err : "mongodb connected");
        }
    );

    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    // routes
    var  usersRouter = require("./routes/users");

    // middleware
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended:  false }));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended:  false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "public")));

    // routes middleware
    app.use("/api/v1/users", usersRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    	next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
    	// set locals, only providing error in development
    	res.locals.message = err.message;
    	res.locals.error = req.app.get("env") === "development" ? err : {};

    	// render the error page
    	res.status(err.status || 500);
    	res.json({ err });
    });

    module.exports = app;

Create a user model inside `models/user.js`
Take user name and phone number where phone number should be unique
Inside `models/user.js`

    var  mongoose = require("mongoose");
    var  Schema = mongoose.Schema;

    var  userSchema = new  Schema(
        {
    	    name: {
    		    type:  String
    	    },
    	    phoneNumber: {
    		    type:  Number,
    		    unique:  true,
    		    required:  true
    	    },
        },
        { timestamps:  true }
    );

    module.exports = mongoose.model("User", userSchema);

Before working on our user controller install these packages

Install jsonwebtoken to use jwt token for user auth

    npm i jsonwebtoken -save

Install Msg91 sendotp package to handle send/verify otp

    npm i sendotp -save

After installing these packages your `package.json` look like

    {
        "name": "backend",
        "version": "0.0.0",
        "private": true,
        "scripts": {
    	    "start": "node ./bin/www"
        },
        "dependencies": {
    		"body-parser": "^1.19.0",
    	    "cookie-parser": "~1.4.4",
    	    "debug": "~2.6.9",
    	    "ejs": "~2.6.1",
    	    "express": "~4.16.1",
    	    "http-errors": "~1.6.3",
    	    "jsonwebtoken": "^8.5.1",
    	    "mongoose": "^5.9.1",
    	    "morgan": "~1.9.1",
    	    "sendotp": "^1.2.9"
        }
    }


Let's go to our `controllers/userController.js`

Make methods or actions inside `controllers/userController.js` to handle all the logic for signin, signup, sendotp, verifyotp

Below SENDOTP method recieves the user phone number sends a otp to the phone number

Below VERIFYOTP method is to verify entered otp matched with sendotp, if otp matches then we will check whether the user exist in the database or not.
If user exists then we will do successfull signin otherwise we will do successfull signup.
If entered otp not matched then we will send error message.
Pass your Msg91 OTP credintial and SENDERID ( you will get these in the Msg91 dashboard) to `userController.js`

This all things happens inside `controllers/userController.js`

    var  User = require("../models/user");
    var  jwt = require("jsonwebtoken");
    const  SendOtp = require("sendotp");

    // pass your msg91 otp creditials SendOtp
    const  sendOtp = new  SendOtp("****otpcredentials****");

    // send otp for sending otp to entered phone number and also pass message sender name like app name from your credintials
    const SENDOTP = (req,res) => {
    	sendOtp.send(req.body.phoneNumber, "***senderID***", (err, data) => {
    		if (err) return  res.json({ err });
    		data.type == "success"
    		? res.json({ success:  true })
    		: res.json({ success:  false });
    	});
    }

    // verify otp to verify entered otp matched with sentotp or not
    const VERIFYOTP = (res,res) => {
    	sendOtp.verify(req.body.phoneNumber, req.body.otp, function(err, data) {
    		if (err) return  res.json({ err });
    		if (data.type == "success") {
    			let { phoneNumber } = req.body;
    			User.findOne({ phoneNumber }, (err, user) => {
    				if (err) return  res.json({ err });
    				if (!user) {
    					// user signup
    					User.create(req.body, (err, user) => {
    						if (err) return  res.json({ err });
    						jwt.sign(
    							{
    								userId:  user._id,
    								phoneNumber:  user.phoneNumber
    							},
    							"thisissecret",
    							(err, signuptoken) => {
    								if (err) return  res.json({ err });
    								res.json({
    									success:  true,
    									signuptoken,
    									userId:  user._id,
    									message:  "registered successfully"
    								});
    							}
    						);
    					});
    				}
    				if (user) {
    					// user signin
    					jwt.sign(
    						{
    							userId:  user._id,
    							phoneNumber:  user.phoneNumber
    						},
    						"thisissecret",
    						(err, logintoken) => {
    							if (err) return  res.json({ err });
    							res.json({ logintoken, userId:  user._id });
    						}
    					);
    				}
    			});
    		}
    		if (data.type == "error") res.json({ success:  false, message:  data.message });
    	});
    }
    module.exports = { SENDOTP, VERIFYOTP }

Inside `routes/users.js`

    var  express = require("express");
    var  userController = require("../controllers/userController");
    var  userauth = require("../modules/userAuth");
    var  router = express.Router();

    // send otp
    router.post("/sendotp", userController.SENDOTP);

    // verify otp
    router.post("/verifyotp", userController.VERIFYOTP);

    module.exports = router;

Now let's handle your frontend React.js

Make component `Auth.jsx` inside `src` folder to handle user signup/signin based on the phone number

Install validator npm package to check whether the entered phone number is valid or not

    npm i validator -save

Here in the `Auth.jsx` we are handling both phone number and otp entry pages.

Before doing the fetch request, add a proxy to React `package.json` file for our backend. our backend runs on 3000
so, add this `"proxy": "http://localhost:3000"` to `package.json` In React

Inside your `src/Auth.jsx`

    import  React  from  'react';
    import  validator  from  'validator';
    import { NavLink, withRouter } from  'react-router-dom';

    class  Auth  extends  React.Component {
        constructor() {
    	    super();
    	    this.state = {
    		    dispalyPhonePage:  true,
    		    phoneNumber:  '',
    		    otp:  '',
    		    invalid:  '',
    		    msg:  ''
    	    };
        }

        handleChange = event  => {
    	    this.setState({ invalid:  '', msg:  '' });
    	    let { name, value } = event.target;
    	    this.setState({ [name]:  value });
        };

        editPhoneNo = () => {
    		this.setState({ dispalyPhonePage:  true });
    	};

    	handleSendOtp = () => {
    		this.setState({ dispalyPhonePage:  false });
    		fetch('/api/v1/users/sendotp',
    			{
    				method:  'POST',
    				headers: {
    					'Content-Type':  'application/json'
    				},
    				body:  JSON.stringify({
    					phoneNumber:  this.state.phoneNumber
    				})
    			}
    		)
    		.then(res  =>  res.json())
    		.then(data  => {
    			if (data.success) {
    				this.setState({ dispalyPhonePage:  false });
    			} else {
    				this.setState({ dispalyPhonePage:  true });
    			}
    		});
    	};

        submitPhoneNo = e  => {
    	    e.preventDefault();
    		if(this.state.phoneNumber) {
    			validator.isMobilePhone(this.state.phoneNumber)
    				? this.handleSendOtp()
    			    : this.setState({ invalid:  'Enter a valid Phone Number' })
    		}
    		else {
    			this.setState({ msg:  "Phone Number can't be empty" });
    	    }
        };

        handleVerifyOtp = e  => {
    	    e.preventDefault();
    	    if(this.state.otp){
    		    fetch('/api/v1/users/verifyotp',
    			    {
    				    method:  'POST',
    				    headers: {
    					    'Content-Type':  'application/json'
    				    },
    				    body:  JSON.stringify({
    					    phoneNumber:  this.state.phoneNumber,
    					    otp:  this.state.otp
    				    })
    			    }
    			)
    		    .then(res  =>  res.json())
    		    .then(data  => {
    			    if (data.success) {
    				    localStorage.setItem('storiesloggeduser', data.signuptoken);
    				    localStorage.setItem('storiesloggeduserid', data.userId);
    				    this.props.handleIslogged(true);
    				    this.props.history.push('/');
    			    }
    			    if (!data.success) this.setState({ msg:  data.message });
    			    if (data.logintoken) {
    				    localStorage.setItem('storiesloggeduser', data.logintoken);
    				    localStorage.setItem('storiesloggeduserid', data.userId);
    				    this.props.handleIslogged(true);
    				    this.props.history.push('/');
    			    }
    		    })
    		}
    	    else {
    		    this.setState({ msg:  "OTP can't be empty" })
    	    }
        };

    	displayPhonePage = () => {
    		return (
    			<form onSubmit={this.submitPhoneNo}>
    				<label>{this.state.invalid}</label>
    				<label>{this.state.msg}</label>
    				<label>Enter a phone number</label>
    				<input
    					type="tel"
    					name="phoneNumber"
    					placeholder="8888888888"
    					value={this.state.phoneNumber}
    					onChange={this.handleChange}
    					required
    				/>
    				<input type="submit"  value="NEXT"/>
    			</form>
    		)
    	}

    	displayOtpPage = () => {
    		return (
    			<form onSubmit={this.handleVerifyOtp}>
    				<label>{this.state.invalid}</label>
    				<label>{this.state.msg}</label>
    				<label>Enter OTP</label>
    				<input
    					type="tel"
    					name="otp"
    					placeholder="8432"
    					value={this.state.otp}
    					onChange={this.handleChange}
    					required
    				/>
    				<div>
    					<button onClick={this.editPhoneNo}>Edit Phone Number </button>
    					<button onClick={this.handleSendOtp}> Resend OTP </button>
    				</div>
    				<input type="submit"  value="NEXT"/>
    			</form>
    		)
    	}

    	render() {
    		let { dispalyPhonePage } = this.state;
    		return(
    			<>
    				{dispalyPhonePage ? this.displayPhonePage() : this.displayOtpPage()}
    			</>
    		)
    	}
    }
    export  default  withRouter(Auth);

I hope above document helps in better understanding of basic work flow of user signin/signup using phone number and otp in Mern stack

Thank You
