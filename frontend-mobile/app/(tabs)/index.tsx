import AddTransactionModal from "@/components/AddTransactionModal";
import SearchTransactionModal from "@/components/SearchTransactionModal";
import { categories } from "@/constants/categoryData";
import AddIcon from "@expo/vector-icons/AntDesign";
import Trashcan from '@expo/vector-icons/FontAwesome';
import SearchIcon from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

//GLÖM INTE!! Använd denna url när du är klar sedan: https://personal-finance-app-production-693d.up.railway.app/transactions
export default function Index() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [addTransactionModalVisible, setAddTransactionModalVisible] =
    useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8080/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error when fetching data:", error);
      }
    };

    fetchTransactions();
  }, []);

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/transactions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      } else {
        console.error("Failed to delete from server");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const renderRightActions = (id: string) => (
    <View className=" bg-negative rounded-md m-2 h-12 justify-center flex-1 pr-5 items-end">
      <Trashcan name="trash-o" size={24} color="white" />
    </View>
  );

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
          <View className="flex-1 flex-row-reverse justify-between content-center ">
            <TouchableOpacity
              className="w-10 h-10 ml-auto mt-10 items-center justify-center  p-1 rounded-full bg-secondary shadow-md"
              onPress={() => setSearchModalVisible(true)}
            >
              <SearchIcon name="search" size={18} color={colors.primaryText} />
            </TouchableOpacity>
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
        </View>

        <ScrollView className="flex-1 flex-col px-5">
          <View style={{ height: 20 }} />

          <View className="mx-0 my-6 p-5 bg-white rounded-xl shadow-lg border border-gray-100 h-52">
            <View className="flex-row justify-between items-center mb-4">
              <Text
                className="mb-1"
                style={{ fontFamily: "Inter", fontSize: 22, fontWeight: "500" }}
              >
                Total Balance:
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
              scrollEnabled={false}
              keyExtractor={(item: Transaction) => item.id}
              renderItem={({ item }) => (
                <Swipeable
                  renderRightActions={() => renderRightActions(item.id)}
                  onSwipeableOpen={() => deleteTransaction(item.id)}
                  overshootRight={false}
                  containerStyle={{ backgroundColor: "transparent" }}
                >
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
                </Swipeable>
              )}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          className="bg-secondary rounded-full p-3 w-12 h-12 items-center justify-center absolute bottom-10 right-6 shadow-md "
          onPress={() => setAddTransactionModalVisible(true)}
        >
          <AddIcon name="plus" size={18} color={colors.primaryText} />
        </TouchableOpacity>
      </ImageBackground>
      <AddTransactionModal
        addTransactionModalVisible={addTransactionModalVisible}
        setAddTransactionModalVisible={setAddTransactionModalVisible}
      />
      <SearchTransactionModal
        searchModalVisible={searchModalVisible}
        setSearchModalVisible={setSearchModalVisible}
      />
    </SafeAreaView>
  );
}
