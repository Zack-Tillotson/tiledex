"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "../Navigation";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <Image 
                src="/images/brand/header-200x50.png" 
                alt="TiledEx Logo" 
                className="h-8 w-auto"
                width={200}
                height={50}
              />
            </div>
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
