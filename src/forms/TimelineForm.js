import React, { useState } from "react";

const TimelineForm = ({ compId, compName }) => {
  const [editable, setEditable] = useState(-1);
  const [data, setData] = useState([]);

  const addOneRow = () => {
    let newObj = {};
    setData([...data, newObj]);
  };

  return (
    <div>
      {editable === -1 && <button onClick={addOneRow}>Add New</button>}

      <div>
        {data &&
          data.map((item) => (
            <>
              <input />
              <input />
              <button>Edit</button>
            </>
          ))}
      </div>
    </div>
  );
};

export default TimelineForm;
