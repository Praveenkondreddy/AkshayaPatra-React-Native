import React from "react";
import { Divider } from "@react-native-material/core";

const Dividers = () => (<><Divider style={{ marginTop: 60 }} leadingInset={16} />
<Divider style={{ marginTop: 60 }} leadingInset={16} color="pink" />
<Divider style={{ marginTop: 60 }} leadingInset={32} trailingInset={32} /></>);

export default Dividers;