"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { signIn } from "../auth";

//todo: AUTHENTICATE
export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};


//todo: ADD NEW USER
export const addUser = async (formData) => {
  "use server";
  const {
    username,
    email,
    password,
    phone,
    address,
    isAdmin,
    isActive,
  } = Object.fromEntries(formData);
  try {
    connectToDB();
    //password şifreleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user!");
  }
  //ekleme işleminden sonra istenen pathe yönlensin
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

//todo: DELETE USER
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

//todo: UPDATE USER
export const updateUser = async (formData) => {
  "use server";
  const {
    id,
    username,
    email,
    password,
    phone,
    address,
    isAdmin,
    isActive,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user!");
  }
  //ekleme işleminden sonra istenen pathe yönlensin
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

//todo: ADD NEW PRODUCT
export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } = Object.fromEntries(
    formData
  );
  try {
    connectToDB();
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

//todo: DELETE PRODUCT
export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

//todo: UPDATE PRODUCT
export const updateProduct = async (formData) => {
  "use server";
  const { id, title, desc, price, stock, color, size } = Object.fromEntries(
    formData
  );
  try {
    connectToDB();
    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
