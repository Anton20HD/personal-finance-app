import { Link } from "expo-router";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import SearchIcon from "@expo/vector-icons/FontAwesome5";
import { Button } from "@rneui/themed";
import GreetingTextAndSearchIcon from "@/components/GreetingTextAndSearchIcon";
import TotalBalanceBorderBox from "@/components/TotalBalanceBorderBox";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

export default function Index() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://personal-finance-app-production-693d.up.railway.app/transactions"
        );
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error when fetching data:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/minimal-finance-wallpaper.png")}
        resizeMode="cover"
        className="flex-1"
        imageStyle={{ height: "100%", width: "100%" }}
      >
        <ScrollView className="flex-1 flex-col px-5 mt-10">
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
          <View className="mx-0 my-6 p-5 bg-white rounded-xl shadow-lg border border-gray-100 h-52">
            <View className="flex-row justify-between items-center mb-4">
              <Text
                className="mb-1"
                style={{ fontFamily: "Inter", fontSize: 22, fontWeight: "500" }}
              >
                Total Balance:{" "}
                <Text
                  style={{ fontFamily: "Inter", fontSize: 30 }}
                  className="font-bold "
                >
                  {"\n"}$400.00
                </Text>
              </Text>
            </View>

            <View className="h-px bg-gray-100 my-3" />

            <View className="flex-row justify-between mt-2">
              <View className="items-start">
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontSize: 20,
                    fontWeight: "500",
                  }}
                >
                  Income:
                  <Text className="font-semibold text-positive">
                    {"\n"}$800.00
                  </Text>
                </Text>
              </View>
              <View className="items-end">
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontSize: 20,
                    fontWeight: "500",
                  }}
                >
                  Expense:
                  <Text className="font-semibold text-negative">
                    {"\n"}$300.00
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View className="p-4 mt-10">
            <Text
              style={{ fontFamily: "Inter", fontSize: 25, fontWeight: "300" }}
              className="text-primaryText font-light mb-5"
            >
              Recent Transactions:
            </Text>
            <FlatList
              data={transactions}
              keyExtractor={(item: Transaction) => item.id}
              renderItem={({ item }) => (
                <View className="mb-2 bg-card h-14  rounded-xl grid grid-cols-[200px_1fr] content-center justify-center ">
                  <View className="flex flex-col ml-10">
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
    </View>
  );
}
