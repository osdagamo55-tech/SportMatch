# SportMatch – Aplicación de emparejamiento deportivo

SportMatch es un prototipo de aplicación móvil que facilita a deportistas amateur y semi‑profesionales encontrar compañeros compatibles para practicar su disciplina preferida.  La idea central es similar a un **Tinder** deportivo: los usuarios se deslizan entre tarjetas de posibles compañeros y deciden con quién desean coincidir.  A diferencia de las aplicaciones de citas, SportMatch tiene en cuenta criterios deportivos (disciplina, nivel, ubicación, disponibilidad y capacidad del equipo) para construir un *match*.

## Objetivo

Los deportistas aficionados suelen experimentar **fricción para encontrar compañeros adecuados** con los que entrenar.  Entrevistas y observación digital (foros, grupos en redes sociales) muestran que los usuarios valoran:

* Filtros por **deporte** y **nivel** para evitar desajustes grandes en habilidad;
* Búsqueda por **ubicación** y disponibilidad horaria cercana;
* **Verificación** básica de perfiles (p. ej. correo o número de teléfono) para evitar cuentas falsas;
* Capacidad de **crear eventos** o “quedadas” para entrenar en grupo;
* Chat en tiempo real para coordinar los encuentros;
* Conocer la **capacidad** o número máximo de deportistas recomendados para cada deporte (p. ej. 11 en fútbol, 5 en baloncesto, 2 en tenis, etc.).

## Arquitectura propuesta

La aplicación completa está pensada como una arquitectura en capas con un cliente móvil y un backend en la nube:

1. **App nativa (Android/iOS)**.  Puede implementarse con tecnologías multiplataforma como *React Native* o *Flutter*.  Las vistas clave son: registro/login, perfil, filtro y lista de coincidencias, chat y eventos.
2. **Backend en la nube**.  Una API REST o GraphQL centraliza la gestión de usuarios, coincidencias, eventos y notificaciones.  Se recomienda una base de datos NoSQL (p. ej. Firestore o DynamoDB) para almacenar usuarios y eventos con alta escalabilidad.
3. **Geolocalización y motor de emparejamiento**.  Para indexar posiciones geográficas de manera eficiente se pueden emplear técnicas como **geohashing** o **quadtrees**.  El geohashing codifica coordenadas latitud‑longitud en cadenas de longitud variable que preservan la proximidad; así, **localizaciones cercanas generan hashes con prefijos comunes**, lo que posibilita búsquedas rápidas de puntos próximos【315827604924390†L152-L174】.  Los quadtrees dividen recursivamente el espacio en cuadrantes y permiten consultas de rango y subdivisión espacial eficientes【315827604924390†L211-L244】.  Estas estructuras facilitan filtrar usuarios en un radio determinado.  
4. **Algoritmo de afinidad**.  Una vez filtrados por proximidad, SportMatch calcula una puntuación de afinidad ponderando deporte, nivel, disponibilidad y preferencias.  De esta forma se generan listas ordenadas de candidatos que luego se muestran como tarjetas para deslizar.
5. **Mensajería en tiempo real y notificaciones push**.  Un servicio de WebSockets o plataformas gestionadas (Firebase Cloud Messaging, Socket.io) permite enviar mensajes instantáneos y notificaciones sobre nuevos matchs o eventos.  
6. **Módulo de analítica**.  Almacena eventos de uso para mejorar el algoritmo de coincidencias y medir qué filtros son más demandados.

### Elección de geohash y quadtrees

El artículo de GeeksforGeeks sobre geohashing y quadtrees para servicios basados en ubicación (actualizado en julio de 2025) explica que **geohashing convierte coordenadas en una cadena que agrupa ubicaciones cercanas**【315827604924390†L152-L174】.  Esta técnica permite realizar búsquedas de proximidad comparando prefijos de hashes.  Los **quadtrees**, por su parte, subdividen el espacio en cuadrantes recursivos y son muy útiles para consultas de rango y manejo de datos con densidad variable【315827604924390†L211-L244】.  La combinación de ambas técnicas permite ofrecer búsquedas rápidas y precisas en función de la ubicación del usuario.

## Estructura del prototipo (PWA)

Para ilustrar la interfaz dinámica se incluye un prototipo de **aplicación web progresiva (PWA)** que reproduce la experiencia móvil.  Se ha desarrollado con **HTML, CSS y JavaScript** puros, evitando dependencias externas para que sea fácilmente ejecutable en cualquier entorno.  Esta PWA se puede abrir desde el navegador móvil y adaptarse al tamaño de pantalla:

```
SportMatch/
├── index.html         # Página principal de la PWA
├── styles.css         # Estilos de la interfaz
├── script.js          # Lógica de la interfaz y emparejamiento
└── README.md          # Este documento
```

### index.html

Contiene la estructura básica de la aplicación: barra de filtros (deporte, nivel, ubicación), contenedor de tarjetas con usuarios y barra de navegación inferior.  Las tarjetas muestran foto (de momento genérica), nombre, deporte, nivel, ubicación y capacidad máxima del deporte.

### styles.css

Define un diseño responsivo con una paleta moderna.  Las tarjetas son flexibles y se pueden deslizar a la izquierda o derecha.  La barra de navegación inferior permite cambiar entre secciones (Home, Eventos, Chat, Perfil).

### script.js

Implementa la lógica de interacción:

* Se define un **array de usuarios de ejemplo**, cada uno con deporte, nivel, ubicación, disponibilidad y capacidad de equipo.
* Las tarjetas se generan dinámicamente y se gestionan mediante un índice.  Cuando el usuario pulsa “Like” o “Skip”, la tarjeta se anima y pasa a la siguiente.
* La sección de filtros permite seleccionar deporte y nivel; al cambiar un filtro, las tarjetas se recargan con usuarios que cumplan los criterios.
* La estructura permite ampliar fácilmente con llamadas a un backend real para obtener usuarios cercanos.

## Próximos pasos

1. **Integrar backend real**: conectar la interfaz con un API para obtener usuarios y enviar coincidencias.
2. **Añadir autenticación y verificación de perfiles**.
3. **Construir chat en tiempo real** usando WebSockets o servicios gestionados.
4. **Implementar creación y gestión de eventos**: permitir a los usuarios crear partidos o entrenamientos y que otros se unan según su disponibilidad.
5. **Publicar app nativa**: migrar la PWA a *React Native* o *Flutter* para ofrecer aplicación nativa en Android/iOS con notificaciones push.

Este prototipo inicial demuestra la interfaz dinámica y sirve como base para iterar y construir la aplicación completa.