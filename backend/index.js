const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MONGODB Connect
console.log(process.env.MONGO_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to MongoDB: ${process.env.MONGO_URL}`))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

// signup
app.post("/signup", (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      console.log(result);
      if (result) {
        res.send({ message: "Email này đã được dùng", alert: false });
      } else {
        const data = userModel(req.body);
        const save = data.save();
        res.send({
          message:
            "Đăng ký thành công. Bạn sẽ được chuyển hướng đến trang đăng nhập sau 3s!",
          alert: true,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//login
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        if (password === result.password) {
          const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            image: result.image,
          };
          console.log(dataSend);
          res.send({
            message:
              "Đăng nhập thành công. Bạn sẽ được chuyển đến trang chủ sau vài giây!",
            alert: true,
            data: dataSend,
          });
        } else
          res.send({
            message: "Sai mật khẩu hay nhập lai!",
            alert: false,
          });
      } else {
        res.send({
          message: "Tài khoản không tồn tại, hãy đăng ký",
          alert: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// product schema and model
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", productSchema);

//  handle upload product
app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload thành công!" });
});

//handle get product
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

// handle update product
app.put("/updateProduct/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, category, image, price, description } = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        name,
        category,
        image,
        price,
        description,
      },
      { new: true }
    );
    res.send({
      message: "Cập nhật sản phẩm thành công!",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).send({ message: "Lỗi khi cập nhật sản phẩm" });
  }
});

// handle delete product
app.delete("/deleteProduct/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    await productModel.findByIdAndDelete(productId);
    res.send({ message: "Xóa sản phẩm thành công!" });
  } catch (error) {
    res.status(500).send({ message: "Lỗi khi xóa sản phẩm" });
  }
});

app.listen(PORT, () => console.log("Server is running at port " + PORT));
