import { useController } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";

const NumberField = ({
  name,
  control,
  sufix = "",
  prefix = "",
  anonFunc,
  customStyle,
}: {
  name: string;
  control: any;
  sufix?: string;
  prefix?: string;
  anonFunc?: (item: any) => void;
  customStyle?: any;
}) => {
  const { field }: any = useController({
    control,
    name,
  });
  return (
    <CurrencyInput
      value={field.value}
      onChangeValue={(val) => {
        field.onChange(val);
        if (anonFunc) {
          anonFunc(val);
        }
      }}
      suffix={sufix}
      prefix={prefix}
      delimiter="."
      separator=","
      precision={0}
      minValue={0}
      style={
        customStyle
          ? customStyle
          : {
              borderWidth: 1,
              borderColor: "#cccccc",
              borderRadius: 5,
              padding: 14,
            }
      }
      // onChangeText={(formattedValue) => {
      //   console.log(formattedValue); // R$ +2.310,46
      // }}
    />
  );
};

export default NumberField;
