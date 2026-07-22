import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Avatar = ({ source, name = "", size = 40 }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <View style={[styles.avatar, { width: size, height: size }]}>
      {source ? (
        <Image source={{ uri: source }} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={styles.initials}>{initials || "?"}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: { borderRadius: 999, overflow: "hidden", backgroundColor: "#334155", alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: "100%" },
  initials: { color: "#fff", fontWeight: "600" },
});

export default Avatar;