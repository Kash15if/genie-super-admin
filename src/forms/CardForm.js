import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ pageId, compId, compLabel }) => {
  const [editable, setEditable] = useState(-1);
  const [data, setData] = useState();
  const [newForm, setNewForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(
          `http://localhost:8081/sa/component?pageId=${pageId}&compId=${compId}`
        );
        // console.log(response.data);
        let data = response.data; //? response.data[0] : {};
        if (data && data.length) {
          setNewForm(JSON.stringify(data[0]));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // const addOrUpdateRow = () => {
  //   // let newObj = {};

  //   if (editable === -1) {
  //     setData([...data, newForm]);
  //     setNewForm({
  //       title: "",
  //       content: "",
  //     });
  //     // console.log(newForm);
  //   } else {
  //     let newStructure = [...data];
  //     newStructure[editable] = { ...newForm };
  //     setData(newStructure);
  //     setNewForm({
  //       title: "",
  //       content: "",
  //     });
  //     setEditable(-1);
  //     // console.log(newStructure);
  //   }
  // };

  // const updateOneRow = (item, index) => {
  //   let newStructure = [...data];
  //   newStructure[editable] = { ...item };
  //   setData(newStructure);
  //   setNewForm({
  //     time: "",
  //     title: "",
  //     desc: "",
  //   });
  //   setEditable(-1);
  // };

  // const editField = (item, index) => {
  //   setEditable(index);
  //   setNewForm(data[index]);
  // };

  // const saveData = () => {
  //   setEditable(-1);
  // };

  const saveDataToDB = async () => {
    try {
      const body = {
        pageId: pageId,
        componentId: compId,
        compLabel: compLabel,
        data: JSON.stringify(newForm),
        compStyles: JSON.stringify({}),
      };
      let resp = await axios.post(
        "http://localhost:8081/sa/update-component",
        body
      );

      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e) => {
    let newObj = { ...newForm, [e.target.name]: e.target.value };
    setNewForm(newObj);

    // console.log(newObj);

    if (editable !== -1) {
      let newStructure = [...data];
      newStructure[editable] = { ...newObj };
      setData(newStructure);
    }
  };

  // const deleteRow = (index) => {
  //   let newStructure = [...data];
  //   newStructure.splice(index, 1);
  //   console.log(newStructure);
  //   setData([...newStructure]);
  // };

  return (
    <div>
      <>
        <input
          value={newForm.title}
          onChange={handleInputChange}
          name="title"
        />
        <input
          value={newForm.content}
          onChange={handleInputChange}
          name="content"
        />
        <button onClick={saveDataToDB}>Add New</button>
      </>

      {/* <div>
        <table>
          {data &&
            data.map((item, index) => (
              <tr>
                <td>
                  <input
                    disabled={editable !== index ? "disables" : ""}
                    value={item.title}
                    onChange={handleInputChange}
                    name="title"
                  />
                </td>
                <td>
                  <input
                    disabled={editable !== index ? "disables" : ""}
                    value={item.content}
                    onChange={handleInputChange}
                    name="content"
                  />
                </td>
                <td>
                  {editable === index ? (
                    <button onClick={addOrUpdateRow}>Save</button>
                  ) : (
                    <button onClick={() => editField(item, index)}>Edit</button>
                  )}
                </td>
                <td>
                  <button onClick={() => deleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
        </table>

        <button onClick={() => saveDataToDB()}> SAVE COMPONENT DATA</button>
      </div> */}
    </div>
  );
};

export default Card;
