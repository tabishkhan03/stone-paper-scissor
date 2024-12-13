// // Initialize Appwrite SDK
// const client = new Appwrite.Client();
// const account = new Appwrite.Account(client);
// const database = new Appwrite.Databases(client);

// client
//   .setEndpoint('hhttps://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
//   .setProject('672b387e000186463e03');    // Replace with your Appwrite project ID

// Navbar Update Based on Authentication State
const updateNavbar = async () => {
  const navbarLinks = document.getElementById('navbar-links');

  try {
    const user = await account.get(); // Fetch logged-in user details
    navbarLinks.innerHTML = `
      <li class="nav-item">
        <p id="highScore" class="nav-link">Highscore: ${JSON.parse(localStorage.getItem("userData")).highScore}</p>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile.html">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="logout-btn">Logout</a>
      </li>
    `;

    document.getElementById('logout-btn').addEventListener('click', async () => {
      await account.deleteSession('current'); // Logout the user
      localStorage.removeItem("userData")
      window.location.href="/login.html"; // Refresh to update navbar
    });
  } catch {
    navbarLinks.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="/login.html">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/signup.html">Signup</a>
      </li>
    `;
  }
};

// Save High Score to Leaderboard
const saveHighScore = async (highScore) => {
  try {
    // await database.createDocument(
    //   '672b397b002f0f0714a9',    // Replace with your database ID
    //   '672e74db0034451e4099',  // Replace with your collection ID
    //   Appwrite.ID.unique(),
    //   { playerName, highScore }
    // );
    const userData=JSON.parse(localStorage.getItem("userData"))
    if(userData.highScore<highScore){
      userData.highScore=highScore
    }
    localStorage.setItem("userData",JSON.stringify(userData))
    document.getElementById("highScore").innerHTML=userData.highScore
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

// Call updateNavbar on page load
updateNavbar();



let s = 'stone', w = 'paper', g = 'scissor';
let buttons = document.querySelectorAll('.btns');
let isSelectable = true; // Variable to track if buttons can be selected

// Player selection
buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
        if (!isSelectable) {
            return; // Prevent selection if not allowed
        }

        isSelectable = false; // Disable further selections
        document.querySelector('#player-value').setAttribute('value', this.value);
        window.player = this.value;
        buttons.forEach(b => b.classList.remove('selected')); // Reset player button style
        this.classList.add('selected'); // Highlight selected button
        compSelection();

        // Re-enable button selection after 5 seconds
        setTimeout(() => {
            isSelectable = true;
        }, 5000);
    });
});

let score = 0;
let compscore = 0;

// Computer selection with animation
function compSelection() {
    let compbtns = document.querySelectorAll('.compbtns');
    let options = ['stone', 'paper', 'scissor'];

    compbtns.forEach(btn => btn.classList.remove('selected')); // Reset comp button style

    let blinking = setInterval(() => {
        compbtns.forEach(btn => btn.classList.toggle('blink'));
    }, 300);

    setTimeout(() => {
        clearInterval(blinking);
        compbtns.forEach(btn => btn.classList.remove('blink'));

        let compChoice = options[Math.floor(Math.random() * options.length)];
        document.querySelector(`#input`).setAttribute('value', compChoice);

        // Highlight selected computer option
        let selectedCompElement = document.querySelector(`.comp${compChoice}`);
        if (selectedCompElement) {
            selectedCompElement.classList.add('selected');
        } else {
            console.error(`Element with class .comp${compChoice} not found`);
        }

        calculateResult(compChoice);
    }, 3000);
}


function showResultDialogue(resultText) {
    const dialogueBox = document.querySelector('#result-dialogue');
    const dialogueText = document.querySelector('#dialogue-text');
    const closeBtn = document.querySelector('#close-dialogue');

    // Update the text and color based on the result
    dialogueText.innerText = resultText;
    if (resultText === 'You Win!') {
        dialogueText.style.color = '#4caf50'; // Green for "You Win!"
        saveHighScore(score)
    } else if (resultText === 'You Lose!') {
        dialogueText.style.color = '#d32f2f'; // Red for "You Lose!"
    } else if (resultText === 'Draw!') {
        dialogueText.style.color = '#ffffff'; // White for "Draw"
    }

    dialogueBox.classList.add('show');

    // Close button event
    closeBtn.addEventListener('click', () => {
        dialogueBox.classList.remove('show');
    });

    // Automatically hide the dialogue box after 3 seconds
    setTimeout(() => {
        dialogueBox.classList.remove('show');
    }, 3000);
}


// Result calculation (same as before)
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

    // document.querySelector('#result').innerText = resultText;
    document.querySelector('#scoreid').value = score;
    document.querySelector('#compscoreid').value = compscore;

    // Show the result dialogue box
    showResultDialogue(resultText);
}
