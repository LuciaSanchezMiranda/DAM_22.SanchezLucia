import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Datos adicionales por película (simulado)
const SIMILAR = [
  { id: 's1', title: 'Narcos',         image: 'https://picsum.photos/seed/narcos/100/150' },
  { id: 's2', title: 'Breaking Bad',   image: 'https://picsum.photos/seed/breaking/100/150' },
  { id: 's3', title: 'Ozark',          image: 'https://picsum.photos/seed/ozark/100/150' },
  { id: 's4', title: 'Mindhunter',     image: 'https://picsum.photos/seed/mind/100/150' },
];

const TRAILERS = [
  { id: 't1', title: 'Tráiler oficial', image: 'https://picsum.photos/seed/trailer1/100/150' },
  { id: 't2', title: 'Clip exclusivo',  image: 'https://picsum.photos/seed/trailer2/100/150' },
  { id: 't3', title: 'Detrás de cámaras', image: 'https://picsum.photos/seed/bts/100/150' },
];

export default function DetailScreen({ navigation, route }) {
  // Recibimos la película desde Home mediante params
  const { movie } = route.params || {};

  const title   = movie?.title  || 'El Irlandés';
  const year    = movie?.year   || '2019';
  const image   = movie?.image  || 'https://picsum.photos/seed/irishman/400/220';
  const [activeTab, setActiveTab] = React.useState('similares');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Imagen con botón de reproducir superpuesto */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: image.replace('120/180', '400/220') }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          {/* Botón volver */}
          <Pressable
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </Pressable>

          {/* Botón cast */}
          <Pressable style={styles.castBtn}>
            <Text style={styles.castIcon}>⊡</Text>
          </Pressable>

          {/* Botón play central */}
          <View style={styles.playCircle}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>

        {/* Info de la película */}
        <View style={styles.info}>
          {/* Label PELÍCULA */}
          <View style={styles.labelRow}>
            <Text style={styles.netflixN}>N</Text>
            <Text style={styles.labelText}> PELÍCULA</Text>
          </View>

          {/* Título */}
          <Text style={styles.movieTitle}>{title.toUpperCase()}</Text>

          {/* Metadata */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{year}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>16+</Text>
            </View>
            <Text style={styles.metaText}>3 h 29 min</Text>
            <View style={styles.hdBadge}>
              <Text style={styles.hdText}>HD</Text>
            </View>
          </View>

          {/* Botones de acción */}
          <Pressable style={({ pressed }) => [styles.btnReproducir, pressed && { opacity: 0.85 }]}>
            <Text style={styles.btnReproducirText}>▶   Reproducir</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.btnSecondary, pressed && { opacity: 0.85 }]}>
            <Text style={styles.btnSecondaryText}>⬇   Descargar</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.btnSecondary, pressed && { opacity: 0.85 }]}>
            <Text style={styles.btnSecondaryText}>+   Mi lista</Text>
          </Pressable>

          {/* Sinopsis */}
          <Text style={styles.synopsis}>
            Un veterano de la Segunda Guerra Mundial se convierte en sicario de la mafia
            y participa en la desaparición de Jimmy Hoffa. Una épica historia de amistad,
            traición y redención.
          </Text>

          {/* Elenco & detalles */}
          <View style={styles.detailsBlock}>
            <Text style={styles.detailLine}>
              <Text style={styles.detailLabel}>Elenco: </Text>
              <Text style={styles.detailValue}>Robert De Niro, Al Pacino, Joe Pesci</Text>
            </Text>
            <Text style={styles.detailLine}>
              <Text style={styles.detailLabel}>Director: </Text>
              <Text style={styles.detailValue}>Martin Scorsese</Text>
            </Text>
            <Text style={styles.detailLine}>
              <Text style={styles.detailLabel}>Géneros: </Text>
              <Text style={styles.detailValue}>Drama, Crimen</Text>
            </Text>
          </View>
        </View>

        {/* Tabs Más similares / Tráilers */}
        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, activeTab === 'similares' && styles.tabActive]}
            onPress={() => setActiveTab('similares')}
          >
            <Text style={[styles.tabText, activeTab === 'similares' && styles.tabTextActive]}>
              MÁS SIMILARES
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'trailers' && styles.tabActive]}
            onPress={() => setActiveTab('trailers')}
          >
            <Text style={[styles.tabText, activeTab === 'trailers' && styles.tabTextActive]}>
              TRÁILERS Y MÁS
            </Text>
          </Pressable>
        </View>

        {/* Grid de contenido según tab activo */}
        <View style={styles.grid}>
          {(activeTab === 'similares' ? SIMILAR : TRAILERS).map((item) => (
            <Pressable key={item.id} style={styles.gridCard}>
              <Image source={{ uri: item.image }} style={styles.gridImage} />
              <Text style={styles.gridLabel} numberOfLines={2}>{item.title}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const CARD_W = (width - 48) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },

  // Hero / portada
  heroContainer: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,20,20,0.3)',
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  castBtn: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  castIcon: {
    color: '#fff',
    fontSize: 18,
  },
  playCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(180,180,180,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#141414',
    fontSize: 22,
    marginLeft: 4,
  },

  // Info
  info: {
    padding: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  netflixN: {
    color: '#E50914',
    fontSize: 13,
    fontWeight: '900',
  },
  labelText: {
    color: '#bbb',
    fontSize: 12,
    letterSpacing: 2,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  metaText: {
    color: '#aaa',
    fontSize: 13,
  },
  badge: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  badgeText: {
    color: '#aaa',
    fontSize: 11,
  },
  hdBadge: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  hdText: {
    color: '#aaa',
    fontSize: 11,
    fontWeight: '700',
  },

  // Botones
  btnReproducir: {
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnReproducirText: {
    color: '#141414',
    fontSize: 15,
    fontWeight: '700',
  },
  btnSecondary: {
    backgroundColor: '#333',
    borderRadius: 6,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnSecondaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Sinopsis y detalles
  synopsis: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  detailsBlock: {
    gap: 4,
  },
  detailLine: {
    fontSize: 13,
  },
  detailLabel: {
    color: '#666',
  },
  detailValue: {
    color: '#ccc',
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#E50914',
  },
  tabText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: '#fff',
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  gridCard: {
    width: CARD_W,
  },
  gridImage: {
    width: '100%',
    height: CARD_W * 1.4,
    borderRadius: 4,
    backgroundColor: '#2a2a2a',
  },
  gridLabel: {
    color: '#ccc',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
});
