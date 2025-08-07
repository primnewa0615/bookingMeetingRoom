import { useController } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";

const InputField = ({
  name,
  control,
  showPassword = false,
  readonly = false,
  placeHolder,
  customStyle,
}: {
  name: string;
  control: any;
  showPassword?: boolean;
  readonly?: boolean;
  placeHolder: string;
  customStyle?: any;
}) => {
  const { field }: any = useController({
    control,
    name,
  });

  return (
    <TextInput
      readOnly={readonly}
      defaultValue={field.value}
      style={customStyle ? customStyle : styles.input}
      onChangeText={field.onChange}
      secureTextEntry={name === "password" ? !showPassword : showPassword}
      placeholder={placeHolder}
      // status={errors[name] ? "danger" : "basic"}
      // caption={errors[name] ? errors[name].message : ""}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});

export default InputField;
