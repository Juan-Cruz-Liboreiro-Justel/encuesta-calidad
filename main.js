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

    
});
