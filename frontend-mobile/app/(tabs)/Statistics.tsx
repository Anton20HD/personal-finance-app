import { categories } from "@/constants/categoryData";
import { BarChart } from "react-native-gifted-charts";
import { weekLabels, monthLabels, yearLabels } from "@/constants/dataSets";
import { colors } from "@/constants/colors";
import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "@rneui/base";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const Statistics = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [weeklySummary, setWeeklySummary] = useState<number[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<number[]>([]);
  const [yearlySummary, setYearlySummary] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const barData = [
    { value: 230, label: "Mon", labelWidth: 30, spacing: 5, frontColor: colors.positive },{ value: 230, frontColor: colors.negative },
    { value: 230, label: "Tue", labelWidth: 30, spacing: 5, frontColor: colors.positive  },{ value: 230, frontColor: colors.negative  },
    { value: 230, label: "Wed", labelWidth: 30, spacing: 5, frontColor: colors.positive  },{ value: 230, frontColor: colors.negative },
    { value: 230, label: "Thu", labelWidth: 30, spacing: 5, frontColor: colors.positive },{ value: 230, frontColor: colors.negative },
    { value: 230, label: "Fri", labelWidth: 30, spacing: 5, frontColor: colors.positive },{ value: 230, frontColor: colors.negative },
   
  ];


  const getCategoryIcon = (categoryKey: string) => {
    const category = categories.find((cat) => cat.key === categoryKey);
    return category ? category.icon : null; // Return icon if it exists
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/minimal-finance-wallpaper.png")}
        resizeMode="cover"
        className="flex-1"
        imageStyle={{ height: "100%", width: "100%" }}
      >
        <View className="px-5 pt-1 bg-transparent z-10">
          <View className="flex-1 flex-row justify-center content-center">
            <Text
              style={{ fontFamily: "Inter", fontSize: 30, fontWeight: "bold" }}
              className="mt-10 mb-5 text-primaryText"
            >
              Statistics
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 flex-col px-5">
          <View style={{ height: 20 }} />

          <View className="mx-0 my-6 p-5">
            <View className=" flex-col justify-center items-center mt-2">
              {barData.length > 0 ? (
              <BarChart
                showFractionalValues
                showYAxisIndices
                noOfSections={3}
                minHeight={5}
                maxValue={400}
                barWidth={9}
                spacing={[1,2].includes(activeIndex) ? 20 : 16}
                data={barData}
                isAnimated={true}
                animationDuration={1000}
                backgroundColor={colors.primary}
                hideRules
                yAxisLabelPrefix="kr"
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisLabelWidth={[1,2].includes(activeIndex) ? 55 : 52}
                yAxisTextStyle={{ color: colors.primaryText }}
                xAxisLabelTextStyle={{ color: colors.primaryText }}
                roundedTop
              />
              ) : (

                 <View/>
              )}

              {
                isLoading && (
                  <View>
                          <ActivityIndicator color={colors.primaryText}/>
                  </View>
                )
              }


            </View>
            <View className="flex-row justify-center items-center mt-10 gap-3">
              <SegmentedControl
                values={["Weekly", "Monthly", "Yearly"]}
                selectedIndex={activeIndex}
                onChange={(event) => {
                  setActiveIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={{ width: 300 }}
                backgroundColor={colors.primary}
                tintColor={colors.active}
              />
            </View>
          </View>

          <View className="p-4 mt-10">
            <Text
              style={{ fontFamily: "Inter", fontSize: 25, fontWeight: "300" }}
              className="text-primaryText font-light mb-5"
            >
              Transactions:
            </Text>
            <FlatList
              data={transactions}
              scrollEnabled={false}
              keyExtractor={(item: Transaction) => item.id}
              renderItem={({ item }) => (
                <View className="mb-2 bg-card h-14  rounded-xl flex-row items-center shadow-md">
                  <View className="ml-2 flex-shrink-0">
                    <Image
                      source={getCategoryIcon(item.category)}
                      style={{ width: 40, height: 40 }}
                    />
                  </View>
                  <View className="flex-1 ml-3 gap-0 ">
                    <Text
                      style={{ fontFamily: "Inter" }}
                      className="text-primaryText text-lg"
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontFamily: "Inter" }}
                      className="text-disabled  text-base"
                    >
                      {item.category}
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: "Inter" }}
                    className="text-primaryText text-lg text-right pr-10 content-center justify-center"
                  >
                    {item.amount} kr
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Statistics;
