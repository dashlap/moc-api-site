const apiUrl = 'https://6837362c664e72d28e43fa6b.mockapi.io/quiz'; 

let questions = [];
let currentQuestion = 0;
let score = 0;

// Загрузка вопросов
async function loadQuestions() {
  try {
    const res = await fetch(apiUrl);
    questions = await res.json();
    showQuestion();
  } catch (error) {
    document.getElementById('quiz').innerHTML = 'Ошибка загрузки вопросов.';
    console.error('Ошибка загрузки:', error);
  }
}

// Отображение текущего вопроса
function showQuestion() {
  if (currentQuestion >= questions.length) {
    document.getElementById('quiz').innerHTML = '';
    document.getElementById('result').innerText = `Вы набрали ${score} из ${questions.length} баллов.`;

    return;
  }

  const q = questions[currentQuestion];
  document.getElementById('quiz').innerHTML = `
    <div class="question">
      <p>${q.text}</p>
      <button onclick="checkAnswer('Да')">Да</button>
      <button onclick="checkAnswer('Нет')">Нет</button>
    </div>
  `;
}

// Проверка ответа
function checkAnswer(answer) {
  const correct = questions[currentQuestion].correctAnswer;
  if (answer === correct) score++;
  currentQuestion++;
  showQuestion();
}

// Запуск при загрузке страницы
loadQuestions();