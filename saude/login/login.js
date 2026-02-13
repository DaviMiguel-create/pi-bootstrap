// =====================================================
// 🔹 Antes:
// - Apenas verificava o select
// - Usava alert()
// - Não tinha validação visual
//
// 🔹 Agora:
// - Usa validação Bootstrap
// - Usa Toast para feedback
// - Aplica is-valid / is-invalid
// - Código mais organizado e escalável
// =====================================================

const form = document.getElementById("loginForm");
const nomeInput = document.getElementById("nome");
const senhaInput = document.getElementById("senha");
const tipoSelect = document.getElementById("tipo");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  // ==============================
  // 🔹 Validação Nome
  // ==============================
  if (nomeInput.value.trim() === "") {
    nomeInput.classList.add("is-invalid");
    nomeInput.classList.remove("is-valid");
    isValid = false;
  } else {
    nomeInput.classList.remove("is-invalid");
    nomeInput.classList.add("is-valid");
  }

  // ==============================
  // 🔹 Validação Senha
  // ==============================
  if (senhaInput.value.trim() === "") {
    senhaInput.classList.add("is-invalid");
    senhaInput.classList.remove("is-valid");
    isValid = false;
  } else {
    senhaInput.classList.remove("is-invalid");
    senhaInput.classList.add("is-valid");
  }

  // ==============================
  // 🔹 Validação Tipo
  // ==============================
  if (tipoSelect.value === "") {
    tipoSelect.classList.add("is-invalid");
    tipoSelect.classList.remove("is-valid");
    isValid = false;
  } else {
    tipoSelect.classList.remove("is-invalid");
    tipoSelect.classList.add("is-valid");
  }

  // Se algo estiver inválido, parar aqui
  if (!isValid) {
    showToast("Por favor, preencha todos os campos corretamente.", "danger");
    return;
  }

  // ==============================
  // 🔹 Redirecionamento
  // ==============================
  showToast("Login realizado com sucesso!", "success");

  setTimeout(() => {
    if (tipoSelect.value === "paciente") {
      window.location.href = "../paciente/paciente.html";
    } else if (tipoSelect.value === "medico") {
      window.location.href = "../medico/medico.html";
    }
  }, 1500);
});


// =====================================================
// 🔥 Toast Bootstrap (substitui alert())
// =====================================================
function showToast(message, type) {

  const toastHtml = `
    <div class="toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 end-0 m-4" role="alert">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"
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
