import { View, Text } from "react-native";
import React from "react";

const TotalBalanceBorderBox = () => {
  return (
    <View className="mx-0 my-6 p-5 bg-white rounded-xl shadow-lg border border-gray-100 h-52">
      <View className="flex-row justify-between items-center mb-4">
        <Text>Total Balance:</Text>
      </View>

      <View className="h-px bg-gray-100 my-3" />

      <View className="flex-row justify-between mt-2">
        <View className="items-start">
          <Text>Income:</Text>
        </View>
        <View className="items-end">
          <Text>Expense:</Text>
        </View>
      </View>
    </View>
  );
};

export default TotalBalanceBorderBox;
