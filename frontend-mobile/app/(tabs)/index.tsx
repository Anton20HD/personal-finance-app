import { Link } from "expo-router";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import SearchIcon from "@expo/vector-icons/FontAwesome5";
import { Button } from "@rneui/themed";
import GreetingTextAndSearchIcon from "@/components/GreetingTextAndSearchIcon";
import TotalBalanceBorderBox from "@/components/TotalBalanceBorderBox";

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
       <View>
        <GreetingTextAndSearchIcon/>
       </View>
        <View>
          <TotalBalanceBorderBox/>
        </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
