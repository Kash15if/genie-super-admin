import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pages = () => {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    pageid: "",
    pagelabel: null,
    structure: null,
  });

  const updateForm = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getDataFromDB = async () => {
    try {
      let response = await axios.get("http://localhost:8081/sa/pages");
      console.log(response.data);
      let data = response.data;
      setData([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  const submitForm = async () => {
    console.log({
      pageid: formData.pageid,
      pagelabel: formData.pagelabel,
      structure: JSON.stringify({}),
    });
    try {
      await axios.post("http://192.168.7.17:8081/sa/createpage", {
        pageid: formData.pageid,
        pagelabel: formData.pagelabel,
        structure: "{}",
      });
    } catch (e) {
      console.log(e);
    }

    setFormData({ pageid: "", pagelabel: null, structure: null });
    getDataFromDB();
  };

  return (
    <>
      <div className="form-page">
        <input
          disabled
          value={formData.pageid}
          name="pageid"
          onChange={updateForm}
        />
        <input
          value={formData.pagelabel}
          name="pagelabel"
          onChange={updateForm}
        />
        <button onClick={() => submitForm()}>Submit</button>
      </div>
      <div className="pagesTable">
        <table>
          <tr>
            <th>pageId</th>
            <th>PageLabel</th>
            <th>Edit Structure</th>
            <th>Delete</th>
          </tr>
          {data &&
            data.map((item, index) => (
              <tr>
                <td>{item.pageid}</td>
                <td>{item.pagelabel}</td>
                <td>
                  <Link to={"/pages-structure/" + item.pageid}>
                    Edit Structure
                  </Link>
                </td>
                <td>
                  {/* <button onClick={() => deletePage(item.pageid)}>Delete</button> */}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};

export default Pages;
