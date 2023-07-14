import React, {ReactElement, useEffect, useState} from "react"
import {QueryHistoryTaskItem} from "@/views/task/state"
import {useRecoilState} from "recoil"
import {getQcTaskInfo} from "@/api/task/task"
import {ActivityIndicator, ScrollView, View} from "react-native"
import {ListItem, Text} from "@rneui/base"
import {QcWorkText, QcWorkType, TaskStatus, TaskStatusText} from "@/views/task/types"


const LoadingPage = () => (
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size={48}/>
  </View>
)

export default function HistoryTaskDetail(): ReactElement {

  const [item] = useRecoilState(QueryHistoryTaskItem)
  const [isEffect, setIsEffect] = useState<boolean>(true)
  const [taskInfo, setTaskInfo] = useState<any>()

  const getData = async () => {
    try {
      const {taskId} = item || {}
      const {data: info} = await getQcTaskInfo({taskId, calculateQty: true})
      setTaskInfo(info)
    } catch (e) {
      console.error(e)
    } finally {
      setIsEffect(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (isEffect) return <LoadingPage/>

  return (
    <View style={{flex: 1, padding: 8, flexDirection: "row"}}>
      <View style={{width: "50%"}}>
        <Text style={{fontSize: 18}}>工作台名称：{taskInfo?.workbenchName || "暂无"}</Text>
        <Text style={{fontSize: 18}}>任务状态：{TaskStatusText[taskInfo?.taskState as TaskStatus] || ""}</Text>
        <Text style={{fontSize: 18}}>EPC总量：{taskInfo?.epcCount || "暂无"}</Text>
        <Text style={{fontSize: 18}}>创建时间：{taskInfo?.createTime || "暂无"}</Text>
        <Text style={{fontSize: 18}}>任务开始时间：{taskInfo?.startTime || "暂无"}</Text>
        <Text style={{fontSize: 18}}>任务结束时间：{taskInfo?.endTime || "暂无"}</Text>
        <Text style={{fontSize: 18}}>审核时间：{taskInfo?.auditTime || "暂无"}</Text>
      </View>
      <View style={{width: "50%"}}>
        <ScrollView style={{flex: 1}}>
          {taskInfo && taskInfo.memberList.map((item: any) => (
            <ListItem
              key={item.workerId}
              bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.name}({QcWorkText[item.workType as QcWorkType]})</ListItem.Title>
                <ListItem.Subtitle>完成数量：{item?.qcQty}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
