import React, {useEffect, useState} from "react"
import {StacksList} from "@/route/stacks"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ScreenItemType, StackType} from "@/route/type"
import {useRecoilState, useSetRecoilState} from "recoil"
import {QcTaskInfo, SocketState, UserInfoState, WorkbenchBindInfo} from "@/global/state"
import DeviceInfo from "react-native-device-info"
import {getStorageToken, getStorageUserInfo, WS_BASE_URL} from "@/global"
import ReconnectingWebSocket from "reconnecting-websocket"

const Stack: StackType = createNativeStackNavigator()
const {Navigator: StackNavigator, Screen: StackScreen} = Stack

export function StackScreens(): React.ReactElement {

  const setBindInfo = useSetRecoilState(WorkbenchBindInfo)
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState)
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)
  const [socket, setSocket] = useState<any>(null)
  const [socketConnect, setSocketConnect] = useRecoilState(SocketState)

  const {workerProfile} = userInfo || {}

  // const isInTask = () => qcTask?.taskId && !socketConnect && qcTask.memberList.some((i: any) => i.workerId === workerProfile?.workerId)
  const isInTask = () => qcTask?.taskId && !socketConnect

  useEffect(() => {
    console.log(`task====`, qcTask)
    let rws: any
    if (isInTask() && !socket) {
      const token = getStorageToken()
      rws = new ReconnectingWebSocket(`${WS_BASE_URL}/ws/topic?topic=${qcTask?.taskId}&Authorization=${encodeURIComponent(`Bearer ${token}`)}`)
      setSocket(rws)
      rws.onopen = (e: any) => {
        setSocketConnect(true)
        console.log("WebSocket connected===============================")
      }

      rws.onclose = (e: any) => {
        setSocketConnect(false)
        console.log(`Websocket 已关闭`)
      }

      rws.onerror = (e: any) => {
        console.error(`消息接收异常===`, e.message)
      }

      rws.onmessage = (e: any) => {
        console.log(`message===`, JSON.parse(e.data))
        const task = JSON.parse(e.data).content
        if (task.taskState === "COMPLETED" || task.taskState === "CANCELED") {
          try {
            rws.close()
            setSocket(null)
          } catch (e) {
            console.error(e)
          }
        }
        setQcTask(task)
      }
    }

    if (!qcTask && socket) {
      socket?.close()
      setSocket(null)
    }

  }, [qcTask?.taskId, qcTask?.memberList])

  useEffect(() => {
    DeviceInfo.getUniqueId().then((deviceId: any) => setBindInfo({deviceId}))
    !userInfo && setUserInfo(getStorageUserInfo())
  }, [userInfo])

  return (
    <StackNavigator>
      {StacksList.map((item: ScreenItemType) => <StackScreen key={item.name} {...item}/>)}
    </StackNavigator>
  )
}
