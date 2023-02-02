const fetch = require("node-fetch");
const mongoose = require("mongoose");
const CardModel = require("./models/card.shema");

const url = "https://api.scryfall.com/cards/random";

const extract = (scry) => ({
  name: scry.name,
  scryId: scry.id,
  image: scry?.image_uris?.png ?? "",
  price: scry?.prices?.usd ?? 1,
});

const main = async () => {
  await mongoose.connect("mongodb://adam:123@localhost:27017/cards-webshop");

  /*const tasks = [...Array(10)].map(() => {
    return fetch(url).then((res) => res.json()).then(extract);
  });

  const cards = await Promise.all(tasks);

  await CardModel.create(...cards);*/

  const cards = await CardModel.find();
  console.log(JSON.stringify(cards, null, 2));
};

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    process.exit(0);
  });
