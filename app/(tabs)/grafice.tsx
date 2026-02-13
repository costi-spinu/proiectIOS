import { View, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function Grafice() {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Grafice</Text>

            <View style={globalStyles.card}>
                <Text style={globalStyles.sectionTitle}>
                    Evoluție fonduri
                </Text>
                <Text>Graficele vor fi integrate aici.</Text>
            </View>
        </View>
    );
}
