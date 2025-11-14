document.addEventListener("DOMContentLoaded", () => {
  // Inputs
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");
  const inputEdad = document.getElementById("edad");

  // Errores
  const errorNombre = document.getElementById("error-nombre");
  const errorEmail = document.getElementById("error-email");
  const errorEdad = document.getElementById("error-edad");

  // Botones
  const btnGuardar = document.getElementById("btnGuardar");
  const btnVerDatos = document.getElementById("btnVerDatos");
  const btnLimpiarFormulario = document.getElementById("btnLimpiarFormulario");
  const btnBorrarDatos = document.getElementById("btnBorrarDatos");

  // Resultado
  const cardResultado = document.getElementById("card-resultado");
  const resNombre = document.getElementById("res-nombre");
  const resEmail = document.getElementById("res-email");
  const resEdad = document.getElementById("res-edad");

  // ========= VALIDACIONES =========
  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validarFormulario = () => {
    let valido = true;

    // limpiar mensajes
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";

    // nombre
    if (inputNombre.value.trim() === "") {
      errorNombre.textContent = "El nombre es obligatorio.";
      valido = false;
    }

    // email
    const email = inputEmail.value.trim();
    if (email === "") {
      errorEmail.textContent = "El email es obligatorio.";
      valido = false;
    } else if (!validarEmail(email)) {
      errorEmail.textContent = "El formato del email no es válido.";
      valido = false;
    }

    // edad
    const edad = parseInt(inputEdad.value.trim(), 10);
    if (isNaN(edad) || edad <= 0) {
      errorEdad.textContent = "La edad debe ser un número positivo.";
      valido = false;
    }

    return valido;
  };

  // ========= LÓGICA PRINCIPAL =========

  const guardarDatos = () => {
    if (!validarFormulario()) {
      alert("❌ Corrige los errores del formulario.");
      return;
    }

    const usuario = {
      nombre: inputNombre.value.trim(),
      email: inputEmail.value.trim(),
      edad: parseInt(inputEdad.value.trim(), 10),
    };

    localStorage.setItem("usuarioData", JSON.stringify(usuario));
    alert("✅ Datos guardados en LocalStorage.");
    limpiarFormulario();
    cardResultado.classList.add("hidden");
  };

  const mostrarDatos = () => {
    const data = localStorage.getItem("usuarioData");

    if (!data) {
      resNombre.textContent = "No hay datos guardados.";
      resEmail.textContent = "No hay datos guardados.";
      resEdad.textContent = "No hay datos guardados.";
      cardResultado.classList.remove("hidden");
      alert("No se encontraron datos en LocalStorage.");
      return;
    }

    const usuario = JSON.parse(data);
    resNombre.textContent = usuario.nombre ?? "N/A";
    resEmail.textContent = usuario.email ?? "N/A";
    resEdad.textContent = usuario.edad ?? "N/A";

    cardResultado.classList.remove("hidden");
  };

  const limpiarFormulario = () => {
    inputNombre.value = "";
    inputEmail.value = "";
    inputEdad.value = "";
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";
  };

  const borrarDatos = () => {
    localStorage.removeItem("usuarioData");
    resNombre.textContent = "";
    resEmail.textContent = "";
    resEdad.textContent = "";
    cardResultado.classList.add("hidden");
    alert("🗑️ Datos borrados de LocalStorage.");
  };

  // ========= EVENTOS =========
  btnGuardar.addEventListener("click", guardarDatos);
  btnVerDatos.addEventListener("click", mostrarDatos);
  btnLimpiarFormulario.addEventListener("click", limpiarFormulario);
  btnBorrarDatos.addEventListener("click", borrarDatos);
});
