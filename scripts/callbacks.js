export const getRandomMove = () => {
   const moves = ['rock', 'paper', 'scissors'];
   const randomInx = Math.floor(Math.random() * moves.length);
   return moves[randomInx];
};