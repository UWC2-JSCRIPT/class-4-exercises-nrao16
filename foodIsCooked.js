/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  if(kind === 'chicken') { return kind === 'chicken' && internalTemp >= 165; } 
  if(kind === 'beef') {
    if(doneness === 'rare') { return internalTemp > 125;}
    if(doneness === 'medium') { return internalTemp > 135; } 
    if(doneness === 'well') { return internalTemp > 155; ; } 
  } else return false;
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true