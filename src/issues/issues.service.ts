import { Injectable } from '@nestjs/common';

@Injectable()
export class IssuesService {
  getProjectIssues() {
    return 'all issues riding'
  }

  getIssueWithUsersAndComments() {
    return 'issue voice'
  }

  createIssues() {
    return 'issue created'
  }

  updateIssue() {
    return 'issue updated';
  }

  deleteIssue() {
    return 'issue deleted';
  }
}
