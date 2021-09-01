// 整理数据,筛选出所需要的数据
const fs = require('fs');
const getAllUrl = require('./getAllUrl.js');
const {
  isSaveJsonData,
  ajaxPath,
  coverPath
} = require('./config');

// 获取对象深层次属性，兼容有[]的情况
function getJsonValue(obj, node) {

  if (!obj) {
    return null;
  }
  if (!node) {
    return null;
  }
  let nodes = node.split(".");
  let item = nodes[0]
  let newObj = obj[item]
  if (nodes[0].indexOf('[') > -1) {
    let itemArr = item.split("[")
    newObj = obj[itemArr[0]]
    newObj = newObj[itemArr[1].slice(0, -1)]
  }
  if (nodes.length == 1) {
    return newObj;
  }
  return getJsonValue(newObj, node.substring(item.length + 1));
}

async function getFiltrateData(inputUrl) {
  // 这里需要过滤标题中不能作为文件名保存的关键字
  let aweme_list = await getAllUrl(inputUrl)
  console.log("开始整理数据")
  let filtrateData = []
  try {
    aweme_list.reverse().forEach((item, index) => {
      filtrateData.push({
        title: `${index+1}_${item.desc}`,
        url: getJsonValue(item, ajaxPath),
        cover: getJsonValue(item, coverPath)
      })
    })
  } catch (error) {
    console.log('整理数据出错')
    console.log(error)
  }

  console.log("整理数据完成，视频个数为：", filtrateData.length)
  if (isSaveJsonData) {
    fs.writeFileSync('filtrateData.json', JSON.stringify(filtrateData))
  }
  return filtrateData
}
module.exports = getFiltrateData
