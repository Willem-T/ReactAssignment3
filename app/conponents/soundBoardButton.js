import { Pressable, View, Text } from "react-native";
import Styles from "../styles/styleSheet.js";
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

export default soundBoardButton = ({style,}) => {
const [recording, setRecording ] = useState(null); //recording object
  const [recordingUri, setRecordingUri ] = useState(null); // recorded file location
  const [playback, setPlayback ] = useState(null); //playback object 
  const [permissionResponse, requestPermission ] = Audio.usePermissions();


  const startRecording = async () => {
    try{
      //check permissions
      if(permissionResponse.status !== 'granted'){
        console.log("Requesting permissions")
        await requestPermission();
      }
      console.log("Permission is -> ", permissionResponse.status)

      //set device specific values
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting...')
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording')
    }
    catch (error) {
      console.log("Error during startRecording() -> ", error)
    }
  }

  const stopRecording = async () => {
    try{
      await recording.stopAndUnloadAsync(); //stops
      const uri = recording.getURI()
      setRecordingUri(uri);

      setRecording(undefined);

      console.log('Recording stopped and stored at -> ', uri);
    }
    catch (error) {
      console.log("Error during stopRecording() -> ", error)
    }
  }

  const playRecording = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: recordingUri,
    });
    setPlayback(sound);
    await sound.replayAsync()
    console.log('Playing audion from -> ', recordingUri);
  }

  //cleanup audio
  useEffect(() => {
    return recording 
    ? recording.stopAndUnloadAsync()
    : undefined;
  },[]);

    return (
        <View style={style}>
                <Pressable
                    onPress={playRecording}
                    onLongPress={recording ? stopRecording : startRecording}
                    title={recording ? 'Stop Recording' : 'Start Recording'}>
                    <Text style={Styles.soundBoardButtonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
                </Pressable>
        </View>
    );
}