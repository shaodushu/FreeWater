import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
import { Grid, Image, Space } from 'antd-mobile'


function Index() {
  const { data, loading, error } = useRequest("http://192.168.1.79:3000/list?url=https://v.douyin.com/dL9BfJK/&type=like", {
    requestMethod: (param: any) => {
      console.log(param)
      return Taro.request({
        url: param
      })
    },
    formatResult: (v) => v.data
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

    <Grid columns={2} gap={8}>
      {data.map(item => <Grid.Item key={item.title}>
        {/* <h3>{item.title}</h3> */}
        <Image width={100} height={100} src={item.cover} />
      </Grid.Item>)}
    </Grid>
    {/* <Space className={styles.img_box}>
      {data.map(item => <div className={styles.img}>
        <h3>{item.title}</h3>
        <Image className={styles.img} src={item.cover} />
      </div>)}
    </Space> */}
    {/* <input type="text" placeholder="短链" onChange={e => setValue(e.currentTarget.value)} />
    <Text className={styles.txt}>Hello world!{value}</Text>
    <div className={styles.test}>
      <span className={styles.txt}>{value}你好 Html dev:weapp! 加载</span>
    </div> */}
  </View>
}

export default Index
