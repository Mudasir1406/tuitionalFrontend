"use client";

import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { Button, TextField, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import { usePathname, useRouter } from "next/navigation";

function SearchBar({
  searchQuery,
  type,
}: {
  searchQuery: string;
  type?: string;
}) {
  const [search, setSearch] = useState(searchQuery);
  const router = useRouter();

  // const handleSearch = () => {
  //   if (search) {
  //     // Update the URL with the search query
  //     const params = new URLSearchParams();
  //     params.set("search", search);
  //     router.push(`?${params.toString()}`);
  //   }
  // };
  const handleSearch = () => {
    // const params = new URLSearchParams();

    // if (search) {
    //   params.set("search", search);
    // }

    // // Update the URL
    // router.push(`/${params.toString()}`);
    const params = new URLSearchParams(window.location.search);
    params.set("search", search);
    const newUrl = `/blog?${params.toString()}`;
    router.replace(newUrl);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.SearchBar}>
      <div className={styles.mobileContanier}>
        <TextField
          placeholder="Search Our Blog"
          //   sx={style.textField}
          className={styles.textField}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger search on Enter
        />
        <Button
          variant="contained"
          //   classN={styles.button}
          className={`${leagueSpartan.className} ${styles.button}`}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      {type === "all" && searchQuery && (
        <div className={styles.searchResult}>
          <Typography
            className={`${leagueSpartan.className}`}
            variant="h4"
            component={"h4"}
          >
            <Typography
              className={`${leagueSpartan.className}`}
              variant="h4"
              component={"span"}
            >
              Search:
              {/* {queryKey}: */}
            </Typography>{" "}
            {searchQuery}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
