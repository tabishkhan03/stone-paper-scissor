let s = 'stone', w = 'paper', g = 'scissor';
let buttons = document.querySelectorAll('.btns');

// Player selection
buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
        document.querySelector('#player-value').setAttribute('value', this.value);
        window.player = this.value;
        buttons.forEach(b => b.classList.remove('selected'));  // Reset player button style
        this.classList.add('selected');  // Highlight selected button
        compSelection();
    });
});

let score = 0;
let compscore = 0;

// Computer selection with animation
function compSelection() {
    let compbtns = document.querySelectorAll('.compbtns');
    let options = ['stone', 'paper', 'scissor'];

    compbtns.forEach(btn => btn.classList.remove('selected'));  // Reset comp button style

    let blinking = setInterval(() => {
        compbtns.forEach(btn => btn.classList.toggle('blink'));
    }, 300);

    setTimeout(() => {
        clearInterval(blinking);
        compbtns.forEach(btn => btn.classList.remove('blink'));

        let compChoice = options[Math.floor(Math.random() * options.length)];
        document.querySelector(`#input`).setAttribute('value', compChoice);

        // Highlight selected computer option
        document.querySelector(`.comp${compChoice}`).classList.add('selected');
        // document.querySelector(`.comp${compChoice}`).style.backgroundColor = '#d32f2f';


        calculateResult(compChoice);
    }, 3000);
}

// Result calculation
function calculateResult(compChoice) {
    let playerChoice = window.player;
    let resultText = '';

    if (compChoice === playerChoice) {
        resultText = 'Draw!';
    } else if (
        (compChoice === 'stone' && playerChoice === 'paper') ||
        (compChoice === 'paper' && playerChoice === 'scissor') ||
        (compChoice === 'scissor' && playerChoice === 'stone')
    ) {
        resultText = 'You Win!';
        score++;
    } else {
        resultText = 'You Lose!';
        compscore++;
    }

    document.querySelector('#result').innerText = resultText;
    document.querySelector('#scoreid').value = score;
    document.querySelector('#compscoreid').value = compscore;
}
