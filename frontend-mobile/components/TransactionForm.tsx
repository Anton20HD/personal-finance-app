import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { categories } from "@/constants/categoryData";

const TransactionForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <View>
      <Text>Title</Text>
      <TextInput className=" h-10 m-3 border p-3" placeholder="Title" />
      <Text>Amount</Text>
      <TextInput className="h-10 m-3 border p-3" placeholder="Amount" />
      <Text>Date</Text>
      <TextInput className="h-10 m-3 border p-3" placeholder="Date" />
      <Text>Category</Text>
      <Picker
        selectedValue={selectedCategory}
        className="border p-1"
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat.key} label={cat.label} value={cat.key} />
        ))}
      </Picker>
    </View>
  );
};

export default TransactionForm;
