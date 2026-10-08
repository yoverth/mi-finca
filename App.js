import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
  useWindowDimensions,
  StatusBar,
  Platform,
} from "react-native";
import { Accelerometer } from "expo-sensors";

const VERDE = "#0B4D2A";
const VERDE_CLARO = "#B8F0C5";
const CREMA = "#FAF7F1";
const BLANCO = "#FFFFFF";
const MARRON = "#7A4E39";
const DURAZNO = "#FFD8C5";
const DORADO = "#A15C00";
const GRIS = "#ECE9E2";
const ROJO = "#D62828";

/* =========================================================
   DATOS
========================================================= */

const productos = Array.from({ length: 300 }, (_, index) => {
  const categorias = [
    "Fertilizante",
    "Abono",
    "Herramienta",
    "Transporte",
    "Control de broca",
  ];

  const categoria = categorias[index % categorias.length];

  return {
    id: String(index + 1),
    nombre: `${categoria} ${index + 1}`,
    descripcion:
      index % 2 === 0
        ? "Insumo disponible para labores de la finca"
        : "Producto utilizado en las actividades del campo",
    precio: 20000 + (index % 10) * 5000,
    categoria,
  };
});

/* =========================================================
   COMPONENTES GENERALES
========================================================= */

function Encabezado() {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>F</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.nombreFinca}>Finca La Esperanza</Text>
        <Text style={styles.subtituloHeader}>Administración cafetera</Text>
      </View>

      <View style={styles.estado}>
        <View style={styles.punto} />
        <Text style={styles.estadoTexto}>En línea</Text>
      </View>

      <View style={styles.usuario}>
        <Text style={styles.usuarioTexto}>●</Text>
      </View>
    </View>
  );
}

function TarjetaMovimiento({ nombre, detalle, valor, tipo }) {
  return (
    <View style={styles.movimiento}>
      <View style={styles.iconoMovimiento}>
        <Text style={{ fontSize: 20 }}>⚖</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.movimientoNombre}>{nombre}</Text>
        <Text style={styles.movimientoDetalle}>{detalle}</Text>
      </View>

      <View>
        <Text
          style={[
            styles.movimientoValor,
            tipo === "gasto" && { color: ROJO },
          ]}
        >
          {valor}
        </Text>

        <Text style={styles.movimientoTipo}>
          {tipo === "gasto" ? "Insumo" : "Recolección"}
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   INICIO
========================================================= */

function Inicio() {
  return (
    <ScrollView
      contentContainerStyle={styles.contenedor}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.estadoGrande}>
        <Text style={styles.estadoGrandeTexto}>
          ● En línea · Hace 2 min
        </Text>
      </View>

      <View style={styles.bannerVerde}>
        <Text style={styles.saludo}>¡Buenos días!</Text>
        <Text style={styles.ubicacion}>
          Finca La Esperanza — Vereda El Silencio
        </Text>
      </View>

      <View style={styles.alerta}>
        <View style={styles.alertaIcono}>
          <Text style={{ fontSize: 25 }}>⏱</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.alertaTitulo}>ATENCIÓN PENDIENTE</Text>
          <Text style={styles.alertaValor}>$310.000</Text>
          <Text style={styles.alertaDetalle}>
            3 recolectores por liquidar
          </Text>
        </View>

        <Text style={styles.flecha}>›</Text>
      </View>

      <View style={styles.seccionTitulo}>
        <Text style={styles.titulo}>Este mes</Text>
        <Text style={styles.fecha}>Noviembre 2024</Text>
      </View>

      <View style={styles.metrica}>
        <View style={{ flex: 1 }}>
          <Text style={styles.metricaTitulo}>
            ☘ Café Cereza Recolectado
          </Text>

          <Text style={styles.metricaValor}>1.240 kg</Text>

          <Text style={styles.metricaCambio}>↗ +12% vs mes anterior</Text>
        </View>

        <View style={styles.metricaIcono}>
          <Text style={{ fontSize: 30 }}>▣</Text>
        </View>
      </View>

      <View style={styles.metrica}>
        <View style={{ flex: 1 }}>
          <Text style={styles.metricaTitulo}>
            ▤ Gastos Operativos e Insumos
          </Text>

          <Text style={[styles.metricaValor, { color: MARRON }]}>
            $860.000
          </Text>

          <Text style={styles.metricaDescripcion}>
            Abonos, jornales y fletes
          </Text>
        </View>

        <View style={[styles.metricaIcono, { backgroundColor: DURAZNO }]}>
          <Text style={{ fontSize: 30 }}>▣</Text>
        </View>
      </View>

      <Text style={styles.tituloSeccion}>Acciones de Campo</Text>

      <Pressable style={styles.botonVerde}>
        <Text style={styles.botonTexto}>⚖ Registrar recolección</Text>
        <Text style={styles.botonPlus}>⊕</Text>
      </Pressable>

      <Pressable style={styles.botonMarron}>
        <Text style={styles.botonTexto}>▣ Registrar gasto</Text>
        <Text style={styles.botonPlus}>⊕</Text>
      </Pressable>

      <Pressable style={styles.botonDorado}>
        <Text style={styles.botonTexto}>♟ Preguntar al asistente</Text>
        <Text style={styles.botonPlus}>✦</Text>
      </Pressable>

      <View style={styles.seccionTitulo}>
        <Text style={styles.titulo}>Últimos movimientos</Text>
        <Text style={styles.verTodos}>Ver todos</Text>
      </View>

      <TarjetaMovimiento
        nombre="Pedro Morales"
        detalle="Hoy • 11:30 am"
        valor="35 kg"
      />

      <TarjetaMovimiento
        nombre="Abono Cafetero"
        detalle="Ayer • 4:15 pm"
        valor="-$120.000"
        tipo="gasto"
      />

      <TarjetaMovimiento
        nombre="Pago María Gómez"
        detalle="Ayer • 2:00 pm"
        valor="-$80.000"
        tipo="gasto"
      />

      <TarjetaMovimiento
        nombre="Andrés Rivera"
        detalle="Hace 2 días"
        valor="48 kg"
      />
    </ScrollView>
  );
}

