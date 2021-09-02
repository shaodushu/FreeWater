const express = require('express')
const app = express()
const getFiltrateData = require('./filtrateData.js');

const port = 3000

app.get('/list', async (req, res) => {
  try {
    const {
      query: {
        url,
        type
      }
    } = req;
    const filtrateData = await getFiltrateData(url, type);

    res.send(filtrateData)
  } catch (error) {
    res.send(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})