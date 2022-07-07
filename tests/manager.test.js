let manager = require("../lib/manager");
let newManager = new manager("Ellen", "001", "ellentest@gmail.com", "700");

test("Constructor returns correct office number", function () {
  expect(newManager.officeNumber).toBe("700");
});
test("Method returns correct role", function () {
  expect(newManager.getRole()).toBe("Manager");
});