/* =========================================================
   RECOLECCIÓN
========================================================= */

function Recoleccion() {
  const [peso, setPeso] = useState(35.5);

  const agregarPeso = (cantidad) => {
    setPeso((actual) => actual + cantidad);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contenedor}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.seccionTitulo}>
        <Text style={styles.titulo}>Nuevo pesaje de café</Text>
        <Text style={styles.fecha}>Hoy</Text>
      </View>

      <View style={styles.tarjeta}>
        <View style={styles.seccionTitulo}>
          <Text style={styles.etiqueta}>RECOLECTOR</Text>
          <Text style={styles.marronTexto}>4 pesajes hoy</Text>
        </View>

        <View style={styles.recolector}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>PM</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.nombreRecolector}>Pedro Morales</Text>
            <Text style={styles.cedula}>Cédula: •••• 4821</Text>
          </View>

          <Pressable style={styles.botonCambiar}>
            <Text>Cambiar⌄</Text>
          </Pressable>
        </View>

        <View style={styles.personas}>
          <Pressable style={styles.personaActiva}>
            <Text style={styles.personaTextoActivo}>PM Pedro</Text>
          </Pressable>

          <Pressable style={styles.persona}>
            <Text>MG María G.</Text>
          </Pressable>

          <Pressable style={styles.persona}>
            <Text>AR Andrés R.</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.seccionTitulo}>
        <Text style={styles.etiqueta}>LOTE COSECHADO</Text>
        <Text style={styles.marronTexto}>Variedad: Castillo</Text>
      </View>

      <View style={styles.lotes}>
        <Pressable style={styles.lote}>
          <Text>Lote 1: Loma</Text>
        </Pressable>

        <Pressable style={styles.loteActivo}>
          <Text style={styles.loteTextoActivo}>✓ Lote 2: Café</Text>
        </Pressable>

        <Pressable style={styles.lote}>
          <Text>Lote 3: Casc...</Text>
        </Pressable>
      </View>

      <View style={styles.tarjetaPesaje}>
        <Text style={styles.pesoTitulo}>Peso en Báscula</Text>

        <Text style={styles.pesoValor}>
          {peso.toFixed(1)}
          <Text style={styles.pesoKg}> kg</Text>
        </Text>

        <View style={styles.tara}>
          <Text>⚖ Tara balde: 1.2 kg descontada</Text>
        </View>

        <View style={styles.controlesPeso}>
          <Pressable
            style={styles.control}
            onPress={() => agregarPeso(5)}
          >
            <Text style={styles.controlNumero}>+5</Text>
            <Text>kg</Text>
          </Pressable>

          <Pressable
            style={styles.control}
            onPress={() => agregarPeso(10)}
          >
            <Text style={styles.controlNumero}>+10</Text>
            <Text>kg</Text>
          </Pressable>

          <Pressable
            style={styles.control}
            onPress={() => agregarPeso(20)}
          >
            <Text style={styles.controlNumero}>+20</Text>
            <Text>kg</Text>
          </Pressable>

          <Pressable
            style={[styles.control, styles.controlRojo]}
            onPress={() => setPeso(0)}
          >
            <Text style={styles.controlNumero}>⌫</Text>
            <Text>Cero</Text>
          </Pressable>
        </View>

        <View style={styles.controlesPequenos}>
          <Pressable
            style={styles.controlPequeno}
            onPress={() => setPeso((p) => Math.max(0, p - 0.5))}
          >
            <Text>- 0.5 kg</Text>
          </Pressable>

          <Pressable
            style={styles.controlPequeno}
            onPress={() => agregarPeso(0.1)}
          >
            <Text>+ 0.1 kg</Text>
          </Pressable>

          <Pressable
            style={styles.controlPequeno}
            onPress={() => agregarPeso(0.5)}
          >
            <Text>+ 0.5 kg</Text>
          </Pressable>
        </View>

        <View style={styles.tarifa}>
          <View>
            <Text style={styles.tarifaTitulo}>Tarifa pactada</Text>
            <Text style={styles.tarifaValor}>$ 1.000 / kg</Text>
          </View>

          <Pressable style={styles.botonCambiar}>
            <Text>Ajustar ✎</Text>
          </Pressable>
        </View>

        <View style={styles.total}>
          <View>
            <Text style={styles.totalTitulo}>TOTAL A PAGAR</Text>
            <Text style={styles.totalTitulo}>AHORA</Text>
            <Text>{peso.toFixed(1)} kg × $1.000</Text>
          </View>

          <Text style={styles.totalValor}>
            ${(peso * 1000).toLocaleString("es-CO")}
          </Text>
        </View>
      </View>

      <View style={styles.nota}>
        <Text style={{ fontSize: 20 }}>♩</Text>
        <Text style={{ flex: 1 }}>¿Grano con broca o verde?</Text>
        <View style={styles.botonNota}>
          <Text>Nota de voz</Text>
        </View>
      </View>

      <Pressable style={styles.guardar}>
        <Text style={styles.guardarTexto}>✓ Guardar Pesaje</Text>
      </Pressable>

      <Pressable style={styles.descartar}>
        <Text style={styles.descartarTexto}>Descartar pesaje</Text>
      </Pressable>
    </ScrollView>
  );
}

