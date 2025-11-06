import Profile from "../models/profile.model";
import {
  TProfile,
  TProfileCreateInput,
  TProfileUpdateInput,
} from "../types/profile.types";

export const createProfile = async (
  data: TProfileCreateInput
): Promise<TProfile> => {
  const normalizedData = {
    ...data,
    experiences: data.experiences || [],
    skills: data.skills || [],
  };

  const profile = await Profile.create(normalizedData);
  return profile.get() as TProfile;
};

export const getProfileByUserId = async (
  userId: number
): Promise<TProfile | null> => {
  const profile = await Profile.findOne({ where: { userId } });
  return profile ? (profile.get() as TProfile) : null;
};

export const getAllProfiles = async (): Promise<TProfile[]> => {
  const profiles = await Profile.findAll();
  return profiles.map((p) => p.get() as TProfile);
};

export const updateProfile = async (
  userId: number,
  data: TProfileUpdateInput
): Promise<TProfile | null> => {
  const normalizedData = {
    ...data,
    experiences: data.experiences || [],
    skills: data.skills || [],
  };

  await Profile.update(normalizedData, { where: { userId } });
  const updated = await Profile.findOne({ where: { userId } });
  return updated ? (updated.get() as TProfile) : null;
};

export const deleteProfile = async (userId: number): Promise<boolean> => {
  const deletedCount = await Profile.destroy({ where: { userId } });
  return deletedCount > 0;
};
