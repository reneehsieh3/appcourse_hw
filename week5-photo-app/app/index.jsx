import { Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Landing() {
  const router = useRouter();

  return (
    <Pressable style={styles.container} onPress={() => router.push('/select')}>
      <Image
        source={require('../assets/images/cover_postcardapp.png')} 
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});