'use client'

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, SkeletonPage } from "@repo/ui";
import { savePartyMember } from "../../data/library.js";
import { PartyMember, PartyPokemon, PartyGoal } from "../../types/party.js";
import { usePartyMember } from "./usePartyMember.js";
import styles from "./PartyMemberForm.module.css";

interface PartyMemberFormData {
  name: string;
  avatar: string;
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

/**
 * PartyMemberForm component for creating and editing party members
 * @param id - Optional ID for editing existing member
 * @param onSave - Callback when member is saved
 * @param onCancel - Callback when form is cancelled
 */
export function PartyMemberForm({ id, onSave, onCancel }: PartyMemberFormProps) {
  const isEditing = !!id;
  
  // Use react-query to fetch party member data
  const { data: member, isLoading, error } = usePartyMember(id);
  
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
    },
  });

  // Load existing data if editing and data is available
  useEffect(() => {
    if (isEditing && member) {
      setValue("name", member.name);
      setValue("avatar", member.avatar);
    }
  }, [member, isEditing, setValue]);

  const onSubmit = async (data: PartyMemberFormData) => {
    try {
      // Create the full PartyMember object with default empty arrays for roster and goals
      const partyMemberData: Omit<PartyMember, "id"> = {
        name: data.name,
        avatar: data.avatar,
        roster: [],
        goals: [],
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

  // Show loading state while fetching data
  if (isEditing && isLoading) {
    return <SkeletonPage />;
  }

  // Show error state if data fetching failed
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
    </div>
  );
} 