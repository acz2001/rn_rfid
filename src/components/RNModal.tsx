import React, {forwardRef, ReactNode, useImperativeHandle, useRef, useState} from "react"
import {
  ActivityIndicator,
  GestureResponderEvent,
  Modal,
  ModalProps,
  StyleProp,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import Toast from "react-native-toast-notifications"
import ToastContainer from "react-native-toast-notifications"
import {Button, ButtonProps} from "@rneui/base"

export interface RNModalProps extends ModalProps {
  maskStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
  cancelButtonText?: string;
  okButtonText?: string;
  onMask?: (event: GestureResponderEvent) => void;
  onCancel?: (event: GestureResponderEvent) => void;
  onOk?: (event: GestureResponderEvent) => void;
  footer?: ReactNode | null
  hasCancel?: boolean;
  clickMaskClose?: boolean;
}

const RNModal = forwardRef((
  {
    onMask,
    onCancel,
    onOk,
    children,
    animationType = "fade",
    transparent = true,
    maskStyle,
    modalStyle,
    cancelButtonProps,
    confirmButtonProps,
    okButtonText = "确认",
    cancelButtonText = "取消",
    hasCancel = true,
    clickMaskClose = true,
    footer,
    ...props
  }: RNModalProps,
  ref,
): React.ReactElement => {

  const toastRef = useRef<ToastContainer | null>(null)

  const modalToast = () => toastRef.current

  useImperativeHandle(ref, () => ({
    modalToast,
  }), [])


  return (
    <Modal
      {...props}
      animationType={animationType}
      transparent={transparent}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={clickMaskClose ? onMask : undefined}
        style={[styles.modalMask, maskStyle]}>
        <View style={[styles.modalView, modalStyle]}>
          {children}
          {footer}
          {(!footer && footer !== null) && <View style={[styles.footerView]}>
            {hasCancel && <View style={styles.footerButton}>
              <Button
                {...cancelButtonProps}
                titleStyle={{color: "#2e3238"}}
                buttonStyle={{backgroundColor: "#e6e8ea"}}
                onPress={onCancel}
                title={cancelButtonText}
              />
            </View>}
            <View style={styles.footerButton}>
              <Button
                {...confirmButtonProps}
                onPress={onOk}
                title={okButtonText}
              />
            </View>
          </View>}
        </View>
        <Toast ref={toastRef}/>
      </TouchableOpacity>
    </Modal>
  )
})

const styles = StyleSheet.create({
  modalMask: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(65, 70, 76,.4)",
  },
  modalView: {
    width: 420,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerButton: {
    width: 70,
    marginHorizontal: 6,
  },
})

export default RNModal
