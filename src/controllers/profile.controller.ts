import { Request, Response } from "express";
import {
  createProfile,
  getProfileByUserId,
  getAllProfiles,
  updateProfile,
  deleteProfile,
} from "../services/profile.service";

export const createProfileController = async (req: Request, res: Response) => {
  try {
    const profile = await createProfile(req.body);
    return res
      .status(201)
      .json({ message: "Profile created successfully", profile });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Profile creation failed" });
  }
};

export const getProfileByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const profile = await getProfileByUserId(Number(req.params.userId));
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    return res.json(profile);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to fetch profile" });
  }
};

export const getAllProfilesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const profiles = await getAllProfiles();
    return res.json(profiles);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to fetch profiles" });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const updated = await updateProfile(Number(req.params.userId), req.body);
    if (!updated) return res.status(404).json({ message: "Profile not found" });
    return res.json({ message: "Profile updated successfully", updated });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Profile update failed" });
  }
};

export const deleteProfileController = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteProfile(Number(req.params.userId));
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    return res.json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to delete profile" });
  }
};
