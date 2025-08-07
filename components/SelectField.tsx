import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const SelectField = ({
  name,
  control,
  options,
  anonFunc,
  customStyle = undefined,
  placeHolder,
}: {
  name?: any;
  control?: any;
  options: any[];
  anonFunc?: (item: any) => void;
  customStyle?: any;
  placeHolder: string;
}) => {
  const { field } = useController({ control, name });
  const [initialValue, setInitialValue] = useState<
    string | { id: string } | undefined
  >(undefined);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (options.length > 0 && field.value) {
      const selectedOption = options.find((o) => o.id == field.value);
      setInitialValue(selectedOption || "");
    }
  }, [options, field.value]);

  return (
    <Dropdown
      style={
        customStyle != undefined
          ? customStyle
          : [styles.dropdown, isFocus && { borderColor: "blue" }]
      }
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={options}
      search
      maxHeight={300}
      labelField="title"
      valueField="id"
      placeholder={!isFocus ? placeHolder : "..."}
      searchPlaceholder="Search..."
      value={field.value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        field.onChange(item.id);
        anonFunc && anonFunc(item.id);
        setIsFocus(false);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
export default SelectField;
