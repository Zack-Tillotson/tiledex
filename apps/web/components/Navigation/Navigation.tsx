"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            href="/pokedex"
            className={`${styles.navLink} ${pathname.startsWith("/pokedex") ? styles.active : ""}`}
          >
            Pokédex
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            href="/adventure"
            className={`${styles.navLink} ${pathname.startsWith("/adventure") ? styles.active : ""}`}
          >
            Adventure
          </Link>
        </li>
      </ul>
    </nav>
  );
}
