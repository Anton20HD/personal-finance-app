import { categories } from "@/constants/categoryData";
import { BarChart } from "react-native-gifted-charts";
import { weekLabels, monthLabels, yearLabels } from "@/constants/dataSets";
import { colors } from "@/constants/colors";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [isLoading, setIsLoading] = useState(true);

  const barData = [
    {value: 230,label: 'Jan',frontColor: '#4ABFF4'},
    {value: 180,label: 'Feb',frontColor: '#79C3DB'},
    {value: 195,label: 'Mar',frontColor: '#28B2B3'},
    {value: 250,label: 'Apr',frontColor: '#4ADDBA'},
    {value: 320,label: 'May',frontColor: '#91E3E3'},
    ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Hämta alla data parallellt för bättre prestanda
        const [transactionsRes, weeklyRes, monthlyRes, yearlyRes] =
          await Promise.all([
            fetch("http://localhost:8080/transactions"),
            fetch("http://localhost:8080/transactions/weekly-summary/2025/2"),
            fetch("http://localhost:8080/transactions/monthly-summary/2025/1"),
            fetch("http://localhost:8080/transactions/yearly-summary/2025"),
          ]);
        const transactionsData = await transactionsRes.json();
        const weeklyData = await weeklyRes.json();
        const monthlyData = await monthlyRes.json();
        const yearlyData = await yearlyRes.json();

        setTransactions(transactionsData);
        setWeeklySummary(weeklyData);
        setMonthlySummary(monthlyData);
        setYearlySummary(yearlyData);
      } catch (error) {
        console.error("Error when fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <View className="flex-row justify-between items-center mb-4">
            <View>
            <BarChart
            showFractionalValues
            showYAxisIndices
            noOfSections={4}
            maxValue={400}
            data={barData}
            isAnimated
            backgroundColor={colors.primary}
            />
        </View>
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
