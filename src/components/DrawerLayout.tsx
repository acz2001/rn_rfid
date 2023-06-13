import {DrawerLayoutAndroid, DrawerLayoutAndroidProps, StyleSheet, Text, View} from "react-native"
import React, {Component, createRef, ReactElement, ReactNode, useImperativeHandle, useState} from "react"

export interface DrawerLayoutFnProps extends Omit<DrawerLayoutAndroidProps, "renderNavigationView"> {
  children: ReactNode;
}

export type DrawerRefReturnObject = {
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerWidth?: (v: number) => void;
  setDrawerPosition?: (v: "left" | "right") => void;
}

export const DrawerFn: React.RefObject<DrawerRefReturnObject> = createRef()

export default function DrawerLayout(
  {
    children,
    ...props
  }: DrawerLayoutFnProps,
): ReactElement {

  let drawerRef: DrawerLayoutAndroid | null = null
  const [drawerWidth, setWidth] = useState<number>(300)
  const [drawerPosition, setPosition] = useState<"left" | "right">("left")

  const openDrawer = () => {
    drawerRef?.openDrawer()
  }

  const closeDrawer = () => {
    drawerRef?.closeDrawer()
  }

  const setDrawerWidth = (value: number) => setWidth(value)
  const setDrawerPosition = (value: "left" | "right") => setPosition(value)

  useImperativeHandle(DrawerFn, (): DrawerRefReturnObject => ({
    openDrawer,
    closeDrawer,
    setDrawerWidth,
    setDrawerPosition,
  }), [])

  const navigationView = (
    <View style={{
      flex: 1,
      paddingTop: 50,
      backgroundColor: "#fff",
      padding: 8,
    }}>
      <Text style={{margin: 10, fontSize: 15}}>I'm in the Drawer!</Text>
    </View>
  )

  return <DrawerLayoutAndroid
    {...props}
    drawerWidth={drawerWidth}
    drawerPosition={drawerPosition}
    ref={(ref: DrawerLayoutAndroid | null) => (drawerRef = ref)}
    renderNavigationView={() => navigationView}
  >
    {children}
  </DrawerLayoutAndroid>
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
})
