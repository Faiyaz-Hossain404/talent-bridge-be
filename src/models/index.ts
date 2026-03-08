import Role from "./role.model";
import { Skill } from "./skill.model";
import User from "./user.model";
import Profile from "./profile.model";
import { Job } from "./job.model";
import { Application } from "./application.model";
import initAssociations from "./initAssociations";

initAssociations();

export { Role, User, Profile, Job, Application, Skill };
