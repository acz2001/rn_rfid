import React, {ReactElement} from "react"
import {StyleSheet, ScrollView} from "react-native"
import {Menu} from "@/views/home/Menu"
import {ScreenNavigationProps} from "@/route"
import SignOutModal from "@/views/login/SignOutModal"

export function Home(props: ScreenNavigationProps): ReactElement {

  return (<ScrollView style={styles.container}>
    <Menu {...props} />
    <SignOutModal {...props} />
  </ScrollView>)
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
})
