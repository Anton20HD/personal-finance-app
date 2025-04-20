import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { categories } from "@/constants/categoryData";
import DateTimePicker from "@react-native-community/datetimepicker";

interface SearchFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const SearchForm = ({
  title,
  setTitle,
  amount,
  setAmount,
  date,
  setDate,
  category,
  setCategory,
}: SearchFormProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);

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

  useEffect(() => {

    const lowerCaseSearch = searchTerm.toLowerCase();

    setFilteredTransactions(
      transactions.filter((transaction) =>
        transaction.title.toLowerCase().includes(lowerCaseSearch) ||
        transaction.category.toLowerCase().includes(lowerCaseSearch)
      )
    );
  }, [searchTerm, transactions]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setShowNoResults(false); // reset no results when search is cleared
      return;
    }

    const timeoutId = setTimeout(() => {
      if (filteredTransactions.length === 0) {
        setShowNoResults(true);
      }
    }, 500); //(500ms)

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filteredTransactions]);

  const getCategoryIcon = (categoryKey: string) => {
    const category = categories.find((cat) => cat.key === categoryKey);
    return category ? category.icon : null;
  };

  return (
    <View className="flex flex-col space-y-4">
      <View className="mb-5">
        <Text
          style={{ fontFamily: "Inter", fontSize: 18, fontWeight: "500" }}
          className="text-primaryText mb-2"
        >
          Search
        </Text>
        <TextInput
          style={{ fontFamily: "Inter", fontSize: 15, fontWeight: "500" }}
          className=" h-10 m-0 border p-3 bg-white text-black"
          placeholder="Shopping...."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        data={filteredTransactions}
        scrollEnabled={false}
        keyExtractor={(item: Transaction) => item.id}
        renderItem={({ item }) => (
          <View className="mb-2 bg-card h-14 rounded-xl flex-row items-center shadow-md ">
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
      {showNoResults && (
        <Text style={{ fontSize:20, fontFamily: "Inter", fontWeight:"bold"}}  className=" flex justify-center text-primaryText">No results found!</Text>
      )}
    </View>
  );
};

export default SearchForm;
