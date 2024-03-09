import { Pressable, View, Text } from "react-native";
import Styles from "../styles/soundBoardStyleSheet.js";
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

export default soundBoardButton = ({style,}) => {
const [recording, setRecording ] = useState(null); //recording object
  const [recordingUri, setRecordingUri ] = useState(null); // recorded file location
  const [playback, setPlayback ] = useState(null); //playback object 
  const [permissionResponse, requestPermission ] = Audio.usePermissions();
  const [playing , setPlaying] = useState(false);


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
    setPlaying(true);
    console.log('Playing audion from -> ', recordingUri);

    //set playing state to to false when audio stops
    sound.setOnPlaybackStatusUpdate((status) => {
      if(!status.isPlaying){
        setPlaying(false);
      }
    });
  }

  //cleanup audio
  useEffect(() => {
    return recording 
    ? recording.stopAndUnloadAsync()
    : undefined;
  },[]);

  const stopPlayback = async () =>{
    playback.stopAsync();
    setPlayback(undefined);
    setPlaying(false);
  }

  function dynamicBackgroundColor(playing, recordingUri, recording){
    if(playing){
      return 'black';
    }
    else if(recording){
      return 'yellow';
    }
    else if(recordingUri){
      return 'green';
    }
    else{
      return 'blue';
    }
  }

    return (
      <Pressable
        style={[Styles.soundBoardButton, { backgroundColor: dynamicBackgroundColor(playing, recordingUri, recording)}]}
        onPress={playing ? stopPlayback : playRecording}
        onLongPress={recording ? stopRecording : startRecording}>
        <Text style={Styles.soundBoardButtonText}>
          {recordingUri
            ? (playing ? 'Stop' : 'Play')
            : (recording ? 'Stop Recording' : 'Start Recording')}
        </Text>
      </Pressable>
    );
}