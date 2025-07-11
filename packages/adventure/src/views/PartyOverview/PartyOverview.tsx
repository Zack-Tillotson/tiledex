'use client'

import React from "react";
import { Header, SkeletonPage, Button } from "@repo/ui";
import { useClientData } from "../../data/index.js";
import { PartyList } from "../../components/index.js";
import styles from "./PartyOverview.module.css";

export function PartyOverview() {
  const { isLoading, data } = useClientData({ party: true });

  if (isLoading) {
    return <SkeletonPage />;
  }
  
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <picture>
            <source
              srcSet="/images/brand/adventure2.png"
              sizes="100vw"
            />
            <img
              src="/images/brand/adventure2.png"
              alt="Pokémon Party - Team of trainers and their Pokémon"
            />
          </picture>
        </div>
      </section>

      <div className={styles.headerSection}>
        <Header level={1} className={styles.heading}>
          The Adventurers
        </Header>
        <Button 
          variant="primary" 
          size="medium"
          onClick={() => window.location.href = "/adventure/party/new"}
        >
          Add Member
        </Button>
      </div>

      <PartyList party={data.party || []} />
      
    </div>
  );
}

export default PartyOverview; 