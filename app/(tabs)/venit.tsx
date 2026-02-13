import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import API from "../../services/api";

export default function Venit() {
    const [venituri, setVenituri] = useState<any[]>([]);
    const [suma, setSuma] = useState("");

    const fetchVenituri = async () => {
        try {
            const res = await API.get("/venituri/");
            setVenituri(res.data);
        } catch (error) {
            console.log("Fetch error", error);
        }
    };

    const adaugaVenit = async () => {
        try {
            await API.post("/venituri/", {
                suma,
                moneda: "EUR",
                data: new Date().toISOString().split("T")[0],
            });

            setSuma("");
            fetchVenituri();
        } catch (error) {
            console.log("Add error", error);
        }
    };

    useEffect(() => {
        fetchVenituri();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, marginBottom: 10 }}>
                Venituri
            </Text>

            <TextInput
                placeholder="Suma"
                value={suma}
                onChangeText={setSuma}
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Button title="Adaugă venit" onPress={adaugaVenit} />

            <FlatList
                data={venituri}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ marginTop: 10 }}>
                        {item.suma} {item.moneda}
                    </Text>
                )}
            />
        </View>
    );
}
