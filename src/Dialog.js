import React, { useState } from "react";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
} from "@react-native-material/core";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        title="Open Alert Dialog"
        style={{ margin: 16 }}
        onPress={() => setVisible(true)}
      />
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <DialogHeader title="Dialog Header" />
        <DialogContent>
          <Text>
           Dialog is created.
          </Text>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            compact
            variant="text"
            onPress={() => setVisible(false)}
          />
          <Button
            title="Ok"
            compact
            variant="text"
            onPress={() => setVisible(false)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const Dialogs = () => (
  <Provider>
    <App />
  </Provider>
);

export default Dialogs;