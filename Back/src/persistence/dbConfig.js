import mongoose from "mongoose";

const URI_MONGO =
  "mongodb+srv://guidok:guidok@cluster0.fkpiocz.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose.connect(URI_MONGO, (error) => {
  if (error) {
    console.log("Error de conexión a base de datos", error);
  } else {
    console.log("Conectado a la base de datos");
  }
});
