import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Backdrops = () => {
  const [revealed, setRevealed] = useState(false);
  return (
    <Backdrop
      revealed={revealed}
      header={
        <AppBar
          title="Screen title"
          transparent
          leading={props => (
            <IconButton
              icon={props => (
                <FontAwesome5
                   name={'phone'}
                    size={20}  />
              )}
              onPress={() => setRevealed(prevState => !prevState)}
              {...props}
            />
          )}
        />
      }
      backLayer={<View style={{ height: 120 }} />}
    >
      <BackdropSubheader title="Subheader" />
    </Backdrop>
  );
};

export default Backdrops;