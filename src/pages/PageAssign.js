import React, { useEffect, useState } from "react";

import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";

import axios from "axios";

const PageAssign = ({}) => {
  const [data, setData] = useState();

  const [formData, setFormData] = useState({
    uid: "",
    pages: null,
  });
  const [editMode, setEditMode] = useState();

  const [selectedCity, setSelectedCity] = useState(null);
  const [users, setUsers] = useState();
  const [pages, setPages] = useState();
  //   { name: "New York", uid: "NY" },
  //   { name: "Rome", uid: "RM" },
  //   { name: "London", uid: "LDN" },
  //   { name: "Istanbul", uid: "IST" },
  //   { name: "Paris", uid: "PRS" },
  // ];

  // const pages = [
  //   { label: "Page1", value: "pagw1" },
  //   { label: "Page2", value: "pagw2" },
  //   { label: "Page3", value: "pagw3" },
  //   { label: "Page4", value: "pagw4" },
  //   { label: "Page5", value: "pagw4" },
  // ];

  const getDataFromDB = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8081/sa/assign-pages-table"
      );
      console.log(response.data);
      let data = response.data;
      setData([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  const getPages = async () => {
    try {
      let response = await axios.get("http://localhost:8081/sa/pages");
      console.log(response.data);
      let data = response.data.map((item) => ({
        value: item.pageid,
        label: item.pagelabel,
      }));
      setPages([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  // const getUsers = async () => {
  //   try {
  //     let response = await axios.get("http://localhost:8081/sa/users");
  //     console.log(response.data);
  //     let data = response.data.map((item) => ({
  //       uid: item.uid,
  //       label: item.label,
  //     }));
  //     setData([...data]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    getDataFromDB();
    getPages();
  }, []);

  const updateForm = (e) => {
    console.log(e.target.name, e.value);
    let name = e.target.name;
    // if (name === "uid") {
    setFormData({
      ...formData,
      [e.target.name]: e.value,
    });

    console.log({
      ...formData,
      [e.target.name]: e.value,
    });
    // } else {
    //   setFormData({
    //     ...formData,
    //     [e.target.name]: e.value.join(","),
    //   });
    // }
  };

  const submitForm = async () => {
    // console.log(formData.uid, formData.pages.join(","));
    try {
      await axios.post("http://localhost:8081/sa/assign-pages", {
        uid: formData.uid,
        pages: formData.pages.join(", "),
      });
    } catch (e) {
      console.log(e);
    }

    setEditMode(false);
    setFormData({ uid: "", pages: null });
    getDataFromDB();
  };

  const editAssign = async (uid, pages) => {
    setFormData({
      uid: uid,
      pages: pages && pages.length ? pages.split(", ") : null,
    });
    console.log({
      uid: uid,
      pages: pages && pages.length ? pages.split(", ") : null,
    });
    setEditMode(true);
  };

  const deleteAssign = async (uid) => {
    try {
      await axios.post("http://localhost:8081/sa/delete-assign-pages", {
        uid,
      });

      getDataFromDB();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="assignForm">
        <Dropdown
          name="uid"
          value={formData.uid}
          onChange={updateForm}
          options={users}
          optionLabel="label"
          optionValue="uid"
          placeholder="Select a User"
          className="w-full md:w-14rem"
          disabled={true}
        />
        <MultiSelect
          name="pages"
          value={formData.pages}
          onChange={updateForm}
          options={pages}
          optionLabel="label"
          optionValue="value"
          placeholder="Select Pages"
          maxSelectedLabels={3}
          className="w-full md:w-20rem"
        />
        <button onClick={() => submitForm()}>Submit</button>
      </div>
      <div className="assignTable">
        <table>
          <tr>
            <th>Uid</th>
            <th>Name</th>
            <th>Pages</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {data &&
            data.map((item, index) => (
              <tr>
                <td>{item.uid}</td>
                <td>{item.name}</td>
                <td>{item.pages}</td>
                <td>
                  <button onClick={() => editAssign(item.uid, item.pages)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteAssign(item.uid)}>Delete</button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};

export default PageAssign;
