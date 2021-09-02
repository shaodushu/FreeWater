const express = require('express')
const app = express()
const getFiltrateData = require('./filtrateData.js');

const port = 3000

app.get('/list', async (req, res) => {
  const filtrateData = await getFiltrateData('https://v.douyin.com/dL9BfJK/');
  //   ctx.body = {
  //     code: 200,
  //     msg: 'ok',
  //     data: filtrateData
  //   }
  res.send({
    code: 200,
    msg: 'ok',
    data: filtrateData
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
