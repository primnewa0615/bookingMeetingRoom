import DatePicker from "react-native-date-picker";
import { useEffect, useState } from "react";

const DatePickerField = ({
  open,
  setOpen,
  anonFunc,
  val,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  anonFunc: (data: any) => void;
  val: string;
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [safeDate, setSafeDate] = useState(new Date());

  // Wait until component is mounted before allowing modal to open
  useEffect(() => {
    let isMounted = true;

    if (val) {
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) {
        setSafeDate(parsed);
      }
    }

    // Delay opening the modal to ensure ref is mounted
    if (open) {
      setTimeout(() => {
        if (isMounted) setInternalOpen(true);
      }, 100); // delay 100ms
    } else {
      setInternalOpen(false);
    }

    return () => {
      isMounted = false;
    };
  }, [open, val]);

  return (
    <DatePicker
      modal
      open={internalOpen}
      date={safeDate}
      onConfirm={(date) => {
        setInternalOpen(false);
        setOpen(false);
        anonFunc(date.toISOString());
      }}
      onCancel={() => {
        setInternalOpen(false);
        setOpen(false);
      }}
    />
  );
};

export default DatePickerField;
