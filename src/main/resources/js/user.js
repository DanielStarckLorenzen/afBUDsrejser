function loginUser() {
    const loginOverlay = document.createElement("div");
    loginOverlay.id = "loginOverlay";

    loginOverlay.innerHTML = `
        <input type="email" id="email" name="email" placeholder="E-Mail" required><br>
        <input type="password" id="password" name="password" placeholder="Password" required><br><br>
        <input type="submit" value="Submit" onclick="login()">
        <button type="button" id="cancel" onclick="location.reload()">Annuller</button>
    `;
    document.body.appendChild(loginOverlay);
    const trip = document.querySelector(".trip");
    trip.style.pointerEvents = "none";
}

async function login() {
    let userToLogin = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userToLogin)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data) {
            const user = JSON.stringify(data);
            if (user === null) {
                    alert("Wrong username or password");
            } else {
                sessionStorage.setItem("user", user);
                location.reload();
            }
        } else {
            throw new Error('Empty JSON data');
        }
    }).catch(error => {
        alert("Wrong username or password");
        console.error('Error:', error);
    });
}

function registerUser() {
    const registerOverlay = document.createElement("div");
    registerOverlay.id = "registerOverlay";

    const registerForm = document.createElement("form");
    registerForm.id = "registerForm";
    registerForm.innerHTML = `
        <label for="email">E-Mail:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br>
        <label for="fullName">Full Name:</label><br>
        <input type="text" id="fullName" name="name" required><br>
        <label for="birthDate">Birth Date:</label><br>
        <input type="date" id="birthDate" name="birthDate" required><br><br>
        <input type="submit" value="Submit">
        <button type="button" id="cancel" onclick="location.reload()">Annuller</button>
        `;
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const fullName = document.getElementById("fullName").value;
        const birthDate = document.getElementById("birthDate").value;
        createUser(email, password, fullName, birthDate);
    });

    registerOverlay.appendChild(registerForm);
    document.body.appendChild(registerOverlay);
}

function createUser(email, password, fullName, birthDate) {
    const user = {
        email: email,
        password: password,
        name: fullName,
        birthDate: birthDate
    };

    fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(r => {
    if (!r.ok) {
            throw new Error('Network response was not ok');
        }
        return r.json();
    });
    location.reload();
}

function logoutUser() {
    sessionStorage.removeItem("user");
    location.reload();
}