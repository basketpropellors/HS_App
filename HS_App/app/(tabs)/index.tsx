import { StyleSheet, Button, View, Platform } from 'react-native';

export default function HomeScreen() {
  const handlePress = () => {
    if (Platform.OS === 'web') {
      window.close();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="I can work" onPress={handlePress} />
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
