let questions = [
  {
      question: 'Juan tenía 10 gatos y se perdieron 4, ¿cuántos tiene ahora Juan?',
      answer: 6,
      images: { total: 10, remaining: 10, src: 'gato.gif' }
  },
  {
      question: 'Ana tenía 15 manzanas y dio 5 a su amiga, ¿cuántas tiene ahora Ana?',
      answer: 10,
      images: { total: 15, remaining: 15, src: 'manzana.gif' }
  },
  {
      question: 'Pedro tenía 8 carros de juguete y se rompio 3 , ¿cuántos tiene ahora Pedro?',
      answer: 11,
      images: { total: 8, remaining: 8, src: 'carro.gif' }
  },
  {
      question: 'Lucía tenía 20 caramelos y comió 7, ¿cuántos tiene ahora Lucía?',
      answer: 13,
      images: { total: 20, remaining: 20, src: 'caramelo.gif' }
  },
  {
      question: 'Carlos tenía 12 libros y regaló 4, ¿cuántos tiene ahora Carlos?',
      answer: 8,
      images: { total: 12, remaining: 12, src: 'libro.gif' }
  }
  // Agrega más preguntas aquí
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 40; // Tiempo asignado a cada pregunta en segundos

// Mostrar la pantalla de inicio cuando la página se cargue
window.onload = () => {
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  document.getElementById('final-screen').style.display = 'none';
};
function showImages(imageData) {
  let imagesContainer = document.getElementById('images');
  imagesContainer.innerHTML = '';

  for (let i = 0; i < imageData.total; i++) {
      let img = document.createElement('img');
      img.src = i < imageData.remaining ? imageData.src : 'transparent.png';
      img.classList.add('images-item'); // Agregar clase para facilitar la selección

      // Agregar evento de clic para ocultar la imagen al hacer clic en ella
      img.addEventListener('click', function() {
          if (this.src.includes(imageData.src)) {
              this.style.display = 'none';
              imageData.remaining--; // Actualizar el contador de imágenes restantes
          }
      });

      imagesContainer.appendChild(img);
  }
}

function startGame() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('final-screen').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('status').innerText = '';
  document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft} segundos`;
  nextQuestion();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 25; // Resetear el temporizador para cada pregunta
  timer = setInterval(() => {
      if (timeLeft > 0) {
          timeLeft--;
          document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft} segundos`;
      } else {
          clearInterval(timer);
          checkAnswer(); // Verificar la respuesta automáticamente cuando el tiempo se agote
      }
  }, 1000);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
      let currentQuestion = questions[currentQuestionIndex];
      document.getElementById('question').innerText = currentQuestion.question;
      document.getElementById('answer').value = '';
      document.getElementById('status').innerText = '';
      showImages(currentQuestion.images);
      startTimer(); // Iniciar el temporizador para la nueva pregunta
  } else {
      endGame();
  }
}

function checkAnswer() {
  let userAnswer = parseFloat(document.getElementById('answer').value);
  let currentQuestion = questions[currentQuestionIndex];
  clearInterval(timer); // Parar el temporizador para la pregunta actual
  
  if (userAnswer === currentQuestion.answer) {
      score++;
      currentQuestion.images.remaining = currentQuestion.images.total - userAnswer; // Actualizar las imágenes restantes
      document.getElementById('status').innerText = 'Correcto!';
  } else {
      document.getElementById('status').innerText = `Incorrecto. La respuesta correcta era ${currentQuestion.answer}`;
  }
  
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
      endGame();
  } else {
      setTimeout(nextQuestion, 3000); // Esperar 3 segundos antes de pasar a la siguiente pregunta
  }
}

function endGame() {
  clearInterval(timer); // Detiene el temporizador si aún está activo
  document.getElementById('game').style.display = 'none'; // Oculta la pantalla de juego
  document.getElementById('final-screen').style.display = 'block'; // Muestra la pantalla final

  // Actualiza el texto del resultado con el puntaje obtenido
  document.getElementById('result').innerText = `Tu puntaje es: ${score} de ${questions.length}`;
}
