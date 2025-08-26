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

    document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("survey-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que el formulario recargue la página

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbyjrYJc3YcgW7ZJfbwfjD7INYrbmVQwMDFdoipPiHc05AHWqCWdIOvIdTaDfB7PEPOKOQ/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("¡Gracias! Tu respuesta fue enviada.");
                form.reset(); // Resetea el formulario
            } else {
                alert("Hubo un error al enviar la respuesta. Intenta nuevamente.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Hubo un error al enviar la respuesta. Intenta nuevamente.");
        });
    });
});


});
