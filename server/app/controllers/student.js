import StudentData from "../models/student.js";
export const registerStudent = async (req, res) => {
  console.log("Student registered successfully!");
  const student = req.body;
  let max;
  let roll_number = 1;
  let length = await StudentData.countDocuments();
  if (length > 0) {
    max = await StudentData.findOne().sort({ rollNumber: -1 }).limit(1);
    console.log(max.rollNumber);
    roll_number = max.rollNumber + 1;
  }

  const savedStudent = await new StudentData({
    ...student,
    rollNumber: roll_number,
    status: "active",
  });
  try {
    savedStudent.save();

    res.status(201).send(savedStudent);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};
// get all Student
export const getStudents = async (req, res) => {
  try {
    const allStudents = await StudentData.find(
      {},
      {
        name: 1,
        sex: 1,
        religion: 1,
        address: 1,
        contactNumber: 1,
        rollNumber: 1,
        status: 1,
      }
    );

    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    await StudentData.findByIdAndRemove(id).exec();
    res.send("Successfull Deleted!");
  } catch (error) {
    console.log(error);
  }
};

export const getStudent = async (req, res) => {
  console.log(req.params);
  try {
    const id = req.params.id;
    const singleStudent = await StudentData.findById(id, { _id: 0 });

    res.status(200).json(singleStudent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};