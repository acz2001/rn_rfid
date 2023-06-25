import React, {forwardRef, ReactNode, useImperativeHandle, useRef} from "react"
import {
  GestureResponderEvent, KeyboardAvoidingView,
  Modal,
  ModalProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import Toast from "react-native-toast-notifications"
import ToastContainer from "react-native-toast-notifications"
import {Button, ButtonProps} from "@rneui/base"
import {ToastOptions} from "react-native-toast-notifications/lib/typescript/toast"

export interface RModalProps extends ModalProps {
  maskStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onMask?: (event: GestureResponderEvent) => void;
  onCancel?: (event: GestureResponderEvent) => void;
  onConfirm?: (event: GestureResponderEvent) => void;
  footer?: ReactNode | null;
  hasCancel?: boolean;
  clickMaskClose?: boolean;
}

export type ModalToastRef = {
  toastMessage: (m: string, opt?: ToastOptions) => void;
}

const RModal: React.ForwardRefExoticComponent<
  RModalProps &
  React.RefAttributes<ModalToastRef>
> = forwardRef((
  {
    onMask,
    onCancel,
    onConfirm,
    children,
    animationType,
    transparent,
    maskStyle,
    modalStyle,
    cancelButtonProps,
    confirmButtonProps,
    confirmButtonText,
    cancelButtonText,
    hasCancel,
    clickMaskClose,
    footer,
    ...props
  }: RModalProps,
  ref: React.ForwardedRef<ModalToastRef>,
): React.ReactElement => {

  const toastRef: React.MutableRefObject<Toast | null> = useRef<ToastContainer | null>(null)

  const toastMessage = (message: string, option?: ToastOptions) => toastRef.current?.show(message, option)

  const handleToastOnPress = (id: string) => toastRef?.current?.hide(id)

  useImperativeHandle(ref, (): ModalToastRef => ({
    toastMessage,
  }), [])


  return (
    <Modal
      {...props}
      animationType={animationType}
      transparent={transparent}
    >
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={20}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={clickMaskClose ? onMask : undefined}
          style={[styles.modalMask, maskStyle]}>
          <TouchableOpacity activeOpacity={1} style={[styles.modalView, modalStyle]}>
            {children}
            {footer}
            {(!footer && footer !== null) &&
              <View style={[styles.footerView]}>
                {hasCancel &&
                  <View style={styles.footerButton}>
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
                    onPress={onConfirm}
                    title={confirmButtonText}
                  />
                </View>
              </View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <Toast ref={toastRef} onPress={handleToastOnPress}/>
      </KeyboardAvoidingView>
    </Modal>
  )
})

const styles = StyleSheet.create({
  modalMask: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(65, 70, 76,.4)",
    zIndex: -1,
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
    zIndex: 3,
  },
  footerView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerButton: {
    width: 70,
    marginHorizontal: 6,
    marginTop: 12,
  },
})

RModal.defaultProps = {
  hasCancel: true,
  clickMaskClose: true,
  animationType: "fade",
  transparent: true,
  confirmButtonText: "确认",
  cancelButtonText: "取消",
}

export default RModal
