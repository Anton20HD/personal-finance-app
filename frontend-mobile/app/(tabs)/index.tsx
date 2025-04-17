import { Link } from "expo-router";
import { ImageBackground, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/minimal-finance-wallpaper.png")}
        resizeMode="cover"
        className="flex-1"
        imageStyle={{height: '100%', width: '100%'}}
      ></ImageBackground>
    </View>
  );
}
