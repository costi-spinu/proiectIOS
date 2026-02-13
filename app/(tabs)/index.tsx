import { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import API from "../../services/api";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBuget = async () => {
    try {
      const res = await API.get("/buget/lunar/");
      setData(res.data);
    } catch (error) {
      console.log("Buget error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuget();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 15 }}>
        Dashboard
      </Text>

      <View style={{ marginBottom: 15 }}>
        <Text>Luna: {data?.luna}</Text>
        <Text>Venit: {data?.venit} EUR</Text>
        <Text>Cheltuieli: {data?.cheltuieli} EUR</Text>
        <Text style={{ fontWeight: "bold" }}>
          Economii: {data?.economii} EUR
        </Text>
      </View>

      <Button
        title="➕ Adaugă Venit"
        onPress={() => router.push("/(tabs)/venit")}
      />

      <View style={{ height: 10 }} />

      <Button
        title="➖ Adaugă Cheltuială"
        onPress={() => router.push("/(tabs)/cheltuieli")}
      />
    </View>
  );
}
