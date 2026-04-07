// ==========================================
// ESTADO GLOBAL
// ==========================================
let allPhotos = [];
let currentIndex = 0;
let profileData = {
  name: "Cargando...",
  avatar: ""
};

// ==========================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ==========================================
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1C7FpPMlIsT3CabkTUC56-4Vl_6e2qqXIOfN4INqWJLc/edit?usp=sharing";

const TABS = {
  POSTS: "Posts",
  INFO: "Info",
  PHOTOS: "Fotos",
  PROFILE: "Perfil",
  CHAT: "Chat"
};

const extractSheetId = (url) => {
  if (!url) return null;
  const match = url.trim().match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// ==========================================
// LÓGICA PRINCIPAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Cargado. Iniciando configuración...");
  setupTabs();
  setupChat();
  setupChatToggle();
  setupLightbox();

  const sheetId = extractSheetId(GOOGLE_SHEET_URL);
  console.log("Sheet ID detectado:", sheetId);
  if (sheetId) {
    initData(sheetId);
  }
});

function initData(sheetId) {
  console.log("Iniciando carga coordinada de todas las pestañas...");
  loadSheetData(sheetId, TABS.PROFILE, renderProfileHeader);
  loadSheetData(sheetId, TABS.POSTS, renderPosts);
  loadSheetData(sheetId, TABS.INFO, renderInformation);
  loadSheetData(sheetId, TABS.PHOTOS, renderPhotos);
  loadSheetData(sheetId, TABS.CHAT, renderChat);
}

function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-target'));
      if (target) target.classList.add('active');
    });
  });
}

function setupChat() {
  const chatContainer = document.getElementById('chatMessages');
  if (!chatContainer) return;

  // Usamos delegación de eventos para manejar mensajes dinámicos
  chatContainer.addEventListener('click', (e) => {
    const msg = e.target.closest('.message');
    if (!msg) return;

    if (msg.dataset.suspicious === 'true' && !msg.classList.contains('detected')) {
      msg.classList.add('detected');
      const badge = document.createElement('span');
      badge.className = 'detected-badge';
      badge.innerHTML = '<span class="material-symbols-rounded" style="font-size: 14px; vertical-align: middle;">warning</span> ¡Mensaje sospechoso detectado!';
      msg.prepend(badge);
    }
  });
}

function setupChatToggle() {
  const minimizeBtn = document.getElementById('minimizeChat');
  const launcher = document.getElementById('chatLauncher');
  const chatWindow = document.querySelector('.chat-window');

  if (!minimizeBtn || !launcher || !chatWindow) return;

  minimizeBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
    launcher.classList.remove('hidden');
  });

  launcher.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    launcher.classList.add('hidden');
  });
}

