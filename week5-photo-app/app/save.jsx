import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export default function SaveScreen() {
  const router = useRouter();
  const { templateId, photoUri } = useLocalSearchParams();
  const viewShotRef = useRef(null);

  const templateMap = {
    nhec: require('../template/template_nhec.png'),
    white: require('../template/template_white.png'),
  };

  const selectedTemplate = templateMap[templateId];

  const handleSave = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission needed', 'Please allow photo library access.');
        return;
      }

      const uri = await viewShotRef.current.capture();

      await MediaLibrary.saveToLibraryAsync(uri);

      Alert.alert('Saved!', 'Your postcard has been saved to your phone.');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save postcard.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Postcard</Text>

        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
          <View style={styles.previewArea}>
            <View style={styles.postcardFrame}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photo} />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>No photo</Text>
                </View>
              )}

              {selectedTemplate && (
                <Image source={selectedTemplate} style={styles.overlay} />
              )}
            </View>
          </View>
        </ViewShot>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffaf5',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  previewArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#fffaf5',
  },
  postcardFrame: {
    width: 260,
    height: 390,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 260,
    height: 390,
    borderRadius: 12,
    position: 'absolute',
  },
  overlay: {
    width: 260,
    height: 390,
    position: 'absolute',
  },
  placeholder: {
    width: 260,
    height: 390,
    borderRadius: 12,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
  },
});