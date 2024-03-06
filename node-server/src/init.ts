import { Company, User } from "./models";
import { faker } from "@faker-js/faker";

export default function init() {
  User.exists({ email: "lucasdev2001@gmail.com" }).then((exists) => {
    if (!exists) {
      User.create({
        email: "lucasdev2001@gmail.com",
        password: "123",
        name: "Lucas",
      });
    }
  });

  Company.findOne({}).then((company) => {
    if (!company) {
      for (let i = 0; i < 5; i++) {
        Company.create({
          name: faker.company.name(),
        });
      }
    }
  });
}
