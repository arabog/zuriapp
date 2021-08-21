const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2021
require('dotenv').config()


let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = 'hng'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
	.then(client => {
		console.log(`Connected to ${dbName} Database`)
		db = client.db(dbName)
	})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res)=>{
	try {		
		res.render('index.html')
	} catch (err) {
		res.status(500).json(err)
	}
})

app.post('/contact', (req, res) => {
	db.collection('zuri').insertOne(
		{
			userFirstname: req.body.userFirstname,
			userLastname: req.body.userLastname,
			userEmail: req.body.userEmail,
		}
	)
		.then(result => {
			res.redirect('/')
		})

		.catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, ()=>{
	console.log(`Server running on port ${PORT}`)
})