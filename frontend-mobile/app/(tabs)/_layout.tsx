import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const _Layout = () => {
  return (
    //Gömmer den specifika sidan som du är inne på
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Statistics"
        options={{ title: "Statistics", headerShown: false }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="TotalBalance"
        options={{ title: "Wallet", headerShown: false }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        options={{ title: "Profile", headerShown: false }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default _Layout;
