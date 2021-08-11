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

  const gridXMLString = "<grid colCount=\"9\" rowCount=\"7\">\n" +
      "  <word idx=\"0\" definition=\"Aguichai\" orientation=\"vertical-right\" solution=\"RACOLAI\"/>\n" +
      "  <word idx=\"2\" definition=\"GardÃ©s Ã  l'oeil\" orientation=\"vertical-right\" solution=\"CILS\"/>\n" +
      "  <word idx=\"4\" definition=\"Apprends\" orientation=\"vertical-right\" solution=\"ETUDIES\"/>\n" +
      "  <word idx=\"6\" definition=\"Hommes de lettres\" orientation=\"vertical-right\" solution=\"POETES\"/>\n" +
      "  <word idx=\"8\" definition=\"\" orientation=\"none\" solution=\"\"/>\n" +
      "  <word idx=\"0\" definition=\"Changement\" orientation=\"horizontal-under\" solution=\"VARIATION\"/>\n" +
      "  <word idx=\"2\" definition=\"Halte\" orientation=\"vertical\" solution=\"RELAIS\"/>\n" +
      "  <word idx=\"4\" definition=\"Aluminium\" orientation=\"vertical\" solution=\"AL\"/>\n" +
      "  <word idx=\"6\" definition=\"Se font mener en bateau\" orientation=\"vertical\" solution=\"ILIENS\"/>\n" +
      "  <word idx=\"18\" definition=\"PiÃ¨ce de taule\" orientation=\"horizontal\" solution=\"CELLULE\"/>\n" +
      "  <word idx=\"18\" definition=\"RÃ©cipients\" orientation=\"horizontal-under\" solution=\"BOLS\"/>\n" +
      "  <word idx=\"31\" definition=\"MentionnÃ©e\" orientation=\"horizontal\" solution=\"DITE\"/>\n" +
      "  <word idx=\"26\" definition=\"Vis\" orientation=\"vertical\" solution=\"ES\"/>\n" +
      "  <word idx=\"36\" definition=\"Ici\" orientation=\"horizontal\" solution=\"LA\"/>\n" +
      "  <word idx=\"31\" definition=\"NÃ©gation\" orientation=\"vertical\" solution=\"NI\"/>\n" +
      "  <word idx=\"39\" definition=\"Non reconnues\" orientation=\"horizontal\" solution=\"NIEES\"/>\n" +
      "  <word idx=\"36\" definition=\"Habitants d'une Ã®le\" orientation=\"horizontal-under\" solution=\"HAITIENS\"/>\n" +
      "  <word idx=\"39\" definition=\"RÃ¨gle de conduite\" orientation=\"vertical\" solution=\"TE\"/>\n" +
      "  <word idx=\"53\" definition=\"\" orientation=\"none\" solution=\"\"/>\n" +
      "  <word idx=\"54\" definition=\"Baie Japonaise\" orientation=\"horizontal\" solution=\"ISE\"/>\n" +
      "  <word idx=\"58\" definition=\"Soldat allemand\" orientation=\"horizontal\" solution=\"SS\"/>\n" +
      "  <word idx=\"61\" definition=\"\" orientation=\"none\" solution=\"\"/>\n" +
      "  <word idx=\"62\" definition=\"\" orientation=\"none\" solution=\"\"/>\n" +
      "</grid>";

  let grid = new Grid();
  //grid.initializeFromJSON(gridJSONString);
  grid.initializeFromXML(gridXMLString);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const gridId = urlParams.get("id");

    if(gridId){
      return (
          <Player gridId={gridId} />
      );
    }else{
      return (
          <Player grid={grid} />
      );
    }
}

export default App;
