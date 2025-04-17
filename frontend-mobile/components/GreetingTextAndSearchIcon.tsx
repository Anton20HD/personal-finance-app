import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors';
import SearchIcon from "@expo/vector-icons/FontAwesome5";
import { Button } from "@rneui/themed";

const GreetingTextAndSearchIcon = () => {
  return (
    <View className="flex-1 flex-row-reverse justify-between content-center">
        <Button
          className="w-12 ml-auto mt-10 flex-1 p-1 h-8 "
          radius={"50"}
          type="solid"
          color={colors.secondary}
        >
          <SearchIcon name="search" size={18} color={colors.primaryText} />
        </Button>
        <Text
          style={{ fontFamily: "Inter", fontSize: 30, fontWeight: "bold" }}
          className="mt-10 mb-5 text-primaryText"
        >
          <Text
            style={{ fontFamily: "Inter", fontSize: 20, fontWeight: "300" }}
            className="text-secondaryText"
          >
            Hello,
          </Text>
          {"\n"}User
        </Text>
      </View>
  )
}

export default GreetingTextAndSearchIcon