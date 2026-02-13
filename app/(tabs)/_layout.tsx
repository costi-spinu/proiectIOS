import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "index") iconName = "home";
          else if (route.name === "venit") iconName = "arrow-down-circle";
          else if (route.name === "cheltuieli") iconName = "arrow-up-circle";
          else if (route.name === "explore") iconName = "compass";
          else if (route.name === "fonduri") iconName = "wallet";
          else if (route.name === "grafice") iconName = "bar-chart";
          else if (route.name === "profil") iconName = "person";

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="venit" options={{ title: "Venit" }} />
      <Tabs.Screen name="cheltuieli" options={{ title: "Cheltuieli" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="fonduri" options={{ title: "Fonduri" }} />
      <Tabs.Screen name="grafice" options={{ title: "Grafice" }} />
      <Tabs.Screen name="profil" options={{ title: "Profil" }} />
    </Tabs>
  );
}
