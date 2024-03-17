/*
Component for rendering added courses in the form page.
*/

import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { IconButton } from "./UI/IconButton";
import { EyeIcon } from "./UI/EyeIcon";
import { EditIcon } from "./UI/EditIcon";
import { DeleteIcon } from "./UI/DeleteIcon";
import FormEntryDetailModal from "./FormEntryDetailModal";
import { useState } from "react";
import FormEntryEditModal from "./FormEntryEditModal";
import { v4 } from "uuid";

const CoursesTable = (props) => {
  // isDetails shows the syllabus download button and disables all fields
  // isEdit enables editing
  const [details, setDetails] = useState({
    isDetails: false,
    isEdit: false,
    course: null,
    syllabus: null,
  });

  const handleEdit = (course) => {
    const indexOfCourse = props.courses.findIndex(
      (element) => course === element
    );

    setDetails({
      isDetails: false,
      isEdit: true,
      course: course,
      syllabus: props.syllabi[indexOfCourse] || null,
    });
  };

  const handleDetails = (course) => {
    const indexOfCourse = props.courses.findIndex(
      (element) => course === element
    );

    setDetails({
      isDetails: true,
      isEdit: false,
      course: course,
      syllabus: props.syllabi[indexOfCourse] || null,
    });
  };

  const handleClose = () => {
    setDetails({
      isDetails: false,
      isEdit: false,
      course: null,
      syllabus: null,
    });
  };

  const columns = [
    { name: "FOREIGN COURSE", uid: "foreignCourseName" },
    { name: "METU COURSE", uid: "metuCourseName" },
    { name: "METU COURSE CODE", uid: "metuCourseCode" },
    { name: "METU COURSE CATEGORY", uid: "courseCategory" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (course, columnKey) => {
    const cellValue = course[columnKey];
    switch (columnKey) {
      case "foreignCourseName":
        return <User src="/globe.jpg" name={cellValue} css={{ p: 0 }}></User>;
      case "metuCourseName":
        return (
          <User src="/metu_icon.jpg" name={cellValue} css={{ p: 0 }}></User>
        );
      case "metuCourseCode":
        return <Text>{cellValue}</Text>;
      case "courseCategory":
        return <Text>{cellValue[0]}</Text>;
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton
                  onClick={() => {
                    handleDetails(course);
                  }}
                >
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit course">
                <IconButton
                  onClick={() => {
                    handleEdit(course);
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete course"
                color="error"
                onClick={() => {
                  props.onDelete(course);
                }}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      {details.isDetails && (
        <FormEntryDetailModal
          course={details.course}
          syllabus={details.syllabus}
          onClose={handleClose}
        ></FormEntryDetailModal>
      )}
      {details.isEdit && (
        <FormEntryEditModal
          course={details.course}
          syllabus={details.syllabus}
          onClose={handleClose}
          onAddCourse={props.onEdit}
        ></FormEntryEditModal>
      )}
      <Table
        aria-label="Courses table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={props.courses}>
          {(item) => (
            <Table.Row key={v4()}>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CoursesTable;
