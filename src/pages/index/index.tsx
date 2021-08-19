import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
// import styles1 from './index.less'

function Index() {

  const { data, loading, error } = useRequest("dy", {

    requestMethod: (param: any) => {
      console.log(param)
      return Taro.cloud.callFunction({
        name: param,
        // data: {
        //   $url: '/dy',
        //   test: 1
        // }
      })
    },
    // formatResult: ({ data }) => {

    // }
  })
  console.log(data, loading, error)

  return <View className={styles.test}>
    <Text className={styles.txt}>Hello world!1</Text>
    <div className={styles.test}>
      <span className={styles.txt}>1你好 Html dev:weapp! 加载</span>
    </div>
  </View>
  return (
    <div className={styles.test}>
      <span className={styles.txt}>1你好 Html dev:weapp! 加载</span>
    </div>
  )
}

export default Index
