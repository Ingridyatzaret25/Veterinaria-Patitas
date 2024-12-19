document.addEventListener("DOMContentLoaded", function () {
    const consultaForm = document.getElementById("consultaForm");
    const tablaConsultas = document.getElementById("tablaConsultas");
    const mensaje = document.getElementById("mensaje");

    // Cargar datos del LocalStorage
    let consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    // Mostrar consultas en la tabla
    const mostrarConsultas = () => {
        tablaConsultas.innerHTML = "";
        consultas.forEach((consulta, index) => {
            const fila = `
                <tr>
                    <td>${consulta.mascota}</td>
                    <td>${consulta.dueño}</td>
                    <td>${consulta.fecha}</td>
                    <td>${consulta.observaciones}</td>
                    <td><button onclick="eliminarConsulta(${index})">Eliminar</button></td>
                </tr>
            `;
            tablaConsultas.innerHTML += fila;
        });
    };

    // Función para eliminar consulta
    window.eliminarConsulta = (index) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta consulta?")) {
            consultas.splice(index, 1); // Elimina la consulta del array
            localStorage.setItem("consultas", JSON.stringify(consultas)); // Actualiza el LocalStorage
            mostrarConsultas(); // Vuelve a mostrar la lista actualizada
        }
    };

    // Registrar nueva consulta
    consultaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const mascota = document.getElementById("mascota").value.trim();
        const dueño = document.getElementById("dueño").value.trim();
        const fecha = document.getElementById("fecha").value;
        const observaciones = document.getElementById("observaciones").value.trim();

        // Validación básica
        if (!mascota || !dueño || !fecha) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Crear objeto consulta
        const nuevaConsulta = { mascota, dueño, fecha, observaciones };

        // Guardar en el array y LocalStorage
        consultas.push(nuevaConsulta);
        localStorage.setItem("consultas", JSON.stringify(consultas));

        // Limpiar formulario, actualizar tabla y mostrar mensaje de éxito
        consultaForm.reset();
        mostrarConsultas();
        mensaje.style.display = "block";
        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2000); // El mensaje se oculta después de 2 segundos
    });

    // Mostrar consultas al cargar la página
    mostrarConsultas();
});