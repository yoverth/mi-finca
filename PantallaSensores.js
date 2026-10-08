function PantallaSensores() {
  const [esSimulado, setEsSimulado] = useState(Platform.OS === "web");
  const [sensorActivo, setSensorActivo] = useState(true);
  const [disponible, setDisponible] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const [datosReales, setDatosReales] = useState({ x: 0, y: 0, z: -1 });
  const [datosSimulados, setDatosSimulados] = useState({ x: 0.02, y: -0.01, z: -0.99 });

  useEffect(() => {
    let suscripcion = null;

    if (!esSimulado && sensorActivo) {
      Accelerometer.isAvailableAsync()
        .then((disp) => {
          setDisponible(disp);
          if (disp) {
            Accelerometer.setUpdateInterval(500);
            suscripcion = Accelerometer.addListener((datos) => {
              setDatosReales(datos);
            });
          } else {
            setMensajeError("Acelerómetro físico no disponible.");
          }
        })
        .catch((err) => {
          setMensajeError("Error: " + err.message);
        });
    }

    return () => {
      if (suscripcion) suscripcion.remove();
    };
  }, [esSimulado, sensorActivo]);

  const datos = esSimulado ? datosSimulados : datosReales;
  const x = datos.x || 0;
  const y = datos.y || 0;

  // Criterio de nivelación de la báscula
  const tolerancia = 0.15;
  const estaNivelada = Math.abs(x) <= tolerancia && Math.abs(y) <= tolerancia;

  const obtenerDiagnostico = () => {
    if (estaNivelada) return "Báscula equilibrada y lista para pesar";
    let inclinaciones = [];
    if (x > tolerancia) inclinaciones.push("inclinada a la derecha");
    if (x < -tolerancia) inclinaciones.push("inclinada a la izquierda");
    if (y > tolerancia) inclinaciones.push("inclinada hacia atrás");
    if (y < -tolerancia) inclinaciones.push("inclinada hacia adelante");
    return "Ajustar base: " + inclinaciones.join(" y ");
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Nivelación de Báscula</Text>
      <Text style={styles.descripcion}>
        Apoya el teléfono sobre la tolva o balanza para calibrar la superficie antes del pesaje.
      </Text>

      {/* Origen de los datos */}
      <View style={styles.tarjeta}>
        <View style={styles.seccionTitulo}>
          <Text style={styles.etiqueta}>ORIGEN DEL SENSOR</Text>
          <Text style={[styles.marronTexto, { fontWeight: "bold" }]}>
            {esSimulado ? "SIMULADO" : sensorActivo ? "FÍSICO ACTIVO" : "PAUSADO"}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
          <Pressable
            style={[styles.botonModo, !esSimulado && styles.botonModoActivo]}
            onPress={() => setEsSimulado(false)}
          >
            <Text style={!esSimulado ? styles.textoModoActivo : styles.textoModo}>Sensor Real</Text>
          </Pressable>
          <Pressable
            style={[styles.botonModo, esSimulado && styles.botonModoActivo]}
            onPress={() => setEsSimulado(true)}
          >
            <Text style={esSimulado ? styles.textoModoActivo : styles.textoModo}>Simulador</Text>
          </Pressable>
        </View>
      </View>

      {/* Tarjeta del Nivel de Báscula */}
      <View
        style={[
          styles.tarjeta,
          {
            borderColor: estaNivelada ? VERDE : ROJO,
            borderWidth: 2,
            backgroundColor: estaNivelada ? "#F2FBF5" : "#FFF7F7",
          },
        ]}
      >
        <Text style={[styles.etiqueta, { color: estaNivelada ? VERDE : ROJO, fontWeight: "bold" }]}>
          {estaNivelada ? "✓ SUPERFICIE NIVELADA" : "⚠ DESNIVEL DETECTADO"}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8, color: "#222" }}>
          {obtenerDiagnostico()}
        </Text>

        <View style={styles.gridLecturas}>
          <View style={styles.cajaEje}>
            <Text style={styles.etiquetaEje}>Eje X (Lat)</Text>
            <Text style={styles.valorEje}>{x.toFixed(2)}</Text>
          </View>
          <View style={styles.cajaEje}>
            <Text style={styles.etiquetaEje}>Eje Y (Front)</Text>
            <Text style={styles.valorEje}>{y.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Controles de Simulación para pruebas web o informe */}
      {esSimulado && (
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>PRUEBAS RÁPIDAS DE CAMPO</Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
            <Pressable
              style={styles.botonSimular}
              onPress={() => setDatosSimulados({ x: 0.02, y: -0.01, z: -0.99 })}
            >
              <Text style={styles.textoBotonSim}>Simular Nivelado</Text>
            </Pressable>
            <Pressable
              style={styles.botonSimular}
              onPress={() => setDatosSimulados({ x: -0.65, y: 0.45, z: -0.60 })}
            >
              <Text style={styles.textoBotonSim}>Simular Inclinado</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}