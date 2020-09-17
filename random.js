
const store = {

  questions: [

    {
      question: "What makes a plant green? ",
      answers: [
        'Chlorophyll',
        'Mitochondria',
        'Anthocyanins',
        'Flavanoids',
      ],
      correctAnswer: 'Chlorophyll'
    },
    {
      question: 'How does a Rose get the color red?',
      answers: [
        'Anthocyanins',
        'Hydrochloric Acid',
        'Hydrogen Oxide',
        'Sulfuric Acid'

      ],
      correctAnswer: 'Anthocyanins'
    },
    {
      question: 'What chemical breaks down food in the body?',
      answers: [
        'Hydrochloric Acid',
        'Dihydrogen Monoxide',
        'Cyanide',
        'Magnesium Oxide'
      ],
      correctAnswer: 'Hydrochloric Acid'
    },
    {
      question: 'Euclid\'s geometry is a mathematical treatise explaining solids of:',
      answers: [
        '1 Dimension',
        '2 Dimensions',
        '3 Dimensions',
        '4 Dimensions'
      ],
      correctAnswer: '2 Dimensions'
    },
    {
      question: 'One of these is not like the other:',
      answers: [
        'Nautilus Shell',
        'Fibonacci Spiral',
        'Madelbrot Set',
        'Riemann Zeta Function'
      ],
      correctAnswer: 'Riemann Zeta Function'
    },
    {
      question: "According to Darwin's theory, natural selection and mutation are (respectively):",
      answers: [
        'random, random',
        'random, nonrandom',
        'nonrandom, random',
        'None of the above'
      ],
      correctAnswer: 'nonrandom, random'
    }




  ],
  response: '',
  ifIncorrect: '',
  quizStarted: false,
  questionNumber: 0,
  incorrect: 0,
  score: 0,
  showingQuestion: true,

};

function renderQuestionTemplate() {
  return ` <p>${store.questionNumber + 1} of ${store.questions.length}=> ${store.questions[store.questionNumber].question}</p>
  <input type="radio" id="answer1" name="answer" value="${store.questions[store.questionNumber].answers[0]}" class="answer1" required>
  <label for="answer1" class="answer2">${store.questions[store.questionNumber].answers[0]}</label>


<br>
<input type="radio" id="answer2" name="answer" value="${store.questions[store.questionNumber].answers[1]}" class="answer2" required>
<label for="answer2" class="answer2">${store.questions[store.questionNumber].answers[1]}</label>


<br>
<input type="radio" id="answer3" name="answer" value="${store.questions[store.questionNumber].answers[2]}" class="answer3" required>
<label for="answer3" class="answer3">${store.questions[store.questionNumber].answers[2]}</label>


<br>
<input type="radio" id="answer4" name="answer" value="${store.questions[store.questionNumber].answers[3]}" class="answer4"  required>
<label for="answer4" class="answer4">${store.questions[store.questionNumber].answers[3]}</label>
<br>
<button class='next' type='submit'>Next</button>

<br>

<p>Correct Answers: ${store.score} <br>Incorrect Answers: ${store.incorrect}</p><p>${store.response}</p>
`;


}

function retakeQuiz() {
  $('.geoplants').on('click', '.retake', function (e) {
    e.preventDefault()
    store.questionNumber = 0
    store.incorrect = 0
    store.score = 0
    $('form').html(renderQuestionTemplate)
  })
}
function start() {

  $('.geoplants').on('click', '.start', function (e) {
    console.log(store);
    e.preventDefault();
    store.quizStarted = true;
    $('form').html(renderQuestionTemplate)


  });

}

function handler() {
  $('body').on('submit', 'form', function (e) {
    console.log(store);
    e.preventDefault();
    let template = '';


    if (store.questionNumber + 1 === store.questions.length) {
      store.quizStarted = false;

      if ($('input[name="answer"]:checked').val() === store.questions[store.questionNumber].correctAnswer) {

        store.score += 1
      }
      else {
        store.incorrect += 1
      }
      template = `<p>${store.response}</p><p>Correct answer: ${store.score} <br>Incorrect answers: ${store.incorrect}</p><p>You are done with this interview for the position of Junior Universe Saviour with ${store.score} correct and ${store.incorrect} incorrect. We will reach out to you in case you are a fit for saving the Universe. Thank you!</p><button type="submit" class="retake">Retake Quiz</button>`

      $('form').html(template);
    }


    else if (store.showingQuestion === true) {
      let answer = $('input[name="answer"]:checked').val();
      console.log(answer);
      console.log(store.questions[store.questionNumber].correctAnswer)


      if (answer === store.questions[store.questionNumber].correctAnswer) {
        store.score += 1;
        store.response = 'Good job. You are one step closer to saving the universe!';
        template = `<button class='next' type='submit'>Next</button><p>${store.response}</p><p>Correct answer: ${store.score} <br>Incorrect answers: ${store.incorrect}</p>`;

      } else {
        store.incorrect += 1;
        store.response = `The correct answer is ${store.questions[store.questionNumber].correctAnswer}! Come on bud. The universe needs you!`;
        template = `<button class='next' type='submit'>Next</button><p>${store.response}</p><p>Correct answer: ${store.score} <br>Incorrect answers: ${store.incorrect}</p>`;

      }
      store.showingQuestion = false;
    } else {

      store.questionNumber += 1;
      template = renderQuestionTemplate();
      store.showingQuestion = true;
    }
    $('form').html(template);

  })
}

function render() {

  start()
  handler()
  retakeQuiz()

  if (!store.quizStarted) {
    $('main').html(`<form><button class="start" type="button">Start Quiz</button></form>`);

    return "Quiz started";
  }



}

$(render);
