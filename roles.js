const ROLES = {
  CSO: "cso",
  STUDENT: "student",
};

const PERMISSIONS = {
  POST_JOB: "post_job",
  EDIT_JOB: "edit_job",
  DELETE_JOB: "delete_job",
  VIEW_JOB: "view_job",
};

const ROLE_PERMISSIONS = {
  [ROLES.CSO]: [
    PERMISSIONS.POST_JOB,
    PERMISSIONS.EDIT_JOB,
    PERMISSIONS.DELETE_JOB,
    PERMISSIONS.VIEW_JOB,
  ],
  [ROLES.STUDENT]: [PERMISSIONS.VIEW_JOB],
};

module.exports = {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
};