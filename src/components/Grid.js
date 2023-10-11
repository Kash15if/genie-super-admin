import React from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const DraggableResizableGrid = ({
  layout,
  updateLayout,
  deleteOneGrid,
  setPopupVisible,
  setSelectedIdForUpdate,
}) => {
  const openPopupAndUpdateBlock = (value) => {
    setSelectedIdForUpdate(value);
    setPopupVisible(true);
  };

  return (
    <div className="grid-container">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1420}
        draggableHandle=".grid-item"
        isDraggable={true}
        isResizable={true}
        onLayoutChange={updateLayout}
      >
        {layout.map((item) => (
          <div key={item.i} className="grid-item">
            <>
              {item.name}
              <button onClick={() => deleteOneGrid(item.i)}>Delete</button>
              <button onClick={() => openPopupAndUpdateBlock(item)}>
                Update
              </button>
            </>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default DraggableResizableGrid;
