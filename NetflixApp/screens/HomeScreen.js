import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Datos de ejemplo ───────────────────────────────────────────────────────
const FEATURED = {
  id: '1',
  title: 'STRANGER THINGS',
  genres: 'Terror · Misterio · 16+',
  image: 'https://picsum.photos/seed/stranger/400/220',
};

const MOVIES = [
  { id: '1',  title: 'El Irlandés',       year: '2019', image: 'https://picsum.photos/seed/irishman/120/180' },
  { id: '2',  title: 'Oppenheimer',        year: '2023', image: 'https://picsum.photos/seed/oppen/120/180' },
  { id: '3',  title: 'Dune: Parte 2',      year: '2024', image: 'https://picsum.photos/seed/dune2/120/180' },
  { id: '4',  title: 'Joker',              year: '2019', image: 'https://picsum.photos/seed/joker/120/180' },
  { id: '5',  title: 'Inception',          year: '2010', image: 'https://picsum.photos/seed/inception/120/180' },
];

const TRENDING = [
  { id: '6',  title: 'Wednesday',          year: '2022', image: 'https://picsum.photos/seed/wednesday/120/180' },
  { id: '7',  title: 'The Crown',          year: '2016', image: 'https://picsum.photos/seed/crown/120/180' },
  { id: '8',  title: 'Peaky Blinders',     year: '2013', image: 'https://picsum.photos/seed/peaky/120/180' },
  { id: '9',  title: 'Dark',               year: '2017', image: 'https://picsum.photos/seed/dark/120/180' },
  { id: '10', title: 'Squid Game',         year: '2021', image: 'https://picsum.photos/seed/squid/120/180' },
];

const BECAUSE_YOU_WATCHED = [
  { id: '11', title: 'Stranger Things 4',  year: '2022', image: 'https://picsum.photos/seed/st4/120/180' },
  { id: '12', title: 'The Haunting',       year: '2018', image: 'https://picsum.photos/seed/haunting/120/180' },
  { id: '13', title: 'Black Mirror',       year: '2011', image: 'https://picsum.photos/seed/blackm/120/180' },
  { id: '14', title: 'Ratched',            year: '2020', image: 'https://picsum.photos/seed/ratched/120/180' },
];

// ─── Componente tarjeta de película ─────────────────────────────────────────
function MovieCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
    </Pressable>
  );
}

// ─── Fila horizontal de películas ───────────────────────────────────────────
function MovieRow({ title, data, navigation }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            onPress={() => navigation.navigate('Detail', { movie: item })}
          />
        )}
      />
    </View>
  );
}

// ─── Pantalla principal ──────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header / Navbar */}
      <View style={styles.header}>
        <Text style={styles.headerLogo}>N</Text>
        <View style={styles.navLinks}>
          <Text style={styles.navLink}>Inicio</Text>
          <Text style={styles.navLink}>Series</Text>
          <Text style={styles.navLink}>Películas</Text>
          <Text style={styles.navLink}>Mi lista</Text>
        </View>
        <Pressable>
          <Text style={styles.searchIcon}>🔍</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner destacado */}
        <View style={styles.banner}>
          <Image
            source={{ uri: FEATURED.image }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerNetflixLabel}>
              <Text style={styles.bannerN}>N</Text> SERIE
            </Text>
            <Text style={styles.bannerTitle}>{FEATURED.title}</Text>
            <Text style={styles.bannerGenres}>{FEATURED.genres}</Text>
            <View style={styles.bannerBtns}>
              <Pressable
                style={({ pressed }) => [
                  styles.btnReproducir,
                  pressed && { opacity: 0.85 },
                ]}
                onPress={() =>
                  navigation.navigate('Detail', { movie: FEATURED })
                }
              >
                <Text style={styles.btnReproducirText}>▶  Reproducir</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.btnMiLista,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <Text style={styles.btnMiListaText}>+ Mi lista</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Secciones de catálogo */}
        <MovieRow
          title="Populares en Netflix"
          data={MOVIES}
          navigation={navigation}
        />
        <MovieRow
          title="Tendencias ahora"
          data={TRENDING}
          navigation={navigation}
        />
        <MovieRow
          title="Porque viste Stranger Things"
          data={BECAUSE_YOU_WATCHED}
          navigation={navigation}
        />

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIconActive}>⌂</Text>
          <Text style={styles.tabLabelActive}>Inicio</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>▷</Text>
          <Text style={styles.tabLabel}>Próximamente</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>⬇</Text>
          <Text style={styles.tabLabel}>Descargas</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Text style={styles.tabIcon}>☰</Text>
          <Text style={styles.tabLabel}>Más</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#141414',
    zIndex: 10,
  },
  headerLogo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#E50914',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 14,
  },
  navLink: {
    color: '#fff',
    fontSize: 13,
  },
  searchIcon: {
    fontSize: 20,
  },

  // Banner
  banner: {
    width: '100%',
    height: 280,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,20,20,0.45)',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  bannerNetflixLabel: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
    letterSpacing: 2,
  },
  bannerN: {
    color: '#E50914',
    fontWeight: '900',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 4,
  },
  bannerGenres: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 14,
  },
  bannerBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  btnReproducir: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnReproducirText: {
    color: '#141414',
    fontWeight: '700',
    fontSize: 14,
  },
  btnMiLista: {
    backgroundColor: 'rgba(100,100,100,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  btnMiListaText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // Secciones
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 16,
    marginBottom: 10,
  },
  card: {
    width: 100,
    height: 148,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingBottom: 12,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    color: '#888',
  },
  tabIconActive: {
    fontSize: 20,
    color: '#E50914',
  },
  tabLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  tabLabelActive: {
    fontSize: 10,
    color: '#E50914',
    marginTop: 2,
  },
});
