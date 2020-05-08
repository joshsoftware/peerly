import React from "react";
import "./App.css";
import ListRecognitionsComponent from "./listRecognition/listRecognitionsComponent";

import recognitionByImage from "./listRecognition/images/recognitionByImage.png";
import recognitionForImage from "./listRecognition/images/recognitionForImage.png";
import highFiveImage from "./listRecognition/images/high-five.png";
import rightColumnImage from "./listRecognition/images/rightColumnImage.jpg";

function App() {
  const recognitionList = [
    {
      recognition_for: {
        name: "Avinash Mane",
        image: recognitionForImage,
      },
      recognition_by: {
        name: "Onkar Hasabe",
        image: recognitionByImage,
      },
      recognition_on: "today at 5:37 pm",
      recognition_text:
        "i give high five to avinash for writing block on react strap documentation " +
        "i learn more from this docs ",
      core_value: "write a block",
      highFiveText: "got high-five for",
      rightColumnImage: rightColumnImage,
      highFiveImage: highFiveImage,
      highFiveIncrement: "+1",
    },
    {
      recognition_for: {
        name: "Avinash Mane",
        image: recognitionForImage,
      },
      recognition_by: {
        name: "Onkar Hasabe",
        image: recognitionByImage,
      },
      recognition_on: "today at 5:37 pm",
      recognition_text:
        "i give high five to avinash for writing block on react strap documentation " +
        "i learn more from this docs ",
      core_value: "write a block",
      highFiveText: "got high-five for",
      rightColumnImage: rightColumnImage,
      highFiveImage: highFiveImage,
      highFiveIncrement: "+1",
    },
  ];

  return (
    <div className="App">
      <ListRecognitionsComponent recognitionList={recognitionList} />
    </div>
  );
}

export default App;
