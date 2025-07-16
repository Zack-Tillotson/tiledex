'use client'

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, SkeletonPage, Shelf } from "@repo/ui";
import { savePartyMember } from "../../data/library.js";
import { PartyMember, PartyPokemon, PartyGoal } from "../../types/party.js";
import { usePartyMember } from "./usePartyMember.js";
import { SearchForm } from "@repo/pokedex/SearchForm";
import { getAllPokemon, getPokemon } from "@repo/pokeapi";
import styles from "./PartyMemberForm.module.css";

interface PartyMemberFormData {
  name: string;
  avatar: string;
  goal?: string;
}

interface PartyMemberFormProps {
  id?: string;
  onSave?: (id: string) => void;
  onCancel?: () => void;
}

const AVATAR_OPTIONS = [
  { value: "/images/adventure/avatar1.png", label: "Avatar 1" },
  { value: "/images/adventure/avatar2.png", label: "Avatar 2" },
];

export function PartyMemberForm({ id, onSave, onCancel }: PartyMemberFormProps) {
  const isEditing = !!id;
  const { data: member, isLoading, error } = usePartyMember(id);
  const [starterPokemon, setStarterPokemon] = useState<any | null>(null);
  const [showShelf, setShowShelf] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PartyMemberFormData>({
    defaultValues: {
      name: "",
      avatar: "/images/adventure/avatar1.png",
      goal: "",
    },
  });

  // Load existing data if editing and data is available
  useEffect(() => {
    if (isEditing && member) {
      setValue("name", member.name);
      setValue("avatar", member.avatar);
      if (member.roster.length > 0 && member.roster[0]) {
        const poke = getPokemon(member.roster[0].dexId);
        setStarterPokemon(poke || null);
      }
      if (member.goals.length > 0 && member.goals[0]) {
        setValue("goal", member.goals[0].description);
      }
    }
  }, [member, isEditing, setValue]);

  const onSubmit = async (data: PartyMemberFormData) => {
    try {
      const roster: PartyPokemon[] = [];
      if (starterPokemon && starterPokemon.sprites && starterPokemon.sprites.front_default) {
        roster.push({
          dexId: starterPokemon.id,
          dateCaught: new Date().toISOString().split('T')[0] || new Date().toISOString().slice(0, 10),
          nickname: starterPokemon.name,
        });
      }
      const goals: PartyGoal[] = [];
      const goalText = data.goal ?? "";
      if (goalText && goalText.trim()) {
        goals.push({
          description: goalText.trim(),
          completed: false,
        });
      }
      const partyMemberData: Omit<PartyMember, "id"> = {
        name: data.name,
        avatar: data.avatar,
        roster,
        goals,
      };
      let memberId: string;
      if (isEditing && id) {
        memberId = await savePartyMember(id, partyMemberData);
      } else {
        memberId = await savePartyMember(null, partyMemberData);
      }
      onSave?.(memberId);
    } catch (error) {
      console.error("Failed to save party member:", error);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  // Handler for SearchForm
  const handleSearch = (searchTerm: string) => {
    const all = getAllPokemon();
    const found = all.find(p => p.name.toLowerCase() === searchTerm.toLowerCase());
    if (found) {
      setStarterPokemon(found);
      setShowShelf(false);
    }
  };
  const handleClear = () => setStarterPokemon(null);

  // Show loading state while fetching data
  if (isEditing && isLoading) {
    return <SkeletonPage />;
  }
  if (isEditing && error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Error loading party member</h1>
          <p>Failed to load party member data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEditing ? "Edit Party Member" : "Add New Party Member"}
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          id="name"
          label="Name"
          placeholder="Enter member name"
          required
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
        <div className={styles.avatarSection}>
          <label className={styles.avatarLabel}>Avatar</label>
          <div className={styles.avatarOptions}>
            {AVATAR_OPTIONS.map((option) => (
              <label key={option.value} className={styles.avatarOption}>
                <input
                  type="radio"
                  value={option.value}
                  {...register("avatar", { required: "Please select an avatar" })}
                  className={styles.avatarRadio}
                />
                <div className={styles.avatarPreview}>
                  <img
                    src={option.value}
                    alt={option.label}
                    className={styles.avatarImage}
                  />
                  <span className={styles.avatarLabel}>{option.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.avatar && (
            <span className={styles.error}>{errors.avatar.message}</span>
          )}
        </div>
        <div className={styles.starterSection}>
          <label className={styles.starterLabel}>Starter Pokémon</label>
          <Button type="button" variant="secondary" onClick={() => setShowShelf(true)}>
            {starterPokemon ? "Change Starter Pokémon" : "Choose Starter Pokémon"}
          </Button>
          {starterPokemon && (
            <div className={styles.starterSummary}>
              <img src={starterPokemon.sprites.front_default} alt={starterPokemon.name} className={styles.starterSprite} />
              <span>{starterPokemon.name} (#{starterPokemon.id})</span>
              <Button type="button" size="small" variant="secondary" onClick={handleClear} className={styles.starterClearButton}>
                Clear
              </Button>
            </div>
          )}
        </div>
        <Input
          id="goal"
          label="Adventure Goal"
          placeholder="What is this member's reason for adventure?"
          error={errors.goal?.message}
          {...register("goal", { 
            required: "Please describe the member's adventure goal",
            minLength: { value: 10, message: "Goal must be at least 10 characters long" }
          })}
        />
        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : isEditing ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
      <Shelf
        isOpen={showShelf}
        onClose={() => setShowShelf(false)}
        title="Choose Starter Pokémon"
      >
        <SearchForm
          initialSearch={starterPokemon?.name || ""}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </Shelf>
    </div>
  );
} 