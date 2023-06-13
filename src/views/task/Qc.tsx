import React, {forwardRef, ReactElement, useEffect, useState} from "react"
import {View, StyleSheet, Image, AppState, NativeEventEmitter, NativeModules} from "react-native"
import {Button, Input, LinearProgress, Skeleton, Text} from "@rneui/base"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {useRecoilState, useSetRecoilState} from "recoil"
import {DeviceConnectState, DeviceReadState, QcTaskInfo} from "@/global/state"
import {useToast} from "react-native-toast-notifications"
import {TOAST_DURATION} from "@/global/constants"
import {getStorageUserInfo} from "@/utils"
import {getMemberQty, getQcTaskInfo, recordEpc} from "@/api/task/task"
import {QcWorkText, QcWorkType} from "@/views/task/types"
import CompleteTask from "@/views/task/CompleteTask"
import {CompleteTaskModalVisibleState} from "@/views/task/state"

const {RFID: RFIDApplication = {}} = NativeModules

export function Qc(): ReactElement {

  const Toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)
  const [open, setOpen] = useRecoilState(DeviceConnectState)
  const [isRead, setRead] = useRecoilState(DeviceReadState)
  const [activeTaskInfo, setActiveTaskInfo] = useState<Array<any>>([])
  const [epcInfo, setEpcInfo] = useState<any>()

  const setCompleteTaskVisible = useSetRecoilState(CompleteTaskModalVisibleState)

  const getTaskQty = async () => {
    const {success, data} = await getMemberQty({taskId: qcTask?.taskId})
    if (success) setActiveTaskInfo(data)
  }

  const getData = async (epc: any) => {
    setLoading(true)
    try {
      // @ts-ignore
      const {workerProfile: {workerId}} = await getStorageUserInfo() || {}
      const {success, errorMessage} = await recordEpc({workerId, epc, taskId: qcTask?.taskId})
      if (!success) {
        Toast.show(errorMessage || "读取异常", {duration: TOAST_DURATION})
        setLoading(false)
        return
      }
      const resList = await Promise.all([
        getQcTaskInfo({taskId: qcTask?.taskId}),
        getMemberQty({taskId: qcTask?.taskId}),
      ])
      setEpcInfo(epc)
      if (resList[0].success) {
        setQcTask(resList[0].data)
      }
      if (resList[1].success) {
        setActiveTaskInfo(resList[1].data)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTaskQty()
    if (open && !isRead) {
      RFIDApplication.startRead((msg: any): void => {
        setRead(true)
      }, (err: any): void => {
        console.error(`startRead:error ===`, err)
      })
    }
    const eventEmitter: NativeEventEmitter = new NativeEventEmitter(RFIDApplication)
    eventEmitter.addListener("tagReadData", ({epc}: any) => {
      getData(epc)
    })
    return (): void => {
      eventEmitter.removeAllListeners("tagReadData")
      RFIDApplication.stopRead((msg: any): void => {
        console.log(`stopRead:success === `, msg)
        setRead(false)
      }, (err: any): void => {
        console.error(`stopRead:error ===`, err)
        Toast.show(err, {duration: TOAST_DURATION})
      })
    }
  }, [])

  const readEpcNode: ReactElement = (
    <>
      <View style={{flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Text h4>EPC:</Text>
          {loading ? <Skeleton
            LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}
            animation="wave"
            width={300}
            height={26}
          /> : <Text h4>{epcInfo}</Text>}
        </View>
        {/*<Text h4>EPC:*/}
        {/*  {loading ? <Skeleton*/}
        {/*    LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}*/}
        {/*    style={{backgroundColor: "red"}}*/}
        {/*    animation="wave"*/}
        {/*    width={300}*/}
        {/*    height={26}*/}
        {/*  /> : <Text h4>{epcInfo}</Text>}*/}
        {/*</Text>*/}
      </View>
      <View style={{flexDirection: "row"}}>
        <View style={styles.description}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>尺码：</Text>
            {loading ? <Skeleton
              LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}
              animation="wave"
              width={100}
              height={18}
            /> : <Text style={{fontSize: 16}}>L</Text>}
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>颜色：</Text>
            {loading ? <Skeleton
              LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}
              animation="wave"
              width={100}
              height={18}
            /> : <Text style={{fontSize: 16}}>黄色</Text>}
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>尺码：</Text>
            {loading ? <Skeleton
              LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}
              animation="wave"
              width={100}
              height={18}
            /> : <Text style={{fontSize: 16}}>大小</Text>}
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>大小：</Text>
            {loading ? <Skeleton
              LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}
              animation="wave"
              width={100}
              height={18}
            /> : <Text style={{fontSize: 16}}>小</Text>}
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>尺码：</Text>
            {loading ? <Skeleton
              LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}
              animation="wave"
              width={100}
              height={18}
            /> : <Text style={{fontSize: 16}}>L</Text>}
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text>是否需要配件：</Text>
            {loading ? <Skeleton
              LinearGradientComponent={forwardRef(() => <Text>加载中</Text>)}
              animation="wave"
              width={100}
              height={18}
            /> : <Text style={{fontSize: 16}}>是</Text>}
          </View>
        </View>
        <View>
          <Image style={styles.senseImage} source={require("@/images/txue.jpg")}/>
        </View>
      </View>
    </>
  )

  const stopReadNode: ReactElement = (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <View style={styles.leftTopBorder}/>
      <View style={styles.rightTopBorder}/>
      <View style={styles.leftBottomBorder}/>
      <View style={styles.rightBottomBorder}/>
      <View style={{alignSelf: "center"}}>
        <Image style={{width: 300, height: 200}} source={require("@/images/OIP.jpg")}/>
      </View>
    </View>
  )

  return (<View style={styles.container}>
    <View style={styles.nav}>
      <View style={{flexDirection: "row"}}>
        <Text>开始时间：</Text>
        <Text>{qcTask?.startTime}</Text>
      </View>
      {/* <View style={{flexDirection: "row"}}>*/}
      {/*  <Text>本组效能：</Text><Text>34</Text>*/}
      {/*  <View style={{width: 100, justifyContent: "center"}}>*/}
      {/*    <LinearProgress value={0.5} color="primary" style={{height: 20, borderRadius: 6}}/>*/}
      {/*  </View>*/}
      {/* </View>*/}
      {/* <View style={{flexDirection: "row"}}>*/}
      {/*  <Text>平均效能：</Text><Text>34</Text>*/}
      {/*  <View style={{width: 100, justifyContent: "center"}}>*/}
      {/*    <LinearProgress value={0.2} color="primary" style={{height: 20, borderRadius: 6}}/>*/}
      {/*  </View>*/}
      {/* </View>*/}
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text>已完成：</Text><Text h3>{qcTask?.epcCount || 0}</Text>
      </View>
    </View>
    <View style={{flexDirection: "row"}}>
      <View style={styles.side}>
        <View style={{backgroundColor: "white"}}>
          <View style={{flexDirection: "row", alignItems: "flex-start", marginBottom: 2, padding: 4}}>
            <Text style={{width: 60}}>工种</Text>
            <Text style={{marginLeft: 30}}>员工</Text>
            <Text style={{marginLeft: 30}}>数量</Text>
          </View>
          {activeTaskInfo && activeTaskInfo.map((item: any, i: number) => (
            <View key={item.workerId} style={{
              flexDirection: "row",
              marginBottom: 2,
              justifyContent: "flex-start",
              padding: 4,
            }}>
              <Text style={{width: 60}}>{QcWorkText[item.workType as QcWorkType]}</Text>
              <Text style={{marginLeft: 30}}>{item.name}</Text>
              <View style={{width: 70, marginLeft: 30, flexDirection: "row", alignItems: "center"}}>
                <Text>{item && (item.qty || 0)}</Text>
                <View style={{width: 60}}>
                  {/*<LinearProgress value={0.8} color="primary" style={{height: 14, borderRadius: 6}}/>*/}
                </View>
              </View>
            </View>
          ))}

        </View>
        <View style={{width: 90, position: "absolute", bottom: 14, left: 8}}>
          <Button title="替换人员"/>
        </View>
        <View style={{width: 90, position: "absolute", bottom: 14, right: 8}}>
          <Button title="质检记录"/>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.sense}>
          {readEpcNode}
          {/* {stopReadNode}*/}
        </View>
        <View style={styles.footer}>
          <Input
            containerStyle={{}}
            inputContainerStyle={{}}
            leftIcon={<FontAwesome name="feed" size={30}/>}
            rightIcon={
              <Button
                icon={<FontAwesome name="close" color="white" size={20}/>}
                color="red"
                disabled={loading}
                title="结束任务" onPress={() => setCompleteTaskVisible(true)}/>
            }
            placeholder="RFID感应或扫描EPC"
          />
        </View>
      </View>
    </View>
    <CompleteTask/>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    flex: 1,
    backgroundColor: "white",
  },
  nav: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
  side: {
    width: 240,
    height: 360,
    marginTop: 6,
    borderRadius: 6,
    padding: 6,
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  content: {
    marginLeft: 6,
    marginTop: 6,
    flex: 1,
  },
  sense: {
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    borderRadius: 6,
    padding: 6,
  },
  footer: {
    height: 60,
    borderRadius: 6,
    marginTop: 6,
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  sideCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "white",
    // borderRadius: 4,
  },
  description: {
    flex: 1,
    padding: 10,
  },
  senseImage: {
    width: 350,
    height: 250,
    borderRadius: 6,
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
  },
  leftTopBorder: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 30,
    left: 60,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "white",
  },
  rightTopBorder: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 30,
    right: 60,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "white",
  },
  leftBottomBorder: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 30,
    left: 60,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "white",
  },
  rightBottomBorder: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 30,
    right: 60,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "white",
  },
})
