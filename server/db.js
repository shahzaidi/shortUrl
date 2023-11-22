const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/UrlDataBase";

const dbConnect = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(
        `Data Base Connected Successfully on ${data.connection.host}`
      );
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = dbConnect;
