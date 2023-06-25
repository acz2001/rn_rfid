import React, {ReactElement, useEffect, useRef, useState} from "react"
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native"
import {Button, Card, CheckBox, Input, Text} from "@rneui/base"
import {LoginErrorMessage, LoginParams} from "./types"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {useToast} from "react-native-toast-notifications"
import {emsLogin} from "@/api/login"
import {DrawerLockModeState, setStorageToken, setStorageUserInfo, UserInfoState} from "@/global"
import {TOAST_DURATION} from "@/global/constants"
import {ScreenNavigationProps} from "@/route"
import {useRecoilState, useSetRecoilState} from "recoil"

export function LoginForm({navigation}: ScreenNavigationProps): ReactElement {
  const Toast = useToast()
  const setUserInfo = useSetRecoilState(UserInfoState)
  const setDrawerLockMode = useSetRecoilState(DrawerLockModeState)
  const [{username, password, rememberUser}, setFormData] = useState<LoginParams>({
    username: "13169363736",
    password: "363736",
    rememberUser: false,
  })
  const [{usernameError, passwordError}, setErrorMessage] = useState<LoginErrorMessage>({
    usernameError: "",
    passwordError: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const scrollViewRef = useRef(null)

  const setError = (err: LoginErrorMessage) => {
    setErrorMessage((val: LoginErrorMessage): LoginErrorMessage => ({
      ...val,
      ...err,
    }))
  }

  useEffect(() => {
    if (!username) {
      setError({usernameError: "请输入用户名"})
    } else {
      setError({usernameError: ""})
    }
    if (!password) {
      setError({passwordError: "请输入密码"})
    } else {
      setError({passwordError: ""})
    }
  }, [username, password])

  useEffect(() => {
    setDrawerLockMode("locked-closed")
  }, [])

  const onLogin = async () => {
    setLoading(true)
    try {
      const {success, data} = await emsLogin({
        username,
        password,
      })
      if (!success) {
        Toast.show("登录失败", {duration: TOAST_DURATION})
        return
      }
      setStorageUserInfo(JSON.stringify(data))
      setStorageToken(data.userToken)
      setUserInfo(data)
      Toast.show("登录成功", {duration: TOAST_DURATION})
      navigation.replace("Home")
    } catch (e) {
      Toast.show((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={20}>
      <ScrollView
        ref={scrollViewRef}
        style={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Card containerStyle={styles.containerStyle}>
            <Text h4>登录</Text>
            <Card.Divider/>
            <Input
              // disabledInputStyle={{background: "#ddd"}}
              // inputContainerStyle={{}}
              errorMessage={usernameError}
              // errorStyle={{}}
              // errorProps={{}}
              // inputStyle={{}}
              label="用户名"
              // labelStyle={{}}
              // labelProps={{}}
              leftIcon={<Icon name="account-outline" size={20}/>}
              leftIconContainerStyle={{}}
              // rightIcon={<Icon name="close" size={20}/>}
              // rightIconContainerStyle={{}}
              value={username}
              onChangeText={(v: string) => setFormData(val => ({
                ...val,
                username: v,
              }))}
              placeholder="请输入用户名或手机号"
            />
            <Input
              // containerStyle={{}}
              secureTextEntry
              // disabledInputStyle={{background: "#ddd"}}
              // inputContainerStyle={{}}
              errorMessage={passwordError}
              // errorStyle={{}}
              // errorProps={{}}
              // inputStyle={{}}
              label="密码"
              // labelStyle={{}}
              // labelProps={{}}
              leftIcon={<Icon name="lock" size={20}/>}
              leftIconContainerStyle={{}}
              // rightIcon={<Icon name="close" size={20}/>}
              // rightIconContainerStyle={{}}
              value={password}
              onChangeText={(v: string) => setFormData(val => ({
                ...val,
                password: v,
              }))}
              placeholder="请输入密码"
            />
            {/*<View style={{alignItems: "flex-start"}}>*/}
            {/*  <CheckBox*/}
            {/*    center*/}
            {/*    title="记住账号"*/}
            {/*    checked={rememberUser as boolean}*/}
            {/*    onPress={() => setFormData((val: LoginParams): LoginParams => ({*/}
            {/*      ...val,*/}
            {/*      rememberUser: !rememberUser,*/}
            {/*    }))}*/}
            {/*  />*/}
            {/*</View>*/}
            <Button
              type="solid"
              title="登录"
              onPress={onLogin}
              loading={loading}
              disabled={!!usernameError || !!passwordError}
            />
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
  },
  containerStyle: {
    width: 400,
    marginTop: 40,
    borderRadius: 10,
  },
})
