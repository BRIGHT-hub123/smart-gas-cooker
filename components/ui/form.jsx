import React, { createContext, useContext, useId } from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

/* ---------------- FORM ROOT ---------------- */
export const Form = FormProvider;

/* ---------------- FIELD CONTEXT ---------------- */
const FormFieldContext = createContext(null);
const FormItemContext = createContext(null);

/* ---------------- FORM FIELD ---------------- */
export const FormField = ({ name, control, render }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} control={control} render={render} />
    </FormFieldContext.Provider>
  );
};

/* ---------------- ITEM WRAPPER ---------------- */
export const FormItem = ({ children }) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <View style={styles.item}>{children}</View>
    </FormItemContext.Provider>
  );
};

/* ---------------- LABEL ---------------- */
export const FormLabel = ({ children }) => {
  const ctx = useContext(FormFieldContext);

  return <Text style={styles.label}>{children}</Text>;
};

/* ---------------- CONTROL (TextInput wrapper) ---------------- */
export const FormControl = ({ value, onChange, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

/* ---------------- DESCRIPTION ---------------- */
export const FormDescription = ({ children }) => {
  return <Text style={styles.description}>{children}</Text>;
};

/* ---------------- ERROR MESSAGE ---------------- */
export const FormMessage = ({ error }) => {
  if (!error) return null;

  return <Text style={styles.error}>{error}</Text>;
};

/* ---------------- HOOK ---------------- */
export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);

  if (!fieldContext) {
    throw new Error("useFormField must be used inside FormField");
  }

  const { name } = fieldContext;
  const { formState } = useFormContext();

  const error = formState?.errors?.[name]?.message;

  return {
    name,
    error,
  };
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  item: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },

  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  error: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});