import {
  DrawerLayoutAndroid,
  DrawerLayoutAndroidProps,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native"
import React, {createRef, ReactElement, ReactNode, useImperativeHandle, useRef, useState} from "react"
import {useRecoilState, useSetRecoilState} from "recoil"
import {DrawerLockModeState, SignOutModalVisibleState, UserInfoState} from "@/global/state"
import {useNavigation} from "@react-navigation/native"
import {ListItem} from "@rneui/base"

export interface DrawerLayoutFnProps extends Omit<DrawerLayoutAndroidProps, "renderNavigationView"> {
  children: ReactNode;
}

export type DrawerRefReturnObject = {
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerWidth: (v: number) => void;
  setDrawerPosition: (v: "left" | "right") => void;
}

export const DrawerFn: React.RefObject<DrawerRefReturnObject> = createRef()

export default function Drawer(
  {
    children,
    ...props
  }: DrawerLayoutFnProps,
): ReactElement {

  const setSignOutModalVisible = useSetRecoilState(SignOutModalVisibleState)
  const drawerRef = useRef<DrawerLayoutAndroid | null>(null)
  const {navigate} = useNavigation()
  const [drawerWidth, setWidth] = useState<number>(300)
  const [drawerPosition, setPosition] = useState<"left" | "right">("right")
  const [drawerLockMode] = useRecoilState(DrawerLockModeState)
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState)

  const openDrawer = () => {
    drawerRef?.current?.openDrawer()
  }

  const closeDrawer = () => {
    drawerRef?.current?.closeDrawer()
  }

  const setDrawerWidth = (value: number) => setWidth(value)
  const setDrawerPosition = (value: "left" | "right") => setPosition(value)

  useImperativeHandle(DrawerFn, (): DrawerRefReturnObject => ({
    openDrawer,
    closeDrawer,
    setDrawerWidth,
    setDrawerPosition,
  }), [])

  const navigationView = (): ReactElement => {
    const {workerProfile} = userInfo || {}
    return (
      <View style={{flex: 1}}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Subtitle>用户：{workerProfile?.name}</ListItem.Subtitle>
            <ListItem.Subtitle>工号：{workerProfile?.workNumber}</ListItem.Subtitle>
            <ListItem.Subtitle>手机号：{workerProfile?.mobile}</ListItem.Subtitle>
            <ListItem.Subtitle>组织：{workerProfile?.organizationName}</ListItem.Subtitle>
            <ListItem.Subtitle>部门：{workerProfile?.departmentName}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem
          bottomDivider
          Component={TouchableHighlight}
          onPress={() => {
            drawerRef?.current?.closeDrawer()
            navigate("settings" as never)
          }}
        >
          <ListItem.Content>
            <ListItem.Subtitle>系统设置</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron/>
        </ListItem>
        <ListItem
          bottomDivider
          Component={TouchableHighlight}
          onPress={() => {
            drawerRef?.current?.closeDrawer()
            setSignOutModalVisible(true)
          }}
        >
          <ListItem.Content>
            <ListItem.Subtitle>退出登录</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron/>
        </ListItem>
      </View>
    )
  }

  return (<DrawerLayoutAndroid
    {...props}
    drawerWidth={drawerWidth}
    drawerLockMode={drawerLockMode}
    drawerPosition={drawerPosition}
    ref={(ref: DrawerLayoutAndroid | null) => drawerRef.current = ref}
    renderNavigationView={navigationView}
  >
    {children}
  </DrawerLayoutAndroid>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    padding: 8,
  },
  settingItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#ccc",
  },
})
