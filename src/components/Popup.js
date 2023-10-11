import Popup from "../customComponents/Popup";
import React from "react";
import TimelineForm from "../forms/TimelineForm";

const PopupForm = ({ visible, setVisible, componentDetails }) => {
  return (
    <Popup
      visible={visible}
      setVisible={setVisible}
      header={"Update details of " + componentDetails.type}
    >
      <TimelineForm />
    </Popup>
  );
};

export default PopupForm;
