import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import API from "../../services/api";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../styles/colors";

export default function Fonduri() {
    const [fond, setFond] = useState<any>(null);
    const [suma, setSuma] = useState("");

    const fetchFond = async () => {
        try {
            const res = await API.get("/fonduri/");
            setFond(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const adaugaFond = async () => {
        try {
            await API.post("/fonduri/miscare/", {
                tip: "adauga",
                suma_eur: suma,
            });

            setSuma("");
            fetchFond();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchFond();
    }, []);

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Fonduri</Text>

            <View style={globalStyles.heroCardPrimary}>
                <Text style={[globalStyles.sectionTitle, globalStyles.heroTextWhite]}>
                    Total EUR
                </Text>
                <Text style={[globalStyles.heroTextWhite, { fontSize: 24 }]}>
                    {fond?.total_eur || 0} €
                </Text>
            </View>

            <View style={globalStyles.card}>
                <Text style={globalStyles.sectionTitle}>
                    Adaugă fond
                </Text>

                <TextInput
                    placeholder="Sumă"
                    value={suma}
                    onChangeText={setSuma}
                    keyboardType="numeric"
                    style={globalStyles.input}
                />

                <TouchableOpacity
                    style={globalStyles.buttonPrimary}
                    onPress={adaugaFond}
                >
                    <Text style={globalStyles.buttonText}>
                        Adaugă
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
