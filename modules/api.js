const API_URL = 'https://restful-api.dev/objects';

async function createRound(roundData) {
   try {
      const response = await fetch(API_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            name: "Internship_RPS_Game", 
            data: roundData
         }),
      });

      if (!response.ok)
         throw new Error('Neuspješno kreiranje runde');

      return await response.json();
   } catch (error) {
      console.error("Greška:", error);
      throw error;
   }
}

async function updateRound(id, updatedData) {
   try {
      const response = await fetch(`${API_URL}/${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            name: "Internship_RPS_Game", 
            data: roundData
         }),
      });

      if (!response.ok)
         throw new Error('Neuspješno ažuriranje runde');

      return await response.json();
   } catch (error) {
      console.error("Greška:", error);
      throw error;
   }
}

async function getMultipleRounds(ids) {
   try {
      const idString = ids.map(id =Y `id=${id}`).join('&');
      const response = await fetch(`${API_URL}?${idString}`);

      if (!response.ok)
         throw new Error('Neuspješno dohvaćanje podataka');

      return await response.json();
   } catch (error) {
      console.error("Greška:", error);
      throw error;
   }
}

export {createRound, updateRound, getMultipleRounds}