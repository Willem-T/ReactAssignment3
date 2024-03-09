import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Styles from "../styles/generalStyleSheet.js";

export default function BooleanButton({ onPress }) {
  const [isTrue, setIsTrue] = useState(false);

  const handlePress = () => {
    setIsTrue(!isTrue); 
    onPress(!isTrue); 
  };

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? 'lightblue' : 'white', 
        ...Styles.allowStoppingButton,
      })}
      onPress={handlePress}
    >
      <Text style={Styles.allowStoppingButtonText}>{isTrue ? 'Stops : Enabled' : 'Stops : Disabled'}</Text>
    </Pressable>
  );
}