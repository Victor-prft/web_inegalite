console.log("Je suis la console !");

function quizAlert() {
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();
}

function quizConfirm() {
    const inputs = document.querySelectorAll('#informations input, #informations select');
    let allFieldsFilled = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const res = confirm("Êtes-vous sûr de vouloir continuer ?");
    if (res) {
        alert("Le quiz va commencer !");
        let timer = 1;

        const confirmation = document.createElement("p");
        confirmation.textContent = `${timer} secondes`;
        confirmation.style.color = "white";
        confirmation.style.fontSize = "0.1px";
        confirmation.style.fontWeight = "bold";
        confirmation.style.textAlign = "center";

        const informations = document.getElementById("informations");
        informations.appendChild(confirmation);

        const interval = setInterval(() => {
            timer--;
            confirmation.textContent = `${timer} secondes`;

            if (timer === 0) {
                clearInterval(interval);
                confirmation.textContent = "C'est parti ! Bonne chance !";

                document.querySelector(".quiz").style.display = "block";
                document.querySelectorAll(".quiz")[1].style.display = "block";

                inputs.forEach(input => {
                    input.disabled = true;
                });

                const startButton = document.querySelector(".quiz-button");
                if (startButton) {
                    startButton.style.display = "none";
                }
            }
        }, 1000);
    } else {
        alert("Vous allez être redirigé vers la page d'accueil !");
        window.location.href = "accueil.html";
    }
}

let attempt = 0;

function submitQuiz() {
    let score = 0;
    attempt++;
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === "a") score += 4;

    const q2 = document.querySelectorAll('input[name="q2[]"]:checked');
    q2.forEach(input => {
        if (input.value === "a" || input.value === "b") score += 3;
        if (input.value === "c") score -= 3;
    });

    const q3 = document.getElementById("q3").value.toLowerCase();
    const keywords = ["réduire", "alléger", "faciliter", "optimiser", "exploiter"];
    if (keywords.some(word => q3.includes(word))) score += 10;

    const tbody = document.getElementById("result").getElementsByTagName("tbody")[0];
    const row = tbody.insertRow();
    row.insertCell().textContent = attempt;
    row.insertCell().textContent = score;

    alert(`Votre score est de ${score} points !`);

    resetQuiz();

    if (attempt >= 3) {
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            alert("Vous avez atteint le nombre maximum de tentatives !");
        }
    }
}

function resetQuiz() {
    const q1 = document.querySelectorAll('input[name="q1"]');
    q1.forEach(radio => {
        radio.checked = false;
    });

    const q2 = document.querySelectorAll('input[name="q2[]"]');
    q2.forEach(checkbox => {
        checkbox.checked = false;
    });

    document.getElementById("q3").value = "";
}

document.addEventListener('DOMContentLoaded', function () {
    // Bouton quiz
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.onclick = submitQuiz;
    }

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            alert(`Merci ${name} !\n\nVotre message a bien été envoyé :\n\nSujet : ${subject}\nMessage : ${message}`);
        });
    }
