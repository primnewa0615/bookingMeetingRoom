import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/storage/user";
import { axiosInstance } from "@/utils/axiosInstance";
import { MEETING } from "@/types/meeting";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useRouter } from "expo-router";

const meetingRooms = [
  {
    id: 1,
    title: "Cendana",
  },
  {
    id: 2,
    title: "Jati",
  },
  {
    id: 3,
    title: "Mahoni",
  },
  {
    id: 4,
    title: "Trembesi",
  },
];

export default function MeetinRoomSchedule() {
  const [meetingData, setMeetingData] = useState<MEETING[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/jadwalruangan");
      const data = res.data.data;
      setMeetingData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {openDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, dateChoosen) => {
            setOpenDatePicker(false);
            if (dateChoosen) {
              setSelectedDate(dateChoosen);
            }
          }}
        />
      )}
      <View style={styles.jumboTron}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Jadwal Ruang Meeting</Text>
        </View>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={meetingRooms}
          search
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="Ruang Meeting"
          searchPlaceholder="Search..."
          value={selectedRoom}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: any) => {
            setSelectedRoom(item);
            setIsFocus(false);
          }}
        />

        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setOpenDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {moment(selectedDate).format("DD MMMM YYYY")}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapFlatList}>
        <FlatList
          data={meetingData}
          keyExtractor={(item) =>
            `${item.nama_ruangan}-${item.waktu_mulai}-${item.waktu_selesai}`
          }
          contentContainerStyle={{ gap: 10, marginTop: 20 }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f2f2f2",
  },
  jumboTron: {
    backgroundColor: "#D9D9D982",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  wrapFlatList: {
    padding: 20,
  },
  inputBox: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#f79393ff",
    backgroundColor: "#FAE1E1",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    flex: 1,
    color: "#333",
  },
  dateText: {
    color: "#666",
    fontSize: 16,
  },
  calendarIcon: {
    fontSize: 20,
  },
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  room: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "right",
  },
  dropdown: {
    height: 50,
    borderColor: "#f79393ff",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#FAE1E1",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
