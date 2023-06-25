import React, {ReactElement} from "react"
import RModal from "@/components/RModal"
import {useRecoilState} from "recoil"
import {CompleteTaskModalVisibleState} from "@/views/task/state"
import {Text} from "react-native"
import {Card} from "@rneui/base"
import {QcTaskInfo} from "@/global/state"
import {completeTask} from "@/api/task/task"
import {useToast} from "react-native-toast-notifications"
import {ScreenNavigationProps} from "@/route"


export interface CompleteTaskProps extends ScreenNavigationProps {

}

export default function CompleteTask({navigation}: CompleteTaskProps): ReactElement {

  const Toast = useToast()
  const [visible, setVisible] = useRecoilState(CompleteTaskModalVisibleState)
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)

  const handleConfirm = async () => {
    const {taskId} = qcTask
    const {success, errorMessage} = await completeTask({taskId})
    if (!success) {
      Toast.show(errorMessage || "结束任务失败", {type: "danger"})
      return
    }
    Toast.show("操作成功", {type: "success"})
    setVisible(false)
    setQcTask(null)
    navigation.replace("Home")
  }

  return (
    <RModal
      visible={visible}
      confirmButtonProps={{size: "sm"}}
      cancelButtonProps={{size: "sm"}}
      clickMaskClose={false}
      onMask={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onConfirm={handleConfirm}
    >
      <Card.Title style={{textAlign: "left"}}>结束任务</Card.Title>
      <Card.Divider/>
      <Text style={{color: "#000"}}>
        请仔细检查，是否需要结束任务
      </Text>
    </RModal>
  )
}
