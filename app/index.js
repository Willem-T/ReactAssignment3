/*
Created by:   Willem Toews
Purpose:      CIT-2269 Assignment #3
Desciption:   A soundboard app that can record and playback audio

TODO:       
      
*/ 

// Components
import {Text, View} from 'react-native';
import NavButton from "./conponents/navButton.js";

// Styles
import Styles from "./styles/generalStyleSheet.js";



export default function App() {
  return (
    <View style={Styles.container}>

      {/* Title */}
      <Text style={Styles.headerText}>Soundboard</Text>


      {/* Buttons */}
      <View style={Styles.navButtonContainer}>
        <NavButton
          text={"Soundboard"}
          path={"/soundboard"}
          style={Styles.navButton}
        />

        <NavButton
          text={"Instructions?"}
          path={"/index"}
          style={Styles.navButton}
        />
      </View>
    </View>
  );
};
