import React, {ReactElement} from "react"
import RModal from "@/components/RModal"
import {Card} from "@rneui/base"
import {Text} from "react-native"
import {useRecoilState} from "recoil"
import {CancelTaskModalVisibleState} from "@/views/task/state"
import {ScreenNavigationProps} from "@/route"

interface CancelTaskProps extends ScreenNavigationProps {
  handleConfirm?: () => void;
}


export default function CancelTask({handleConfirm}: CancelTaskProps): ReactElement {

  const [visible, setVisible] = useRecoilState(CancelTaskModalVisibleState)

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
      <Card.Title style={{textAlign: "left"}}>取消任务</Card.Title>
      <Card.Divider/>
      <Text style={{color: "#000"}}>
        请仔细检查，是否需要取消任务
      </Text>
    </RModal>
  )
}
