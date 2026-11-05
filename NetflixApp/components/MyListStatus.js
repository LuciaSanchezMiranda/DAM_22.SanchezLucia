import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useMyList } from '../context/MyListContext';

export default function MyListStatus() {
  const { error, loading, saving, ready, retry } = useMyList();
  if (!error) return null;
  return (
    <View style={styles.box}>
      <Text accessibilityRole="alert" style={styles.text}>{error}</Text>
      {!ready && (
        <Pressable accessibilityRole="button" disabled={loading || saving} onPress={retry} style={styles.button}>
          <Text style={styles.text}>Reintentar carga</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16, backgroundColor: '#492024' },
  text: { color: '#fff', fontSize: 14 },
  button: { marginTop: 10, paddingVertical: 10, alignSelf: 'flex-start' },
});
