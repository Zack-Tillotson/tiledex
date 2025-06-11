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
            className={`${styles.navLink} ${pathname === "/pokedex" ? styles.active : ""}`}
          >
            Pokédex
          </Link>
        </li>
      </ul>
    </nav>
  );
}
