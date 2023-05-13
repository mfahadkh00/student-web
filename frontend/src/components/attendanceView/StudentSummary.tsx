import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SummaryBox from "components/marksView/SummaryBox";
import { ISummaryData } from "utils";

function StudentSummary({
  topGrade,
  minGrade,
  maxFail,
  maxPass,
}: ISummaryData) {
  return (
    <>
      <Container style={{ padding: "25px" }}>
        <Row>
          <Col>
            <SummaryBox text="Students With Low Attendance" subText={topGrade} color="#ff6897" />
          </Col>
          <Col>
            <SummaryBox text="Subject with Least Attendance" subText={maxPass} color="#ff6897" />
          </Col>
          <Col>
            <SummaryBox text="Subject with Most Attendance" subText={minGrade} color="#4aaa9a" />
          </Col>
          <Col>
            <SummaryBox text="Max Attendance" subText={maxFail} color="#4aaa9a" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StudentSummary;
