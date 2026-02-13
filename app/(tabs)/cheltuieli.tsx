import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import API from "../../services/api";

export default function Cheltuieli() {
    const [cheltuieli, setCheltuieli] = useState<any[]>([]);
    const [suma, setSuma] = useState("");

    const fetchCheltuieli = async () => {
        try {
            const res = await API.get("/cheltuieli-variabile/");
            setCheltuieli(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const adaugaCheltuiala = async () => {
        try {
            await API.post("/cheltuieli-variabile/", {
                suma,
                moneda: "EUR",
                categorie: "alimente",
                data: new Date().toISOString().split("T")[0],
            });

            setSuma("");
            fetchCheltuieli();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCheltuieli();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22 }}>Cheltuieli</Text>

            <TextInput
                placeholder="Suma"
                value={suma}
                onChangeText={setSuma}
                keyboardType="numeric"
                style={{ borderWidth: 1, marginVertical: 10 }}
            />

            <Button title="Adaugă cheltuială" onPress={adaugaCheltuiala} />

            <FlatList
                data={cheltuieli}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ marginTop: 10 }}>
                        {item.categorie} - {item.suma} {item.moneda}
                    </Text>
                )}
            />
        </View>
    );
}
