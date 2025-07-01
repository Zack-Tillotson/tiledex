"use client";

import React from "react";
import styles from "./PartyOverview.module.css";
import { Header, Link } from "@repo/ui";

/**
 * PartyOverview view for managing party members
 * Displays party composition and member details
 */
export function PartyOverview() {
  return (
    <div className={styles.container}>
      <Header level={1} className={styles.heading}>
        Party Overview
      </Header>

      <div className={styles.navigation}>
        <Link
          variant="outline"
          size="large"
          href="/adventure"
          className={styles.backButtonLink}
        >
          Back to Dashboard
        </Link>
      </div>

      <div className={styles.content}>
        <p>Manage your party members and their Pokémon here.</p>
        <div className={styles.placeholder}>
          <p>Party management features coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default PartyOverview; 