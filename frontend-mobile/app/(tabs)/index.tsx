import { Link } from "expo-router";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import SearchIcon from "@expo/vector-icons/FontAwesome5";
import { Button } from "@rneui/themed";

export default function Index() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/minimal-finance-wallpaper.png")}
        resizeMode="cover"
        className="flex-1"
        imageStyle={{ height: "100%", width: "100%" }}
      >
        <ScrollView className="flex-1 flex-col px-5">
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
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
