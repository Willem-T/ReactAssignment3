import { Pressable, Text, Modal, View } from "react-native";
import Styles from "../styles/soundBoardStyleSheet.js";
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import soundBoardStyles from "../styles/soundBoardStyleSheet.js";
import { Recording } from "expo-av/build/Audio.js";
import { Asset } from 'expo-asset';
import { fetchPreMadeSounds, initDatabase } from "../SQLite.js";

export default soundBoardButton = () => {

  const [recording, setRecording ] = useState(null); //recording object
  const [recordingUri, setRecordingUri ] = useState(null); // recorded file location
  const [playback, setPlayback ] = useState(null); //playback object 
  const [permissionResponse, requestPermission ] = Audio.usePermissions();
  const [playing , setPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

    // Array of pre-made sounds
    // should eventually be replaced with a database call
    // really bad workaround fix this later
    const preMadeSounds = [
      { name: "Bonk", uri: Asset.fromModule(require("../sounds/bonk.mp3")).uri },
      { name: "Death", uri: Asset.fromModule(require("../sounds/death.mp3")).uri },
      { name: "huh", uri: Asset.fromModule(require("../sounds/huh.mp3")).uri },
      { name: "meow", uri: Asset.fromModule(require("../sounds/meow.mp3")).uri },
      { name: "pistol", uri: Asset.fromModule(require("../sounds/pistol.mp3")).uri },
      { name: "win", uri: Asset.fromModule(require("../sounds/win.mp3")).uri}
    ];

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
    try {
      if (!recordingUri) {
        console.log('recordingUri is null or undefined');
        return;
      }
      const { sound } = await Audio.Sound.createAsync({
        uri: recordingUri,
      });
      setPlayback(sound);
      await sound.replayAsync()
      setPlaying(true);
      console.log('Playing audion from -> ', recordingUri);

      //set playing state to to false when audio stops
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) {
          setPlaying(false);
        }
      });
    } catch (error) {
      console.log("Error during playRecording() -> ", error)
    }
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
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={Styles.modalContainer}>
            <Pressable
              style={Styles.modalExitButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Exit</Text>
            </Pressable>

            <Pressable
              style={[Styles.modalRecordButton, { backgroundColor: recording ? 'yellow' : 'blue' }]}
              onPress={recording ? stopRecording : startRecording}>
              <Text style={Styles.soundBoardButtonText}>
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </Pressable>

            <View style={Styles.modalSoundsContainer}>
            {preMadeSounds.map((sound, index) => (
            <Pressable
              key={index}
              style={Styles.modalButton}
              onPress={() => {
                //console.log('Selected sound -> ', sound.name);
                //console.log('Selected sound -> ', sound.uri);
                setRecordingUri(sound.uri);
              }}>
              <Text style={Styles.soundBoardButtonText}>
                {sound.name}
              </Text>
            </Pressable>
          ))}
          </View>
          </View>
        </Modal>
          
          <Pressable
            style={[Styles.soundBoardButton, { backgroundColor: dynamicBackgroundColor(playing, recordingUri, recording)}]}
            onPress={playing ? stopPlayback : playRecording}
            onLongPress={() => setModalVisible(true)}>
            <Text style={Styles.soundBoardButtonText}>
              {recordingUri
                ? (playing ? 'Stop' : 'Play')
                : "Select Sound"}
            </Text>
          </Pressable>
          </>
    );
}