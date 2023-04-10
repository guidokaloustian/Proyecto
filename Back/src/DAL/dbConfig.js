import mongoose from "mongoose";

const URI_MONGO =
  "mongodb+srv://guidok:guidok@cluster0.fkpiocz.mongodb.net/e-commerce?retryWrites=true&w=majority";
try {
  mongoose.connect(URI_MONGO)
  console.log("Conectado a la base de datos")
} catch (error) {
  console.log("Error de conexión a base de datos", error);
}
mongoose.set("strictQuery", true);
