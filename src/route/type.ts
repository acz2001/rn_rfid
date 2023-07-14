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
import {NavigationAction, NavigationState, PartialState} from "@react-navigation/routers"

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

export type NavigationOptionProps = {
  addListener: (
    type: "focus" | "blur" | "state" | "tabPress" | "beforeRemove",
    callback: EventListenerCallback<EventMapBase, keyof EventMapBase>,
  ) => void;
  canGoBack: () => boolean;
  dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)) => void;
  getId: (param?: any) => string;
  getParent: (id?: string) => NavigationProp<ParamListBase>;
  getState: any;
  goBack: () => void;
  isFocused: () => boolean;
  navigate: (name: keyof ParamListBase, param?: object) => void;
  pop: (count?: number) => void;
  popToTop: () => void;
  push: (name: keyof ParamListBase, param?: object) => void;
  removeListener: (
    type: "focus" | "blur" | "state" | "tabPress" | "beforeRemove",
    callback: EventListenerCallback<EventMapBase, keyof EventMapBase>,
  ) => void;
  replace: (name: keyof ParamListBase, param?: object) => void;
  // reset: (option: { index: number, routes: Array<{ name: keyof ParamListBase }> }) => void;
  reset: (state: PartialState<NavigationState> | NavigationState) => void;
  setOptions: (option: NativeStackNavigationOptions) => void;
  setParams: (param?: object) => void;
}

export type ScreenNavigationProps = {
  route: RouteProp<ParamListBase, keyof ParamListBase>;
  navigation: NavigationOptionProps;
}
