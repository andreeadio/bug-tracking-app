class User {
    constructor(email, role) {
      this.email = email;
      this.role = role;
      this.projects = [];
      this.allocatedBug = null;
    }
  
    registerProject(description, repository, projectTeam) {
      // Implementation for registering a project
    }
  
    registerAsTester(project) {
      // Implementation for registering as a tester for a project
    }
  
    registerBug(project, severity, description, commitLink) {
      // Implementation for registering a bug
    }
  
    viewBugs(project) {
      // Implementation for viewing bugs in a project
    }
  
    allocateBug(bug) {
      // Implementation for allocating a bug to the user
    }
  
    solveBug(bug, commitLink) {
      // Implementation for solving a bug
    }
  
    addStatusToSolution(bug, status, commitLink) {
      // Implementation for adding a status to the bug solution
    }
  
    hasPermission(action, project) {
      // Implementation for checking permissions based on user role
    }
  }