import Player from "./components/Player";
import Grid from "./models/Grid";

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let gridId = urlParams.get("id");

  if(null === gridId){
    const rootElement = document.getElementById('player-app');
    gridId = rootElement.getAttribute('data-grid-id');
  }

  return (
      <Player gridId={gridId} />
  );
}

export default App;
