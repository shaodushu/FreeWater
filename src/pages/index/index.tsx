import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
import { useState } from 'react';
// import styles1 from './index.less'

function Index() {
  const [value, setValue] = useState('')
  const { data, loading, error } = useRequest("dy", {

    requestMethod: (param: any) => {
      console.log(param)
      return Taro.cloud.callFunction({
        name: param,
        data: {
          $url: 'dy',
          x: 1,
          y: 2,
        }
      })
    },
    // formatResult: ({ data }) => {

    // }
  })
  console.log(data, loading, error)
  if (error) {
    return <div>{error}</div>
  }
  if (loading) {
    return <div>loading...</div>
  }

  return <View className={styles.test}>
    <input type="text" placeholder="短链" onChange={e => setValue(e.currentTarget.value)} />
    <Text className={styles.txt}>Hello world!{value}</Text>
    <div className={styles.test}>
      <span className={styles.txt}>{value}你好 Html dev:weapp! 加载</span>
    </div>
  </View>
}

export default Index
