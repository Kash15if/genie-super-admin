import React, { useEffect, useState } from "react";
import CRUDIE from "../customComponents/Table";

import axios from "axios";

const Users = ({}) => {
  const [columns, setColumns] = useState();
  const [dummyData, setDummyData] = useState();
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    axios.get(process.env.REACT_APP_TEST_API).then((response) => {
      const tempDataFromDB = response.data;
      setDummyData(tempDataFromDB);

      let tempCols = [
        {
          column: "uid",
          columnLabel: "Id",
          sortable: true,
          filterable: true,
          editable: false,
          createOnce: false,
          formInputDetails: {
            defaultVal: "",
            inputType: "text",
          },
        },
        {
          column: "name",
          columnLabel: "Name",
          sortable: true,
          filterable: true,
          editable: true,
          createOnce: false,
          formInputDetails: {
            defaultVal: "",
            inputType: "text",
          },
        },
        {
          column: "password",
          columnLabel: "Password",
          sortable: false,
          filterable: false,
          editable: true,
          createOnce: false,
          formInputDetails: {
            defaultVal: "",
            inputType: "text",
          },
        },
        {
          column: "email",
          columnLabel: "Email",
          sortable: true,
          filterable: true,
          editable: true,
          createOnce: true,
          formInputDetails: {
            defaultVal: "",
            inputType: "text",
          },
        },

        {
          column: "clientid",
          columnLabel: "Client Id",
          sortable: true,
          filterable: true,
          editable: true,
          createOnce: true,
          formInputDetails: {
            defaultVal: "1234hgf",
            inputType: "text",
          },
        },
      ];

      setColumns(tempCols);
    });
  }, []);

  return (
    <div id="crudie">
      <h1>CRUD Import Export Table</h1>
      {/* Crud and Import Export */}
      {columns && (
        <CRUDIE
          columns={columns}
          tableHeader="CRUD Import Export Table"
          recordsPerPageOption={[10, 20, 50]}
          defaultRecordPerPage={10}
          uniqueId="uid"
          //   excelImport={true}
          excelExport={true}
          //   jsonImport={true}
          jsonExport={true}
          getDataApi={"http://localhost:8081/sa/users"}
          createApi={"http://localhost:8081/sa/create-user"}
          uploadBulkApi={process.env.REACT_APP_TEST_API + "/bulkData"}
          editApi={"http://localhost:8081/sa/update-user"}
          deleteOneApi={"http://localhost:8081/sa/delete-user"}
          deleteMultipleApi={
            process.env.REACT_APP_TEST_API + "/delete-multiple"
          }
        />
      )}
    </div>
  );
};

export default Users;
