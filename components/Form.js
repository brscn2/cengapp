/*
  Component for rendering the Form on "/apply"
*/

import {
  Container,
  Text,
  Grid,
  Input,
  Row,
  Spacer,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";
import CoursesTable from "./CoursesTable";
import FormEntryModal from "./FormEntryModal";

export default function Form() {
  const [syllabi, setSyllabi] = useState([]);
  const [application, setApplication] = useState({
    studentId: "",
    fullName: "",
    email: "",
    year: "",
    gpa: "",
    foreignUniversity: "",
    foreignCountry: "",
    term: "",
    courses: [],
  });

  // Router used to redirect user to homepage(dashboard) after submitting the form
  const router = useRouter();

  const handleSubmit = async () => {
    const JSONdata = JSON.stringify(application);

    const formResponse = await fetch("/api/forms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    if (formResponse.ok) {
      for (let sylabbus of syllabi) {
        const uploadResponse = await handleUpload(sylabbus);
        console.log(uploadResponse);
      }
    }

    console.log(formResponse);
  };

  const handleUpload = async (file) => {
    const body = new FormData();

    console.log(file);
    body.append("file", file);
    const response = await fetch("/api/sylabbus/upload", {
      method: "POST",
      body,
    });

    return response.json();
  };

  const handleAddFile = (file) => {
    setSyllabi((prevState) => {
      return [...prevState, file];
    });
  };

  const handleAddCourse = (course) => {
    let updatedCourses = [...application.courses];
    const index = updatedCourses.findIndex((crs) => crs.id === course.id);
    if (index !== -1) {
      updatedCourses[index] = course;
    } else {
      updatedCourses = [...application.courses, course];
    }
    setApplication((prevState) => {
      return {
        ...prevState,
        courses: updatedCourses,
      };
    });
  };

  const handleDeleteCourse = (deleteCourse) => {
    const updatedCourses = application.courses.filter(
      (course) => course.id !== deleteCourse.id
    );

    const updatedSyllabi = syllabi.filter(
      (sylabbus) => sylabbus.name !== deleteCourse.id.concat(".pdf")
    );

    setSyllabi(updatedSyllabi);
    setApplication((prevState) => {
      return {
        ...prevState,
        courses: updatedCourses,
      };
    });
  };

  const handleAppChange = (e) => {
    setApplication((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Container justify="center" alignContent="center" alignItems="center">
      <Row align="center" justify="center">
        <Text h2>Erasmus Application Form</Text>
      </Row>
      <Row align="center" justify="center">
        <form>
          <Grid.Container gap={1} wrap="wrap" justify="center">
            <Grid>
              <Input
                type="text"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="studentId"
                id="studentId"
                label="Student ID"
                size="sm"
                width="150px"
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="fullName"
                id="fullName"
                label="Full Name"
                size="sm"
                width="150px"
              />
            </Grid>
            <Grid>
              <Input
                type="email"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="email"
                id="email"
                label="Email"
                size="sm"
                width="200px"
              />
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} wrap="wrap" justify="center">
            <Grid>
              <Input
                type="number"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="year"
                id="year"
                label="Year"
                size="sm"
              />
            </Grid>
            <Grid>
              <Input
                type="number"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="gpa"
                id="gpa"
                label="GPA"
                size="sm"
                step="0.01"
              />
            </Grid>
          </Grid.Container>
          <Grid.Container gap={1} wrap="wrap" justify="center">
            <Grid>
              <Input
                type="text"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="foreignUniversity"
                id="foreignUniversity"
                label="Foreign University"
                size="sm"
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="foreignCountry"
                id="foreignCountry"
                label="Foreign Country"
                size="sm"
              />
            </Grid>
            <Grid>
              <Input
                type="text"
                onChange={handleAppChange}
                required
                bordered
                color="black"
                name="term"
                id="term"
                label="Which term?"
                size="sm"
              />
            </Grid>
          </Grid.Container>
        </form>
      </Row>
      <Spacer y={0.5}></Spacer>
      <Row align="center" justify="center">
        <FormEntryModal
          onAddCourse={handleAddCourse}
          onAddFile={handleAddFile}
        ></FormEntryModal>
        <Spacer x={0.5}></Spacer>
        <Button type="submit" flat color={"success"} onPress={handleSubmit}>
          Send Application
        </Button>
      </Row>
      <Container justify="center" alignContent="center" alignItems="center">
        <CoursesTable
          onEdit={handleAddCourse}
          onDelete={handleDeleteCourse}
          courses={application.courses}
          syllabi={syllabi}
        ></CoursesTable>
      </Container>
    </Container>
  );
}
