import React from "react";
import { Stack, TextInput, IconButton } from "@react-native-material/core";


const App = () => (
  <Stack spacing={2} style={{ margin: 16 }}>
    <TextInput
      label="Label"
     
    />
    <TextInput
      label="Label"
      variant="outlined"
     
    />
    <TextInput label="Label" variant="standard" />
  </Stack>
);

export default App;