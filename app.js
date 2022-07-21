const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()

const getLetterboxdData = async (username) => {
	const response = await axios(`https://letterboxd.com/${username}`)

	const htmlData = response.data
	const $ = cheerio.load(htmlData)

	var data = []

	$('.profile-statistic', htmlData).each((index, element) => {
		const value = $(element).children('a').children('.value').text()

		if (index == 0) {
			data.push({ title: 'films', value })
		}

		if (index == 1) {
			data.push({ title: 'this year', value })
		}

		if (index == 2) {
			data.push({ title: 'lists', value })
		}

		if (index == 3) {
			data.push({ title: 'following', value })
		}

		if (index == 4) {
			data.push({ title: 'followers', value })
		}
	})
	// console.log(data)
	return data
}

app.get('/', async (req, res) => {
	const vishal = await getLetterboxdData('vishithefishi')
	return res.send({ vishal })
})

const PORT = process.env.PORT || 1000
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))
