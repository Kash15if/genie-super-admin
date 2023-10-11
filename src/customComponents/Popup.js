import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function BasicDemo({ visible, setVisible, children, header }) {
  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={header}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {children}
      </Dialog>
    </div>
  );
}
