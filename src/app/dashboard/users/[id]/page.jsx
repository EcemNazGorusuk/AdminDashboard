import React from "react";
import styles from "../../../ui/dashboard/users/user/user.module.css";
import Image from "next/image";
import userImg from "../../../../../public/images.png";
import { connectToDB } from "@/app/lib/utils";
import { fetchUser } from "@/app/lib/data";
import { updateUser } from "@/app/lib/actions";
export default async function UserPage({ params }) {
  //FETCH USER  burada çağırılır:
  await connectToDB(); // db connection burada çağırılır
  const { id } = params; // {id} users/id dosyalandırmasından geliyor
  const user = await fetchUser(id); //fetchUser metodu içine gönder params sayesinde gelen id'yi
  console.log("user:", user);

  return (
    <div className={styles.container}>
      <form action={updateUser} className={styles.form}>
        <input type="hidden" name={id} value={user.id}></input>
        <div className={styles.infoContainer}>
          <div className={styles.imgContainer}>
            <Image src={userImg || user.img} alt="" fill />
          </div>
          <div className="text-center">{user.username}</div>
        </div>
        <div className={styles.formContainer}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>
              Yes
            </option>
            <option value={false} selected={!user.isAdmin}>
              No
            </option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>
              Yes
            </option>
            <option value={false} selected={!user.isActive}>
              No
            </option>
          </select>
          <button>Update</button>
        </div>
      </form>
    </div>
  );
}
