/*
Created by:   Willem Toews
Purpose:      CIT-2269 Assignment #3
Desciption:   A soundboard app that can record and playback audio

TODO:       
      add colour to buttons when pressed
      fix style for buttons 
      decide on text within buttons 
*/ 

// Components
import { View,} from 'react-native';
import BackButton from './conponents/backButton';
import SoundBoardButton from './conponents/soundBoardButton.js';

// Styles
import soundBoardStyles from './styles/soundBoardStyleSheet.js';
import Styles from "./styles/generalStyleSheet.js";



export default function App() {

  soundBoardArray = new Array(9).fill(null);

  return (
    <View style={Styles.container}>
        <BackButton text={"Go Back"}/>

    <View style={soundBoardStyles.soundBoardContainer}>
      {soundBoardArray.map((Pressable, index) => (
      <SoundBoardButton key={index} /> 
      ))}
    </View>
    </View>
  );
}