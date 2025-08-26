document.addEventListener("DOMContentLoaded", function () {
    const questions = ["q1", "q2", "q3", "q4", "q5"];
    const mensajes = {
        1: "nada conforme",
        2: "poco conforme",
        3: "conforme",
        4: "muy conforme",
        5: "sumamente conforme"
    };

    // Mostrar mensaje debajo de cada pregunta
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

    // Manejo del formulario
    const form = document.getElementById("survey-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbwaX6OFKrejrr9XHTdzSUCQ9jlwvIMX2Q22l1Is8DZopidS-WealRUZ8wf2wE7-jmroGQ/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.text()) // 👈 recibimos como texto
        .then(text => {
            const data = JSON.parse(text); // lo convertimos a objeto
            if (data.status === "success") {
                alert("¡Gracias! Tu respuesta fue enviada.");
                form.reset();
            } else {
                alert("Hubo un error al enviar la respuesta. Intenta nuevamente.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Hubo un error al enviar la respuesta. Intenta nuevamente!!!!.");
        });
    });
});
