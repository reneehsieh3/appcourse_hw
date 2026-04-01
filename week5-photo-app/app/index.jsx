import {View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';


export default function App() {
  const [template, setTemplate] = useState(null);
  const [photo, setPhoto] = useState(null);

    const templates = [
        require('../template/template_nhec.png'),
        require('../template/template_white.png'),
    ];

    const pickPhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 6],
            quality: 1,
            base64: true,
        });
    
        if (!result.cancelled) {
            setPhoto(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Make Your Own Postcard </Text>
            <View style={styles.templateContainer}>
                <Text style={styles.subtitle}>Choose a template:</Text>
                <View style={styles.templateList}>
                    {templates.map((template, index) => (
                        <Pressable key={index} onPress={() => setTemplate(template)}>
                            <Image source={template} style={styles.templateImage} />
                        </Pressable>
                    ))}
                </View>
            </View>
            {template && (
                <View style={styles.previewContainer}>
                    <Text style={styles.subtitle}>Preview:</Text>
                    <Image source={template} style={styles.previewImage} />
                    <Pressable style={styles.button} onPress={pickPhoto}>
                        <Text style={styles.buttonText}>Pick Your Photo</Text>
                    </Pressable>
                </View>
            )}

            {photo &&(
                <View style={styles.previewContainer}>
                    <Text style={styles.subtitle}>Your Photo:</Text>
                    <Image source={{ uri: photo }} style={styles.previewImage} />
                    <Image source={template} style={styles.overlay}/>
                </View>

            )}

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  templateContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  templateList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  templateImage: {
    width: 120,
    height: 180,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  previewContainer: {
    width: '80%',
    alignItems: 'center',
  },
  previewImage: {
    width: 240,
    height: 360,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  bubutton: {
  backgroundColor: 'black',
  padding: 10,
  borderRadius: 8,
  marginTop: 20,
    },

  overlay: {
    position: 'absolute',
    width: 240,
    height: 360,
    },
}); 
