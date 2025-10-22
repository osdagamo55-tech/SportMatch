// Datos de ejemplo: usuarios disponibles para hacer match
const dummyUsers = [
  {
    id: 1,
    name: "Andrés",
    sport: "Fútbol",
    level: "Intermedio",
    location: "Bogotá",
    availability: "Sábados 9-11",
    capacity: 11
  },
  {
    id: 2,
    name: "Laura",
    sport: "Baloncesto",
    level: "Avanzado",
    location: "Medellín",
    availability: "Domingos 15-17",
    capacity: 5
  },
  {
    id: 3,
    name: "Carlos",
    sport: "Tenis",
    level: "Principiante",
    location: "Bogotá",
    availability: "Miércoles 18-20",
    capacity: 2
  },
  {
    id: 4,
    name: "Camila",
    sport: "Running",
    level: "Principiante",
    location: "Cali",
    availability: "Mañanas",
    capacity: 1
  },
  {
    id: 5,
    name: "Juan",
    sport: "Ciclismo",
    level: "Intermedio",
    location: "Bogotá",
    availability: "Domingos temprano",
    capacity: 1
  },
  {
    id: 6,
    name: "Sofía",
    sport: "Fútbol",
    level: "Avanzado",
    location: "Cartagena",
    availability: "Viernes 20-22",
    capacity: 11
  },
  {
    id: 7,
    name: "Mateo",
    sport: "Baloncesto",
    level: "Principiante",
    location: "Barranquilla",
    availability: "Sábados 10-12",
    capacity: 5
  },
  {
    id: 8,
    name: "María",
    sport: "Tenis",
    level: "Avanzado",
    location: "Bogotá",
    availability: "Lunes 17-19",
    capacity: 2
  }
];

// Variables de estado
let filteredUsers = [...dummyUsers];
let currentIndex = 0;

// Función de inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  // Asignar eventos a botones
  document.getElementById("likeBtn").addEventListener("click", handleLike);
  document.getElementById("skipBtn").addEventListener("click", handleSkip);
  document.getElementById("filterBtn").addEventListener("click", applyFilters);
  // Navegación
  document.getElementById("navHome").addEventListener("click", () => changeSection("home"));
  document.getElementById("navEvents").addEventListener("click", () => changeSection("events"));
  document.getElementById("navChat").addEventListener("click", () => changeSection("chat"));
  document.getElementById("navProfile").addEventListener("click", () => changeSection("profile"));
});

// Renderizar tarjetas de usuario
function renderCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  const endMessage = document.getElementById("endMessage");
  // Si no hay usuarios para mostrar
  if (currentIndex >= filteredUsers.length || filteredUsers.length === 0) {
    endMessage.classList.remove("hidden");
    return;
  }
  endMessage.classList.add("hidden");
  const user = filteredUsers[currentIndex];
  const card = document.createElement("div");
  card.className = "card";
  // Contenido de la tarjeta
  card.innerHTML = `
    <img src="placeholder_light_gray_block.png" alt="Avatar">
    <div class="card-content">
      <div>
        <h3>${user.name}</h3>
        <div>${user.location}</div>
        <div><span class="sport-label">${user.sport}</span> • ${user.level}</div>
        <div>Disponibilidad: ${user.availability}</div>
        <div>Capacidad del deporte: ${user.capacity} ${user.capacity === 1 ? 'persona' : 'personas'}</div>
      </div>
    </div>
  `;
  container.appendChild(card);
}

// Función para dar "like" a un usuario
function handleLike() {
  if (currentIndex >= filteredUsers.length) return;
  const user = filteredUsers[currentIndex];
  // En un sistema real enviaríamos el match al servidor aquí
  alert(`¡Has dado like a ${user.name}! (solo prototipo)`);
  currentIndex++;
  renderCards();
}

// Función para saltar un usuario
function handleSkip() {
  if (currentIndex >= filteredUsers.length) return;
  currentIndex++;
  renderCards();
}

// Aplicar filtros de deporte y nivel
function applyFilters() {
  const sportValue = document.getElementById("sportFilter").value;
  const levelValue = document.getElementById("levelFilter").value;
  filteredUsers = dummyUsers.filter((u) => {
    const sportMatch = sportValue === "all" || u.sport === sportValue;
    const levelMatch = levelValue === "all" || u.level === levelValue;
    return sportMatch && levelMatch;
  });
  currentIndex = 0;
  renderCards();
}

// Cambiar de sección (home, events, chat, profile)
function changeSection(section) {
  // Secciones
  const sections = {
    home: document.getElementById("homeSection"),
    events: document.getElementById("eventsSection"),
    chat: document.getElementById("chatSection"),
    profile: document.getElementById("profileSection"),
  };
  // Navegación
  const navs = {
    home: document.getElementById("navHome"),
    events: document.getElementById("navEvents"),
    chat: document.getElementById("navChat"),
    profile: document.getElementById("navProfile"),
  };
  // Ocultar todas las secciones y quitar clase activa de navegación
  Object.keys(sections).forEach((key) => {
    sections[key].classList.add("hidden");
    sections[key].classList.remove("active");
    navs[key].classList.remove("active");
  });
  // Mostrar la sección seleccionada
  sections[section].classList.remove("hidden");
  sections[section].classList.add("active");
  navs[section].classList.add("active");
}

// Crear evento (solo mostrar mensaje de confirmación en prototipo)
function createEvent() {
  document.getElementById("eventSuccess").classList.remove("hidden");
  // Limpiar formulario
  document.getElementById("eventForm").reset();
  // Ocultar mensaje después de unos segundos
  setTimeout(() => {
    document.getElementById("eventSuccess").classList.add("hidden");
  }, 3000);
}

// Enviar mensaje en chat (prototipo)
function sendMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  const chatWindow = document.getElementById("chatWindow");
  // Crear burbuja de mensaje saliente
  const outgoing = document.createElement("div");
  outgoing.className = "message outgoing";
  outgoing.textContent = text;
  chatWindow.appendChild(outgoing);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  input.value = "";
  // Simular respuesta automática
  setTimeout(() => {
    const incoming = document.createElement("div");
    incoming.className = "message incoming";
    incoming.textContent = "Recibido, nos vemos pronto!";
    chatWindow.appendChild(incoming);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1500);
}