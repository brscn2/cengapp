/*
  Component for rendering the course detail modal
*/

import { useState } from "react";
import Link from "next/link";
import { Button, Modal, Input, Text, Grid, Checkbox } from "@nextui-org/react";
import { DownloadIcon } from "./UI/DownloadIcon";

export default function FormEntryDetailModal(props) {
  const [visible, setVisible] = useState(true);

  const course = props.course;

  const closeHandler = () => {
    props.onClose();
    setVisible(false);
  };

  const handleDownload = () => {
    window.open(URL.createObjectURL(props.syllabus), "_blank")
  }

  return (
    <div>
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
                disabled
                value={course.foreignCourseName || ""}
                required
                rounded
                bordered
                color="black"
                id="studentId"
                label="Foreign Course Name"
                size="sm"
              />
            </Grid>
            <Grid>
              <Input
                type="number"
                name="ects"
                disabled
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
                disabled
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
                <Button
                  auto
                  color="secondary"
                  onPress={handleDownload}
                  icon={<DownloadIcon></DownloadIcon>}
                >
                  Download syllabus
                </Button>
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
                disabled
                orientation="horizontal"
                label="Course Category"
                color="black"
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                label="Is sylabbus signed?"
                disabled
                size="sm"
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}
