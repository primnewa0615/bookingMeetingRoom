import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/storage/user";
import { MEETING } from "@/types/meeting";
import { axiosInstance } from "@/utils/axiosInstance";
const meetingData = [
  { id: "1", time: "08:00 - 09:00", room: "Squats Room" },
  { id: "2", time: "10:00 - 12:00", room: "Lunges Room" },
];

export default function HomeScreen() {
  const [meetingData, setMeetingData] = useState<MEETING[]>([]);
  const user = useUserStore((state) => state.user);

  const fetchData = async () => {
    await axiosInstance
      .get("/jadwalruangan")
      .then((res) => {
        const r = res.data.data;
        console.log("datas", r);
        setMeetingData(r);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name[0]}</Text>
        </View>
        <View>
          <Text style={styles.name}>Yosi</Text>
          <Text style={styles.role}>{user.division}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Jadwal Ruang Meeting Hari Ini</Text>

      <FlatList
        data={meetingData}
        keyExtractor={(item) => item.nama_ruangan}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.time}>
              {item.waktu_mulai} - {item.waktu_selesai}
            </Text>
            <Text style={styles.room}>{item.nama_ruangan}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 15,
  },
  avatar: {
    backgroundColor: "#C3C9F6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  room: {
    fontSize: 16,
    textAlign: "right",
    fontWeight: "600",
    color: "#fff",
  },
});
