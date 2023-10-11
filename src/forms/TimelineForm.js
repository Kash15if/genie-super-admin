import React, { useState } from "react";

const TimelineForm = ({ compId, compName }) => {
  const [editable, setEditable] = useState(-1);
  const [data, setData] = useState([]);
  const [newForm, setNewForm] = useState({
    time: "",
    title: "",
    desc: "",
  });

  const addOrUpdateRow = () => {
    // let newObj = {};

    if (editable === -1) {
      setData([...data, newForm]);
      setNewForm({
        time: "",
        title: "",
        desc: "",
      });
      // console.log(newForm);
    } else {
      let newStructure = [...data];
      newStructure[editable] = { ...newForm };
      setData(newStructure);
      setNewForm({
        time: "",
        title: "",
        desc: "",
      });
      setEditable(-1);
      // console.log(newStructure);
    }
  };

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

  const editField = (item, index) => {
    setEditable(index);
  };

  // const saveData = () => {
  //   setEditable(-1);
  // };

  const handleInputChange = (e) => {
    let newObj = { ...newForm, [e.target.name]: e.target.value };
    setNewForm(newObj);

    // console.log(newObj);

    if (editable !== -1) {
      let newStructure = [...data];
      newStructure[editable] = newObj;
      setData(newStructure);
    }
  };

  return (
    <div>
      {editable === -1 && (
        <>
          <input
            value={newForm.time}
            type="time"
            onChange={handleInputChange}
            name="time"
          />
          <input
            value={newForm.title}
            onChange={handleInputChange}
            name="title"
          />
          <input
            value={newForm.desc}
            onChange={handleInputChange}
            name="desc"
          />
          <button onClick={addOrUpdateRow}>Add New</button>
        </>
      )}

      <div>
        <table>
          {data &&
            data.map((item, index) => (
              <tr>
                <td>
                  <input
                    disabled={editable !== index ? "disables" : ""}
                    value={item.time}
                    type="time"
                    onChange={handleInputChange}
                    name="time"
                  />
                </td>
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
                    value={item.desc}
                    onChange={handleInputChange}
                    name="desc"
                  />
                </td>
                <td>
                  {editable === index ? (
                    <button onClick={addOrUpdateRow}>Save</button>
                  ) : (
                    <button onClick={() => editField(item, index)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default TimelineForm;
