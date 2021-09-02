import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
import { useState } from 'react';
import { Image, Space } from 'antd-mobile'
// import styles1 from './index.less'

const demoSrc =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'


function Index() {
  const [value, setValue] = useState('')
  const { data, loading, error } = useRequest("http://192.168.1.79:3000/list", {
    requestMethod: (param: any) => {
      console.log(param)
      return Taro.request({
        url: param
      })
    },
    formatResult: (v) => v.data.data
    // requestMethod: (param: any) => {
    //   console.log(param)
    //   return Taro.cloud.callFunction({
    //     name: param,
    //     data: {
    //       $url: 'list',
    //       url: 'https://v.douyin.com/dL9BfJK/',
    //     }
    //   })
    // },
  })
  console.log(data, loading, error)
  if (error) {
    return <div>{error}</div>
  }
  if (loading) {
    return <div>loading...</div>
  }

  return <View className={styles.test}>
    {/* <Image src={demoSrc} width={100} height={100} fit='fill' /> */}
    {/* <Image src={demoSrc} width={100} height={100} fit='contain' />
    <Image src={demoSrc} width={100} height={100} fit='cover' />
    <Image src={demoSrc} width={100} height={100} fit='scale-down' />
    <Image src={demoSrc} width={100} height={100} fit='none' /> */}
    {data.map(item => <>
      <h3>{item.title}</h3>
      <Image src={item.cover} width={100} height={100} fit='fill' />
    </>)}
    <Space >

      {/* <Image src={demoSrc} width={100} height={100} fit='fill' />
      <Image src={demoSrc} width={100} height={100} fit='contain' />
      <Image src={demoSrc} width={100} height={100} fit='cover' />
      <Image src={demoSrc} width={100} height={100} fit='scale-down' />
      <Image src={demoSrc} width={100} height={100} fit='none' /> */}
    </Space>
    {/* <input type="text" placeholder="短链" onChange={e => setValue(e.currentTarget.value)} />
    <Text className={styles.txt}>Hello world!{value}</Text>
    <div className={styles.test}>
      <span className={styles.txt}>{value}你好 Html dev:weapp! 加载</span>
    </div> */}
  </View>
}

export default Index
