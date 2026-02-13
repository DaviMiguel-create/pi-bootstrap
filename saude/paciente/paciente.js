// =====================================================
// 🔹 Base de dados simulada
// =====================================================
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


// =====================================================
// 🔹 Limpar lista
// =====================================================
function clearProfessionals() {
  professionalList.innerHTML = '';
}


// =====================================================
// 🔥 Criar Card Bootstrap Avançado
// =====================================================
function createProfessionalCard(professional) {

  // Grid Mobile-First
  const col = document.createElement('div');
  col.className = "col-12 col-sm-6 col-lg-4";

  const card = document.createElement('div');
  card.className = "card shadow-sm h-100 border-0 text-center";

  const header = document.createElement('div');
  header.className = "card-header bg-success text-white fw-semibold";
  header.textContent = professional.specialty;

  const body = document.createElement('div');
  body.className = "card-body d-flex flex-column align-items-center";

  // Iniciais
  const initials = professional.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const photo = document.createElement('div');
  photo.className =
    "rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center mb-3 fw-bold";
  photo.style.width = "110px";
  photo.style.height = "110px";
  photo.style.fontSize = "2rem";
  photo.textContent = initials;

  const name = document.createElement('h5');
  name.className = "card-title fw-bold text-success";
  name.textContent = professional.name;

  const btn = document.createElement('button');
  btn.className = "btn btn-success mt-auto";
  btn.textContent = "Marcar Consulta";

  btn.addEventListener('click', () => {
    showConfirmationModal(professional.name);
  });

  body.appendChild(photo);
  body.appendChild(name);
  body.appendChild(btn);

  card.appendChild(header);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}


// =====================================================
// 🔹 Evento Select + Validação Bootstrap
// =====================================================
specialtySelect.addEventListener('change', (e) => {

  clearProfessionals();

  const selected = e.target.value;

  if (!selected) {
    specialtySelect.classList.add("is-invalid");
    specialtySelect.classList.remove("is-valid");
    return;
  } else {
    specialtySelect.classList.remove("is-invalid");
    specialtySelect.classList.add("is-valid");
  }

  if (professionals[selected]) {
    professionals[selected].forEach((pro) => {
      professionalList.appendChild(createProfessionalCard(pro));
    });
  }
});


// =====================================================
// 🔥 Modal Bootstrap (substitui alert())
// =====================================================
function showConfirmationModal(name) {

  const modalHtml = `
  <div class="modal fade" id="confirmModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header bg-success text-white">
          <h5 class="modal-title">Confirmar Consulta</h5>
          <button type="button"
                  class="btn-close btn-close-white"
                  data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          Deseja confirmar a consulta com <strong>${name}</strong>?
        </div>

        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button"
                  class="btn btn-success"
                  id="confirmBtn">
            Confirmar
          </button>
        </div>

      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
  modal.show();

  document.getElementById("confirmBtn").addEventListener("click", () => {
    modal.hide();
    showToast(`Consulta confirmada com ${name}!`, "success");
  });

  document.getElementById("confirmModal")
    .addEventListener("hidden.bs.modal", () => {
      document.getElementById("confirmModal").remove();
    });
}


// =====================================================
// 🔥 Toast Bootstrap
// =====================================================
function showToast(message, type) {

  const toastHtml = `
    <div class="toast align-items-center text-bg-${type} border-0
                position-fixed bottom-0 end-0 m-4">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", toastHtml);

  const toastEl = document.querySelector(".toast:last-child");
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });

  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}
