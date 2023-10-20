import Popup from "../customComponents/Popup";
import React from "react";
import CardForm from "../forms/CardForm";
import TimelineForm from "../forms/TimelineForm";

const PopupForm = ({ visible, setVisible, componentDetails, pageId }) => {
  return (
    <Popup
      visible={visible}
      setVisible={setVisible}
      header={"Update details of " + componentDetails.CompType}
    >
      <div>{JSON.stringify(componentDetails.compId)}</div>
      {componentDetails.CompType === "timeline" ? (
        <TimelineForm
          pageId={pageId}
          compId={componentDetails.compId}
          compLabel={componentDetails.CompNAme}
        />
      ) : (
        <CardForm
          pageId={pageId}
          compId={componentDetails.compId}
          compLabel={componentDetails.CompNAme}
        />
      )}
    </Popup>
  );
};

export default PopupForm;
