// Capacidad objetivo por deporte
const sportCapacities = {
  "Fútbol": 11,
  "Baloncesto": 5,
  "Tenis": 2,
  "Ciclismo": 6,
  "Running": 1,
};

// Datos de ejemplo: usuarios disponibles para hacer match
const dummyUsers = [
  {
    id: 1,
    name: "Andrés",
    sport: "Fútbol",
    level: "Intermedio",
    location: "Bogotá",
    availability: "Sábados 9-11",
    distance: 2.5,
    spotsTaken: 8,
  },
  {
    id: 2,
    name: "Laura",
    sport: "Baloncesto",
    level: "Avanzado",
    location: "Medellín",
    availability: "Domingos 15-17",
    distance: 5,
    spotsTaken: 3,
  },
  {
    id: 3,
    name: "Carlos",
    sport: "Tenis",
    level: "Principiante",
    location: "Bogotá",
    availability: "Miércoles 18-20",
    distance: 1.2,
    spotsTaken: 1,
  },
  {
    id: 4,
    name: "Camila",
    sport: "Running",
    level: "Principiante",
    location: "Cali",
    availability: "Mañanas",
    distance: 3.1,
    spotsTaken: 0,
  },
  {
    id: 5,
    name: "Juan",
    sport: "Ciclismo",
    level: "Intermedio",
    location: "Bogotá",
    availability: "Domingos temprano",
    distance: 4.4,
    spotsTaken: 4,
  },
  {
    id: 6,
    name: "Sofía",
    sport: "Fútbol",
    level: "Avanzado",
    location: "Cartagena",
    availability: "Viernes 20-22",
    distance: 6.3,
    spotsTaken: 9,
  },
  {
    id: 7,
    name: "Mateo",
    sport: "Baloncesto",
    level: "Principiante",
    location: "Barranquilla",
    availability: "Sábados 10-12",
    distance: 1.8,
    spotsTaken: 2,
  },
  {
    id: 8,
    name: "María",
    sport: "Tenis",
    level: "Avanzado",
    location: "Bogotá",
    availability: "Lunes 17-19",
    distance: 2.9,
    spotsTaken: 1,
  },
  {
    id: 9,
    name: "Diego",
    sport: "Ciclismo",
    level: "Avanzado",
    location: "Medellín",
    availability: "Sábados 6-9",
    distance: 3.5,
    spotsTaken: 5,
  },
  {
    id: 10,
    name: "Valentina",
    sport: "Running",
    level: "Intermedio",
    location: "Bogotá",
    availability: "Noches",
    distance: 1.5,
    spotsTaken: 0,
  },
];

const teamRecommendations = [
  {
    title: "Club Fútbol 7 Chapinero",
    sport: "Fútbol",
    schedule: "Sábados 8:00",
    level: "Intermedio",
    current: 8,
    capacity: 11,
    location: "Bogotá",
  },
  {
    title: "Runners Usaquén",
    sport: "Running",
    schedule: "Domingos 7:00",
    level: "Principiante",
    current: 3,
    capacity: 6,
    location: "Bogotá",
  },
  {
    title: "Baloncesto Park League",
    sport: "Baloncesto",
    schedule: "Miércoles 20:00",
    level: "Avanzado",
    current: 4,
    capacity: 5,
    location: "Medellín",
  },
  {
    title: "Grupo Ciclismo Alto de Patios",
    sport: "Ciclismo",
    schedule: "Domingos 6:00",
    level: "Avanzado",
    current: 9,
    capacity: 12,
    location: "Bogotá",
  },
];

const dummyEvents = [
  {
    id: "ev-1",
    sport: "Fútbol",
    level: "Intermedio",
    date: "2024-07-19T14:00",
    location: "Cancha Sintética La 53",
    capacity: 14,
  },
  {
    id: "ev-2",
    sport: "Ciclismo",
    level: "Avanzado",
    date: "2024-07-20T06:00",
    location: "Ciclovía Norte",
    capacity: 20,
  },
];

// Variables de estado
let filteredUsers = [...dummyUsers];
let currentIndex = 0;
let events = [...dummyEvents];

// Función de inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  renderTeamGrid();
  renderEvents();
  updateHeroStats();
  attachListeners();
});

