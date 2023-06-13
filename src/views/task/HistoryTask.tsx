import React, {useState, ReactElement, useEffect} from "react"
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {getHistoryTask} from "@/api/task/task"
import {useToast} from "react-native-toast-notifications"
import {TaskStatus, TaskStatusText} from "@/views/task/types"
import {storage} from "@/utils"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const Item = ({item, onPress, style}: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={{flexDirection: "row"}}>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 60}]}>
        {item.workbenchName}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 220}]}>
        {item.memberList && item.memberList.map((t: any) => t.name).join("、")}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 100}]}>
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
        style={[styles.title, {width: 100}]}>
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
      style={[styles.title, {width: 60}]}>
      工作台
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 220}]}>
      参与员工
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 100}]}>
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
      style={[styles.title, {width: 100}]}>
      质检数量
    </Text>
  </View>
)

export function HistoryTask(): ReactElement {

  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [listData, setListData] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  const getData = async () => {
    try {
      setLoading(true)
      const {workbenchId} = await storage.load({key: "deviceBindInfo"})
      const {success, errorMessage, data} = await getHistoryTask({workbenchId, page: 1, pageSize: 100})
      if (!success) toast.show(errorMessage || "获取失败", {type: "warning"})
      setListData(data.content)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderItem = ({item}: any) => {

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor: "white"}}
      />
    )
  }

  return (
    <View style={styles.container}>
      <ItemTitle/>
      <SafeAreaView>
        <FlatList
          // ListHeaderComponent={<Item item={{title: "头部"}} style={styles.item}/>}
          // ListFooterComponent={<Item item={{title: "底部"}} style={styles.item}/>}
          refreshing={loading}
          data={listData}
          onRefresh={getData}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.taskId}
          extraData={selectedId}
        />
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

