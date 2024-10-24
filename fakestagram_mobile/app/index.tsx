import { Button, Text, View } from "react-native";
import Counter from "../components/counter";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Counter />
    </View>
  );
}
