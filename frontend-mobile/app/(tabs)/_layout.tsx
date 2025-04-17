import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../../constants/colors";

// const TabIcon = () => {
//         return(

//         )

// }

const _Layout = () => {
  return (
    //Gömmer den specifika sidan som du är inne på
    <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: '#0B1525',
                height: 60,
                padding:10,
            }

    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Entypo
                name="home"
                color={focused ? colors.active : colors.disabled}
                size={30}
              />
            </>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Statistics"
        options={{
          title: "Statistics",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Entypo
                name="bar-graph"
                color={focused ? colors.active : colors.disabled}
                size={30}
              />
            </>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="TotalBalance"
        options={{
          title: "Wallet",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Entypo
                name="wallet"
                color={focused ? colors.active : colors.disabled}
                size={30}
              />
            </>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <MaterialCommunityIcons
                name="account"
                color={focused ? colors.active : colors.disabled}
                size={30}
              />
            </>
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default _Layout;
