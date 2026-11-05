import React from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMyList } from '../context/MyListContext';
import MyListButton from '../components/MyListButton';
import MyListStatus from '../components/MyListStatus';

export default function MyListScreen({ navigation }) {
  const { movies, loading, ready } = useMyList();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Volver al inicio" onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.title}>←</Text>
        </Pressable>
        <Text style={styles.title}>Mi lista</Text>
      </View>
      <Text style={styles.subtitle}>Tus favoritos se guardan en este dispositivo.</Text>
      <MyListStatus />
      {loading ? <ActivityIndicator color="#E50914" size="large" accessibilityLabel="Cargando Mi lista" /> : ready && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={movies.length > 0 ? <Text style={styles.subtitle}>{movies.length} {movies.length === 1 ? 'título guardado' : 'títulos guardados'}</Text> : null}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.title}>Tu lista está vacía</Text>
              <Text style={styles.subtitle}>Busca una película o serie y toca «+ Mi lista» para guardarla aquí.</Text>
              <Pressable accessibilityRole="button" style={styles.explore} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Explorar catálogo</Text>
              </Pressable>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalle de ${item.title}`} onPress={() => navigation.navigate('Detail', { movie: item })}>
                <Image source={{ uri: item.image }} style={styles.poster} />
              </Pressable>
              <View style={styles.info}>
                <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Detail', { movie: item })}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                  {item.year && <Text style={styles.subtitle}>{item.year}</Text>}
                </Pressable>
                <MyListButton movie={item} style={styles.remove} textStyle={styles.buttonText} />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  back: { padding: 8 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#bbb', fontSize: 14, marginHorizontal: 16, marginBottom: 16, lineHeight: 21 },
  list: { padding: 16, flexGrow: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  explore: { backgroundColor: '#E50914', borderRadius: 4, padding: 14 },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  poster: { width: 90, height: 135, borderRadius: 4, backgroundColor: '#333' },
  info: { flex: 1, justifyContent: 'center', gap: 12 },
  movieTitle: { color: '#fff', fontWeight: '700', fontSize: 17 },
  remove: { backgroundColor: '#333', borderRadius: 4, padding: 12, alignSelf: 'flex-start' },
});
