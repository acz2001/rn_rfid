import {ScreensType} from "@/route/type"
import {LoginForm} from "@/views/login"
import {Home} from "@/views/home"
import {Button, Text} from "@rneui/base"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, {Component, ReactElement, ReactNode, useCallback, useRef, useState} from "react"
import {SystemSetting} from "@/views/settings"
import {TouchableOpacity, View} from "react-native"
import {useRecoilState} from "recoil"
import {TaskStatus, QcTask, Qc, HistoryTask, TaskStatusText} from "@/views/task"
import {QcTaskInfo} from "@/global/state"
import {HeaderBackButtonProps} from "@react-navigation/native-stack/lib/typescript/src/types"
import {DrawerFn} from "@/components/DrawerLayout"


export function QcTitle(): ReactElement {

  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)

  return (<View>
    <Text style={{fontSize: 18}}>{`${qcTask?.workbenchName}(${TaskStatusText[qcTask?.taskState as TaskStatus]})`}</Text>
  </View>)
}

function HomeLeftTitle() {

  const openDrawer = useCallback(() => {
    DrawerFn.current?.openDrawer()
  }, [DrawerFn])

  return (<TouchableOpacity onPress={openDrawer}>
    <FontAwesome name="navicon" size={26}/>
  </TouchableOpacity>)
}


export const StacksList: ScreensType = [
  {
    name: "Login",
    component: LoginForm,
    options: {headerShown: false},
    navigationKey: "Login",
  },
  {
    name: "Home",
    component: Home,
    options: {
      headerBackVisible: true,
      headerLeft: (props: HeaderBackButtonProps) => <HomeLeftTitle/>,
      headerTitle: () => <Text>质检系统</Text>,
      // headerRight: () => <Text>我是右</Text>,
      headerTitleAlign: "center",
    },
    navigationKey: "Home",
  },
  {
    name: "settings",
    component: SystemSetting,
    options: {
      headerTitle: () => <Text>系统设置</Text>,
      headerTitleAlign: "center",
    },
    navigationKey: "settings",
  },
  {
    name: "Qc",
    component: Qc,
    options: {
      headerTitle: () => <QcTitle/>,
      headerTitleAlign: "center",
      headerRight: () => null,
    },
    navigationKey: "Qc",
  },
  {
    name: "QcTask",
    component: QcTask,
    options: {
      headerTitle: () => <Text>质检任务</Text>,
      headerTitleAlign: "center",
    },
    navigationKey: "QcTask",
  },
  {
    name: "History",
    component: HistoryTask,
    options: {
      headerTitle: () => <Text>历史任务</Text>,
      headerTitleAlign: "center",
    },
    navigationKey: "History",
  },
]
