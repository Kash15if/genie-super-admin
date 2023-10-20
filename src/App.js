import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Pages from "./pages/Pages";
import PageAssign from "./pages/PageAssign";
import PageCreation from "./pages/PageCreation";
import Users from "./pages/Users";

// {"PageStructure":[
//   {
//     "compId": "c101",
//     "CompNAme": "Card1",
//     "CompType": "card",
//     "sequence": 1
//   }
// ]}

function App() {
  // const [selectedType, setSelectedType] = useState("");
  // const [layout, setLayout] = useState([]);
  // const [selectedIdForUpdate, setSelectedIdForUpdate] = useState();

  // const [popupVisible, setPopupVisible] = useState(false);

  // const options = [
  //   { value: "type1", label: "Type 1" },
  //   { value: "type2", label: "Type 2" },
  //   { value: "type3", label: "Type 3" },
  // ];

  // const handleCreateNewGrid = (event) => {
  //   // console.log(event.target.value); // Update the selected option when it changes
  //   const newBoxId = (layout.length + 1).toString();
  //   const newLayoutItem = {
  //     i: newBoxId,
  //     x: 0,
  //     y: 2,
  //     w: 2,
  //     h: 2,
  //     name: "Kashif",
  //     type: event.target.value,
  //     data: null,
  //   };
  //   setLayout([...layout, newLayoutItem]);
  // };

  // const deleteOneGrid = (id) => {
  //   const updatedLayout = layout.filter((item) => item.i !== id);
  //   setLayout(updatedLayout);
  // };

  // const updateLayout = (newLayout) => {
  //   console.log(
  //     newLayout.map((item) => {
  //       const existingItem = layout.find((oldItem) => oldItem.i === item.i);
  //       return {
  //         ...item,
  //         type: existingItem.type,
  //         data: existingItem.data,
  //         name: existingItem.name,
  //       };
  //     })
  //   );
  //   setLayout(
  //     newLayout.map((item) => {
  //       const existingItem = layout.find((oldItem) => oldItem.i === item.i);
  //       return {
  //         ...item,
  //         type: existingItem.type,
  //         data: existingItem.data,
  //         name: existingItem.name,
  //       };
  //     })
  //   );
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/pages-structure/:pageId" element={<PageCreation />} />
        <Route path="/pages-assign" element={<PageAssign />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">

    // </div>
  );
}

export default App;
