import React from "react";

interface ISummaryBoxProps {
  color?: string;
  text?: string;
  subText?: string;
}
const SummaryBox: React.FC<ISummaryBoxProps> = (props) => {
  return (
    <>
      <div>
        <div className="summaryBoxInner" style={{ background: props?.color }}>
          <span className="summaryBoxText">{props?.text}</span>
          <span className="summaryBoxSubtext">{props?.subText}</span>
        </div>
      </div>
    </>
  );
};

export default SummaryBox;
