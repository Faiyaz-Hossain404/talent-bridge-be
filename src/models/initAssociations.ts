import Role from "./role.model";
import User from "./user.model";
import Profile from "./profile.model";
import { Job } from "./job.model";
import { Application } from "./application.model";
import { Skill } from "./skill.model";

export const initAssociations = () => {
  Role.hasMany(User, { foreignKey: "roleId" });
  User.belongsTo(Role, { foreignKey: "roleId" });

  User.hasOne(Profile, { foreignKey: "userId" });
  Profile.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(Job, { foreignKey: "userId" });
  Job.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(Application, { foreignKey: "userId" });
  Application.belongsTo(User, { foreignKey: "userId" });

  Job.hasMany(Application, { foreignKey: "jobId" });
  Application.belongsTo(Job, { foreignKey: "jobId" });

  User.belongsToMany(Skill, { through: "UserSkills", foreignKey: "userId" });
  Skill.belongsToMany(User, { through: "UserSkills", foreignKey: "skillId" });
};

export default initAssociations;
