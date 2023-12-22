"use client";
import React from "react";
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function Pagination({ count }) {
  //PAGINATION & PAGE DEĞERİNİN URL İÇİNDE GÖRÜNEBİLMESİ:
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const page = searchParams.get("page") || 1;
  const params = new URLSearchParams(searchParams);
  const itemPerPage = 4;

  const hasPrev = itemPerPage * parseInt(page - 1) > 0;
  const hasNext = itemPerPage * (parseInt(page) - 1) + itemPerPage < count;

  //PAGINATION SAYFA İLERLEME
  const handlePageChange = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${!hasPrev && styles.disabled}`}
        disabled={!hasPrev}
        onClick={() => handlePageChange("prev")}
      >
        Previous
      </button>
      <button
        className={`${styles.button} ${!hasNext && styles.disabled}`}
        disabled={!hasNext}
        onClick={() => handlePageChange("next")}
      >
        Next
      </button>
    </div>
  );
}
