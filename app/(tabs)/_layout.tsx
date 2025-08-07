import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  const pathname = usePathname();

  const colorScheme = useColorScheme();
  const isTabBarVisible = !pathname.includes("/booking");
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: isTabBarVisible
          ? {
              backgroundColor: "#efefef",
              height: 80,
              borderTopWidth: 0,
            }
          : { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: "none",
          },
          // tabBarIcon: ({ color }) => (
          //   <MaterialCommunityIcons
          //     name="clipboard-list-outline"
          //     size={24}
          //     color="black"
          //   />
          // ),
        }}
      />

      <Tabs.Screen
        name="meetingRoomSchedule"
        options={{
          title: "Jadwal Ruang Meeting",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking Room",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-edit-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