/* =========================================================
   GASTOS
========================================================= */

function Gastos() {
  const [categoria, setCategoria] = useState("Fertilizante");

  const movimientos = [
    ["Fertilizante Triple", "- $340.000", "Lote 1"],
    ["Abono Orgánico", "- $120.000", "Lote 2"],
    ["Flete y Transporte", "- $85.000", "General"],
    ["Control de Broca", "- $215.000", "Lote 3"],
    ["Gasolina", "- $100.000", "General"],
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.contenedor}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>GASTOS ACUMULADOS</Text>

        <Text style={styles.gastoTotal}>-$ 860.000</Text>

        <Text style={styles.detalleGasto}>
          5 registros en octubre
        </Text>

        <Text style={styles.mayorGasto}>
          Mayor: Fertilizantes (40%)
        </Text>

        <View style={styles.barra}>
          <View style={[styles.segmento, { flex: 4 }]} />
          <View
            style={[
              styles.segmento,
              { flex: 2, backgroundColor: VERDE },
            ]}
          />
          <View
            style={[
              styles.segmento,
              { flex: 1, backgroundColor: DURAZNO },
            ]}
          />
        </View>
      </View>

      <View style={styles.seccionTitulo}>
        <Text style={styles.tituloPequeno}>
          Filtrar por categoría
        </Text>

        <Text style={styles.verTodos}>Ver todas</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 18 }}
      >
        {["Todos", "Fertilizante", "Abono", "Transporte"].map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setCategoria(item)}
              style={[
                styles.filtro,
                categoria === item && styles.filtroActivo,
              ]}
            >
              <Text
                style={
                  categoria === item
                    ? styles.filtroTextoActivo
                    : styles.filtroTexto
                }
              >
                {categoria === item ? "✓ " : ""}
                {item}
              </Text>
            </Pressable>
          )
        )}
      </ScrollView>

      <View style={styles.seccionTitulo}>
        <Text style={styles.titulo}>Movimientos de Octubre</Text>
        <Text>5 compras</Text>
      </View>

      {movimientos.map((mov, index) => (
        <View style={styles.gastoItem} key={index}>
          <View style={styles.gastoIcono}>
            <Text>▣</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.gastoNombre}>{mov[0]}</Text>
            <Text style={styles.gastoDetalle}>
              {mov[2]} · {16 - index * 2} Oct
            </Text>
          </View>

          <Text style={styles.gastoValor}>{mov[1]}</Text>
        </View>
      ))}

      <Pressable style={styles.botonDorado}>
        <Text style={styles.botonTexto}>⊕ + Nuevo gasto</Text>
      </Pressable>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>Registrar Salida / Gasto</Text>

        <Text style={styles.label}>Categoría de gasto</Text>

        <View style={styles.gridFormulario}>
          {["Fertilizante", "Abono", "Transporte", "Mano de obra"].map(
            (item) => (
              <Pressable
                key={item}
                style={[
                  styles.opcionFormulario,
                  categoria === item && styles.opcionActiva,
                ]}
                onPress={() => setCategoria(item)}
              >
                <Text
                  style={
                    categoria === item
                      ? styles.opcionTextoActivo
                      : styles.opcionTexto
                  }
                >
                  {item}
                </Text>
              </Pressable>
            )
          )}
        </View>

        <Text style={styles.label}>Destino o Lote</Text>

        <View style={styles.gridLotes}>
          {["Lote 1", "Lote 2", "Lote 3", "General"].map(
            (item) => (
              <View style={styles.loteFormulario} key={item}>
                <Text>{item}</Text>
              </View>
            )
          )}
        </View>

        <Text style={styles.label}>Valor a pagar</Text>

        <View style={styles.valorInput}>
          <Pressable style={styles.masMenos}>
            <Text>−</Text>
          </Pressable>

          <Text style={styles.valorGrande}>$ 120.000</Text>

          <Pressable style={styles.masMenos}>
            <Text>+</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Detalle o concepto</Text>

        <View style={styles.concepto}>
          <Text>▤ Bulbo de urea y flete</Text>
        </View>

        <Pressable style={styles.guardar}>
          <Text style={styles.guardarTexto}>✓ Guardar gasto</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

/* =========================================================
   TRABAJADORES
========================================================= */

