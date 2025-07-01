"use client";

import React from "react";
import styles from "./Dashboard.module.css";
import { Header, Link } from "@repo/ui";

/**
 * Dashboard view for the adventure section
 * Displays an overview of adventures and quick navigation
 */
export function Dashboard() {
  return (
    <div className={styles.container}>
      <Header level={1} className={styles.heading}>
        Adventure Dashboard
      </Header>

      <div className={styles.navigation}>
        <Link
          variant="outline"
          size="large"
          href="/adventure/party"
          className={styles.partyButtonLink}
        >
          Party Overview
        </Link>

        <Link
          variant="primary"
          size="large"
          href="/adventure/campaign"
          className={styles.campaignButtonLink}
        >
          Campaign Overview
        </Link>
      </div>

      <div className={styles.content}>
        <p>Welcome to your adventure dashboard! Manage your party and campaigns here.</p>
      </div>
    </div>
  );
}

export default Dashboard; 