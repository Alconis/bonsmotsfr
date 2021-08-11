import Player from "./components/Player";
import Grid from "./models/Grid";

function App() {

  const gridJSONString = '{\n' +
      '  "colCount": 5,\n' +
      '  "rowCount": 7,\n' +
      '  "definitions": [\n' +
      '    {\n' +
      '      "idx": 0,\n' +
      '      "definition": "Carla",\n' +
      '      "orientation": "horizontal-under",\n' +
      '      "solution": "CARLA"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 10,\n' +
      '      "definition": "Loin",\n' +
      '      "orientation": "horizontal",\n' +
      '      "solution": "LOIN"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 10,\n' +
      '      "definition": "Dames",\n' +
      '      "orientation": "horizontal-under",\n' +
      '      "solution": "DAMES"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 20,\n' +
      '      "definition": "Dans",\n' +
      '      "orientation": "horizontal",\n' +
      '      "solution": "DANS"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 20,\n' +
      '      "definition": "Dent",\n' +
      '      "orientation": "horizontal-under",\n' +
      '      "solution": "DENT"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 30,\n' +
      '      "definition": "Seen une definition qui dépasse la case mais en fait pas vraiment ou bien si en fait",\n' +
      '      "orientation": "horizontal",\n' +
      '      "solution": "SEEN"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 0,\n' +
      '      "definition": "Malades",\n' +
      '      "orientation": "vertical-right",\n' +
      '      "solution": "MALADES"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 2,\n' +
      '      "definition": "Eglise Romane du XV",\n' +
      '      "orientation": "vertical",\n' +
      '      "solution": "ROMANE"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 2,\n' +
      '      "definition": "Cliente",\n' +
      '      "orientation": "vertical-right",\n' +
      '      "solution": "CLIENTE"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 4,\n' +
      '      "definition": "Anss",\n' +
      '      "orientation": "vertical",\n' +
      '      "solution": "ANSS"\n' +
      '    },\n' +
      '    {\n' +
      '      "idx": 29,\n' +
      '      "definition": "",\n' +
      '      "orientation": "none",\n' +
      '      "solution": ""\n' +
      '    }\n' +
      '  ]\n' +
      '}';

  let grid = new Grid();
  grid.initializeFromJSON(gridJSONString);

  return (
    <Player grid={grid} />
  );
}

export default App;
