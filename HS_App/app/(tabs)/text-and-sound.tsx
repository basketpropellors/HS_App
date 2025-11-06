import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

export default function TextAndSoundScreen() {
  const [fontSize, setFontSize] = useState(16);
  const [sound, setSound] = useState<Audio.Sound | undefined>();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/sounds/notification.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: fontSize }}>Adjust this text</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={10}
        maximumValue={40}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={value => setFontSize(value)}
        value={fontSize}
      />
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
