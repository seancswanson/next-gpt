// ResizableSection.tsx
import React from "react";
import { Resizable, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";

interface ResizableSectionProps {
  children: React.ReactNode;
  width: number;
  minWidth: number;
  onResize: (event: React.SyntheticEvent, data: ResizeCallbackData) => void;
}

const ResizableSection: React.FC<ResizableSectionProps> = ({
  children,
  width,
  minWidth,
  onResize,
}) => {
  return (
    <Resizable
      width={width}
      height={0}
      axis="x"
      handleSize={[10, 10]}
      minConstraints={[minWidth, Number.MIN_VALUE]}
      onResize={onResize}
    >
      <div style={{ width }}>{children}</div>
    </Resizable>
  );
};

export default ResizableSection;
