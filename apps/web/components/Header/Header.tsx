"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Navigation } from "../Navigation";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <header className={`${styles.header} ${isHomepage ? styles.homepage : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <Image 
                src="/images/brand/header-200x50.png" 
                alt="TiledEx Logo" 
                className={styles.logoImage}
                width={200}
                height={50}
              />
              <Image 
                src="/images/brand/favicon.png" 
                alt="TiledEx Logo" 
                className={styles.logoImageSmall}
                width={50}
                height={50}
              />
            </div>
          </Link>
        </div>
        {!isHomepage && <Navigation />}
      </div>
    </header>
  );
}
