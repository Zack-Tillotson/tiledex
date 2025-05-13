'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link 
            href="/pokemon" 
            className={`${styles.navLink} ${pathname === '/pokemon' ? styles.active : ''}`}
          >
            Pokédex
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            href="/types" 
            className={`${styles.navLink} ${pathname === '/types' || pathname?.startsWith('/types/') ? styles.active : ''}`}
          >
            Types
          </Link>
        </li>
      </ul>
    </nav>
  );
}
