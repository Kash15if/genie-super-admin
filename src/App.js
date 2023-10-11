import logo from "./logo.svg";
import "./App.css";
import DynamicGrid from "./components/Grid";
import React, { useState, useEffect } from "react";
import PopupForm from "./components/Popup";

function App() {
  const [selectedType, setSelectedType] = useState("");
  const [layout, setLayout] = useState([]);
  const [selectedIdForUpdate, setSelectedIdForUpdate] = useState();

  const [popupVisible, setPopupVisible] = useState(false);

  const options = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "type3", label: "Type 3" },
  ];

  const handleCreateNewGrid = (event) => {
    // console.log(event.target.value); // Update the selected option when it changes
    const newBoxId = (layout.length + 1).toString();
    const newLayoutItem = {
      i: newBoxId,
      x: 0,
      y: 2,
      w: 2,
      h: 2,
      name: "Kashif",
      type: event.target.value,
      data: null,
    };
    setLayout([...layout, newLayoutItem]);
  };

  const deleteOneGrid = (id) => {
    const updatedLayout = layout.filter((item) => item.i !== id);
    setLayout(updatedLayout);
  };

  const updateLayout = (newLayout) => {
    setLayout(
      newLayout.map((item) => {
        const existingItem = layout.find((oldItem) => oldItem.i === item.i);
        return {
          ...item,
          type: existingItem.type,
          data: existingItem.data,
          name: existingItem.name,
        };
      })
    );
  };

  return (
    <div className="App">
      <div className="card flex justify-content-center">
        <select value={selectedType} onChange={handleCreateNewGrid}>
          <option key={0} value="">
            Select One
          </option>
          {options.map((option, index) => (
            <option key={index + 1} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {layout && layout.length !== 0 && (
        <DynamicGrid
          layout={layout}
          updateLayout={updateLayout}
          deleteOneGrid={deleteOneGrid}
          setPopupVisible={setPopupVisible}
          setSelectedIdForUpdate={setSelectedIdForUpdate}
        />
      )}

      {selectedIdForUpdate && (
        <PopupForm
          visible={popupVisible}
          setVisible={setPopupVisible}
          componentDetails={selectedIdForUpdate}
        />
      )}
    </div>
  );
}

export default App;
