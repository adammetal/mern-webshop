const mongoose = require("mongoose");
const app = require("./src/app");

const main = async () => {
  await mongoose.connect("mongodb://adam:123@localhost:27017/cards-webshop");
  app.listen(8080, () => {
    console.log("Minden fasza on the 8080 port");
  });
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
