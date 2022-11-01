import React from "react";
import { Stack, FAB } from "@react-native-material/core";


const App = () => (
  <Stack fill center spacing={9}>
  
    <FAB
      
      color="primary"
      loading
    />
    <FAB
      variant="extended"
     
      label="navigate"
      color="primary"
    />
  </Stack>
);

export default App;