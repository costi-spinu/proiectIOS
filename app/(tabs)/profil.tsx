import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../styles/colors";

export default function Profil() {
    const { user, logout } = useAuth();

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Profil</Text>

            <View style={globalStyles.card}>
                <Text style={globalStyles.sectionTitle}>
                    Informații utilizator
                </Text>

                <Text>Username: {user?.username}</Text>
                <Text>Email: {user?.email}</Text>
            </View>

            <TouchableOpacity
                style={[globalStyles.buttonPrimary, { backgroundColor: colors.danger }]}
                onPress={logout}
            >
                <Text style={globalStyles.buttonText}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
}
