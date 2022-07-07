let engineer = require("../lib/engineer");
let newEngineer = new engineer(
  "Ellen",
  "001",
  "ellentest@gmail.com",
  "eacquistapace"
);

test("Constructor returns correct GitHub", function () {
  expect(newEngineer.github).toBe("eacquistapace");
});
test("Method returns correct role", function () {
  expect(newEngineer.getRole()).toBe("Engineer");
});
