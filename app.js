// List to store game data (in place of a database)
let gameList = [];

// Function to handle form submission
document.getElementById("gameForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form values
  const gameName = document.getElementById("gameName").value;
  const gameDescription = document.getElementById("gameDescription").value;
  const gameLogo = document.getElementById("gameLogo").files[0];
  const gameFile = document.getElementById("gameFile").files[0];

  // Simple validation
  if (!gameName || !gameDescription || !gameLogo || !gameFile) {
    alert("Please fill all the fields.");
    return;
  }

  // Here, you would typically send this data to a backend server to store it in a database
  const newGame = {
    name: gameName,
    description: gameDescription,
    logo: URL.createObjectURL(gameLogo),  // Creating a URL for the uploaded logo
    file: URL.createObjectURL(gameFile),  // Creating a URL for the uploaded game file
  };

  // Add the new game to the game list
  gameList.push(newGame);
  displayGames(gameList);

  // Reset form after submission
  document.getElementById("gameForm").reset();
});

// Function to display games in the list
function displayGames(games) {
  const gameListElement = document.getElementById("gameList");
  gameListElement.innerHTML = "";  // Clear the current list

  games.forEach(game => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${game.logo}" alt="Game Logo">
      <strong>${game.name}</strong>
      <p>${game.description}</p>
      <a href="${game.file}" download>Download Game</a>
    `;
    gameListElement.appendChild(li);
  });
}

// Function to search games
function searchGames() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filteredGames = gameList.filter(game =>
    game.name.toLowerCase().includes(searchTerm)
  );
  displayGames(filteredGames);
}