import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import TransactionForm from "./TransactionForm";
import CloseIcon from "@expo/vector-icons/AntDesign";
import SearchForm from "./SearchForm";


interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}


const SearchTransactionModal = ({searchModalVisible, setSearchModalVisible,}: { searchModalVisible: boolean;setSearchModalVisible: (visible: boolean) => void;}) => {
  
      const [title, setTitle] = useState("");
      const [amount, setAmount] = useState("");
      const [date, setDate] = useState("");
      const [category, setCategory] = useState("");
      const [transactions, setTransactions] = useState<Transaction[]>([]);
  
    
    return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={searchModalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setSearchModalVisible(!searchModalVisible);
      }}
    >
      <View className="flex-1  bg-black/30 ">
        <View className="flex-1 bg-card mt-10 rounded-lg shadow-lg ">
          <View className="flex-col justify-between content-center p-4 border-b border-gray-200 ">
            <Pressable
              className="rounded-lg p-2 bg-black ml-auto"
              onPress={() => setSearchModalVisible(!searchModalVisible)}
            >
              <CloseIcon name="close" size={24} color="white" />
            </Pressable>
            <View className="flex-1 p-5">
              <SearchForm
                title={title}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchTransactionModal
