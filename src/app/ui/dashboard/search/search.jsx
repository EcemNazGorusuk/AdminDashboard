"use client";
import React from "react";
import styles from "./search.module.css";
import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; //arama süresi için
export default function Search({ placeholder }) {

  //SEARCH INPUTUNDA ARATILAN DEĞERİN URL İÇİNDE & FETCHLER İÇİN GÖRÜNEBİLMESİ:
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchHandler = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    //PAGINATION
    params.set("page",1); 

    if(e.target.value){
     //2 den daha fazla harf girildiğinde arama yapılsın: 
     e.target.value.length >2 && params.set("q", e.target.value);
    }else{
     //aramadaki harf silinince arama sonucu kalksın var olan veriler gelsin: 
      params.delete("q");
    }
    
    replace(`${pathname}?${params}`);
  },300);

  console.log("search params:", searchParams);
  console.log("pathname:", pathname);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        onChange={searchHandler}
        type="text"
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}
