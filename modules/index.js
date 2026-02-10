import { createRound, getMultipleRounds, updateRound } from "./api.js";
import { Round } from "../scripts/classes.js";
import { getRandomMove } from "../scripts/callbacks.js";

const btnCreate = document.querySelector('.btn-create');
const btnStart = document.querySelector('.btn-start');
const gameArea = document.querySelector('.game-area');
const roundCounter = document.querySelector('.round-counter');
const roundResult = document.querySelector('.round-result');
const btnNext = document.querySelector('.next-round');
const choiceButtons = document.querySelectorAll('.btn-choice');
const btnReview = document.querySelector('.btn-review');
const reviewArea = document.querySelector('.review-area');

let gameRounds = [];
let currentRoundIndex = 0;

btnCreate.addEventListener('click', async () => {
   btnCreate.disabled = true;

   gameRounds = [];

   try {
      for (let i = 0; i < 5; i++) {
         const botMove = getRandomMove();

         const response = await createRound({
            botMove: botMove,
            playerMove: "pending"
         });

         const newRound = new Round(response.id, botMove);
         gameRounds.push(newRound);
      }

      console.log("Sve runde su kreirane: ", gameRounds);
      alert("Nova igra je uspješno kreirana na serveru!");

      btnStart.disabled = false;
   } catch(error) {
      alert("Došlo je do pogreške u komunikaciji s API-jem");
   } finally {
      btnCreate.disabled = false;
   }
});

btnStart.addEventListener('click', () => {
   if(gameRounds.length === 0) {
      return alert("Prvo kreiraj novu igru!");
   }
   gameArea.style.display = 'block';
   currentRoundIndex = 0;
   updateUI();
});

function updateUI() {
   roundCounter.innerText = `Runda: ${currentRoundIndex + 1} / 5`;
   roundResult.innerText = "";
   btnNext.style.display = 'none';
}

choiceButtons.forEach(button => {
   button.addEventListener('click', async (e) => {
      const playerChoice = e.currentTarget.dataset.choice;
      const currentRound = gameRounds[currentRoundIndex];

      await updateRound(currentRound.id, {
         botMove: currentRound.botMove,
         playerMove: playerChoice
      });

      currentRound.playerMove = playerChoice;

      const message = currentRound.getWinner();
      roundResult.innerText = `Bot je odabrao: ${currentRound.botMove}. ${message}`;

      btnNext.style.display = 'block';
   });
});

btnNext.addEventListener('click', () => {
   if (currentRoundIndex < 4) {
      currentRoundIndex++;
      updateUI();
   } else {
      alert("Odigrali ste svih 5 rundi! Odaberite Review za rezultate.");
      gameArea.style.display = 'none';
   }
});

btnReview.addEventListener('click', async () => {
   if(!gameRounds || gameRounds.length < 5) {
      return alert("Nema igre za pregled");
   }

   try {
      const ids = gameRounds.map(round => round.id);
      const rounds = await getMultipleRounds(ids);

      reviewArea.innerHTML = "";
      reviewArea.style.display = "block";

      let wins = 0;

      rounds.forEach((roundData, index) => {
         const round = new Round(
            roundData.id,
            roundData.data.botMove,
            roundData.data.playerMove
         );

         const result = round.getWinner();
         if (result.includes("Pobijedili")) 
            wins++;

         const roundEl = document.createElement("div");
         roundEl.classList.add("review-round");

         roundEl.innerHTML = `
            <h3>Runda ${index + 1}</h3>
            <p>Igrač: ${round.playerMove}</p>
            <p>Bot: ${round.botMove}</p>
            <p>Rezultat: ${result}</p> `;

         reviewArea.appendChild(roundEl);
      });

      const summary = document.createElement("h2");
      summary.innerText = `Ukupan rezultat: ${wins} / 5`;
      reviewArea.appendChild(summary);
   } catch (error) {
      console.error(error);
      alert("Greška pri dohvaćanju reviewa.");
   }
});

