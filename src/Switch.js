import React, { useState } from "react";
import { ListItem, Switch } from "@react-native-material/core";

const Switchs = () => {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  return (
    <>
      <ListItem
        title="List Item"
        trailing={
          <Switch value={checked} onValueChange={() => setChecked(!checked)} />
        }
        onPress={() => setChecked(!checked)}
      />
      <ListItem
        title="List Item"
        trailing={
          <Switch value={enabled} onValueChange={() => setEnabled(!enabled)} />
        }
        onPress={() => setEnabled(!enabled)}
      />
      <ListItem title="List Item" trailing={<Switch disabled />} disabled />
    </>
  );
};

export default Switchs;