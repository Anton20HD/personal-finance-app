import { categories } from "@/constants/categoryData";
import { BarChart, barDataItem } from "react-native-gifted-charts";
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
  type: string;
}

interface BarDataItem {
  value: number;
  label: string;
  frontColor: string;
}

const Statistics = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [weeklySummary, setWeeklySummary] = useState<number[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<number[]>([]);
  const [yearlySummary, setYearlySummary] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Call our function to get data from the server
    fetchDataFromServer();
  }, [activeIndex]);

  // This function gets data from our backend
  const fetchDataFromServer = async () => {
    // Show loading spinner
    setIsLoading(true);

    try {
      // Figure out which API endpoint to call based on which view is selected
      let apiUrl = "";

      if (activeIndex === 0) {
        // Weekly view
        apiUrl = `http://localhost:8080/transactions/statistics/weekly`;
      } else if (activeIndex === 1) {
        // Monthly view
        apiUrl = `http://localhost:8080/transactions/statistics/monthly`;
      } else {
        // Yearly view
        apiUrl = `http://localhost:8080/transactions/statistics/yearly`;
      }

      // Call the API and wait for response
      const response = await fetch(apiUrl);
      const summaryData = await response.json();

      const dataArray = Array.isArray(summaryData) ? summaryData : [];

      if (activeIndex === 0) {
        setWeeklySummary(dataArray);
      } else if (activeIndex === 1) {
        setMonthlySummary(dataArray);
      } else {
        setYearlySummary(dataArray);
      }

      // Fetch transactions
      const transactionResponse = await fetch(
        "http://localhost:8080/transactions"
      );
      const data = await transactionResponse.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error when fetching data:", error);
    } finally {
      // Hide loading spinner when done (whether success or error)
      setIsLoading(false);
    }
  };

  const formatSummaryDataToBarData = (summaryData: any[], period: string) => {
    
    if(!Array.isArray(summaryData)) {
      console.error("summaryData is not an array:", summaryData);
      return [];
    }
   
   
   
   
    return summaryData.map(item => {
      if(period === "week") {
        return {
          value: item.income + item.expense,
          label: item.date,
          frontColor: item.type === "income" ? colors.positive : colors.negative,
        };
      } if(period === "month") {
        return {
          value: item.income + item.expense,
          label: item.month,
          frontColor: item.type === "income" ? colors.positive : colors.negative,
        };
      } if(period === "year") {
        return {
          value: item.income + item.expense,
          label: item.month,
          frontColor: item.type === "income" ? colors.positive : colors.negative,
        };
      }
      return {
        value: 0,
        label: "",
        frontColor: colors.negative
      };
    })
  }

  const barData = formatSummaryDataToBarData(
    // om activeindex är 0 används weeklysummary
    //om activeindex är 1 använda monthlysummary
    //om ingen av de ovanstående är sanna så används yearly
    activeIndex === 0 ? weeklySummary : (activeIndex === 1 ? monthlySummary : yearlySummary),
    // Bestämmer vilken period som ska användas. Om inte indexet är 0 eller 1 så sätts perioden till year
    activeIndex === 0 ? "week" : (activeIndex === 1 ? "month" : "year")
  );

  const getCategoryIcon = (categoryKey: string) => {
    const category = categories.find((cat) => cat.key === categoryKey);
    return category ? category.icon : null; // Return icon if it exists
  };


  // const getMaxValue = (data: BarDataItem[]): number => {
  //   return Math.max(...data.map(item => item.value));
  // };

  // const maxValue = getMaxValue(barData);

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
                  spacing={[1, 2].includes(activeIndex) ? 20 : 16}
                  data={barData}
                  isAnimated={true}
                  animationDuration={1000}
                  backgroundColor={colors.primary}
                  hideRules
                  yAxisLabelPrefix="kr"
                  yAxisThickness={0}
                  xAxisThickness={0}
                  yAxisLabelWidth={[1, 2].includes(activeIndex) ? 55 : 52}
                  yAxisTextStyle={{ color: colors.primaryText }}
                  xAxisLabelTextStyle={{ color: colors.primaryText }}
                  roundedTop
                />
              ) : (
                <View />
              )}

              {isLoading && (
                <View>
                  <ActivityIndicator color={colors.primaryText} />
                </View>
              )}
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
