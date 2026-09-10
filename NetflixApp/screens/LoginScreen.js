import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Validación básica: cualquier entrada redirige al Home
    if (email.trim() !== '' && password.trim() !== '') {
      navigation.replace('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo Netflix */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>NETFLIX</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>
          Disfruta películas y series donde quieras
        </Text>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Campo Email */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Campo Contraseña */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.inputFlex}
              placeholder="Contraseña"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
            </Pressable>
          </View>

          {/* Botón Iniciar Sesión */}
          <Pressable
            style={({ pressed }) => [
              styles.btnPrimary,
              pressed && styles.btnPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.btnPrimaryText}>Iniciar sesión</Text>
          </Pressable>

          {/* Separador */}
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>o</Text>
            <View style={styles.line} />
          </View>

          {/* Botón QR */}
          <Pressable
            style={({ pressed }) => [
              styles.btnSecondary,
              pressed && styles.btnPressed,
            ]}
          >
            <Text style={styles.qrIcon}>▦</Text>
            <Text style={styles.btnSecondaryText}>Usar código QR</Text>
          </Pressable>

          {/* Links */}
          <Pressable style={styles.forgotBtn}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>¿No tienes cuenta? </Text>
            <Pressable>
              <Text style={styles.signupLink}>Suscríbete ahora</Text>
            </Pressable>
          </View>
        </View>

        {/* Imagen decorativa inferior */}
        <View style={styles.decorContainer}>
          <Text style={styles.decorIcon}>🍿</Text>
          <View style={styles.decorPlay}>
            <Text style={styles.decorPlayIcon}>▶</Text>
          </View>
          <Text style={styles.decorIcon}>📱</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#E50914',
    letterSpacing: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#141414',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
    height: 52,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#666',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#141414',
  },
  inputFlex: {
    flex: 1,
    fontSize: 15,
    color: '#141414',
  },
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
  },
  btnPrimary: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  btnPressed: {
    opacity: 0.8,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 12,
    color: '#888',
    fontSize: 14,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    height: 52,
    marginBottom: 20,
  },
  qrIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#141414',
  },
  btnSecondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#141414',
  },
  forgotBtn: {
    alignItems: 'center',
    marginBottom: 12,
  },
  forgotText: {
    color: '#444',
    fontSize: 14,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  signupText: {
    color: '#444',
    fontSize: 14,
  },
  signupLink: {
    color: '#E50914',
    fontSize: 14,
    fontWeight: '700',
  },
  decorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 8,
  },
  decorIcon: {
    fontSize: 36,
  },
  decorPlay: {
    width: 60,
    height: 44,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorPlayIcon: {
    fontSize: 20,
    color: '#888',
  },
});
