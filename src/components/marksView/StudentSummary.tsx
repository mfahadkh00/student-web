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
            <SummaryBox text="Top Grade" subText={topGrade} color="#4aaa9a" />
          </Col>
          <Col>
            <SummaryBox text="Most Passed" subText={maxPass} color="#4aaa9a" />
          </Col>
          <Col>
            <SummaryBox text="Min Grade" subText={minGrade} color="#ff6897" />
          </Col>
          <Col>
            <SummaryBox text="Most Failed" subText={maxFail} color="#ff6897" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StudentSummary;
