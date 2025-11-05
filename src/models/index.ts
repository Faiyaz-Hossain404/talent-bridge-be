import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

// Model factories
import RoleFactory from './role.model';
import UserFactory from './user.model';
import ProfileFactory from './profile.model';
import JobFactory from './job.model';
import ApplicationFactory from './application.model';
import ApplicationStatusHistoryFactory from './applicationStatusHistory.model';

// Init models
const Role = RoleFactory(sequelize);
const User = UserFactory(sequelize);
const Profile = ProfileFactory(sequelize);
const Job = JobFactory(sequelize);
const Application = ApplicationFactory(sequelize);
const ApplicationStatusHistory = ApplicationStatusHistoryFactory(sequelize);

// Associations
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Job, { foreignKey: 'posted_by', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'posted_by', as: 'postedBy' });

Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

User.hasMany(Application, { foreignKey: 'user_id', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'user_id', as: 'applicant' });

Application.hasMany(ApplicationStatusHistory, { foreignKey: 'application_id', as: 'statusHistory' });
ApplicationStatusHistory.belongsTo(Application, { foreignKey: 'application_id' });

// Export db object
const db = {
  sequelize,
  Role,
  User,
  Profile,
  Job,
  Application,
  ApplicationStatusHistory
};

export default db;

// import { Sequelize } from 'sequelize';
// import sequelize from '../config/database';

// // imports
// import RoleFactory from './role.model';
// import UserFactory from './user.model';
// import ProfileFactory from './profile.model';
// import ApplicationFactory from './application.model';
// import ApplicationStatusHistoryFactory from './applicationStatusHistory.model';

// // init models
// const Role = RoleFactory(sequelize);
// const User = UserFactory(sequelize);
// const Profile = ProfileFactory(sequelize);
// const Application = ApplicationFactory(sequelize);
// const ApplicationStatusHistory = ApplicationStatusHistoryFactory(sequelize);

// db.Application = Application;
// db.ApplicationStatusHistory = ApplicationStatusHistory;

// // associations
// // Role 1-M User
// Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
// User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

// // User 1-1 Profile
// User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile', onDelete: 'CASCADE' });
// Profile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User.hasMany(Application, { foreignKey: 'user_id', as: 'applications' });
// Application.belongsTo(User, { foreignKey: 'user_id', as: 'applicant' });

// Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
// Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

// Application.hasMany(ApplicationStatusHistory, { foreignKey: 'application_id', as: 'statusHistory' });
// ApplicationStatusHistory.belongsTo(Application, { foreignKey: 'application_id' });

// export default {
//   sequelize,
//   Role,
//   User,
//   Profile
// };
