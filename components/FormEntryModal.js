/*
  Component for rendering the course entry modal
*/

import { useState } from "react";
import { Button, Modal, Input, Text, Grid, Checkbox } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

export default function FormEntryModal(props) {
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState({
    id: uuidv4(),
    foreignCourseName: "",
    ects: "",
    totalCourseHours: "",
    courseCategory: [],
    metuCourseName: "",
    metuCourseCode: "",
    metuCredits: "",
    metuEcts: "",
    isSigned: false,
  });

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    setCourse((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCheckboxChange = (val) => {
    setCourse((prevState) => {
      return {
        ...prevState,
        courseCategory: val,
      };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const renamedFile = new File([file], `${course.id}.pdf`, {
        type: file.type,
      });

      setFile(renamedFile);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    setVisible(false);
    setCourse({
      id: uuidv4(),
      foreignCourseName: "",
      ects: "",
      totalCourseHours: "",
      courseCategory: "",
      metuCourseName: "",
      metuCourseCode: "",
      metuCredits: "",
      metuEcts: "",
      isSigned: false,
    });

    props.onAddCourse(course);
    if (file) {
      props.onAddFile(file);
    }
  };

  return (
    <div>
      <Button auto flat color={"primary"} onPress={handler}>
        Add your courses
      </Button>
      <form>
        <Modal
          closeButton
          open={visible}
          onClose={closeHandler}
          width="600px"
          scroll
        >
          <Modal.Header>
            <Text color="black" size={18}>
              Course Entry
            </Text>
          </Modal.Header>

          <Modal.Body>
            <Grid.Container
              gap={1}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid>
                <Input
                  type="text"
                  name="foreignCourseName"
                  onChange={handleChange}
                  value={course.foreignCourseName || ""}
                  required
                  rounded
                  bordered
                  color="black"
                  label="Foreign Course Name"
                  size="sm"
                />
              </Grid>
              <Grid>
                <Input
                  type="number"
                  name="ects"
                  onChange={handleChange}
                  value={course.ects || ""}
                  required
                  rounded
                  bordered
                  color="black"
                  label="ECTS"
                  size="sm"
                />
              </Grid>
              <Grid>
                <Input
                  type="number"
                  name="totalCourseHours"
                  onChange={handleChange}
                  value={course.totalCourseHours || ""}
                  required
                  rounded
                  bordered
                  color="black"
                  label="Total Course Hours"
                  size="sm"
                />
              </Grid>
            </Grid.Container>

            <Grid.Container
              gap={1}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid>
                <Input
                  type="file"
                  name="syllabus"
                  onChange={handleFileChange}
                  required
                  color="black"
                  label="Syllabus"
                  size="md"
                />
              </Grid>
            </Grid.Container>

            <Grid.Container
              gap={1}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid>
                <Checkbox.Group
                  value={course.courseCategory || []}
                  name="courseCategory"
                  onChange={handleCheckboxChange}
                  orientation="horizontal"
                  label="Course Category"
                  color="primary"
                  size="sm"
                >
                  <Checkbox
                    value="MUST"
                    isDisabled={
                      course.courseCategory.length !== 0 &&
                      !course.courseCategory.includes("MUST")
                    }
                  >
                    MUST
                  </Checkbox>
                  <Checkbox
                    value="TECHNICAL ELECTIVE"
                    isDisabled={
                      course.courseCategory.length !== 0 &&
                      !course.courseCategory.includes("TECHNICAL ELECTIVE")
                    }
                  >
                    TE
                  </Checkbox>
                  <Checkbox
                    value="RESTRICTED ELECTIVE"
                    isDisabled={
                      course.courseCategory.length !== 0 &&
                      !course.courseCategory.includes("RESTRICTED ELECTIVE")
                    }
                  >
                    RESTRICTED ELECTIVE
                  </Checkbox>
                  <Checkbox
                    value="NON TECH ELECTIVE"
                    isDisabled={
                      course.courseCategory.length !== 0 &&
                      !course.courseCategory.includes("NON TECH ELECTIVE")
                    }
                  >
                    NTE
                  </Checkbox>
                </Checkbox.Group>
              </Grid>
            </Grid.Container>

            <Grid.Container
              gap={1}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid>
                <Input
                  type="text"
                  name="metuCourseName"
                  onChange={handleChange}
                  value={course.metuCourseName || ""}
                  required
                  rounded
                  bordered
                  color="black"
                  id="metuCourseName"
                  label="METU Course Name"
                  size="sm"
                />
              </Grid>
              <Grid>
                <Input
                  type="text"
                  name="metuCourseCode"
                  onChange={handleChange}
                  value={course.metuCourseCode || ""}
                  required
                  rounded
                  bordered
                  color="black"
                  id="metuCourseCode"
                  label="METU Course Code"
                  size="sm"
                />
              </Grid>
            </Grid.Container>

            <Grid.Container
              gap={1}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid>
                <Input
                  type="number"
                  name="metuCredits"
                  onChange={handleChange}
                  value={course.metuCredits || ""}
                  required
                  rounded
                  bordered
                  color="black"
                  id="metuCourseCredits"
                  label="METU Credits"
                  size="sm"
                />
              </Grid>
              <Grid>
                <Input
                  type="number"
                  name="metuEcts"
                  onChange={handleChange}
                  value={course.metuEcts || ""}
                  required
                  rounded
                  bordered
                  color="black"
                  id="metuECTS"
                  label="METU ECTS"
                  size="sm"
                />
              </Grid>
            </Grid.Container>

            <Grid.Container
              gap={1}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid>
                <Checkbox
                  label="Is syllabus signed?"
                  size="sm"
                  onChange={(val) => {
                    setCourse((prevState) => {
                      return {
                        ...prevState,
                        isSigned: val,
                      };
                    });
                  }}
                  isSelected={course.isSigned}
                  value={true}
                ></Checkbox>
              </Grid>
            </Grid.Container>
          </Modal.Body>

          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
            <Button auto flat color="success" type="submit"  onPress={handleSubmit}>
              Add Course
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}
