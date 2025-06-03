"use client";

import React from "react";
import Link from "next/link";
import { Navigation } from "../Navigation";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Pokédex</span>
              <div className={styles.pokeball}></div>
            </div>
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
