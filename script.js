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

  // VALIDACIONES
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarFormulario = () => {
    let valido = true;

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";

    if (inputNombre.value.trim() === "") {
      errorNombre.textContent = "El nombre es obligatorio.";
      valido = false;
    }

    const email = inputEmail.value.trim();
    if (email === "") {
      errorEmail.textContent = "El email es obligatorio.";
      valido = false;
    } else if (!validarEmail(email)) {
      errorEmail.textContent = "El formato del email no es válido.";
      valido = false;
    }

    const edad = parseInt(inputEdad.value.trim(), 10);
    if (isNaN(edad) || edad <= 0 || edad >= 100) {
      errorEdad.textContent = "La edad debe ser un número coherente.";
      valido = false;
    }

    return valido;
  };

  // GUARDAR DATOS
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

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    alert("✅ Datos guardados en LocalStorage.");
    limpiarFormulario();
    cardResultado.classList.add("hidden");
  };

  // MOSTRAR DATOS
  const mostrarDatos = () => {
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Si está visible → ocultar
    if (!cardResultado.classList.contains("hidden")) {
      cardResultado.classList.add("hidden");
      btnVerDatos.textContent = "Ver Datos";
      return;
    }

    // Si está oculto → mostrar
    if (listaUsuarios.length === 0) {
      cardResultado.innerHTML = "<p>No hay usuarios guardados.</p>";
    } else {
      let html = "<h3>Usuarios guardados:</h3>";

      listaUsuarios.forEach((u, i) => {
        html += `
          <div class="usuario-item">
            <p><strong>Usuario #${i + 1}</strong></p>
            <p>Nombre: ${u.nombre}</p>
            <p>Email: ${u.email}</p>
            <p>Edad: ${u.edad}</p>

            <button class="btn-borrar-individual" data-index="${i}">
              Borrar este usuario
            </button>

            <hr>
          </div>
        `;
      });

      cardResultado.innerHTML = html;
    }

    // Mostrar tarjeta de resultados
    cardResultado.classList.remove("hidden");
    btnVerDatos.textContent = "Ocultar Datos";

    // Activar botones individuales
    const botonesBorrar = document.querySelectorAll(".btn-borrar-individual");
    botonesBorrar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        listaUsuarios.splice(index, 1);

        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
        mostrarDatos(); // refrescar vista
        alert("🗑️ Usuario eliminado.");
      });
    });
  };


  // LIMPIAR FORMULARIO
  const limpiarFormulario = () => {
    if (
      inputNombre.value.trim() === "" &&
      inputEmail.value.trim() === "" &&
      inputEdad.value.trim() === "" && 
      errorNombre.textContent.trim() === "" &&
      errorEmail.textContent.trim() === "" &&
      errorEdad.textContent.trim() === ""

    ) {
      alert("No hay nada que limpiar");
      return;
    }

    inputNombre.value = "";
    inputEmail.value = "";
    inputEdad.value = "";

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";
  };

  // BORRAR DATOS
  const borrarDatos = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (!usuarios || usuarios.length === 0) {
      alert("No hay datos para borrar");
      return;
    }

    localStorage.removeItem("usuarios");
    alert("🗑️ Datos borrados correctamente");

    cardResultado.innerHTML = "";
    cardResultado.classList.add("hidden");
    btnVerDatos.textContent = "Ver Datos";
  };

  // EVENTOS
  btnGuardar.addEventListener("click", guardarDatos);
  btnVerDatos.addEventListener("click", mostrarDatos);
  btnLimpiarFormulario.addEventListener("click", limpiarFormulario);
  btnBorrarDatos.addEventListener("click", borrarDatos);
});
