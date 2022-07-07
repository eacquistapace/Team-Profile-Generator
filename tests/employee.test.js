let employee = require("../lib/employee");
let newEmployee = new employee("Ellen", "001", "ellentest@gmail.com");

test("Constructor returns correct name", function () {
  expect(newEmployee.name).toBe("Ellen");
});
test("Constructor returns correct ID", function () {
  expect(newEmployee.id).toBe("001");
});
test("Constructor returns correct email", function () {
  expect(newEmployee.email).toBe("ellentest@gmail.com");
});
test("Method returns correct name", function () {
  expect(newEmployee.getName()).toBe("Ellen");
});
test("Method returns correct ID", function () {
  expect(newEmployee.getId()).toBe("001");
});
test("Method returns correct email", function () {
  expect(newEmployee.getEmail()).toBe("ellentest@gmail.com");
});
test("Method returns correct role", function () {
  expect(newEmployee.getRole()).toBe("Employee");
});
