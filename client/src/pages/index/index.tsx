import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { useRequest } from 'ahooks'
import styles from './index.module.less'
import { Image, Space } from 'antd-mobile'
import Button from 'antd-mobile/es/components/button'
import { spawn } from 'child_process';


const Grid: React.FC = (props) => {
  const style = Object.assign({}, {
    '--vertical-gap': '8px',
    '--horizontal-gap': '8px',
    '--columns': 3

  })
  return <div className={styles.grid} style={style}>
    {props.children}
  </div>
}

function Index() {
  const { data, loading, error } = useRequest("http://localhost:3000/post?url=https://v.douyin.com/dL9BfJK/&type=like", {
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
  // console.log(<Grid columns={3} gap={8} />)
  return <View className={styles.test}>
    {/* <Image src={demoSrc} width={100} height={100} fit='fill' /> */}
    {/* <Image src={demoSrc} width={100} height={100} fit='contain' />
    <Image src={demoSrc} width={100} height={100} fit='cover' />
    <Image src={demoSrc} width={100} height={100} fit='scale-down' />
    <Image src={demoSrc} width={100} height={100} fit='none' /> */}
    <Grid  >
      {data.map(item => <div key={item.title} className={styles['grid-item']}>
        <Image width={100} height={100} src={item.cover} />
      </div>)}
    </Grid>
    {/* <Grid columns={3} gap={8}>
      {data.map(item => <Grid.Item key={item.title}>
        <Image width={100} height={100} src={item.cover} />
      </Grid.Item>)}
    </Grid> */}

    <Button block color='primary' size='large'>
      Block Button
    </Button>
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
