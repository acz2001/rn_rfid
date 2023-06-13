import React, {ReactElement} from "react"
import RNModal from "@/components/RNModal"
import {useRecoilState} from "recoil"
import {CompleteTaskModalVisibleState} from "@/views/task/state"
import {Text} from "react-native"


export default function CompleteTask(): ReactElement {

  const [visible, setVisible] = useRecoilState(CompleteTaskModalVisibleState)

  return (
    <RNModal
      visible={visible}
      confirmButtonProps={{size: "sm"}}
      cancelButtonProps={{size: "sm"}}
      // clickMaskClose={false}
      onMask={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Text>ces</Text>
    </RNModal>
  )
}
