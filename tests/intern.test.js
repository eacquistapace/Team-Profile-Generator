let intern = require("../lib/intern");
let newIntern = new intern(
  "Ellen",
  "001",
  "ellentest@gmail.com",
  "Denver University"
);

test("Constructor returns correct school", function () {
  expect(newIntern.school).toBe("Denver University");
});
test("Method returns correct role", function () {
  expect(newIntern.getRole()).toBe("Intern");
});
