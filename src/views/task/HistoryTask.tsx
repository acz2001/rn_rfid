import React, {useState, ReactElement, useEffect} from "react"
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {getHistoryTask} from "@/api/task/task"
import {useToast} from "react-native-toast-notifications"
import {TaskStatus, TaskStatusText} from "@/views/task"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {useRecoilState, useSetRecoilState} from "recoil"
import {WorkbenchBindInfo} from "@/global"
import {QueryHistoryTaskItem} from "@/views/task/state"
import {ScreenNavigationProps} from "@/route"

const Item = ({item, onPress, style}: any) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    style={[styles.item, style]}>
    <View style={{flexDirection: "row"}}>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 400}]}>
        {item.memberList && item.memberList.map((t: any) => t.name).join("、")}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 60}]}>
        {TaskStatusText[item.taskState as TaskStatus]}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 160}]}>
        {item.startTime}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 160}]}>
        {item.endTime}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 60}]}>
        {item.epcCount}
      </Text>
    </View>
    <FontAwesome name="chevron-right" size={18}/>
  </TouchableOpacity>
)

const ItemTitle = () => (
  <View style={[styles.itemTitle, {backgroundColor: "white"}]}>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 400}]}>
      参与员工
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 60}]}>
      状态
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 160}]}>
      开始时间
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 160}]}>
      结束时间
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 70}]}>
      质检数量
    </Text>
  </View>
)

export function HistoryTask({navigation, ...props}: ScreenNavigationProps): ReactElement {

  const toast = useToast()
  const [isEffect, setIsEffect] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [listData, setListData] = useState([])
  const setSelectedItem = useSetRecoilState(QueryHistoryTaskItem)
  const [bindInfo] = useRecoilState(WorkbenchBindInfo)

  const getData = async () => {
    try {
      setLoading(true)
      const {workbenchId} = bindInfo || {}
      const {success, errorMessage, data} = await getHistoryTask({workbenchId, page: 1, pageSize: 100})
      if (!success) toast.show(errorMessage || "获取历史任务失败", {type: "warning"})
      setListData(data.content || [])
      setLoading(false)
      setIsEffect(false)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderItem = ({item}: any) => (
    <Item
      item={item}
      onPress={() => {
        setSelectedItem(item)
        navigation.navigate("HistoryTaskDetail")
      }}
      style={{backgroundColor: "white"}}
    />
  )

  return (
    <View style={styles.container}>
      <ItemTitle/>
      <SafeAreaView>
        {isEffect ?
          <ActivityIndicator size="large"/> :
          <FlatList
            refreshing={loading}
            data={listData}
            onRefresh={getData}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.taskId}
          />}

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  itemTitle: {
    padding: 10,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  item: {
    padding: 10,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    // backgroundColor: "red",
    marginHorizontal: 8,
    fontSize: 16,
    color: "#000",
  },
})

