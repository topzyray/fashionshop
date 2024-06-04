import mongoose, { ConnectOptions } from "mongoose";

const configOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    process.env.DB_URL ||
    "mongodb+srv://admin-wakode:e3q18nPtrqcpOs8P@wakode0.4fltn8x.mongodb.net/fashionshop?retryWrites=true&w=majority";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("FashionShop database connected successfully."))
    .catch((err) =>
      console.log(`Error connceting to database: ${err.message}`)
    );
};

export default connectToDB;
