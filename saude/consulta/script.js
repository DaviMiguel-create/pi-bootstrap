// =============================
// 📌 Base de Dados Simulada
// =============================
const professionals = {
  cardiologia: [
    { name: 'Dr. João Silva', specialty: 'Cardiologia' },
    { name: 'Dra. Maria Costa', specialty: 'Cardiologia' },
  ],
  dermatologia: [
    { name: 'Dra. Ana Paula', specialty: 'Dermatologia' },
    { name: 'Dr. Carlos Mendes', specialty: 'Dermatologia' },
  ],
  pediatria: [
    { name: 'Dra. Helena Souza', specialty: 'Pediatria' },
    { name: 'Dr. Pedro Santos', specialty: 'Pediatria' },
  ],
  psicologia: [
    { name: 'Dra. Carla Ribeiro', specialty: 'Psicologia' },
    { name: 'Dr. Lucas Almeida', specialty: 'Psicologia' },
  ],
  odontologia: [
    { name: 'Dra. Fernanda Lima', specialty: 'Odontologia' },
    { name: 'Dr. Rafael Gomes', specialty: 'Odontologia' },
  ],
};

const specialtySelect = document.getElementById('specialty');
const professionalList = document.getElementById('professional-list');

// =============================
// 🔹 Antes: apenas limpava innerHTML
// 🔹 Agora: mantém estrutura Bootstrap intacta
// =============================
function clearProfessionals() {
  professionalList.innerHTML = '';
}

// =============================
// 🔹 Criação do Card Bootstrap
// =============================
function createProfessionalCard(professional) {

  // 🔹 Bootstrap Grid 12 colunas (Mobile-First)
  const col = document.createElement('div');
  col.className = "col-12 col-sm-6 col-md-4";

  const card = document.createElement('div');
  card.className = "card h-100 shadow-sm text-center border-0";

  const cardHeader = document.createElement('div');
  cardHeader.className = "card-header bg-success text-white fw-semibold";
  cardHeader.textContent = professional.specialty;

  const cardBody = document.createElement('div');
  cardBody.className = "card-body d-flex flex-column align-items-center";

  // =============================
  // 🔹 Antes: CSS manual para círculo
  // 🔹 Agora: utilitários Bootstrap
  // =============================
  const initials = professional.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const photo = document.createElement('div');
  photo.className =
    "rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center mb-3 fw-bold";
  photo.style.width = "90px";
  photo.style.height = "90px";
  photo.textContent = initials;

  const name = document.createElement('h5');
  name.className = "card-title text-success fw-bold";
  name.textContent = professional.name;

  const btn = document.createElement('button');

  // 🔹 Antes: botão CSS customizado
  // 🔹 Agora: botão Bootstrap com acessibilidade
  btn.className = "btn btn-success mt-auto";
  btn.textContent = "Marcar Consulta";
  btn.setAttribute("aria-label", `Marcar consulta com ${professional.name}`);

  // =============================
  // 🔹 Agora: usamos Modal + Toast
  // =============================
  btn.addEventListener('click', () => {
    showConfirmationModal(professional.name);
  });

  cardBody.appendChild(photo);
  cardBody.appendChild(name);
  cardBody.appendChild(btn);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

// =============================
// 📌 Evento Select
// =============================
specialtySelect.addEventListener('change', (e) => {

  clearProfessionals();

  const selected = e.target.value;

  // 🔹 Validação visual Bootstrap
  if (!selected) {
    specialtySelect.classList.add("is-invalid");
    return;
  } else {
    specialtySelect.classList.remove("is-invalid");
    specialtySelect.classList.add("is-valid");
  }

  if (professionals[selected]) {
    professionals[selected].forEach((pro) => {
      const card = createProfessionalCard(pro);
      professionalList.appendChild(card);
    });
  }
});


// =====================================================
// 🔹 Modal Bootstrap (substitui alert())
// =====================================================
function showConfirmationModal(name) {

  const modalHtml = `
  <div class="modal fade" id="confirmModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-success text-white">
          <h5 class="modal-title">Confirmar Consulta</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          Deseja confirmar a consulta com <strong>${name}</strong>?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button" class="btn btn-success" id="confirmBtn">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  modal.show();

  document.getElementById("confirmBtn").addEventListener("click", () => {
    modal.hide();
    showToast(`Consulta confirmada com ${name}!`);
  });

  document.getElementById('confirmModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('confirmModal').remove();
  });
}


// =====================================================
// 🔹 Toast Bootstrap (feedback moderno)
// =====================================================
function showToast(message) {

  const toastHtml = `
  <div class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4" role="alert">
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', toastHtml);

  const toastEl = document.querySelector('.toast:last-child');
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });

  toast.show();

  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}
