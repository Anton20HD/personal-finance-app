import React, { useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import TransactionForm from "./TransactionForm";

const AddTransaction = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
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
        <View className="flex-1 bg-white mt-10 rounded-lg shadow-lg ">
          <View className="flex-col justify-between items-center p-4 border-b border-gray-200 ">
            <Pressable
              className="rounded-lg p-2 bg-gray-100"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-black">X</Text>
            </Pressable>
            <View className="flex-1 p-5">
              <TransactionForm />
            </View>
            <Pressable
              className="rounded-lg p-4 bg-secondary items-center"
              onPress={() => ""}
            >
              <Text className="text-black">Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTransaction;
