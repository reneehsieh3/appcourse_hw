import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function PhotoScreen() {
  const router = useRouter();
  const { templateId } = useLocalSearchParams();
  const [photoUri, setPhotoUri] = useState(null);

  const templateMap = {
    nhec: require('../template/template_nhec.png'),
    white: require('../template/template_white.png'),
  };

  const selectedTemplate = templateMap[templateId];

  const pickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      alert('We need permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 6],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const goNext = () => {
    if (!photoUri) return;

    router.push({
      pathname: '/save',
      params: {
        templateId,
        photoUri,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose Your Photo</Text>

        <View style={styles.previewArea}>
          <View style={styles.postcardFrame}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>No photo selected</Text>
              </View>
            )}

            {selectedTemplate && (
              <Image source={selectedTemplate} style={styles.overlay} />
            )}
          </View>
        </View>

        <Pressable style={styles.button} onPress={pickPhoto}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </Pressable>

        <View style={styles.bottomButtons}>
          <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>

          <Pressable
            style={[styles.button, !photoUri && styles.disabledButton]}
            onPress={goNext}
            disabled={!photoUri}
          >
            <Text style={styles.buttonText}>Next</Text>
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
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
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
  disabledButton: {
    opacity: 0.5,
  },
});