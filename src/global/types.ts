export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  errorMessage?: string;
  code?: string;
}

export interface Page<T = object> {
  content: Array<T>;
  pageIndex: number;
  pageSize: number;
  totalElements: number;
  dataCount: T;
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface BaseQueryCondition {
  timestamp: number;
}

export interface WorkerProfile {
  readonly workerId: string;
  readonly workerStatus: "UNCONFIRMED" | "ON_JOB" | "LEFT_JOB";
  readonly organizationId: string;
  readonly organizationName: string;
  readonly departmentId: string;
  readonly departmentName: string;
  readonly name: string;
  readonly workNumber: string;
  readonly gender: "UNKNOWN" | "MALE" | "FEMALE";
  readonly mobile: string;
  readonly managedDepartments?: Array<string>;
  readonly classification: string;
}

export interface UserInfo {
  readonly userId: string;
  readonly mobile: string;
  readonly userToken: string;
  readonly roles: Array<string>;
  readonly authorities: Array<string>;
  readonly workerProfile?: WorkerProfile;
  readonly hr: boolean;
}
