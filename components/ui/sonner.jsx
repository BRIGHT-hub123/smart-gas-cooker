import React from "react";
import { useColorScheme } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const Toaster = (props) => {
  const theme = useColorScheme(); // "light" | "dark"

  const isDark = theme === "dark";

  const baseStyle = {
    borderLeftWidth: 5,
    backgroundColor: isDark ? "#111" : "#fff",
    borderColor: isDark ? "#333" : "#e5e7eb",
  };

  return (
    <Toast
      {...props}
      config={{
        success: (p) => (
          <BaseToast
            {...p}
            style={baseStyle}
            text1Style={{
              fontSize: 15,
              fontWeight: "600",
              color: isDark ? "#fff" : "#000",
            }}
            text2Style={{
              fontSize: 13,
              color: isDark ? "#aaa" : "#555",
            }}
          />
        ),

        error: (p) => (
          <ErrorToast
            {...p}
            style={{
              ...baseStyle,
              borderLeftColor: "red",
            }}
            text1Style={{
              fontSize: 15,
              fontWeight: "600",
              color: isDark ? "#fff" : "#000",
            }}
            text2Style={{
              fontSize: 13,
              color: isDark ? "#aaa" : "#555",
            }}
          />
        ),
      }}
    />
  );
};

export { Toaster };
