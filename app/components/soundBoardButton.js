/**
 * Name: soundBoardButton.js
 * Purpose: This file contains the soundBoardButton component which is a button that can record, play, and select sounds.
 * It also contains a modal that allows the user to select a sound from a list of pre-made sounds or saved sounds.
 * 
 * 
 * Todo:
 *      - should disable other buttons when recording
 *      - colours dont stay when playing multiple times in a row
 */
import { Pressable, Text, Modal, View } from "react-native";
import Styles from "../styles/soundBoardStyleSheet.js";
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import { fetchSavedSounds, initDatabase, updateSavedSound } from "../SQLite.js";

export default soundBoardButton = ({ allowStopPlaying }) => {

  const [recording, setRecording] = useState(null); //recording object
  const [recordingUri, setRecordingUri] = useState(null); // recorded file location
  const [playback, setPlayback] = useState(null); //playback object 
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [playing, setPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [savedSounds, setSavedSounds] = useState([]);
  const [modelSpecificRecorder, setModelSpecificRecorder] = useState(new Array(4).fill(false));

  // Array of pre-made sounds
  // should eventually be replaced with a database call
  const preMadeSounds = [
    { name: "Bonk", uri: Asset.fromModule(require("../sounds/bonk.mp3")).uri },
    { name: "Death", uri: Asset.fromModule(require("../sounds/death.mp3")).uri },
    { name: "huh", uri: Asset.fromModule(require("../sounds/huh.mp3")).uri },
    { name: "meow", uri: Asset.fromModule(require("../sounds/meow.mp3")).uri },
    { name: "pistol", uri: Asset.fromModule(require("../sounds/pistol.mp3")).uri },
    { name: "win", uri: Asset.fromModule(require("../sounds/win.mp3")).uri }
  ];


  //initialize the database and fetch saved sounds
  useEffect(() => {
    initDatabase();
    fetchSavedSounds((sounds) => {
      setSavedSounds(sounds);
      //console.log(sounds); // Check if sounds are fetched properly
    });
  }, []);

  //update saved sounds when recordingUri changes
  useEffect(() => {
    fetchSavedSounds((sounds) => {
      setSavedSounds(sounds);
    });
  }, [recordingUri]);

  const startRecording = async () => {
    try {
      //check permissions
      if (permissionResponse.status !== 'granted') {
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
    try {
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
  }, []);

  const stopPlayback = async () => {
    playback.stopAsync();
    setPlayback(undefined);
    setPlaying(false);
  }

  //changes the button color based on the current state
  function dynamicBackgroundColor(playing, recordingUri, recording) {
    if (playing && allowStopPlaying === true) {
      return '#DAF7A6';
    }
    else if (recording) {
      return '#DAF7A6';
    }
    else if (recordingUri) {
      if(playing){
        return '#DAF7A6';
      }
      else{
        return '#FF5733';
      }
    }
    else {
      return '#FFC300';
    }
  }

  //changes the button text based on the current state
  function dynamicButtonText(playing, recordingUri, recording) {
    if (playing && allowStopPlaying === true) {
      return 'Stop';
    }
    else if (recording) {
      return 'Stop Recording';
    }
    else if (recordingUri) {
      if(playing){
        return 'Playing';
      }
      else{
        return 'Play';
      }
    }
    else {
      return 'Select Sound';
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

          {/* Exit Button */}
          <Pressable
            style={Styles.modalExitButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={Styles.modalExitButtonText}>Exit</Text>
          </Pressable>

          {/* Single Recorder */}
          <Pressable
            style={[Styles.modalRecordButton, { backgroundColor: modelSpecificRecorder[4] ? '#DAF7A6' : '#FFC300' }]}
            onPress={() => {
              if (recording) {
                const updatedRecorder = [...modelSpecificRecorder];
                updatedRecorder[4] = false;
                setModelSpecificRecorder(updatedRecorder);
                stopRecording();
              } else {
                const updatedRecorder = [...modelSpecificRecorder];
                updatedRecorder[4] = true;
                setModelSpecificRecorder(updatedRecorder);
                startRecording();
              }
            }}>
            <Text style={Styles.soundBoardButtonText}>
              {recording ? 'Press To Stop Recording' : 'Press To Record'}
            </Text>
          </Pressable>

          {/* Saved Sounds */}
          <View style={Styles.modalSoundsContainer}>
            {savedSounds.map((sound, index) => (
              <Pressable
                key={index}
                style={[Styles.modalButton, { backgroundColor: modelSpecificRecorder[index] ? '#DAF7A6' : '#FFC300' }]}
                onPress={() => {
                  console.log('Selected sound -> ', sound.uri);
                  setRecordingUri(sound.uri);
                }}
                onLongPress={async () => {
                  if (recording) {
                    const updatedRecorder = [...modelSpecificRecorder];
                    updatedRecorder[index] = false;
                    setModelSpecificRecorder(updatedRecorder);
                    await stopRecording();
                    //console.log(recordingUri);
                    //console.log(sound.uri);

                    await updateSavedSound(sound.id, "Savable slot: " + sound.id, recordingUri);
                  } else {
                    const updatedRecorder = [...modelSpecificRecorder];
                    updatedRecorder[index] = true;
                    setModelSpecificRecorder(updatedRecorder);
                    startRecording();
                  }
                }}
              >
                <Text style={Styles.soundBoardButtonText}>
                  {sound.name || "Savable slot: " + sound.id}
                </Text>
              </Pressable>
            ))}

            {/* Pre-made Sounds */}
            {preMadeSounds.map((sound, index) => (
              <Pressable
                key={index}
                style={Styles.modalButton}
                onPress={() => {
                  //console.log('Selected sound -> ', sound.name);
                  //console.log('Selected sound -> ', sound.uri);
                  setRecordingUri(sound.uri);
                  setModalVisible(!modalVisible)
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
        style={[Styles.soundBoardButton, { backgroundColor: dynamicBackgroundColor(playing, recordingUri, recording) }]}
        onPress={() => {
          //console.log(allowStopPlaying);
          if (playing && allowStopPlaying === true) {
            stopPlayback();
          } else if (recordingUri) {
            playRecording();
          }
        }}
        onLongPress={() => setModalVisible(true)}>
        <Text style={Styles.soundBoardButtonText}>
          {dynamicButtonText(playing, recordingUri, recording)}
        </Text>
        <Text style={Styles.soundBoardButtonpermanentText}>Hold To Change</Text>
      </Pressable>
    </>
  );
}