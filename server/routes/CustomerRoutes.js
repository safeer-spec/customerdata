const router = require("express").Router();
const {
  getCustomers, addCustomer, updateCustomer, deleteCustomer,
} = require("../controllers/CustomerController");
const protect = require("../middleware/Auth");
const { customerRules } = require("../middleware/Validate");

router.use(protect);
router.route("/").get(getCustomers).post(customerRules, addCustomer);
router.route("/:id").put(customerRules, updateCustomer).delete(deleteCustomer);

module.exports = router;
