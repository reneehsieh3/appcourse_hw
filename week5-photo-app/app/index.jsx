import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'nhec',
      source: require('../template/template_nhec.png'),
    },
    {
      id: 'white',
      source: require('../template/template_white.png'),
    },
  ];

  const handleConfirm = () => {
    if (!selectedTemplate) return;
    router.push({
      pathname: '/photo',
      params: { templateId: selectedTemplate.id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make Your Own Postcard</Text>

      <View style={styles.templateContainer}>
        <Text style={styles.subtitle}>Choose a template</Text>

        <View style={styles.templateList}>
          {templates.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setSelectedTemplate(item)}
              style={[
                styles.templateCard,
                selectedTemplate?.id === item.id && styles.selectedCard,
              ]}
            >
              <Image source={item.source} style={styles.templateImage} />
            </Pressable>
          ))}
        </View>
      </View>

      {selectedTemplate && (
        <View style={styles.previewContainer}>
          <Text style={styles.subtitle}>Preview</Text>
          <Image source={selectedTemplate.source} style={styles.previewImage} />

          <Pressable style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm Template</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  templateContainer: {
    width: '100%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  templateList: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 24,
  },
  templateCard: {
    borderWidth: 2,
    borderColor: '#d9d9d9',
    borderRadius: 12,
    padding: 6,
    backgroundColor: '#fff',
  },
  selectedCard: {
    borderColor: '#222',
  },
  templateImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  previewContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  previewImage: {
    width: 240,
    height: 360,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});