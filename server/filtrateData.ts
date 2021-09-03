// 整理数据,筛选出所需要的数据
import getAllUrl from "./getAllUrl.ts";
import config from "./config.ts";

const {
  isSaveJsonData,
  ajaxPath,
  coverPath,
} = config;

// 获取对象深层次属性，兼容有[]的情况
// deno-lint-ignore no-explicit-any
function getJsonValue(obj: { [x: string]: any }, node: string): any {
  if (!obj) {
    return null;
  }
  if (!node) {
    return null;
  }
  const nodes = node.split(".");
  const item = nodes[0];
  let newObj = obj[item];
  if (nodes[0].indexOf("[") > -1) {
    const itemArr = item.split("[");
    newObj = obj[itemArr[0]];
    newObj = newObj[itemArr[1].slice(0, -1)];
  }
  if (nodes.length == 1) {
    return newObj;
  }
  return getJsonValue(newObj, node.substring(item.length + 1));
}

export default async function getFiltrateData(
  inputUrl: string,
  type: API.DataType,
) {
  // 这里需要过滤标题中不能作为文件名保存的关键字
  const awemeList = await getAllUrl(inputUrl, type);
  console.log("开始整理数据");
  const filtrateData: API.Aweme[] = [];
  try {
    awemeList.reverse().forEach((item: any, index: number) => {
      filtrateData.push({
        title: `${index + 1}_${item.desc}`,
        url: getJsonValue(item, ajaxPath),
        cover: getJsonValue(item, coverPath),
      });
    });
  } catch (error) {
    console.log("整理数据出错");
    console.log(error);
  }

  console.log("整理数据完成，视频个数为：", filtrateData.length);
  if (isSaveJsonData) {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(filtrateData));

    Deno.writeFileSync("filtrateData.json", data);
  }
  return filtrateData;
}