// ==========================================
// LÓGICA DEL LIGHTBOX (CARRUSEL)
// ==========================================
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('prevPhoto');
  const nextBtn = document.getElementById('nextPhoto');

  if (!lightbox || !closeBtn || !prevBtn || !nextBtn) return;

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevPhoto(); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextPhoto(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');

  if (!lightbox || !img) return;

  img.src = allPhotos[currentIndex];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function nextPhoto() {
  if (allPhotos.length === 0) return;
  currentIndex = (currentIndex + 1) % allPhotos.length;
  document.getElementById('lightboxImg').src = allPhotos[currentIndex];
}

function prevPhoto() {
  if (allPhotos.length === 0) return;
  currentIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
  document.getElementById('lightboxImg').src = allPhotos[currentIndex];
}

// ==========================================
// CONEXIÓN ROBUSTA JSONP
// ==========================================
function loadSheetData(sheetId, sheetName, renderFn) {
  const callbackName = 'cb_' + Math.random().toString(36).substr(2, 9);

  window[callbackName] = (response) => {
    if (response.status === 'ok') {
      console.log(`Carga exitosa para pestaña: ${sheetName}`);
      const data = parseGoogleRows(response.table);
      renderFn(data);
    } else {
      console.error(`Error de Google Sheets en pestaña ${sheetName}:`, response);
    }
    delete window[callbackName];
  };

  const script = document.createElement('script');
  script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=responseHandler:${callbackName}&sheet=${encodeURIComponent(sheetName)}&headers=0`;
  document.body.appendChild(script);
}

function parseGoogleRows(table) {
  if (!table.rows || table.rows.length < 2) return [];
  const headerRow = table.rows[0].c;
  const headers = headerRow.map(cell => (cell && cell.v ? String(cell.v).toLowerCase().trim() : ""));

  return table.rows.slice(1).map(row => {
    const item = {};
    row.c.forEach((cell, i) => {
      const key = headers[i];
      if (key) {
        item[key] = cell ? (cell.f ? cell.f : cell.v) : "";
      }
    });
    return item;
  });
}

// ==========================================
// RENDERIZADO
// ==========================================
function renderPosts(posts) {
  const container = document.getElementById('posts-container');
  if (!container) return;
  container.innerHTML = '';

  posts.forEach((post, i) => {
    const txt = post["texto"] || "";
    const img = post["imagen url"] || post["imagenurl"] || post["imagenes url"] || "";
    if (txt || img) {
      container.innerHTML += `
        <div class="post">
          <div class="post-header">
            <img src="${profileData.avatar || 'https://via.placeholder.com/150'}" class="post-avatar">
            <div class="post-meta"><h3>${profileData.name}</h3><p>Publicación #${i + 1}</p></div>
          </div>
          ${txt ? `<p class="post-content">${txt}</p>` : ""}
          ${img ? `<img src="${img}" class="post-image">` : ""}
          <div class="post-actions"><button class="action-btn"><span class="material-symbols-rounded">favorite</span> Me gusta</button></div>
        </div>`;
    }
  });
}

// Helper para buscar valores en objetos de forma flexible (insensible a mayúsculas/minúsculas o espacios)
function getVal(obj, keywords) {
  const key = Object.keys(obj).find(k => {
    const lowerK = k.toLowerCase().trim();
    return keywords.some(kw => lowerK.includes(kw.toLowerCase().trim()));
  });
  return key ? obj[key] : "";
}

function renderProfileHeader(data) {
  console.log("Intentando renderizar Perfil con datos:", data);
  if (!data || data.length === 0) {
    console.warn("No se recibieron datos para el perfil.");
    return;
  }

  const profile = data[0];
  profileData.name = getVal(profile, ["nombre", "usuario", "name"]) || "Usuario";
  profileData.avatar = getVal(profile, ["foto perfil", "fotoperfil", "avatar", "imagen"]) || "";

  console.log("Perfil procesado:", profileData);

  const headerName = document.querySelector('#user-header-details h1');
  const headerImg = document.querySelector('.profile-info .avatar');

  if (headerName) headerName.textContent = profileData.name;
  if (headerImg && profileData.avatar) headerImg.src = profileData.avatar;

  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const avatar = post.querySelector('.post-avatar');
    const name = post.querySelector('.post-meta h3');
    if (avatar && profileData.avatar) avatar.src = profileData.avatar;
    if (name) name.textContent = profileData.name;
  });
}

function renderInformation(items) {
  const container = document.getElementById('profile-container');
  if (!container) return;
  container.innerHTML = '';

  items.forEach(item => {
    const title = item["titulo"] || "Información";
    const value = item["texto"] || "";
    const icon = item["icono url"] || item["icono"] || "";

    if (title || value) {
      container.innerHTML += `
        <div class="fb-info-section">
          <h3 class="fb-info-title">${title}</h3>
          <div class="fb-info-content">
            <div class="fb-info-icon-wrapper">
              ${icon ? `<img src="${icon}" class="fb-info-icon" alt="icono">` : `<span class="material-symbols-rounded">info</span>`}
            </div>
            <div class="fb-info-text">
              <p class="fb-info-main-text">${value}</p>
            </div>
          </div>
        </div>`;
    }
  });
}

function renderPhotos(photos) {
  const container = document.getElementById('photos-container');
  if (!container) return;
  container.innerHTML = '';

  // Guardamos las URLs en el estado global para el carrusel
  allPhotos = photos
    .map(p => p["imagen url"] || p["imagenurl"] || p["imagenes url"])
    .filter(url => url);

  if (allPhotos.length === 0) {
    container.innerHTML = '<p class="empty-msg">No hay fotos cargadas en Hoja 3.</p>';
    return;
  }

  allPhotos.forEach((url, index) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Foto ${index + 1}`;
    img.className = 'photo-item';
    // Evento para abrir el carrusel
    img.onclick = () => openLightbox(index);
    container.appendChild(img);
  });
}

function renderChat(messages) {
  console.log("Intentando renderizar Chat con mensajes:", messages);
  const container = document.getElementById('chatMessages');
  if (!container) return;
  container.innerHTML = '';

  if (!messages || messages.length === 0) {
    console.warn("No hay mensajes para mostrar en el chat.");
    return;
  }

  messages.forEach((msg, index) => {
    const role = (getVal(msg, ["emisor/receptor", "emisor", "receptor", "quien"]) || "").toString().toUpperCase();
    const text = getVal(msg, ["texto", "mensaje", "content"]) || "";

    if (text) {
      const msgDiv = document.createElement('div');
      // EMISOR es el otro (recibido), RECEPTOR es el usuario (sent)
      const isSent = role.includes('RECEPTOR');
      msgDiv.className = `message ${isSent ? 'sent' : 'received'}`;
      
      // Solo el emisor (el otro usuario) puede enviar mensajes sospechosos en este juego
      const suspVal = (getVal(msg, ["sospechoso", "riesgo"]) || "").toString().toUpperCase().trim();
      const isSuspicious = !isSent && suspVal === "SOSPECHOSO";

      if (isSuspicious) {
        msgDiv.classList.add('suspicious');
        msgDiv.dataset.suspicious = "true";
      }
      
      msgDiv.textContent = text;
      container.appendChild(msgDiv);
    }
  });

  // Auto-scroll al final del chat
  container.scrollTop = container.scrollHeight;
}
