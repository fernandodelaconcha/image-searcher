//requirements

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Bing = require('node-bing-api')({accKey: '725129c1679b4d419a58ebfc7cc3f727'});
const searchTerm = require('./models/searchTerm');

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/searchTerms')
//GET CALL PARAMETERS

app.get('/api/imagesearcher/:searchVal*', (req,res,next) =>{
	var { searchVal } = req.params;
	var { offset } = req.query;

	var data = new searchTerm({
		searchVal,
		searchDate: new Date()
	});

	data.save(err => {
		if (err){
			return res.send('Error saving to Database');
		}
		res.json(data);
	});

	//res.json({searchVal,offset});
});

app.listen(process.env.PORT || 3000, ()=> {
	console.log('server is running');
});