function Trabajadores() {
  const trabajadores = [
    ["Pedro Morales", "Recolector", "35 kg"],
    ["María Gómez", "Recolectora", "42 kg"],
    ["Andrés Rivera", "Recolector", "48 kg"],
    ["Carlos López", "Recolector", "31 kg"],
  ];

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Trabajadores</Text>

      <Text style={styles.descripcion}>
        Recolectores registrados en Finca La Esperanza
      </Text>

      {trabajadores.map((trabajador) => (
        <View style={styles.trabajador} key={trabajador[0]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              {trabajador[0]
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.nombreRecolector}>
              {trabajador[0]}
            </Text>

            <Text style={styles.cedula}>{trabajador[1]}</Text>
          </View>

          <Text style={styles.pesoTrabajador}>
            {trabajador[2]}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

/* =========================================================
   ADAPTACIÓN
========================================================= */

function ResumenCatalogo({ width }) {
  const esDispositivoGrande = width >= 600;

  const tipoDispositivo =
    width >= 900
      ? "Pantalla grande"
      : width >= 600
      ? "Tableta"
      : "Teléfono";

  const esTableta = width >= 600;
  const esPantallaGrande = width >= 900;

  let columnas = 1;

  if (esPantallaGrande) {
    columnas = 3;
  } else if (esTableta) {
    columnas = 2;
  }

  return (
    <View
      style={[
        styles.resumen,
        esDispositivoGrande && styles.resumenGrande,
      ]}
    >
      <View>
        <Text style={styles.resumenTitulo}>
          Resumen del catálogo
        </Text>
      </View>

      <View style={styles.resumenDato}>
        <Text style={styles.resumenEtiqueta}>Productos</Text>
        <Text style={styles.resumenValor}>
          {productos.length}
        </Text>
      </View>

      <View style={styles.resumenDato}>
        <Text style={styles.resumenEtiqueta}>Dispositivo</Text>
        <Text style={styles.resumenValor}>
          {tipoDispositivo}
        </Text>
      </View>

      <View style={styles.resumenDato}>
        <Text style={styles.resumenEtiqueta}>Columnas</Text>
        <Text style={styles.resumenValor}>{columnas}</Text>
      </View>
    </View>
  );
}

function TarjetaProducto({ producto }) {
  return (
    <View style={styles.producto}>
      <View style={styles.productoIcono}>
        <Text>☘</Text>
      </View>

      <Text style={styles.productoNombre}>
        {producto.nombre}
      </Text>

      <Text style={styles.productoDescripcion}>
        {producto.descripcion}
      </Text>

      <Text style={styles.productoCategoria}>
        {producto.categoria}
      </Text>

      <Text style={styles.productoPrecio}>
        ${producto.precio.toLocaleString("es-CO")}
      </Text>
    </View>
  );
}

/* =========================================================
   CATÁLOGO ORIGINAL
========================================================= */

function CatalogoOriginal() {
  return (
    <ScrollView
      contentContainerStyle={styles.catalogoContenido}
      showsVerticalScrollIndicator={false}
    >
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
        />
      ))}
    </ScrollView>
  );
}

/* =========================================================
   CATÁLOGO OPTIMIZADO
========================================================= */

function CatalogoOptimizado() {
  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id}
      initialNumToRender={12}
      renderItem={({ item }) => (
        <TarjetaProducto producto={item} />
      )}
      contentContainerStyle={styles.catalogoContenido}
      showsVerticalScrollIndicator={false}
    />
  );
}

/* =========================================================
   CATÁLOGO ADAPTATIVO
========================================================= */

function CatalogoAdaptativo({ width }) {
  const esTableta = width >= 600;
  const esPantallaGrande = width >= 900;

  let columnas = 1;

  if (esPantallaGrande) {
    columnas = 3;
  } else if (esTableta) {
    columnas = 2;
  }

  return (
    <View style={{ flex: 1 }}>
      <ResumenCatalogo width={width} />

      <FlatList
        data={productos}
        numColumns={columnas}
        key={columnas}
        keyExtractor={(item) => item.id}
        initialNumToRender={12}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <TarjetaProducto producto={item} />
          </View>
        )}
        contentContainerStyle={styles.catalogoContenido}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

/* =========================================================
   PANTALLA SENSORES (SESIÓN 6 + MEJORAS PROPIAS C y D)
========================================================= */

