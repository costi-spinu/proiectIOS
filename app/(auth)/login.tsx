import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login(username, password);
            router.replace("/(tabs)");
        } catch {
            alert("Login failed");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="Go to Register"
                onPress={() => router.push("/(auth)/register")}
            />
        </View>
    );
}
