"use client";

import React, { useEffect, useState } from "react";
import styles from "./Ar-SearchBar.module.css";
import { Button, TextField, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { usePathname, useRouter } from "next/navigation";

function ArSearchBar({
  searchQuery,
  type,
}: {
  searchQuery: string;
  type?: string;
}) {
  const [search, setSearch] = useState(searchQuery);
  const router = useRouter();
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith('/ar');
  const blogBaseUrl = isArabicRoute ? '/ar/blog' : '/blog';

  // const handleSearch = () => {
  //   if (search) {
  //     // Update the URL with the search query
  //     const params = new URLSearchParams(window.location.search);
  //     params.set("search", search);
  //     router.push(`?${params.toString()}`);
  //   }
  // };
  const handleSearch = () => {
    // const params = new URLSearchParams(window.location.search);

    // if (search) {
    //   params.set("search", search);
    // }

    // // Update the URL
    // router.push(`/${params.toString()}`);
    const params = new URLSearchParams(window.location.search);
    params.set("search", search);
    const newUrl = `${blogBaseUrl}?${params.toString()}`;
    router.replace(newUrl);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`${styles.SearchBar} ${styles.SearchBarRTL}`}>
      <div className={`${styles.mobileContanier} ${styles.mobileContanierRTL}`}>
        <TextField
          placeholder="ابحث في مدونتنا"
          //   sx={style.textField}
          className={`${styles.textField} ${styles.textFieldRTL}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger search on Enter
        />
        <Button
          variant="contained"
          //   classN={styles.button}
          className={`${leagueSpartan.className} ${styles.button} ${styles.buttonRTL}`}
          onClick={handleSearch}
        >
          بحث
        </Button>
      </div>
      {type === "all" && searchQuery && (
        <div className={`${styles.searchResult} ${styles.searchResultRTL}`}>
          <Typography
            className={`${leagueSpartan.className} ${styles.searchText}`}
            variant="h4"
            component={"h4"}
          >
            <Typography
              className={`${leagueSpartan.className}`}
              variant="h4"
              component={"span"}
            >
              البحث:
              {/* {queryKey}: */}
            </Typography>{" "}
            {searchQuery}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default ArSearchBar;