export const getRandomMove = () => {
   const moves = ['kamen', 'škare', 'papir'];
   const randomInx = Math.floor(Math.random() * moves.length);
   return moves[randomInx];
};