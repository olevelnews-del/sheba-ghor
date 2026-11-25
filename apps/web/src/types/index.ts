export type ServiceType = 'nid_correction' | 'namjari';
export type AppStatus = 'draft' | 'checking' | 'ready' | 'submitted' | 'rejected' | 'approved';
export type NidErrorType = 'naam' | 'babar_naam' | 'mayyer_naam' | 'jonmo_tarikh' | 'thikana';

export interface User {
  id: string;
  phone: string;
  name: string;
  created_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  service_type: ServiceType;
  status: AppStatus;
  current_step: number;
  app_id: string;
  created_at: string;
}

export interface Document {
  id: string;
  application_id: string;
  doc_type: string;
  file_url: string;
  quality: 'good' | 'blurry' | 'small';
  uploaded_at: string;
}

export interface CheckResult {
  id: string;
  application_id: string;
  result: 'pass' | 'fail';
  message_bn: string;
  created_at: string;
}

export interface NidFormData {
  errorType: NidErrorType | '';
  nidName: string;
  sscName: string;
  nidDob: string;
  sscDob: string;
  babarNid: string;
  babarSsc: string;
  mayyerNid: string;
  mayyerSsc: string;
  thikanaNid: string;
  thikanaSsc: string;
  correctName: string;
  documents: { type: string; dataUrl: string }[];
}

export interface NamjariFormData {
  howGot: 'kinechi' | 'worish' | 'daan' | 'kort' | '';
  deedDag: string;
  khatianDag: string;
  deedAmount: string;
  khatianAmount: string;
  sellerName: string;
  khatianOwner: string;
  documents: { type: string; dataUrl: string }[];
}
