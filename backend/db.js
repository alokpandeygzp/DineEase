const mongoose = require("mongoose");
const mongoURI =
  "mongodb://alokpandey181:Alok2000@ac-sjafzg0-shard-00-00.kawkbuu.mongodb.net:27017,ac-sjafzg0-shard-00-01.kawkbuu.mongodb.net:27017,ac-sjafzg0-shard-00-02.kawkbuu.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-86r4oe-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function (err, data) {
      const foodCategory = await mongoose.connection.db.collection("foodCategory");
      foodCategory.find({}).toArray(function (err, catData) {
        if (err) {
          console.log(err);
        } else {
          //Making that fetched data "food_items" global
          global.food_items = data;
          global.foodCategory = catData;
        }
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error
  }
};

module.exports = connectToMongoDB;
