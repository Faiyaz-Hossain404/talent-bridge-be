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
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await createProfile({ ...req.body, userId: req.user.id });

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
    let userId: number;

    if (req.user?.roleId !== 1) {
      userId = req.user!.id;
    } else {
      userId = Number(req.params.userId);
    }

    const profile = await getProfileByUserId(userId);
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
    if (_req.user?.roleId !== 1) {
      return res.status(403).json({ message: "Forbidden" });
    }

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
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updated = await updateProfile(req.user.id, req.body);

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
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleted = await deleteProfile(req.user.id);

    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    return res.json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to delete profile" });
  }
};

export const updateProfileByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    if (req.user?.roleId !== 1) {
      return res.status(403).json({ message: "Forbidden to edit admin!" });
    }

    const userId = Number(req.params.id);
    const updated = await updateProfile(userId, req.body);

    if (!updated) return res.status(404).json({ message: "Profile not found" });

    return res.json({ message: "Profile updated successfully", updated });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update profile" });
  }
};
