const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
	console.log(`req body = ${req.body}`)
	next()
})

app.get('/', (req, res) => {
	res.send('Who is knocking at the door?')
})

app.use('*redirect', (req, res) => {
	const data = { 'redirect original url': req.originalUrl }
	console.log(data)
	res.redirect('http://www.google.com')
})

app.use('/scenario', (req, res) => {
	const data = { 'scenario original url': req.originalUrl }
	console.log(data)
	res.status(200).set('content-type', 'application/json').send(data)
})

app.use('/', async (req, res, next) => {
    const { originalUrl } = req
    
	console.log(`original url = ${originalUrl}`)
	const data = {originalUrl}
	data.body = req.body
    
	res.status(200).set('content-type', 'application/json').send(data)
	next()
})

const port = 9090
app.listen(port, () => {
	console.log(`Backend listening at http://localhost:${ port }`)
})
