document.addEventListener("DOMContentLoaded", function () {
    let questions = ["q1", "q2", "q3", "q4", "q5"];

    // Diccionario de mensajes para las estrellas
    const mensajes = {
        1: "nada conforme",
        2: "poco conforme",
        3: "conforme",
        4: "muy conforme",
        5: "sumamente conforme"
    };

    // Mostrar mensaje según estrella seleccionada
    questions.forEach(q => {
        let stars = document.querySelectorAll(`input[name="${q}"]`);
        let output = document.querySelector(`#${q}-value`);

        stars.forEach(star => {
            star.addEventListener('click', function () {
                let valor = parseInt(this.value);
                output.innerHTML = `${mensajes[valor]}`;
            });
        });
    });


});



// Conexión con Google Sheets usando FormData
document.querySelector("#survey-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("nombre", document.querySelector('#nombre').value);
    formData.append("q1", document.querySelector('input[name="q1"]:checked')?.value || "");
    formData.append("q2", document.querySelector('input[name="q2"]:checked')?.value || "");
    formData.append("q3", document.querySelector('input[name="q3"]:checked')?.value || "");
    formData.append("q4", document.querySelector('input[name="q4"]:checked')?.value || "");
    formData.append("q5", document.querySelector('input[name="q5"]:checked')?.value || "");
    formData.append("comentarios", document.querySelector('#comentarios').value);

    fetch("https://script.google.com/macros/s/AKfycbyjrYJc3YcgW7ZJfbwfjD7INYrbmVQwMDFdoipPiHc05AHWqCWdIOvIdTaDfB7PEPOKOQ/exec", {
        method: "POST",
        body: formData
    })
    .then(res => res.text()) // Apps Script responde texto
    .then(response => {
        alert("¡Gracias! Tu respuesta fue enviada.");
        document.querySelector("#survey-form").reset();
    })
    .catch(err => {
        alert("Error de conexión.");
        console.error(err);
    });
});
