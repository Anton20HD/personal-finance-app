import React from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";

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
      <View className="flex-1 justify-center items-center content-center bg-black/30">
        <View className="h-20 w-96 bg-white rounded-md items-center shadow-md p-4 ">
          <Text className="text-center mb-4 text-lg font-bold">Add Transaction</Text>

          <Pressable
            className="rounded-lg p-3 bg-secondary mt-auto"
            onPress={() => setModalVisible(!modalVisible)}
          >
           
            <Text className="text-primaryText">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddTransaction;
