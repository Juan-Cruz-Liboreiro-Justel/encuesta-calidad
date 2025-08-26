document.addEventListener("DOMContentLoaded", function () {
    // Preguntas del formulario
    const questions = ["q1", "q2", "q3", "q4", "q5"];

    // Mensajes asociados a cada estrella
    const mensajes = {
        1: "nada conforme",
        2: "poco conforme",
        3: "conforme",
        4: "muy conforme",
        5: "sumamente conforme"
    };

    // Mostrar mensaje según estrella seleccionada
    questions.forEach(q => {
        const stars = document.querySelectorAll(`input[name="${q}"]`);
        const output = document.querySelector(`#${q}-value`);

        stars.forEach(star => {
            star.addEventListener('click', function () {
                const valor = parseInt(this.value);
                output.textContent = mensajes[valor];
            });
        });
    });

    // Envío del formulario a Google Sheets
    const form = document.querySelector("#survey-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", document.querySelector('#nombre').value);
        formData.append("q1", document.querySelector('input[name="q1"]:checked')?.value || "");
        formData.append("q2", document.querySelector('input[name="q2"]:checked')?.value || "");
        formData.append("q3", document.querySelector('input[name="q3"]:checked')?.value || "");
        formData.append("q4", document.querySelector('input[name="q4"]:checked')?.value || "");
        formData.append("q5", document.querySelector('input[name="q5"]:checked')?.value || "");
        formData.append("comentarios", document.querySelector('#comentarios').value);

        // URL de tu Apps Script deploy
        const url = "https://script.google.com/macros/s/AKfycbyjrYJc3YcgW7ZJfbwfjD7INYrbmVQwMDFdoipPiHc05AHWqCWdIOvIdTaDfB7PEPOKOQ/exec";

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(() => {
            // Éxito: alert y reset
            alert("¡Gracias! Tu respuesta fue enviada.");
            form.reset();
            
            // Opcional: borrar mensajes de las estrellas
            questions.forEach(q => document.querySelector(`#${q}-value`).textContent = "");
        })
        .catch(err => {
            // Error de conexión
            console.error("Error al enviar:", err);
            alert("Hubo un error al enviar la respuesta. Intenta nuevamente.");
        });
    });
});
