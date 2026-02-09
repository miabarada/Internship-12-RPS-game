export class Round {
   constructor(id, botMove, playerMove = "pending") {
      this.id = id;
      this.botMove = botMove;
      this.playerMove = playerMove;
   }

   getWinner() {
      if (this.playerMove === "pending")
         return "Čeka se potez...";
      if (this.playerMove === this.botMove)
         return "Neriješeno!";

      const winConditions = {
         rock: "scissors",
         scissors: "paper",
         paper: "rock"
      };

      if (winConditions[this.playerMove] === this.computerMove)
         return "Pobijedili ste ovu rundu!";
      else
         return "Izgubili ste ovu rundu!";
   }
}