function attachListeners() {
  // Asignar eventos a botones
  document.getElementById("likeBtn").addEventListener("click", handleLike);
  document.getElementById("skipBtn").addEventListener("click", handleSkip);
  document.getElementById("filterBtn").addEventListener("click", applyFilters);
  document.getElementById("navHome").addEventListener("click", () => changeSection("home"));
  document.getElementById("navEvents").addEventListener("click", () => changeSection("events"));
  document.getElementById("navChat").addEventListener("click", () => changeSection("chat"));
  document.getElementById("navProfile").addEventListener("click", () => changeSection("profile"));
  const quickFilters = document.querySelectorAll("#quickFilters .chip");
  quickFilters.forEach((chip) =>
    chip.addEventListener("click", () => {
      quickFilters.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      document.getElementById("sportFilter").value = chip.dataset.sport;
      applyFilters();
    })
  );
}

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
  const capacity = sportCapacities[user.sport] ?? Math.max(user.spotsTaken + 1, 1);
  const projectedTeam = Math.min(user.spotsTaken + 1, capacity);
  const progress = Math.min((projectedTeam / capacity) * 100, 100);
  const spotsLeft = Math.max(capacity - projectedTeam, 0);
  const noun = capacity === 1 ? "participante" : "jugadores";
  // Contenido de la tarjeta
  card.innerHTML = `
    <img src="placeholder_light_gray_block.png" alt="Avatar">
    <div class="card-content">
      <div class="card-header">
        <div>
          <h3>${user.name}</h3>
          <span class="distance-tag">${user.distance.toFixed(1)} km</span>
        </div>
        <div class="distance-tag">${user.sport}</div>
      </div>
      <div class="match-meta">
        <div><strong>Nivel:</strong> ${user.level}</div>
        <div><strong>Ubicación:</strong> ${user.location}</div>
        <div><strong>Disponibilidad:</strong> ${user.availability}</div>
        <div><strong>Capacidad ideal:</strong> ${capacity} ${noun}</div>
      </div>
      <div class="capacity-wrapper">
        <div class="capacity-header">
          <span>Equipo ${projectedTeam} / ${capacity}</span>
          <span>${spotsLeft > 0 ? `${spotsLeft} cupos libres` : "Equipo completo"}</span>
        </div>
        <div class="capacity-bar">
          <div class="capacity-progress" style="width: ${progress}%;"></div>
        </div>
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
  const sport = document.getElementById("eventSport").value;
  const level = document.getElementById("eventLevel").value;
  const date = document.getElementById("eventDate").value;
  const location = document.getElementById("eventLocation").value;
  const capacity = Number(document.getElementById("eventCapacity").value);
  if (!date) return;
  const newEvent = {
    id:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `ev-${Date.now()}`,
    sport,
    level,
    date,
    location,
    capacity,
  };
  events.unshift(newEvent);
  renderEvents();
  document.getElementById("eventSuccess").classList.remove("hidden");
  document.getElementById("eventForm").reset();
  updateHeroStats();
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

function renderTeamGrid() {
  const grid = document.getElementById("teamGrid");
  if (!grid) return;
  grid.innerHTML = "";
  teamRecommendations.forEach((team) => {
    const percentage = Math.min((team.current / team.capacity) * 100, 100);
    const card = document.createElement("article");
    card.className = "team-card";
    card.innerHTML = `
      <header>
        <h3>${team.title}</h3>
        <span class="capacity-pill">${team.sport}</span>
      </header>
      <div class="team-meta">
        <span>Nivel: <strong>${team.level}</strong></span>
        <span>Horario: ${team.schedule}</span>
        <span>Ubicación: ${team.location}</span>
        <span>Capacidad objetivo: ${team.capacity} jugadores</span>
      </div>
      <div class="team-progress"><span style="width: ${percentage}%"></span></div>
      <small>${team.current} integrantes confirmados</small>
    `;
    grid.appendChild(card);
  });
}

function renderEvents() {
  const list = document.getElementById("eventList");
  if (!list) return;
  list.innerHTML = "";
  events.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    const date = new Date(event.date);
    const readableDate = date.toLocaleString("es-CO", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    });
    card.innerHTML = `
      <header>
        <h4>${event.location}</h4>
        <span class="capacity-pill">${event.sport}</span>
      </header>
      <div class="event-meta">
        <span>Fecha: ${readableDate}</span>
        <span>Nivel: ${event.level}</span>
        <span>Capacidad máxima: ${event.capacity} participantes</span>
      </div>
    `;
    list.appendChild(card);
  });
}

function updateHeroStats() {
  const players = document.getElementById("statPlayers");
  const sports = document.getElementById("statSports");
  const eventsCount = document.getElementById("statEvents");
  if (!players || !sports || !eventsCount) return;
  players.textContent = dummyUsers.length;
  const uniqueSports = new Set(dummyUsers.map((user) => user.sport));
  sports.textContent = uniqueSports.size;
  eventsCount.textContent = events.length;
}
