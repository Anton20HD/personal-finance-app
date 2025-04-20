import { View, Text, TextInput, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { categories } from "@/constants/categoryData";
import DateTimePicker from "@react-native-community/datetimepicker";


interface TransactionFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const TransactionForm = ({
  title,
  setTitle,
  amount,
  setAmount,
  date,
  setDate,
  category,
  setCategory,
}: TransactionFormProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setDate(formatted);
    }
  };

  return (
    <View className="flex flex-col space-y-4">
      <View className="mb-5">
        <Text
          style={{ fontFamily: "Inter", fontSize: 18, fontWeight: "500" }}
          className="text-primaryText mb-2"
        >
          Title
        </Text>
        <TextInput
          style={{ fontFamily: "Inter", fontSize: 15, fontWeight: "500" }}
          className=" h-10 m-3 border p-3 bg-white"
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View className="mb-5">
        <Text
          style={{ fontFamily: "Inter", fontSize: 18, fontWeight: "500" }}
          className="text-primaryText mb-2"
        >
          Amount
        </Text>
        <TextInput
          style={{ fontFamily: "Inter", fontSize: 15, fontWeight: "500" }}
          className="h-10 m-3 border p-3 bg-white"
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View className="mb-5">
        <Text className="text-primaryText mb-2">Date</Text>

        {Platform.OS === "web" ? (
          <input
            type="date"
            value={date}
            onChange={(e: any) => setDate(e.target.value)}
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              fontFamily: "Inter",
              fontSize: 15,
            }}
          />
        ) : (
          <>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="h-10 m-3 border p-3 bg-white justify-center"
            >
              <Text>{date ? date : "Select Date"}</Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                value={date ? new Date(date) : new Date()}
                onChange={handleDateChange}
              />
            )}
          </>
        )}
      </View>

      <View className="mb-5">
        <Text
          style={{ fontFamily: "Inter", fontSize: 18, fontWeight: "500" }}
          className="text-primaryText mb-2"
        >
          Category
        </Text>
        <Picker
          style={{ fontFamily: "Inter", fontSize: 15, fontWeight: "500" }}
          selectedValue={category}
          className="border p-1"
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat.key} label={cat.label} value={cat.key} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default TransactionForm;
