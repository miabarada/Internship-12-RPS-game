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
         kamen: "škare",
         škare: "papir",
         papir: "kamen"
      };

      if (winConditions[this.playerMove] === this.botMove)
         return "Pobijedili ste ovu rundu!";
      else
         return "Izgubili ste ovu rundu!";
   }
}