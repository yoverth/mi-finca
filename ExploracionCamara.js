// ExploracionCamara.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ExploracionCamara() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');

  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.infoText}>Comprobando permisos de cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Permiso de Cámara Requerido</Text>
        <Text style={styles.subText}>
          {Platform.OS === 'web'
            ? 'En navegador autoriza el uso de la cámara si deseas probarla.'
            : 'Se requiere acceso para la vista previa de labores en campo.'}
        </Text>
        <Pressable style={styles.actionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder Permiso</Text>
        </Pressable>
      </View>
    );
  }

  const toggleFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.overlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CÁMARA ACTIVA ({facing.toUpperCase()})</Text>
          </View>
          <Pressable style={styles.flipButton} onPress={toggleFacing}>
            <Text style={styles.buttonText}>Girar Cámara</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FAF7F1',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#183C28', marginBottom: 8, textAlign: 'center' },
  subText: { fontSize: 14, color: '#655D55', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  infoText: { fontSize: 15, color: '#374151' },
  actionButton: { backgroundColor: '#0B4D2A', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between', padding: 20 },
  badge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
  },
  badgeText: { color: '#B8F0C5', fontWeight: 'bold', fontSize: 12 },
  flipButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 80,
  },
});