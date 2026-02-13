// =====================================================
// 🔹 Dados simulados
// =====================================================
const appointments = [
  {
    patient: 'Ana Beatriz',
    specialty: 'Dermatologia',
    date: '2025-10-10 14:30',
    notes: 'Consulta de rotina para avaliação de alergias.',
    status: 'Confirmado'
  },
  {
    patient: 'Carlos Eduardo',
    specialty: 'Cardiologia',
    date: '2025-10-11 09:00',
    notes: 'Revisão pós-infarto, ajustar medicação.',
    status: 'Pendente'
  },
  {
    patient: 'Fernanda Lima',
    specialty: 'Psicologia',
    date: '2025-10-12 16:00',
    notes: 'Sessão de terapia cognitivo-comportamental.',
    status: 'Confirmado'
  },
];

const appointmentsList = document.getElementById('appointments-list');
const logoutBtn = document.getElementById('logoutBtn');


// =====================================================
// 🔹 Formatação de Data
// =====================================================
function formatDate(datetime) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(datetime).toLocaleString('pt-BR', options);
}


// =====================================================
// 🔥 Criar Card Bootstrap Avançado
// =====================================================
function createAppointmentCard(appointment) {

  // 🔹 Antes: div manual appointment-card
  // 🔹 Agora: grid 12 colunas Bootstrap
  const col = document.createElement('div');
  col.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement('div');
  card.className = "card shadow-sm h-100 border-0";

  // Header
  const header = document.createElement('div');
  header.className = "card-header bg-success text-white fw-semibold";
  header.textContent = appointment.specialty;

  // Body
  const body = document.createElement('div');
  body.className = "card-body d-flex flex-column";

  const title = document.createElement('h5');
  title.className = "card-title fw-bold text-success";
  title.textContent = appointment.patient;

  const date = document.createElement('p');
  date.className = "text-muted mb-2";
  date.textContent = formatDate(appointment.date);

  const status = document.createElement('span');
  status.className =
    appointment.status === "Confirmado"
      ? "badge bg-success mb-3"
      : "badge bg-warning text-dark mb-3";
  status.textContent = appointment.status;

  const btn = document.createElement('button');

  // 🔹 Antes: sem botão ou botão custom
  // 🔹 Agora: btn Bootstrap + modal
  btn.className = "btn btn-outline-success mt-auto";
  btn.textContent = "Ver Detalhes";

  btn.addEventListener('click', () => {
    showDetailsModal(appointment);
  });

  body.appendChild(title);
  body.appendChild(date);
  body.appendChild(status);
  body.appendChild(btn);

  card.appendChild(header);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}


// =====================================================
// 🔹 Carregar consultas
// =====================================================
function loadAppointments() {
  appointmentsList.innerHTML = '';

  appointments.forEach((appt) => {
    const card = createAppointmentCard(appt);
    appointmentsList.appendChild(card);
  });
}


// =====================================================
// 🔥 Modal Bootstrap (substitui alert)
// =====================================================
function showDetailsModal(appointment) {

  const modalHtml = `
  <div class="modal fade" id="detailsModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header bg-success text-white">
          <h5 class="modal-title">${appointment.patient}</h5>
          <button type="button" class="btn-close btn-close-white"
                  data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <p><strong>Especialidade:</strong> ${appointment.specialty}</p>
          <p><strong>Data:</strong> ${formatDate(appointment.date)}</p>
          <p><strong>Observações:</strong><br>${appointment.notes}</p>
        </div>

        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
            Fechar
          </button>
        </div>

      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
  modal.show();

  document.getElementById('detailsModal')
    .addEventListener('hidden.bs.modal', () => {
      document.getElementById('detailsModal').remove();
    });
}


// =====================================================
// 🔥 Logout com Toast
// =====================================================
logoutBtn.addEventListener('click', () => {

  showToast("Logout realizado com sucesso!", "success");

  setTimeout(() => {
    window.location.href = "../login/login.html";
  }, 1500);
});


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


// =====================================================
// 🔹 Inicialização
// =====================================================
loadAppointments();
