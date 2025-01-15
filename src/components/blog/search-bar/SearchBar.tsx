"use client";

import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { Button, TextField, Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

function SearchBar() {
  const [formData, setFormData] = useState<{ search: string }>({
    search: "",
  });
  const [querySearch, setQuerySearch] = useState<string>("");
  const [queryKey, setQueryKey] = useState<string>("");

  // const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    // Get query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    // Dynamically extract the first query key-value pair
    Array.from(params.entries()).forEach(([key, value]) => {
      setQueryKey(decodeURIComponent(key)); // Set the dynamic key (e.g., "Category")
      setQuerySearch(decodeURIComponent(value)); // Set the value (e.g., "Study Materials")
      // Exit after the first key-value pair
    });
  }, []);
  const handleSearch = () => {
    if (formData.search) {
      // Update the query parameter in the URL
      const params = new URLSearchParams(window.location.search);
      params.set("search", formData.search);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
      setQuerySearch(formData.search);
    }
  };
  const handleChange = (key: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
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
          value={formData.search}
          onChange={(e) => {
            handleChange("search", e.target.value);
          }}
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
      {querySearch && (
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
              {queryKey}:
            </Typography>{" "}
            {querySearch}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
