import { createRound } from "./api.js";
import { Round } from "../scripts/classes.js";
import { getRandomMove } from "../scripts/callbacks.js";

let gameRounds = [];

const btnCreate = document.querySelector('.btn-create');
const btnStart = document.querySelector('.btn-start');

btnCreate.addEventListener('click', async () => {
   btnCreate.disabled = true;

   gameRounds = [];

   try {
      for (let i = 0; i < 5; i++) {
         const botMove = getRandomMove();

         const reposnse = await createRound({
            botMove: botMove,
            playerMove: "pending"
         });

         const newRound = new Round(Response.id, botMove);
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
})

