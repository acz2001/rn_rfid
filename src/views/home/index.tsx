import React, {ReactElement} from "react"
import {StyleSheet, ScrollView} from "react-native"
import {Menu} from "@/views/home/Menu"

export function Home(): ReactElement {

  return (<ScrollView style={styles.container}>
    <Menu/>
  </ScrollView>)
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
})
