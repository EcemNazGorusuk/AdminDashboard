//  http://localhost:3000/dashboard/products
import React from "react";
import styles from "../../ui/dashboard/products/products.module.css";
import noproductImg from "../../../../public/noproduct.png";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { connectToDB } from "@/app/lib/utils";
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";
export default async function ProductsPage({ searchParams }) {
  //SEARCH COMPONENTININ ÇALIŞMASI & PAGINATION & FETCH PRODUCTS İÇİN:
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  //FETCH PRODUCTS  burada çağırılır:
  await connectToDB(); // db connection burada çağırılır
  const { products, count } = await fetchProducts(q, page); //fetchUser metodu içine gönder q'yu ve page'i
  console.log(products);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product.." />
        <Link href={"/dashboard/products/add"}>
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img || noproductImg}
                    alt=""
                    width={60}
                    height={60}
                    className={styles.productImg}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>${product.price}</td>
              <td>{product.createdAt?.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    {/*server actionlarla delete işlemi için form tagi ile buton sarmalanır ve input value için eklenir*/}
                    <input type="hidden" name="id" value={(product.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
}
