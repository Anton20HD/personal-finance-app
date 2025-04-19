import React, { useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import TransactionForm from "./TransactionForm";
import CloseIcon from "@expo/vector-icons/AntDesign";



const AddTransaction = ({modalVisible,setModalVisible,}: { modalVisible: boolean;setModalVisible: (visible: boolean) => void;}) => {
  
      const [title, setTitle] = useState("");
      const [amount, setAmount] = useState("");
      const [date, setDate] = useState("");
      const [category, setCategory] = useState("");
  
      const handleSubmit = async () => {
        const formData = {
            title,
            amount,
            date,
            category,
        };

        try {
            const response = await fetch("http://localhost:8080/transactions", {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
        });

        if(response.ok) {
            console.log("Transaction added!");
            setModalVisible(false);
        } else {
            Alert.alert("Error", "Failed to add transaction")
        }
      } catch(error) {
        console.error("Submit error:", error)
        throw new Error("Transaction creation not completed")
      }

    }


    return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1  bg-black/30 ">
        <View className="flex-1 bg-card mt-10 rounded-lg shadow-lg ">
          <View className="flex-col justify-between content-center p-4 border-b border-gray-200 ">
            <Pressable
              className="rounded-lg p-2 bg-black ml-auto"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <CloseIcon name="close" size={24} color="white" />
            </Pressable>
            <View className="flex-1 p-5">
              <TransactionForm
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

            <View className="flex ">
              <Pressable
                className="rounded-xl p-4 bg-secondary items-center w-full "
                onPress={() => ""}
              >
                <Text style={{}} onPress={handleSubmit} className="text-primaryText">
                  Add
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTransaction;
