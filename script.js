document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username === "admin" && password === "admin") {
            // Simular un retraso para mostrar una animación de carga
            setTimeout(function() {
                window.location.href = "index2.html";
            }, 1000);
        } else {
            var errorMessage = document.getElementById("error-message");
            errorMessage.style.display = "block";
            errorMessage.textContent = "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.";
        }
    });
});
