// Настройки API
const baseUrl = 'https://6839f40b6561b8d882b2397d.mockapi.io';

// Переключение между формами регистрации и авторизации
function showLoginForm() {
    document.getElementById('registration-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function showRegistrationForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('registration-form').classList.remove('hidden');
}

// Валидатор электронного адреса
function isValidEmail(email) {
    const re = /^(([^<>()[$$.,;:\s@"]+(\.[^<>()[$$.,;:\s@"]+)*)|(".+"))@(([^<>()[$$.,;:\s@"]+\.)+[^<>()[$$.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

// Обработка регистрации нового пользователя
async function register() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!isValidEmail(email)) return alert("Неправильно введен e-mail");

    try {
        // Проверка существования пользователя с таким e-mail
        const response = await fetch(`${baseUrl}/users`);
        const users = await response.json();
        const existingUser = users.find(u => u.email === email);

        if (existingUser) return alert("Пользователь с данным e-mail уже зарегистрирован");

        await fetch(`${baseUrl}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        alert("Регистрация успешная! Теперь войдите.");
        showLoginForm();
    } catch (err) {
        console.error(err);
        alert("Ошибка при регистрации!");
    }
}

// Обработка авторизации пользователя
async function login() {
    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPassword').value;

    if (!email || !password) return alert("Заполните поля");

    try {
        const response = await fetch(`${baseUrl}/users`);
        const users = await response.json();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            updateUserInfo(user);
        } else {
            alert("Неверный e-mail или пароль");
        }
    } catch (err) {
        console.error(err);
        alert("Ошибка при входе!");
    }
}

// Функция отображения информации пользователя в личном кабинете
function updateUserInfo(user) {
    const info = `<li>Имя: ${user.name}</li><li>E-mail: ${user.email}</li>`;
    document.getElementById('userInfo').innerHTML = info;
}

// Логика выхода из аккаунта
function logout() {
    localStorage.removeItem('user');
    location.reload();
}

// Проверка наличия залогиненного пользователя при загрузке страницы
window.onload = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        document.getElementById('registration-form').classList.add('hidden');
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        updateUserInfo(user);
    }
};