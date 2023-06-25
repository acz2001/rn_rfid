import React, {ReactElement, useEffect, useState} from "react"
import {useRecoilState} from "recoil"
import {QcTaskInfo} from "@/global/state"
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {EpcResult, EpcResultText} from "@/views/task/types"
import {useToast} from "react-native-toast-notifications"
import {getCurrentTaskRecord} from "@/api/task/task"
import {TOAST_DURATION} from "@/global/constants"
const Item = ({item, onPress, style}: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={{flexDirection: "row"}}>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 300}]}>
        {item.epc}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 100}]}>
        {item.workerName}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 100}]}>
        {item.workTypeName}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 160}]}>
        {item.createTime}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.title, {width: 160}]}>
        {EpcResultText[item.epcResult as EpcResult]}
      </Text>
    </View>
  </TouchableOpacity>
)

const ItemTitle = () => (
  <View style={[styles.itemTitle, {backgroundColor: "white"}]}>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 300}]}>
      EPC
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 100}]}>
      质检员工
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 100}]}>
      质检工种
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 160}]}>
      质检时间
    </Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[styles.title, {width: 160}]}>
      质检结果
    </Text>
  </View>
)

export default function QcRecord(): ReactElement {

  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)
  const toast = useToast()
  const [isEffect, setIsEffect] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [listData, setListData] = useState([])

  const [workerSelectedIndex, setWorkerSelectedIndex] = useState<any>()
  const [workerSelectedItem, setWorkerSelectedItem] = useState<any>()

  const getData = async () => {
    try {
      const {success, errorMessage, data} = await getCurrentTaskRecord({
        taskId: qcTask.taskId,
        page: 1,
        pageSize: 100,
      })
      if (!success) {
        toast.show(errorMessage || "获取记录失败", {duration: TOAST_DURATION})
        return
      }
      setIsEffect(false)
      setLoading(false)
      setListData(data.content || [])
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderItem = ({item}: any) => (<Item
    item={item}
    style={{backgroundColor: "white"}}
  />)

  return (
    <View style={styles.container}>
      {/*<View style={styles.searchBar}>*/}
      {/*  <View style={{width: "50%"}}>*/}
      {/*    <ScrollView horizontal>*/}
      {/*      <ButtonGroup*/}
      {/*        buttons={qcTask?.memberList.map((item: any) => ({*/}
      {/*          element: () => <Text style={{padding: 8}}>{item.name}</Text>,*/}
      {/*        }))}*/}
      {/*        selectedIndex={workerSelectedIndex}*/}
      {/*        onPress={(v: number) => {*/}
      {/*          setWorkerSelectedIndex(v)*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </ScrollView>*/}
      {/*  </View>*/}
      {/*  <View style={{width: "44%", margin: 2, flexDirection: "row", alignItems: "center"}}>*/}
      {/*    <Text>工种：</Text>*/}
      {/*    <ScrollView horizontal>*/}
      {/*      <ButtonGroup*/}
      {/*        buttons={workType.map((item: any) => ({*/}
      {/*          element: () => <Text style={{padding: 8}}>{item.name}</Text>,*/}
      {/*        }))}*/}
      {/*        selectedIndex={workerSelectedIndex}*/}
      {/*        onPress={(v: number) => {*/}
      {/*          setWorkerSelectedIndex(v)*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </ScrollView>*/}
      {/*  </View>*/}
      {/*  <View style={{width: "44%", backgroundColor: "red", margin: 2}}>*/}
      {/*    <Text>3333</Text>*/}
      {/*  </View>*/}
      {/*</View>*/}
      <ItemTitle/>
      <SafeAreaView>
        {isEffect ?
          <ActivityIndicator size="large"/> :
          <FlatList
            refreshing={loading}
            data={listData}
            onRefresh={getData}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
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
    // marginVertical: 4,
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
  searchBar: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
