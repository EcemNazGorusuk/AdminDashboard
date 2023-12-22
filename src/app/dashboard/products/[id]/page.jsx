import React from "react";
import styles from "../../../ui/dashboard/users/user/user.module.css";
import Image from "next/image";
import userImg from "../../../../../public/images.png";
import { fetchProduct } from "@/app/lib/data";
import { updateProduct } from "@/app/lib/actions";

const ProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <form action={updateProduct} className={styles.form}>
        <input type="hidden" name="id" value={product.id} />
        <div className={styles.infoContainer}>
          <div className={styles.imgContainer}>
            <Image src={userImg} alt="" fill />
          </div>
          <div className={styles.title}>{product.title}</div>
        </div>
        <div className={styles.formContainer}>
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder={product.color || "color"}
          />
          <label>Size</label>
          <textarea
            type="text"
            name="size"
            placeholder={product.size || "size"}
          />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={product.desc}
          ></textarea>
          <button>Update</button>
        </div>{" "}
      </form>
    </div>
  );
};

export default ProductPage;
