/*
Created by:   Willem Toews
Purpose:      CIT-2269 Assignment #3
Desciption:   A soundboard app that can record and playback audio

TODO:       
      
*/ 

import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Styles from "./styles/generalStyleSheet.js";
import NavButton from "./conponents/navButton.js";

export default function App() {
  return (
    <View style={Styles.container}>

    {/* Title */}
    <Text style={Styles.headerText}>Soundboard</Text>
    

    {/* Buttons */}
    <View style={{}}>
        <NavButton 
          text={"Soundboard"}
          path={"/soundboard"}
          style={Styles.navButton}
          />
    </View>

    <View style={{}}>
      <NavButton 
          text={"Instructions?"}
          path={"/index"}
          style={Styles.navButton}
          />
    </View>
    </View>
  );
};
