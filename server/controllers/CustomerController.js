const Customer = require("../models/CustomerModel");


exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    next(err);
  }
};


exports.addCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, company, status } = req.body;
    const customer = await Customer.create({
      name, email, phone, company, createdBy: req.user._id,
    });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};


exports.updateCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, company, status } = req.body;
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { name, email, phone, company },
    );
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted", id: customer._id });
  } catch (err) {
    next(err);
  }
};
