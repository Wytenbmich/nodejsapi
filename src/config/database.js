const mongoose = require('mongoose');

const connectToDb = async (database_url) => {
  await mongoose.connect(database_url, () => {
    console.log("Connected to db")
    },
    e => console.log(e)
  );
}
module.exports = connectToDb

