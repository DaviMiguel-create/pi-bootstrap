/**
 * Gerenciador da Aplicação Médica
 */
const App = {
    consultas: [
        { id: 1, nome: "Maria Souza", especialidade: "Cardiologia", data: "2026-03-15", horario: "14:00", status: "Confirmado" },
        { id: 2, nome: "João Pedro", especialidade: "Clínico Geral", data: "2026-03-18", horario: "09:30", status: "Pendente" }
    ],

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
    },

    cacheDOM() {
        this.grid = document.getElementById('appointments-grid');
        this.form = document.getElementById('formConsulta');
        this.toastEl = document.getElementById('appToast');
        this.toastBootstrap = bootstrap.Toast.getOrCreateInstance(this.toastEl);
        this.modalBootstrap = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalConsulta'));
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSave(e));
    },

    handleSave(e) {
        e.preventDefault();
        
        const novaConsulta = {
            id: Date.now(),
            nome: document.getElementById('nome').value,
            especialidade: document.getElementById('especialidade').value,
            data: document.getElementById('data').value,
            horario: document.getElementById('horario').value,
            status: "Pendente"
        };

        this.consultas.push(novaConsulta);
        this.render();
        this.form.reset();
        this.modalBootstrap.hide();
        this.notify("Consulta agendada com sucesso!");
    },

    removeConsulta(id) {
        this.consultas = this.consultas.filter(c => c.id !== id);
        this.render();
        this.notify("Consulta desmarcada.", "bg-danger");
    },

    updateStatus(id, novoStatus) {
        this.consultas = this.consultas.map(c => 
            c.id === id ? { ...c, status: novoStatus } : c
        );
        this.render();
        this.notify(`Status atualizado para ${novoStatus}`);
    },

    notify(msg, colorClass = "bg-dark") {
        const msgEl = document.getElementById('toastMsg');
        this.toastEl.className = `toast align-items-center text-white border-0 shadow-lg ${colorClass}`;
        msgEl.textContent = msg;
        this.toastBootstrap.show();
    },

    getStatusClass(status) {
        const map = {
            'Confirmado': 'bg-success-subtle text-success',
            'Pendente': 'bg-warning-subtle text-dark',
            'Cancelado': 'bg-danger-subtle text-danger'
        };
        return map[status] || 'bg-secondary-subtle';
    },

    render() {
        if (this.consultas.length === 0) {
            this.grid.innerHTML = `<div class="col-12 text-center py-5 text-muted">Nenhuma consulta encontrada.</div>`;
            return;
        }

        this.grid.innerHTML = this.consultas.map(c => `
            <div class="col-12 col-lg-6 col-xxl-4">
                <article class="card h-100 card-appointment border shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h5 class="fw-bold mb-0">${c.nome}</h5>
                                <span class="text-muted small">${c.especialidade}</span>
                            </div>
                            <span class="status-badge ${this.getStatusClass(c.status)}">${c.status}</span>
                        </div>
                        
                        <div class="d-flex gap-3 mb-4">
                            <div class="small"><i class="bi bi-calendar3 me-2 text-success"></i>${c.data}</div>
                            <div class="small"><i class="bi bi-clock me-2 text-success"></i>${c.horario}</div>
                        </div>

                        <div class="d-flex gap-2 border-top pt-3 mt-auto">
                            <div class="dropdown flex-grow-1">
                                <button class="btn btn-light btn-sm w-100 border" data-bs-toggle="dropdown">Alterar Status</button>
                                <ul class="dropdown-menu shadow">
                                    <li><button class="dropdown-item" onclick="App.updateStatus(${c.id}, 'Confirmado')">Confirmar</button></li>
                                    <li><button class="dropdown-item" onclick="App.updateStatus(${c.id}, 'Pendente')">Pendente</button></li>
                                    <li><button class="dropdown-item" onclick="App.updateStatus(${c.id}, 'Cancelado')">Cancelar</button></li>
                                </ul>
                            </div>
                            <button onclick="App.removeConsulta(${c.id})" class="btn btn-outline-danger btn-sm px-3" title="Desmarcar">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());