const appointments = [
  {
    patient: 'Ana Beatriz',
    specialty: 'Dermatologia',
    date: '2025-10-10 14:30',
    notes: 'Consulta de rotina para avaliação de alergias.',
  },
  {
    patient: 'Carlos Eduardo',
    specialty: 'Cardiologia',
    date: '2025-10-11 09:00',
    notes: 'Revisão pós-infarto, ajustar medicação.',
  },
  {
    patient: 'Fernanda Lima',
    specialty: 'Psicologia',
    date: '2025-10-12 16:00',
    notes: 'Sessão de terapia cognitivo-comportamental.',
  },
];

const appointmentsList = document.getElementById('appointments-list');
const logoutBtn = document.getElementById('logoutBtn');

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

function createAppointmentCard(appointment) {
  const card = document.createElement('div');
  card.classList.add('appointment-card');

  const header = document.createElement('div');
  header.classList.add('appointment-header');

  const patientName = document.createElement('div');
  patientName.classList.add('patient-name');
  patientName.textContent = appointment.patient;

  const appointmentDate = document.createElement('div');
  appointmentDate.classList.add('appointment-date');
  appointmentDate.textContent = formatDate(appointment.date);

  header.appendChild(patientName);
  header.appendChild(appointmentDate);

  const details = document.createElement('div');
  details.classList.add('appointment-details');
  details.textContent = `${appointment.specialty} - ${appointment.notes}`;

  card.appendChild(header);
  card.appendChild(details);

  return card;
}

function loadAppointments() {
  appointmentsList.innerHTML = '';
  appointments.forEach((appt) => {
    const card = createAppointmentCard(appt);
    appointmentsList.appendChild(card);
  });
}

// logout → redireciona para a tela de login
logoutBtn.addEventListener('click', () => {
  window.location.href = "../login/login.html";
});

loadAppointments();
