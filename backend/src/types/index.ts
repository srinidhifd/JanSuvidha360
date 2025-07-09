export interface User {
  id: string;
  aadhaarNumber: string;
  phoneNumber: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  occupation: 'student' | 'farmer' | 'unemployed' | 'self-employed' | 'salaried' | 'business' | 'retired' | 'other';
  annualIncome: number;
  state: string;
  city: string;
  address: string;
  panNumber: string;
  profileCompleted: boolean;
  isVerified: boolean;
  documents: UserDocuments;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: 'agriculture' | 'education' | 'healthcare' | 'housing' | 'employment' | 'social-security' | 'business' | 'women' | 'senior-citizen' | 'youth';
  department: string;
  benefits: string[];
  eligibilityCriteria: EligibilityCriteria;
  applicationProcess: string[];
  documentsRequired: string[];
  applicationFee: number;
  processingTime: string;
  officialWebsite?: string;
  helplineNumber?: string;
  status: 'active' | 'inactive' | 'suspended';
  launchDate: string;
  lastUpdated: string;
  tags: string[];
}

export interface AuthRequest {
  phoneNumber: string;
  otp?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface AadhaarDocument {
  number: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  fatherName: string;
  issueDate: string;
  pincode: string;
  photo: string;
}

export interface PANDocument {
  number: string;
  name: string;
  fatherName: string;
  dob: string;
  issueDate: string;
  signature: string;
}

export interface DrivingLicenseDocument {
  number: string;
  name: string;
  dob: string;
  address: string;
  issueDate: string;
  validUpto: string;
  vehicleClass: string;
  bloodGroup: string;
  photo: string;
  issuingAuthority: string;
}

export interface PassportDocument {
  number: string;
  name: string;
  nationality: string;
  dob: string;
  pob: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  photo: string;
}

export interface UserDocuments {
  aadhaar: AadhaarDocument;
  pan: PANDocument;
  drivingLicense: DrivingLicenseDocument;
  passport: PassportDocument;
}

export interface EligibilityCriteria {
  minAge?: number;
  maxAge?: number;
  gender?: 'male' | 'female' | 'all';
  occupation?: string[];
  maxIncome?: number;
  minIncome?: number;
  state?: string[];
  maritalStatus?: 'single' | 'married' | 'widowed' | 'divorced' | 'all';
  education?: string[];
  category?: 'general' | 'obc' | 'sc' | 'st' | 'all';
  landholding?: {
    min?: number;
    max?: number;
    unit: 'acres' | 'hectares';
  };
  familyIncome?: number;
  businessType?: string[];
  customCriteria?: string[];
}

export interface EligibilityResult {
  schemeId: string;
  scheme: Scheme;
  isEligible: boolean;
  eligibilityScore: number;
  matchingCriteria: string[];
  missingCriteria: string[];
  recommendations?: string[];
}

export interface EligibilityStats {
  totalSchemes: number;
  eligibleSchemes: number;
  ineligibleSchemes: number;
  eligibilityPercentage: number;
  topCategories: {
    category: string;
    count: number;
    percentage: number;
  }[];
} 