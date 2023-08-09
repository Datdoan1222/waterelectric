import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import HomeScreen from "./screen/HomeScreen";
import WaterPower from "./screen/WaterPower";
import { Colors, stylesTabBar } from "./contant/style";
import ElectricalPower from "./screen/ElectricalPower";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "./screen/MenuScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  function MaterialTopTab() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ElectricalPower" component={ElectricalPower} />
        <Stack.Screen name="WaterPower" component={WaterPower} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "MaterialTopTab") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "MenuScreen") {
              iconName = focused ? "menu-open" : "menu";
              return (
                <MaterialCommunityIcons
                  style={stylesTabBar.icon}
                  name={iconName}
                  size={30}
                  color={Colors.primary100}
                />
              );
            }
            return (
              <Ionicons
                style={stylesTabBar.icon}
                name={iconName}
                size={30}
                color={Colors.primary100}
              />
            );
          },

          headerStyle: { backgroundColor: Colors.background },
          contentStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [
            {
              ...stylesTabBar.tabBar,
              display: "flex",
            },
            null,
          ],
          tabBarLabelStyle: {
            ...stylesTabBar.tabBarLabel,
          },
          tabBarActiveTintColor: Colors.primary500,

          tabBarVisible: false,
        })}
      >
        <Tab.Screen
          name="MaterialTopTab"
          component={MaterialTopTab}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
