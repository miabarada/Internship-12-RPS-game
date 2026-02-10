import { createRound, updateRound } from "./api.js";
import { Round } from "../scripts/classes.js";
import { getRandomMove } from "../scripts/callbacks.js";

const btnCreate = document.querySelector('.btn-create');
const btnStart = document.querySelector('.btn-start');
const gameArea = document.querySelector('.game-area');
const roundCounter = document.querySelector('.round-counter');
const roundResult = document.querySelector('.round-result');
const btnNext = document.querySelector('.next-round');
const choiceButtons = document.querySelectorAll('.btn-choice');

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

