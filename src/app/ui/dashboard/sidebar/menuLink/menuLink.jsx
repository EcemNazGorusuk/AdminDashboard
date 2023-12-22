"use client";
import React from "react";
import styles from "./menuLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
//sidebar.jsx içindeki listeyi taslak olarak tutup kullanmayı sağlayan kısım:
export default function MenuLink({ item }) {
  const pathName = usePathname();
  console.log(pathName);
  var linkStyle = `${pathName === item.path && styles.activeContainer} ${
    styles.container
  }`;
  return (
    <Link
      href={item.path}
      //pathlar eşleştiği veya hover olunduğu sürece stil: activeContainer
      //değilse: container
      className={linkStyle}
    >
      {item.icon}
      {item.title}
    </Link>
  );
}
