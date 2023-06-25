import React from "react"
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types"
import {NativeStackNavigationEventMap, NativeStackNavigationOptions} from "@react-navigation/native-stack"
import {
  DefaultNavigatorOptions, EventMapBase, NavigationProp,
  ParamListBase,
  RouteConfig,
  StackNavigationState,
  TabNavigationState, TabRouterOptions,
  TypedNavigator,
} from "@react-navigation/native"
import {BottomTabNavigationEventMap, BottomTabNavigationOptions} from "@react-navigation/bottom-tabs"
import {BottomTabNavigationConfig} from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import {RouteProp} from "@react-navigation/core/lib/typescript/src/types"
import {EventListenerCallback} from "@react-navigation/core/src/types"

export type StackType = TypedNavigator<ParamListBase,
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  (_: NativeStackNavigatorProps) => React.ReactElement>

export type ScreenItemType = RouteConfig<ParamListBase,
  keyof ParamListBase,
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap>

export type ScreensType = Array<ScreenItemType>

export type BottomTabProps =
  DefaultNavigatorOptions<ParamListBase,
    TabNavigationState<ParamListBase>,
    BottomTabNavigationOptions,
    BottomTabNavigationEventMap>
  & TabRouterOptions
  & BottomTabNavigationConfig;

export type BottomTabType = TypedNavigator<ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap,
  (_: BottomTabProps) => React.ReactElement>

export type ScreenBottomTabItemType = RouteConfig<ParamListBase,
  keyof ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap>

export type ScreenBottomTabsType = Array<ScreenBottomTabItemType>

export type ScreenNavigationProps = {
  route: RouteProp<ParamListBase, keyof ParamListBase>;
  navigation: {
    addListener: (
      type: keyof EventMapBase | string,
      callback: EventListenerCallback<EventMapBase, keyof EventMapBase>,
    ) => void;
    canGoBack: any;
    dispatch: any;
    getId: any;
    getParent: (id?: string) => NavigationProp<ParamListBase>;
    getState: any;
    goBack: () => void;
    isFocused: any;
    navigate: (...args: any) => void;
    pop: any;
    popToTop: any;
    push: any;
    removeListener: any;
    replace: (name: keyof ParamListBase) => void;
    reset: any;
    setOptions: (option: NativeStackNavigationOptions) => void;
    setParams: (params?: any) => void;
  };
}
