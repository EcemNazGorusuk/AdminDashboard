import { Product, User } from "./models";
import { connectToDB } from "./utils";

//GET &  UPDATE'in ilk aşaması olan idye göre veri getirme işlemi

export const fetchUsers = async (q, page) => {
  //username'e göre search edebilmek ve verilerin gelmesi için regex ve User.find içinde ekle
  const regex = new RegExp(q, "i"); //i-> case insensitive
  //pagination için sayfa başına düşen item sayısı limit ve skip ile sağlanır,sayfa sayısı ise count ile:
  const itemPerPage = 4;
  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(itemPerPage)
      .skip(itemPerPage * (page - 1));
    return { count, users };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch users!");
  }
};



//todo: update user
export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch user!");
  }
};





export const fetchProducts = async (q, page) => {
  //title'e göre search edebilmek ve verilerin gelmesi için regex ve Product.find içinde ekle
  const regex = new RegExp(q, "i"); //i-> case insensitive
  //pagination için sayfa başına düşen item sayısı limit ve skip ile sağlanır,sayfa sayısı ise count ile:
  const itemPerPage = 4;
  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(itemPerPage)
      .skip(itemPerPage * (page - 1));

    return { count, products };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch products!");
  }
};



//todo: update product
export const fetchProduct = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch product!");
  }
};
