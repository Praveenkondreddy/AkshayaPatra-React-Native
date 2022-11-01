import React from "react";
import { View } from "react-native";
import { Snackbar } from "@react-native-material/core";

const Snackbars = () => (
  <View style={{ flex: 1 }}>
    <Snackbar
      message="Can't send the photo."
      style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
    />
  </View>
);

export default Snackbars;