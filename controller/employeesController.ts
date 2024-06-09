const { json } = require('express');
const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find(); // get All user from db
  if (!employees) return res.status(204).json({ 'message': 'No employees found' })
  res.json(employees)
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req?.body
  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First and Last name are required" });
  }

  try {
    const result = await Employee.create({
      firstname,
      lastname
    })
    res.status(201).json(result)
  } catch (error) {
    console.error(err)
  }
};

const updateEmployee = async (req, res) => {
  const { id, firstname, lastname } = req?.body
  if (!id) {
    return res.status(400).json({ "message": `Employee ID ${id} not found` })
  }

  const employee = await Employee.findOne({ _id: id }).exec()

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }
  if (firstname) employee.firstname = firstname;
  if (lastname) employee.lastname = lastname;
  const result = await employee.save()
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  const { id, } = req?.body;
  if (!id)
    return res.status(400).json({ "message": `Employee ID required` });

  const employee = await Employee.findOne({ _id: id }).exec()


  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }

  const result = await employee.deleteOne({ _id: id })
  res.json(result);
};

const getEmployee = async (req, res) => {
  const { id, } = req?.params;
  if (!id) return res.status(400).json({ "message": `Employee ID required` });
  const employee = await Employee.findOne({ _id: id }).exec()

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
