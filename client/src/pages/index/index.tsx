import Taro from '@tarojs/taro';
import { Video, View } from '@tarojs/components'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
import { Search, Image, Grid, Button, Row, Col, Loading } from "@taroify/core"
import { useEffect, useState } from 'react';
import { httpString } from '@/utils/index';
import { request } from '@/utils/request';

async function getVideoUrl<T>(value) {
  return request<T>(`https://laiceps.cloud/api/v1/video?url=${value}`)
}

function downloadFile(url: string) {
  return new Promise((
    resolve: (v: Taro.downloadFile.FileSuccessCallbackResult) => void,
    reject: (v: Taro.General.CallbackResult) => void,
  ) => Taro.downloadFile({
    url,
    success: v => resolve(v),
    fail: v => reject(v)
  }))
}

function Index() {
  const [value, setValue] = useState('')
  const { run, data = [], loading, error } = useRequest(() => getVideoUrl<any[]>(value), {
    manual: true,
    // requestMethod: (param: any) => {
    //   console.log(param)
    //   return Taro.request({
    //     url: param
    //   })
    // },
    // formatResult: (v) => {
    //   console.log(v)
    //   return v.data
    // }
  })

  // const { data: list = [], loading: loadingA } = useRequest(`https://laiceps.cloud/api/v1/post?url=https://v.douyin.com/dMjh5pe/`, {
  //   requestMethod: (param: any) => {
  //     console.log(param)
  //     return Taro.request({
  //       url: param
  //     })
  //   },
  //   formatResult: (v) => v.data
  // })

  useEffect(() => {
    Taro.getClipboardData({
      success: function (res) {
        setValue(httpString(res.data))
      }
    })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  const onDownload = async () => {
    const { statusCode, tempFilePath } = await downloadFile(data[0].replace('-web', ""))

    if (statusCode === 200) {
      await Taro.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
      })

      await Taro.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      Taro.hideToast()
    }
  }


  return <View className={styles.index}>
    <Search
      value={value}
      placeholder="请输入提取短链"
      action={
        <Button loading={loading} shape="round" color="primary" onClick={() => run()}>提取</Button>
      }
      onChange={(e) => setValue(e.detail.value)}
    />
    {data.length > 0 && <>
      <Video
        style={{ width: '100%' }}
        src={data[0]}
        controls={true}
        autoplay={false}
        // poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
        initialTime={0}
        id='video'
        loop={false}
        muted={false}
      />
      <Button block color='primary' size='large' onClick={onDownload}>下载</Button>
    </>}

    {/* <h3>宝子的作品</h3>
    {loadingA ? (
      <Loading size="24px" vertical>加载中...</Loading>
    ) : (
      <Grid columns={2} gutter={10}>
        {list.map(item => <Grid.Item key={item.title} >
          <Image className={styles.image} src={item.cover} />
        </Grid.Item>)}
      </Grid>
    )} */}

  </View>
}

export default Index
