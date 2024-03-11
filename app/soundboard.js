/*
Created by:   Willem Toews
Purpose:      CIT-2269 Assignment #3
Desciption:   A soundboard app that can record and playback audio

TODO:       
        Database kinda works, but not really, but mostly works so i should fix that
*/ 

// Components
import { View,} from 'react-native';
import BackButton from './components/backButton.js';
import SoundBoardButton from './components/soundBoardButton.js';
import AllowStoppingButton from './components/allowStoppingButton.js';
import { useState } from 'react';

// Styles
import soundBoardStyles from './styles/soundBoardStyleSheet.js';
import Styles from "./styles/generalStyleSheet.js";



export default function App() {
  soundBoardArray = new Array(9).fill(null);
  const [allowStopPlaying, setAllowStopPlaying] = useState(false);

  const handlePress = (value) => { 
    setAllowStopPlaying(value);
  };

  return (
    <View style={Styles.container}>
        <BackButton text={"Go Back"}/>

        <AllowStoppingButton onPress={handlePress} />
    <View style={soundBoardStyles.soundBoardContainer}>

      {soundBoardArray.map((Pressable, index) => (
      <SoundBoardButton key={index} allowStopPlaying={allowStopPlaying}/> 
      ))}
    </View>
    </View>
  );
}