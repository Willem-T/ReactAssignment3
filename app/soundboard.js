import { Text, View, Pressable } from 'react-native';
import BackButton from './conponents/backButton';
import Styles from "./styles/styleSheet.js";
import SoundBoardButton from './conponents/soundBoardButton.js';

export default function App() {

  soundBoardArray = new Array(9).fill(null);

  return (
    <View style={Styles.container}>
        <BackButton text={"Go Back"}/>

    <View style={Styles.soundBoardContainer}>
      {soundBoardArray.map((Pressable, index) => (
      <SoundBoardButton key={index} style={Styles.soundBoardButton}/> 
      ))}
    </View>
    </View>
  );
}