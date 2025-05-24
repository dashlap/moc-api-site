// Получаем данные всех пользователей из localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Сохраняем пользователя
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Проверяем есть ли такой пользователь
function findUser(username, password) {
    const users = getUsers();
    return users.find(u => u.username === username && u.password === password);
}

// Валидация email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Форма регистрации
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    // Проверки
    if (!name || !username || !email || !password) {
        alert("Все поля обязательны!");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Введите корректный email");
        return;
    }

    if (password.length < 6) {
        alert("Пароль должен быть не менее 6 символов");
        return;
    }

    // Проверяем, существует ли уже такой логин
    const existingUser = getUsers().find(u => u.username === username);
    if (existingUser) {
        alert("Пользователь с таким логином уже существует");
        return;
    }

    // Создаём нового пользователя
    const newUser = { name, username, email, password };
    saveUser(newUser);

    alert("Вы успешно зарегистрированы!");
    this.reset();
});

// Форма входа
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    const user = findUser(username, password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "profile.html";
    } else {
        alert("Неверный логин или пароль");
    }
});