import DynamicGrid from "../components/Grid";
import React, { useState, useEffect } from "react";
import PopupForm from "../components/Popup";
import { useParams } from "react-router-dom";
import axios from "axios";

const PageCreation = ({ match }) => {
  const { pageId } = useParams();
  const [selectedType, setSelectedType] = useState("");
  const [layout, setLayout] = useState();
  const [selectedIdForUpdate, setSelectedIdForUpdate] = useState();

  const [popupVisible, setPopupVisible] = useState(false);

  const options = [
    { value: "card", label: "Card" },
    { value: "timeline", label: "Timeline" },
    { value: "list", label: "Type List" },
  ];

  useEffect(() => {
    console.log(pageId);
    (async () => {
      try {
        let resp = await axios.post("http://localhost:8081/sa/getpage", {
          pageid: pageId,
        });
        let data = resp.data;
        console.log(JSON.parse(data[0].structure.value).PageStructure);
        if (data.length > 0) {
          setLayout(JSON.parse(data[0].structure.value).PageStructure);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleCreateNewGrid = (event) => {
    // console.log(event.target.value); // Update the selected option when it changes
    console.log(layout);
    const newBoxId = (layout.length + 1).toString();
    const newLayoutItem = {
      i: newBoxId,
      x: 0,
      y: 2,
      w: 12,
      h: 2,
      CompNAme: "Kashif",
      CompType: event.target.value,
      compId: generateUniqueID(),
      sequence: 1,
      data: null,
    };
    console.log([...layout, newLayoutItem]);
    setLayout([...layout, newLayoutItem]);
  };

  const deleteOneGrid = (id) => {
    const updatedLayout = layout.filter((item) => item.i !== id);
    setLayout(updatedLayout);
  };

  const updateLayout = (newLayout) => {
    let tempLayout = newLayout.map((item) => {
      const existingItem = layout.find((oldItem) => oldItem.i === item.i);
      return {
        ...item,
        CompType: existingItem.type,
        data: existingItem.data,
        CompNAme: existingItem.CompNAme,
        CompType: existingItem.CompType,
        compId: existingItem.compId,
        sequence: existingItem.sequence,
      };
    });

    console.log(tempLayout);
    setLayout(tempLayout);
  };

  const savePage = async () => {
    // update-pagestructure

    const newLayout = layout
      .sort((a, b) => a.y - b.y)
      .map((item, index) => ({ ...item, sequence: index + 1 }));

    try {
      let resp = await axios.post(
        "http://localhost:8081/sa/update-pagestructure",
        {
          pageId: pageId,
          pageLabel: "Agenda ",
          structure: JSON.stringify({
            PageStructure: newLayout,
          }),
        }
      );
      // let data = resp.data;
      console.log(resp);
    } catch (e) {
      console.log(e);
    }

    console.log(layout.sort((item1, item2) => item1.y - item2.y));
  };

  const generateUniqueID = () => {
    // Generate a random 8-digit number
    const min = 10000000;
    const max = 99999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    return randomNumber.toString();
  };

  return (
    <>
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
      {layout ? (
        <DynamicGrid
          layout={layout}
          updateLayout={updateLayout}
          deleteOneGrid={deleteOneGrid}
          setPopupVisible={setPopupVisible}
          setSelectedIdForUpdate={setSelectedIdForUpdate}
        />
      ) : (
        <div>No Data</div>
      )}
      {selectedIdForUpdate && (
        <PopupForm
          visible={popupVisible}
          setVisible={setPopupVisible}
          componentDetails={selectedIdForUpdate}
          pageId={pageId}
        />
      )}{" "}
      <button onClick={() => savePage()}> Save Page</button>
    </>
  );
};

export default PageCreation;
