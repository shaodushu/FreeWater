import Taro from '@tarojs/taro';
import { Video, View } from '@tarojs/components'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
import { Search, Image, Grid, Button } from "@taroify/core"
import { useEffect, useState } from 'react';
import { httpString } from '@/utils/index';

function Index() {
  const [value, setValue] = useState('')
  const { run, data = [], loading, error } = useRequest(`http://192.168.2.100:3000/video?url=${value}`, {
    manual: true,
    requestMethod: (param: any) => {
      console.log(param)
      return Taro.request({
        url: param
      })
    },
    formatResult: (v) => v.data
  })

  console.log(data)
  useEffect(() => {
    Taro.getClipboardData({
      success: function (res) {
        console.log(res.data)
        setValue(httpString(res.data))
      }
    })
  }, [])

  console.log(data, loading, error)
  if (error) {
    return <div>{error}</div>
  }
  // if (loading) {
  //   return <div>loading...</div>
  // }

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
        src={data[0]}
        controls={true}
        autoplay={false}
        // poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
        initialTime={0}
        id='video'
        loop={false}
        muted={false}
      />
      <Button block color='primary' size='large' onClick={() => {
        Taro.downloadFile({
          url: data[0], //仅为示例，并非真实的资源
          success: function (res) {
            console.log(res)
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              // Toast.show('下载成功')
              // Taro.paly({
              //   filePath: res.tempFilePath
              // })
              Taro.saveVideoToPhotosAlbum({
                filePath: res.tempFilePath,
                success: async function (res) {
                  console.log(res.errMsg)
                  await Taro.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                  })
                  Taro.hideToast()
                },
                fail: err => {
                  console.log(err)
                  Taro.showToast({
                    title: err.errMsg,
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          },
          fail: err => {
            console.log(err)
          }
        })
      }}>下载</Button>
    </>}


    {/* <Video
      src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
      controls={true}
      autoplay={false}
      poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
      initialTime={0}
      id='video'
      loop={false}
      muted={false}
    /> */}
    {/* <Grid >
      {data.map(item => <div key={item.title} className={styles['grid-item']}>
        <Image width="100" height="100" src={item.cover} />
      </div>)}
    </Grid> */}
  </View>
}

export default Index
