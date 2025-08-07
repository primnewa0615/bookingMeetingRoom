import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { MEETING } from "@/types/meeting";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import NumberField from "@/components/NumberField";

const divisions = [
  {
    id: 1,
    title: "Marketing",
  },
  {
    id: 2,
    title: "Sales",
  },
  {
    id: 3,
    title: "IT",
  },
  {
    id: 4,
    title: "Oprasional",
  },
];

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

export default function Booking() {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openWaktuMulai, setOpenWaktuMulai] = useState(false);
  const [openWaktuSelesai, setOpenWaktuSelesai] = useState(false);
  const router = useRouter();
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<MEETING>({
    defaultValues: {
      divisi_id: 0,
      ruang_meeting_id: 0,
      tgl_meeting: moment().format("YYYY-MM-DD"),
      waktu_mulai: "",
      waktu_selesai: "",
      jumlah_peserta: 0,
    },
  });

  const submit = (data: MEETING) => {
    const divisi = divisions.find((item) => item.id == data.divisi_id);
    const meetingRoom = meetingRooms.find((item) => data.ruang_meeting_id);
    alert(
      `Data Berhasil Disubmit : \nDivisi = ${divisi?.title}\nRuang Meeting = ${
        meetingRoom?.title
      }\nTanggal Meeting = ${moment(data.tgl_meeting).format(
        "DD MMMM YYYY"
      )}\nJam Mulai Meeting = ${data.waktu_mulai}\nJam Selesai Meeting = ${
        data.waktu_selesai
      }\nJumlah Peserta = ${data.jumlah_peserta}`
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {openDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, selectedDate) => {
              setOpenDatePicker(false);
              if (selectedDate) {
                setValue(
                  "tgl_meeting",
                  moment(selectedDate).format("YYYY-MM-DD")
                );
              }
            }}
          />
        )}

        {openWaktuMulai && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            onChange={(event, selectedTime) => {
              setOpenWaktuMulai(false);
              if (selectedTime) {
                setValue("waktu_mulai", moment(selectedTime).format("hh:mm"));
              }
            }}
          />
        )}

        {openWaktuSelesai && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            onChange={(event, selectedTime) => {
              setOpenWaktuSelesai(false);
              if (selectedTime) {
                setValue("waktu_selesai", moment(selectedTime).format("hh:mm"));
              }
            }}
          />
        )}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Ruang Meeting</Text>
        </View>

        <View style={styles.contentWrapper}>
          <ScrollView
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
          >
            <SelectField
              control={control}
              name="divisi_id"
              placeHolder="Divisi"
              customStyle={styles.input}
              options={divisions}
            />
            <SelectField
              control={control}
              name="ruang_meeting_id"
              placeHolder="Ruang Meeting"
              customStyle={styles.input}
              options={meetingRooms}
            />
            <TouchableOpacity
              onPress={() => setOpenDatePicker(true)}
              style={styles.inputWithIcon}
            >
              <InputField
                control={control}
                name="tgl_meeting"
                placeHolder="Tanggal Meeting"
                customStyle={styles.inputNoBorder}
              />
              <Ionicons name="calendar-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpenWaktuMulai(true)}
              style={styles.inputWithIcon}
            >
              <InputField
                name="waktu_mulai"
                control={control}
                placeHolder="Waktu Mulai Meeting"
                customStyle={styles.inputNoBorder}
              />
              <Ionicons name="time-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpenWaktuSelesai(true)}
              style={styles.inputWithIcon}
            >
              <InputField
                name="waktu_selesai"
                control={control}
                placeHolder="Waktu Selesai Meeting"
                customStyle={styles.inputNoBorder}
              />
              <Ionicons name="time-outline" size={20} color="#000" />
            </TouchableOpacity>
            <NumberField
              name="jumlah_peserta"
              control={control}
              customStyle={styles.input}
            />
          </ScrollView>
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  form: {
    gap: 12,
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#fceeee",
    padding: 12,
    borderRadius: 8,
  },
  inputWithIcon: {
    backgroundColor: "#fceeee",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputNoBorder: {
    flex: 1,
  },
  activeInput: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  submitButton: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