function PantallaSensores() {
  const [esSimulado, setEsSimulado] = useState(Platform.OS === "web");
  const [sensorActivo, setSensorActivo] = useState(true);
  const [disponible, setDisponible] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const [datosReales, setDatosReales] = useState({ x: 0, y: 0, z: 0 });
  const [datosSimulados, setDatosSimulados] = useState({ x: 0, y: 0, z: 0 });

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
            setMensajeError("Acelerómetro no disponible en este dispositivo/entorno.");
          }
        })
        .catch((err) => {
          setMensajeError("Error al verificar acelerómetro: " + err.message);
        });
    }

    return () => {
      if (suscripcion) {
        suscripcion.remove();
      }
    };
  }, [esSimulado, sensorActivo]);

  const datosActuales = esSimulado ? datosSimulados : datosReales;
  const x = datosActuales.x || 0;
  const y = datosActuales.y || 0;
  const z = datosActuales.z || 0;

  // Lógica didáctica de inclinación
  let estadoInclinacion = "Centro";
  let alineacionCirculo = "center";

  if (x > 0.5) {
    estadoInclinacion = "Derecha";
    alineacionCirculo = "flex-end";
  } else if (x < -0.5) {
    estadoInclinacion = "Izquierda";
    alineacionCirculo = "flex-start";
  }

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Sensor Acelerómetro</Text>
      <Text style={styles.descripcion}>
        Detección de inclinación física y nivel de calibración para básculas de campo.
      </Text>

      {/* Origen y Modo */}
      <View style={styles.tarjeta}>
        <View style={styles.seccionTitulo}>
          <Text style={styles.etiqueta}>MODO DE EJECUCIÓN</Text>
          <Text style={[styles.marronTexto, { fontWeight: "bold" }]}>
            {esSimulado ? "SIMULADO" : sensorActivo ? "FÍSICO ACTIVO" : "FÍSICO PAUSADO"}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
          <Pressable
            style={[styles.botonModo, !esSimulado && styles.botonModoActivo]}
            onPress={() => {
              if (Platform.OS === "web") {
                alert("En web se recomienda utilizar el modo simulación.");
              }
              setEsSimulado(false);
            }}
          >
            <Text style={!esSimulado ? styles.textoModoActivo : styles.textoModo}>
              Sensor Real
            </Text>
          </Pressable>

          <Pressable
            style={[styles.botonModo, esSimulado && styles.botonModoActivo]}
            onPress={() => setEsSimulado(true)}
          >
            <Text style={esSimulado ? styles.textoModoActivo : styles.textoModo}>
              Modo Simulado
            </Text>
          </Pressable>
        </View>

        {/* Mejora D: Pausa de escucha de hardware */}
        {!esSimulado && (
          <Pressable
            style={[
              styles.botonPausa,
              { backgroundColor: sensorActivo ? ROJO : VERDE },
            ]}
            onPress={() => setSensorActivo((prev) => !prev)}
          >
            <Text style={{ color: BLANCO, fontWeight: "bold" }}>
              {sensorActivo ? "⏸ Pausar Sensor Real" : "▶ Activar Sensor Real"}
            </Text>
          </Pressable>
        )}

        {mensajeError !== "" && !esSimulado && (
          <Text style={{ color: ROJO, marginTop: 8, fontSize: 13 }}>
            {mensajeError}
          </Text>
        )}
      </View>

      {/* Lecturas numéricas X, Y, Z */}
      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>LECTURAS EN TIEMPO REAL (g)</Text>
        <View style={styles.gridLecturas}>
          <View style={styles.cajaEje}>
            <Text style={styles.etiquetaEje}>Eje X</Text>
            <Text style={styles.valorEje}>{x.toFixed(2)}</Text>
          </View>
          <View style={styles.cajaEje}>
            <Text style={styles.etiquetaEje}>Eje Y</Text>
            <Text style={styles.valorEje}>{y.toFixed(2)}</Text>
          </View>
          <View style={styles.cajaEje}>
            <Text style={styles.etiquetaEje}>Eje Z</Text>
            <Text style={styles.valorEje}>{z.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Mejora C: Indicador con Tres Zonas y Nivel Activo */}
      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>NIVEL DIDÁCTICO DE CALIBRACIÓN</Text>
        <Text style={{ textAlign: "center", fontSize: 16, marginVertical: 8, fontWeight: "bold", color: VERDE }}>
          Orientación: {estadoInclinacion.toUpperCase()}
        </Text>

        <View style={styles.contenedorTresZonas}>
          <View
            style={[
              styles.zonaNivel,
              estadoInclinacion === "Izquierda" && styles.zonaNivelActiva,
            ]}
          >
            <Text style={estadoInclinacion === "Izquierda" ? styles.zonaTextoActivo : styles.zonaTexto}>
              Izquierda (X &lt; -0.5)
            </Text>
          </View>

          <View
            style={[
              styles.zonaNivel,
              estadoInclinacion === "Centro" && styles.zonaNivelActiva,
            ]}
          >
            <Text style={estadoInclinacion === "Centro" ? styles.zonaTextoActivo : styles.zonaTexto}>
              Centro (±0.5)
            </Text>
          </View>

          <View
            style={[
              styles.zonaNivel,
              estadoInclinacion === "Derecha" && styles.zonaNivelActiva,
            ]}
          >
            <Text style={estadoInclinacion === "Derecha" ? styles.zonaTextoActivo : styles.zonaTexto}>
              Derecha (X &gt; 0.5)
            </Text>
          </View>
        </View>

        {/* Pista de desplazamiento con círculo */}
        <View style={[styles.pistaSensor, { alignItems: alineacionCirculo }]}>
          <View style={styles.circuloNivel}>
            <Text style={{ color: BLANCO, fontSize: 11, fontWeight: "bold" }}>
              {estadoInclinacion[0]}
            </Text>
          </View>
        </View>
      </View>

      {/* Controles de Simulación */}
      {esSimulado && (
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>CONTROLES MANUALES (SIMULADOR)</Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <Pressable
              style={styles.botonSimular}
              onPress={() => setDatosSimulados({ x: -0.75, y: 0.1, z: 0.6 })}
            >
              <Text style={styles.textoBotonSim}>← Izquierda</Text>
            </Pressable>

            <Pressable
              style={styles.botonSimular}
              onPress={() => setDatosSimulados({ x: 0.05, y: 0.02, z: 0.98 })}
            >
              <Text style={styles.textoBotonSim}>• Centrar</Text>
            </Pressable>

            <Pressable
              style={styles.botonSimular}
              onPress={() => setDatosSimulados({ x: 0.8, y: 0.1, z: 0.5 })}
            >
              <Text style={styles.textoBotonSim}>Derecha →</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

/* =========================================================
   CATÁLOGO PRINCIPAL (CONSERVA TODAS LAS VERSIONES + SENSORES)
========================================================= */

function Catalogo() {
  const { width } = useWindowDimensions();
  const [version, setVersion] = useState("Adaptativa");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.catalogoHeader}>
        <Text style={styles.titulo}>Catálogo e Instrumentación</Text>
        <Text style={styles.descripcion}>
          Comparación de rendimiento, layouts y sensores
        </Text>
      </View>

      <View style={styles.versiones}>
        {["Original", "Optimizada", "Adaptativa", "Sensores"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setVersion(item)}
            style={[
              styles.version,
              version === item && styles.versionActiva,
            ]}
          >
            <Text
              style={
                version === item
                  ? styles.versionTextoActivo
                  : styles.versionTexto
              }
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {version === "Original" && <CatalogoOriginal />}
      {version === "Optimizada" && <CatalogoOptimizado />}
      {version === "Adaptativa" && <CatalogoAdaptativo width={width} />}
      {version === "Sensores" && <PantallaSensores />}
    </View>
  );
}

/* =========================================================
   ASISTENTE
========================================================= */

function Asistente() {
  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Asistente de la finca</Text>

      <Text style={styles.descripcion}>
        Consulta información sobre recolección, gastos,
        trabajadores e insumos.
      </Text>

      <View style={styles.asistente}>
        <Text style={styles.asistenteTitulo}>
          ¿En qué puedo ayudarte?
        </Text>

        <Pressable style={styles.pregunta}>
          <Text>¿Cuánto café se recolectó este mes?</Text>
        </Pressable>

        <Pressable style={styles.pregunta}>
          <Text>¿Cuáles fueron los mayores gastos?</Text>
        </Pressable>

        <Pressable style={styles.pregunta}>
          <Text>¿Cuánto debo pagar a los recolectores?</Text>
        </Pressable>

        <Pressable style={styles.pregunta}>
          <Text>¿Qué insumos tenemos registrados?</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

/* =========================================================
   APP PRINCIPAL
========================================================= */

export default function App() {
  const [pantalla, setPantalla] = useState("Inicio");

  const opciones = [
    ["Inicio", "⌂"],
    ["Recolección", "⚖"],
    ["Gastos", "$"],
    ["Trabajadores", "♟"],
    ["Sensores", "◎"],
    ["Asistente", "✦"],
  ];

  const contenido = useMemo(() => {
    switch (pantalla) {
      case "Inicio":
        return <Inicio />;
      case "Recolección":
        return <Recoleccion />;
      case "Gastos":
        return <Gastos />;
      case "Trabajadores":
        return <Trabajadores />;
      case "Sensores":
        return <PantallaSensores />;
      case "Asistente":
        return <Asistente />;
      default:
        return <Inicio />;
    }
  }, [pantalla]);

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor={CREMA} />

      <Encabezado />

      {contenido}

      <Pressable
        style={styles.botonCatalogoFlotante}
        onPress={() => setPantalla("Catalogo")}
      >
        <Text style={styles.botonCatalogoTexto}>Catálogo</Text>
      </Pressable>

      <View style={styles.navegacion}>
        {opciones.map(([nombre, icono]) => (
          <Pressable
            key={nombre}
            style={styles.navItem}
            onPress={() => setPantalla(nombre)}
          >
            <Text
              style={[
                styles.navIcono,
                pantalla === nombre && styles.navIconoActivo,
              ]}
            >
              {icono}
            </Text>

            <Text
              style={[
                styles.navTexto,
                pantalla === nombre && styles.navTextoActivo,
              ]}
            >
              {nombre}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/* =========================================================
   ESTILOS
========================================================= */

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: CREMA,
  },

  header: {
    minHeight: 75,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CREMA,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE8DD",
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: VERDE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logoText: {
    color: BLANCO,
    fontSize: 25,
    fontWeight: "bold",
  },

  nombreFinca: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#183C28",
  },

  subtituloHeader: {
    fontSize: 12,
    color: MARRON,
    marginTop: 2,
  },

  estado: {
    backgroundColor: VERDE_CLARO,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },

  punto: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: VERDE,
    marginRight: 5,
  },

  estadoTexto: {
    color: "#173D28",
  },

  usuario: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: VERDE,
    alignItems: "center",
    justifyContent: "center",
  },

  usuarioTexto: {
    color: BLANCO,
    fontSize: 20,
  },

  contenedor: {
    padding: 18,
    paddingBottom: 120,
  },

  bannerVerde: {
    backgroundColor: "#27653D",
    marginHorizontal: -18,
    paddingHorizontal: 24,
    paddingVertical: 30,
    marginBottom: 0,
  },

  estadoGrande: {
    backgroundColor: "#EFF0E9",
    padding: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 8,
  },

  estadoGrandeTexto: {
    color: "#47614D",
  },

  saludo: {
    color: BLANCO,
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 6,
  },

  ubicacion: {
    color: "#CDE5D4",
    fontSize: 15,
  },

  alerta: {
    backgroundColor: DURAZNO,
    borderRadius: 15,
    padding: 18,
    marginTop: -18,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  alertaIcono: {
    width: 52,
    height: 52,
    borderRadius: 28,
    backgroundColor: "#FFE6D1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  alertaTitulo: {
    fontSize: 13,
    color: MARRON,
    letterSpacing: 1,
  },

  alertaValor: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 3,
  },

  alertaDetalle: {
    fontSize: 14,
    color: "#6F4939",
  },

  flecha: {
    fontSize: 32,
  },

  seccionTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  titulo: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#181612",
  },

  tituloPequeno: {
    fontSize: 15,
    fontWeight: "bold",
  },

  tituloSeccion: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 12,
  },

  fecha: {
    fontSize: 14,
    color: "#4B4B44",
  },

  verTodos: {
    color: VERDE,
    fontWeight: "bold",
  },

  metrica: {
    backgroundColor: BLANCO,
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },

  metricaTitulo: {
    fontSize: 15,
    color: "#34322E",
  },

  metricaValor: {
    fontSize: 30,
    fontWeight: "bold",
    color: VERDE,
    marginVertical: 6,
  },

  metricaCambio: {
    color: VERDE,
  },

  metricaDescripcion: {
    color: "#655D55",
  },

  metricaIcono: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: VERDE_CLARO,
    alignItems: "center",
    justifyContent: "center",
  },

  botonVerde: {
    backgroundColor: VERDE,
    borderRadius: 13,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  botonMarron: {
    backgroundColor: MARRON,
    borderRadius: 13,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  botonDorado: {
    backgroundColor: "#965800",
    borderRadius: 13,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  botonTexto: {
    color: BLANCO,
    fontSize: 17,
    fontWeight: "bold",
  },

  botonPlus: {
    color: BLANCO,
    fontSize: 24,
  },

  movimiento: {
    backgroundColor: BLANCO,
    borderRadius: 14,
    padding: 14,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  iconoMovimiento: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: VERDE_CLARO,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  movimientoNombre: {
    fontWeight: "bold",
    fontSize: 15,
  },

  movimientoDetalle: {
    color: "#69645E",
    marginTop: 3,
  },

  movimientoValor: {
    color: VERDE,
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "right",
  },

  movimientoTipo: {
    color: "#77716A",
    textAlign: "right",
    marginTop: 4,
  },

  tarjeta: {
    backgroundColor: BLANCO,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  etiqueta: {
    fontSize: 14,
    letterSpacing: 1,
    color: "#625D55",
  },

  marronTexto: {
    color: MARRON,
    fontSize: 14,
  },

  recolector: {
    backgroundColor: "#F3F0E9",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 28,
    backgroundColor: "#FFD0BA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarTexto: {
    color: MARRON,
    fontSize: 19,
    fontWeight: "bold",
  },

  nombreRecolector: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cedula: {
    color: "#5E5B56",
    marginTop: 2,
  },

  botonCambiar: {
    backgroundColor: "#E6E2DA",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 22,
  },

  personas: {
    flexDirection: "row",
    gap: 8,
  },

  persona: {
    backgroundColor: "#F0ECE5",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  personaActiva: {
    backgroundColor: VERDE,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  personaTextoActivo: {
    color: BLANCO,
  },

  lotes: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },

  lote: {
    flex: 1,
    backgroundColor: BLANCO,
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
  },

  loteActivo: {
    flex: 1,
    backgroundColor: VERDE,
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
  },

  loteTextoActivo: {
    color: BLANCO,
    fontWeight: "bold",
  },

  tarjetaPesaje: {
    backgroundColor: BLANCO,
    padding: 20,
    borderRadius: 17,
    marginBottom: 16,
  },

  pesoTitulo: {
    textAlign: "center",
    color: "#45423D",
    fontSize: 17,
  },

  pesoValor: {
    textAlign: "center",
    color: VERDE,
    fontSize: 58,
    fontWeight: "bold",
    marginVertical: 3,
  },

  pesoKg: {
    color: MARRON,
    fontSize: 25,
  },

  tara: {
    backgroundColor: "#ECEAE4",
    borderRadius: 20,
    padding: 8,
    alignSelf: "center",
    marginBottom: 20,
  },

  controlesPeso: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  control: {
    flex: 1,
    backgroundColor: "#F0EDE7",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  controlNumero: {
    fontSize: 22,
  },

  controlRojo: {
    backgroundColor: "#FFD5D5",
  },

  controlesPequenos: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  controlPequeno: {
    flex: 1,
    backgroundColor: "#ECE9E3",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  tarifa: {
    backgroundColor: "#F3F0E9",
    padding: 15,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  tarifaTitulo: {
    color: "#5D574F",
  },

  tarifaValor: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },

  total: {
    backgroundColor: DURAZNO,
    padding: 18,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalTitulo: {
    color: "#754632",
    fontWeight: "bold",
    fontSize: 16,
  },

  totalValor: {
    fontSize: 30,
    fontWeight: "bold",
  },

  nota: {
    backgroundColor: BLANCO,
    padding: 15,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },

  botonNota: {
    backgroundColor: "#ECE9E3",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 20,
  },

  guardar: {
    backgroundColor: VERDE,
    borderRadius: 13,
    padding: 17,
    alignItems: "center",
    marginBottom: 10,
  },

  guardarTexto: {
    color: BLANCO,
    fontSize: 17,
    fontWeight: "bold",
  },

  descartar: {
    backgroundColor: "#EFECE5",
    borderRadius: 13,
    padding: 17,
    alignItems: "center",
  },

  descartarTexto: {
    color: MARRON,
    fontWeight: "bold",
  },

  gastoTotal: {
    fontSize: 27,
    color: MARRON,
    fontWeight: "bold",
    marginVertical: 8,
  },

  detalleGasto: {
    color: "#55514B",
    marginTop: 5,
  },

  mayorGasto: {
    color: MARRON,
    fontWeight: "bold",
    marginTop: 6,
  },

  barra: {
    height: 8,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#DDD",
  },

  segmento: {
    backgroundColor: MARRON,
  },

  filtro: {
    backgroundColor: "#ECE9E3",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },

  filtroActivo: {
    backgroundColor: VERDE,
  },

  filtroTexto: {
    color: "#333",
  },

  filtroTextoActivo: {
    color: BLANCO,
    fontWeight: "bold",
  },

  gastoItem: {
    backgroundColor: BLANCO,
    borderRadius: 13,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  gastoIcono: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: DURAZNO,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  gastoNombre: {
    fontWeight: "bold",
  },

  gastoDetalle: {
    color: "#777",
    marginTop: 3,
  },

  gastoValor: {
    color: MARRON,
    fontSize: 16,
    fontWeight: "bold",
  },

  formulario: {
    backgroundColor: BLANCO,
    borderRadius: 15,
    padding: 18,
    marginTop: 10,
  },

  label: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },

  gridFormulario: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  opcionFormulario: {
    width: "48%",
    backgroundColor: "#EEEAE3",
    padding: 13,
    borderRadius: 10,
  },

  opcionActiva: {
    backgroundColor: VERDE,
  },

  opcionTexto: {
    color: "#333",
  },

  opcionTextoActivo: {
    color: BLANCO,
  },

  gridLotes: {
    flexDirection: "row",
    gap: 7,
  },

  loteFormulario: {
    flex: 1,
    padding: 12,
    backgroundColor: "#EEEAE3",
    borderRadius: 9,
    alignItems: "center",
  },

  valorInput: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  masMenos: {
    backgroundColor: "#EEEAE3",
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  valorGrande: {
    flex: 1,
    backgroundColor: "#F4F1EA",
    padding: 12,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    color: MARRON,
  },

  concepto: {
    backgroundColor: "#F4F1EA",
    padding: 15,
    borderRadius: 10,
    marginBottom: 18,
  },

  trabajador: {
    backgroundColor: BLANCO,
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  pesoTrabajador: {
    color: VERDE,
    fontWeight: "bold",
    fontSize: 18,
  },

  descripcion: {
    color: "#67635D",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 20,
  },

  asistente: {
    backgroundColor: BLANCO,
    padding: 18,
    borderRadius: 16,
  },

  asistenteTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  pregunta: {
    backgroundColor: "#F0ECE5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 9,
  },

  catalogoHeader: {
    padding: 18,
    paddingBottom: 8,
  },

  versiones: {
    flexDirection: "row",
    backgroundColor: "#EEEAE3",
    marginHorizontal: 18,
    borderRadius: 25,
    padding: 4,
    marginBottom: 8,
  },

  version: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 21,
  },

  versionActiva: {
    backgroundColor: VERDE,
  },

  versionTexto: {
    color: "#555",
    fontSize: 12,
  },

  versionTextoActivo: {
    color: BLANCO,
    fontWeight: "bold",
  },

  resumen: {
    backgroundColor: BLANCO,
    marginHorizontal: 18,
    marginBottom: 8,
    padding: 16,
    borderRadius: 14,
  },

  resumenGrande: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resumenTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: VERDE,
    marginBottom: 8,
  },

  resumenDato: {
    marginTop: 4,
  },

  resumenEtiqueta: {
    fontSize: 12,
    color: "#6A665E",
  },

  resumenValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  catalogoContenido: {
    padding: 18,
    paddingBottom: 120,
  },

  producto: {
    backgroundColor: BLANCO,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    marginHorizontal: 4,
    flex: 1,
    minHeight: 150,
    elevation: 1,
  },

  productoIcono: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: VERDE_CLARO,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  productoNombre: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
  },

  productoDescripcion: {
    fontSize: 12,
    color: "#716D66",
    marginTop: 5,
    lineHeight: 17,
  },

  productoCategoria: {
    fontSize: 11,
    color: VERDE,
    marginTop: 8,
  },

  productoPrecio: {
    color: MARRON,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },

  botonCatalogoFlotante: {
    position: "absolute",
    right: 18,
    bottom: 78,
    backgroundColor: DORADO,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 22,
    elevation: 5,
  },

  botonCatalogoTexto: {
    color: BLANCO,
    fontWeight: "bold",
  },

  navegacion: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BLANCO,
    borderTopWidth: 1,
    borderTopColor: "#E7E2D8",
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  navItem: {
    alignItems: "center",
    flex: 1,
  },

  navIcono: {
    fontSize: 21,
    color: "#242E27",
  },

  navIconoActivo: {
    color: VERDE,
  },

  navTexto: {
    fontSize: 10,
    marginTop: 2,
    color: "#333",
  },

  navTextoActivo: {
    color: VERDE,
    fontWeight: "bold",
  },

  /* Estilos específicos de Sensores */
  botonModo: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#EEEAE3",
  },
  botonModoActivo: {
    backgroundColor: VERDE,
  },
  textoModo: {
    color: "#444",
    fontWeight: "bold",
  },
  textoModoActivo: {
    color: BLANCO,
    fontWeight: "bold",
  },
  botonPausa: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  gridLecturas: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  cajaEje: {
    flex: 1,
    backgroundColor: "#F4F1EA",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  etiquetaEje: {
    fontSize: 12,
    color: MARRON,
    fontWeight: "bold",
  },
  valorEje: {
    fontSize: 20,
    fontWeight: "bold",
    color: VERDE,
    marginTop: 4,
  },
  contenedorTresZonas: {
    flexDirection: "row",
    gap: 4,
    marginTop: 6,
    marginBottom: 12,
  },
  zonaNivel: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#EEEAE3",
    borderRadius: 8,
  },
  zonaNivelActiva: {
    backgroundColor: VERDE,
  },
  zonaTexto: {
    fontSize: 10,
    color: "#666",
  },
  zonaTextoActivo: {
    fontSize: 10,
    color: BLANCO,
    fontWeight: "bold",
  },
  pistaSensor: {
    height: 44,
    backgroundColor: "#E4DFD5",
    borderRadius: 22,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  circuloNivel: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: MARRON,
    alignItems: "center",
    justifyContent: "center",
  },
  botonSimular: {
    flex: 1,
    backgroundColor: "#E4DFD5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotonSim: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#222",
  },
});