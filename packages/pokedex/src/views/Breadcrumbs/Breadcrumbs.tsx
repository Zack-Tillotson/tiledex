"use client";

import { Link } from "@repo/ui";

import React from "react";
import styles from "./Breadcrumbs.module.css";
import { useBreadcrumbs } from "./useBreadcrumbs";

export function Breadcrumbs() {
  const word = useBreadcrumbs()

  if(!word) {
    return null
  }

  return (
    <div className={styles.container}>
      <Link href={word.href || '/pokedex/'} variant="text">
        &larr; Back to {word.label}
      </Link>
    </div>
  );
}

export default Breadcrumbs; 
