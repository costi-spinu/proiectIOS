import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Register() {
    const { register } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await register(username, email, password);
            router.replace("/(tabs)");
        } catch {
            alert("Register failed");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Register</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}
