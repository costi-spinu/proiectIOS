import { View, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function Explore() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Explore</Text>

      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>
          Statistici generale
        </Text>
        <Text>În curând aici vor apărea insight-uri financiare.</Text>
      </View>
    </View>
  );
}
