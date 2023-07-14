import React, {ReactElement, useState} from "react"
import RModal from "@/components/RModal"
import {useRecoilState, useSetRecoilState} from "recoil"
import {
  DeviceConnectState,
  DeviceReadState, QcTaskInfo,
  SignOutModalVisibleState,
  UserInfoState,
} from "@/global/state"
import {Card} from "@rneui/base"
import {NativeModules, Text} from "react-native"
import {deleteStorageUser} from "@/global"
import {ScreenNavigationProps} from "@/route"

const {RFID} = NativeModules
export default function SignOutModal({navigation}: ScreenNavigationProps): ReactElement {

  const [visible, setVisible] = useRecoilState(SignOutModalVisibleState)
  const [open, setOpen] = useRecoilState(DeviceConnectState)
  const [isRead, setRead] = useRecoilState(DeviceReadState)
  const [loading, setLoading] = useState<boolean>(false)
  const setUserInfo = useSetRecoilState(UserInfoState)
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)

  const handleConfirm = () => {
    setLoading(true)
    try {
      if (isRead) {
        RFID.stopRead((read: boolean): void => {
          setRead(read)
          RFID.shutdown((off: boolean): void => {
            setOpen(off)
          }, (err: any): void => console.error(err))
        }, (err: any): void => console.error(err))
      } else {
        RFID.shutdown((off: boolean): void => {
          setOpen(off)
        }, (err: any): void => console.error(err))
      }
      setQcTask(null)
      setUserInfo(null)
      deleteStorageUser()
      setVisible(false)
      navigation.replace("Login")
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }


  return (
    <RModal
      visible={visible}
      confirmButtonProps={{loading}}
      onMask={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onConfirm={handleConfirm}
    >
      <Card.Title style={{textAlign: "left"}}>退出登录</Card.Title>
      <Card.Divider/>
      <Text style={{color: "#000"}}>
        退出登录会自动断开读写器，是否确认退出登录
      </Text>
    </RModal>
  )
}
