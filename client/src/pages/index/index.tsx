import { View, Text } from '@tarojs/components'
import styles from './index.module.less'
// import styles1 from './index.less'

function Index() {
  console.log(1, styles)
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
