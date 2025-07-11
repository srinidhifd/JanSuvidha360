import { Scheme } from '../types';

export const mockSchemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    description: 'Income support scheme for farmers providing ₹6000 per year in three equal installments',
    department: 'Ministry of Agriculture and Farmers Welfare',
    category: 'agriculture',
    eligibilityCriteria: {
      occupation: ['farmer'],
      maxIncome: 500000,
      customCriteria: ['Must own cultivable land', 'Land must be in applicant name', 'Must be small or marginal farmer']
    },
    benefits: ['₹6000 per year in three installments', 'Direct bank transfer', 'No paperwork required after registration'],
    documentsRequired: ['Aadhaar Card', 'Land ownership documents', 'Bank account details'],
    applicationProcess: ['Apply online at pmkisan.gov.in', 'Visit nearest Common Service Center', 'Submit required documents', 'Wait for verification'],
    applicationFee: 0,
    processingTime: '30-45 days',
    officialWebsite: 'https://pmkisan.gov.in',
    helplineNumber: '155261',
    status: 'active',
    launchDate: '2019-02-24',
    lastUpdated: '2024-01-15T10:00:00Z',
    tags: ['farmer', 'income-support', 'agriculture', 'direct-benefit-transfer']
  },
  {
    id: 'nsp-scholarship',
    name: 'National Scholarship Portal - Merit Scholarship',
    description: 'Merit-based scholarship for students pursuing higher education',
    department: 'Ministry of Education',
    category: 'education',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 30,
      occupation: ['student'],
      maxIncome: 250000,
      customCriteria: ['Minimum 80% marks in previous qualifying examination']
    },
    benefits: ['₹20,000 per year for graduation', '₹25,000 per year for post-graduation', 'Additional allowances for books and equipment'],
    documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Mark sheets', 'Bank account details'],
    applicationProcess: ['Register on scholarships.gov.in', 'Fill application form', 'Upload required documents', 'Submit application', 'Track application status'],
    applicationFee: 0,
    processingTime: '60-90 days',
    officialWebsite: 'https://scholarships.gov.in',
    helplineNumber: '0120-6619540',
    status: 'active',
    launchDate: '2015-07-01',
    lastUpdated: '2024-01-16T09:30:00Z',
    tags: ['education', 'scholarship', 'merit-based', 'students']
  },
  {
    id: 'pmay-urban',
    name: 'Pradhan Mantri Awas Yojana - Urban',
    description: 'Housing scheme for urban poor to provide affordable housing',
    department: 'Ministry of Housing and Urban Affairs',
    category: 'housing',
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 70,
      maxIncome: 1800000,
      customCriteria: ['Must not own a pucca house', 'First-time home buyer', 'Must be residing in urban area']
    },
    benefits: ['Subsidy up to ₹2.67 lakh', 'Affordable housing loans', 'Priority allocation'],
    documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Property documents', 'Bank statements'],
    applicationProcess: ['Apply through participating banks', 'Submit income and property documents', 'Property verification', 'Loan processing', 'Subsidy disbursement'],
    applicationFee: 500,
    processingTime: '90-120 days',
    officialWebsite: 'https://pmaymis.gov.in',
    helplineNumber: '011-23060484',
    status: 'active',
    launchDate: '2015-06-25',
    lastUpdated: '2024-01-17T14:20:00Z',
    tags: ['housing', 'urban', 'subsidy', 'affordable-housing']
  },
  {
    id: 'mudra-loan',
    name: 'Pradhan Mantri MUDRA Yojana',
    description: 'Micro-finance scheme for small business entrepreneurs',
    department: 'Ministry of Finance',
    category: 'business',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      occupation: ['self-employed', 'unemployed'],
      customCriteria: ['Must have business idea or existing micro-enterprise']
    },
    benefits: ['Loan up to ₹10 lakh', 'No collateral required', 'Flexible repayment terms'],
    documentsRequired: ['Aadhaar Card', 'Business plan', 'Address proof', 'Bank account details'],
    applicationProcess: ['Visit nearest participating bank or NBFC', 'Submit business plan and documents', 'Credit evaluation', 'Loan approval', 'Loan disbursement'],
    applicationFee: 0,
    processingTime: '15-30 days',
    officialWebsite: 'https://mudra.org.in',
    helplineNumber: '1800-180-1111',
    status: 'active',
    launchDate: '2015-04-08',
    lastUpdated: '2024-01-18T11:45:00Z',
    tags: ['business', 'micro-finance', 'entrepreneurship', 'loan']
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - PM-JAY',
    description: 'Health insurance scheme providing coverage up to ₹5 lakh per family per year',
    department: 'Ministry of Health and Family Welfare',
    category: 'healthcare',
    eligibilityCriteria: {
      maxIncome: 120000,
      customCriteria: ['Must be from eligible family as per SECC 2011 data', 'Must not have existing health insurance above ₹5 lakh']
    },
    benefits: ['₹5 lakh health cover per family per year', 'Cashless treatment', 'Coverage for pre and post hospitalization'],
    documentsRequired: ['Aadhaar Card', 'Ration Card', 'SECC verification'],
    applicationProcess: ['Beneficiaries are pre-identified', 'Visit nearest empanelled hospital', 'Present Aadhaar for verification', 'Receive cashless treatment'],
    applicationFee: 0,
    processingTime: 'Immediate (for pre-identified beneficiaries)',
    officialWebsite: 'https://pmjay.gov.in',
    helplineNumber: '14555',
    status: 'active',
    launchDate: '2018-09-23',
    lastUpdated: '2024-01-19T16:30:00Z',
    tags: ['healthcare', 'insurance', 'cashless', 'family-coverage']
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    description: 'Savings scheme for girl child education and marriage expenses',
    department: 'Ministry of Women and Child Development',
    category: 'women',
    eligibilityCriteria: {
      maxAge: 10,
      gender: 'female',
      customCriteria: ['Account can be opened by parent or guardian', 'Girl child must be Indian citizen']
    },
    benefits: ['High interest rate (currently 8.2%)', 'Tax deduction under Section 80C', 'Partial withdrawal after 18 years'],
    documentsRequired: ['Birth certificate of girl child', 'Aadhaar Card of parent/guardian', 'Address proof'],
    applicationProcess: ['Visit nearest post office or authorized bank', 'Fill account opening form', 'Submit required documents', 'Make initial deposit (minimum ₹250)', 'Receive account passbook'],
    applicationFee: 0,
    processingTime: '1-2 days',
    officialWebsite: 'https://www.nsiindia.gov.in',
    helplineNumber: '1800-266-6868',
    status: 'active',
    launchDate: '2015-01-22',
    lastUpdated: '2024-01-20T12:15:00Z',
    tags: ['women', 'girl-child', 'savings', 'education', 'tax-benefit']
  },
  {
    id: 'startup-india',
    name: 'Startup India Initiative',
    description: 'Support scheme for entrepreneurs to build startups',
    department: 'Department for Promotion of Industry and Internal Trade',
    category: 'business',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 45,
      occupation: ['self-employed', 'unemployed'],
      customCriteria: ['Innovative business idea', 'Company incorporated within 10 years']
    },
    benefits: ['Tax exemption for 3 years', 'Fast-track patent registration', 'Funding support', 'Regulatory compliance support'],
    documentsRequired: ['Aadhaar Card', 'Business registration certificate', 'Innovation certificate', 'Bank account details'],
    applicationProcess: ['Register online at startupindia.gov.in', 'Submit business plan and documents', 'Get recognized as startup', 'Apply for benefits', 'Receive support'],
    applicationFee: 0,
    processingTime: '30-60 days',
    officialWebsite: 'https://startupindia.gov.in',
    helplineNumber: '1800-115-565',
    status: 'active',
    launchDate: '2016-01-16',
    lastUpdated: '2024-01-21T09:00:00Z',
    tags: ['business', 'startup', 'entrepreneurship', 'innovation', 'tax-exemption']
  },
  {
    id: 'skill-india',
    name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
    description: 'Skill development scheme for youth to enhance employability',
    department: 'Ministry of Skill Development and Entrepreneurship',
    category: 'employment',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 35,
      occupation: ['unemployed', 'student'],
      customCriteria: ['Should be Indian citizen']
    },
    benefits: ['Free skill training', 'Monetary reward on successful completion', 'Placement assistance', 'Recognition of Prior Learning (RPL)'],
    documentsRequired: ['Aadhaar Card', 'Educational certificates', 'Bank account details'],
    applicationProcess: ['Find nearest training center', 'Register for desired course', 'Attend training sessions', 'Complete assessment', 'Receive certificate and monetary reward'],
    applicationFee: 0,
    processingTime: '45-180 days (depending on course)',
    officialWebsite: 'https://pmkvyofficial.org',
    helplineNumber: '8800055555',
    status: 'active',
    launchDate: '2015-07-15',
    lastUpdated: '2024-01-22T13:45:00Z',
    tags: ['employment', 'skill-development', 'training', 'youth', 'placement']
  },
  {
    id: 'delhi-old-age-pension',
    name: 'Delhi Old Age Pension Scheme',
    description: 'Monthly pension for senior citizens in Delhi',
    department: 'Government of Delhi',
    category: 'senior-citizen',
    eligibilityCriteria: {
      minAge: 60,
      maxIncome: 100000,
      state: ['Delhi'],
      customCriteria: ['Must be resident of Delhi for at least 5 years']
    },
    benefits: ['₹2500 per month pension', 'Direct bank transfer', 'Medical allowance'],
    documentsRequired: ['Aadhaar Card', 'Age proof', 'Income Certificate', 'Residence proof'],
    applicationProcess: ['Visit nearest district office', 'Submit required documents', 'Verification by officials', 'Approval and enrollment'],
    applicationFee: 0,
    processingTime: '30-45 days',
    officialWebsite: 'https://delhi.gov.in',
    helplineNumber: '1076',
    status: 'active',
    launchDate: '2018-01-01',
    lastUpdated: '2024-01-15T10:00:00Z',
    tags: ['senior-citizen', 'pension', 'delhi', 'social-security']
  },
  {
    id: 'beti-bachao-beti-padhao',
    name: 'Beti Bachao Beti Padhao',
    description: 'Scheme for girl child welfare and education',
    department: 'Ministry of Women and Child Development',
    category: 'women',
    eligibilityCriteria: {
      maxAge: 18,
      gender: 'female',
      customCriteria: ['Focus on districts with low Child Sex Ratio']
    },
    benefits: ['Educational support', 'Scholarship for girls', 'Awareness programs'],
    documentsRequired: ['Birth certificate', 'Aadhaar Card', 'School enrollment certificate'],
    applicationProcess: ['Contact local Anganwadi center', 'Submit required documents', 'Enrollment in scheme'],
    applicationFee: 0,
    processingTime: '15-30 days',
    officialWebsite: 'https://wcd.nic.in',
    helplineNumber: '1800-233-9899',
    status: 'active',
    launchDate: '2015-01-22',
    lastUpdated: '2024-01-20T12:15:00Z',
    tags: ['women', 'girl-child', 'education', 'awareness']
  },
  {
    id: 'karnataka-anna-bhagya',
    name: 'Karnataka Anna Bhagya Scheme',
    description: 'Food security scheme for Karnataka residents',
    department: 'Government of Karnataka',
    category: 'social-security',
    eligibilityCriteria: {
      maxIncome: 120000,
      state: ['Karnataka'],
      customCriteria: ['Must have valid ration card', 'Must be BPL family']
    },
    benefits: ['7 kg rice per person per month', 'Additional benefits for pregnant women', 'Subsidized food grains'],
    documentsRequired: ['Ration Card', 'Aadhaar Card', 'Income Certificate'],
    applicationProcess: ['Visit nearest Fair Price Shop', 'Submit ration card', 'Collect monthly quota'],
    applicationFee: 0,
    processingTime: 'Immediate',
    officialWebsite: 'https://ahara.kar.gov.in',
    helplineNumber: '1800-425-9339',
    status: 'active',
    launchDate: '2013-09-01',
    lastUpdated: '2024-01-18T14:30:00Z',
    tags: ['food-security', 'karnataka', 'bpl', 'ration']
  },
  {
    id: 'pradhan-mantri-vaya-vandana-yojana',
    name: 'Pradhan Mantri Vaya Vandana Yojana',
    description: 'Pension scheme for senior citizens providing guaranteed returns',
    department: 'Life Insurance Corporation of India',
    category: 'senior-citizen',
    eligibilityCriteria: {
      minAge: 60,
      maxIncome: 1500000,
      customCriteria: ['Must be Indian citizen', 'One-time investment scheme']
    },
    benefits: ['Guaranteed 8% return', 'Monthly pension', 'Tax benefits under 80C'],
    documentsRequired: ['Aadhaar Card', 'Age proof', 'Income Certificate', 'Bank account details'],
    applicationProcess: ['Visit LIC office', 'Fill application form', 'Submit documents', 'Make payment'],
    applicationFee: 0,
    processingTime: '15-30 days',
    officialWebsite: 'https://licindia.in',
    helplineNumber: '022-68279999',
    status: 'active',
    launchDate: '2017-05-04',
    lastUpdated: '2024-01-25T10:00:00Z',
    tags: ['senior-citizen', 'pension', 'investment', 'guaranteed-returns']
  },
  {
    id: 'scheme-for-adolescent-girls',
    name: 'Scheme for Adolescent Girls (SAG)',
    description: 'Nutrition and skill development scheme for adolescent girls',
    department: 'Ministry of Women and Child Development',
    category: 'women',
    eligibilityCriteria: {
      minAge: 11,
      maxAge: 18,
      gender: 'female',
      maxIncome: 200000,
      customCriteria: ['Must be out of school girl or school dropout']
    },
    benefits: ['Nutrition supplementation', 'Health checkups', 'Skill training', 'Counseling'],
    documentsRequired: ['Aadhaar Card', 'Age proof', 'Income Certificate', 'School leaving certificate'],
    applicationProcess: ['Contact local Anganwadi center', 'Register with ICDS', 'Regular participation'],
    applicationFee: 0,
    processingTime: '7-15 days',
    officialWebsite: 'https://wcd.nic.in',
    helplineNumber: '1800-233-9899',
    status: 'active',
    launchDate: '2010-01-01',
    lastUpdated: '2024-01-26T14:30:00Z',
    tags: ['women', 'adolescent', 'nutrition', 'skill-development']
  },
  {
    id: 'pm-kaushal-vikas-yojana-3',
    name: 'PM Kaushal Vikas Yojana 3.0',
    description: 'Third phase of skill development program with industry 4.0 focus',
    department: 'Ministry of Skill Development and Entrepreneurship',
    category: 'employment',
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 45,
      occupation: ['unemployed', 'student'],
      customCriteria: ['Basic digital literacy required']
    },
    benefits: ['Free training in emerging technologies', 'Certification', 'Placement assistance', 'Digital payments'],
    documentsRequired: ['Aadhaar Card', 'Educational certificates', 'Bank account details'],
    applicationProcess: ['Online registration', 'Skill assessment', 'Training enrollment', 'Certification exam'],
    applicationFee: 0,
    processingTime: '30-180 days',
    officialWebsite: 'https://pmkvyofficial.org',
    helplineNumber: '8800055555',
    status: 'active',
    launchDate: '2021-01-15',
    lastUpdated: '2024-01-27T09:15:00Z',
    tags: ['skill-development', 'digital-india', 'industry-4.0', 'certification']
  },
  {
    id: 'tamil-nadu-free-laptop',
    name: 'Tamil Nadu Free Laptop Scheme',
    description: 'Free laptop distribution for students in Tamil Nadu',
    department: 'Government of Tamil Nadu',
    category: 'education',
    eligibilityCriteria: {
      minAge: 16,
      maxAge: 25,
      occupation: ['student'],
      state: ['Tamil Nadu'],
      customCriteria: ['Must be enrolled in higher secondary or higher education', 'Minimum 60% marks']
    },
    benefits: ['Free laptop with software', 'Internet connectivity support', 'Technical training'],
    documentsRequired: ['Aadhaar Card', 'Student ID', 'Mark sheets', 'Admission proof'],
    applicationProcess: ['Apply through educational institution', 'Verification by authorities', 'Distribution at college'],
    applicationFee: 0,
    processingTime: '60-90 days',
    officialWebsite: 'https://tn.gov.in',
    helplineNumber: '044-28520403',
    status: 'active',
    launchDate: '2011-09-15',
    lastUpdated: '2024-01-28T11:20:00Z',
    tags: ['education', 'tamil-nadu', 'digital-literacy', 'students']
  },
  {
    id: 'maharashtra-employment-guarantee',
    name: 'Maharashtra Employment Guarantee Scheme',
    description: 'State employment guarantee scheme for rural Maharashtra',
    department: 'Government of Maharashtra',
    category: 'employment',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 60,
      state: ['Maharashtra'],
      customCriteria: ['Must be rural resident', 'Willing to do manual work']
    },
    benefits: ['100 days guaranteed employment', '₹300 per day wage', 'Rural infrastructure development'],
    documentsRequired: ['Aadhaar Card', 'Job card', 'Bank account details'],
    applicationProcess: ['Apply at Gram Panchayat', 'Get job card', 'Work allocation', 'Wage payment'],
    applicationFee: 0,
    processingTime: '15-30 days',
    officialWebsite: 'https://mahaegs.maharashtra.gov.in',
    helplineNumber: '1800-120-0025',
    status: 'active',
    launchDate: '2006-02-02',
    lastUpdated: '2024-01-29T16:45:00Z',
    tags: ['employment', 'maharashtra', 'rural-development', 'mgnrega']
  },
  {
    id: 'west-bengal-kanyashree',
    name: 'West Bengal Kanyashree Prakalpa',
    description: 'Scholarship scheme for girls to prevent child marriage and promote education',
    department: 'Government of West Bengal',
    category: 'women',
    eligibilityCriteria: {
      minAge: 13,
      maxAge: 18,
      gender: 'female',
      state: ['West Bengal'],
      maxIncome: 120000,
      customCriteria: ['Must be unmarried', 'Regular school attendance required']
    },
    benefits: ['Annual scholarship ₹750-₹25,000', 'One-time grant ₹25,000 at 18', 'Bicycle for rural students'],
    documentsRequired: ['Aadhaar Card', 'School enrollment certificate', 'Income certificate', 'Unmarried certificate'],
    applicationProcess: ['Apply through school', 'Online application', 'Document verification', 'Direct benefit transfer'],
    applicationFee: 0,
    processingTime: '45-60 days',
    officialWebsite: 'https://kanyashree.wb.gov.in',
    helplineNumber: '1800-345-6665',
    status: 'active',
    launchDate: '2013-10-01',
    lastUpdated: '2024-01-30T13:30:00Z',
    tags: ['women', 'education', 'west-bengal', 'scholarship', 'child-marriage-prevention']
  },
  {
    id: 'kerala-pension-plus',
    name: 'Kerala Pension Plus Scheme',
    description: 'Additional pension scheme for elderly in Kerala',
    department: 'Government of Kerala',
    category: 'senior-citizen',
    eligibilityCriteria: {
      minAge: 65,
      state: ['Kerala'],
      maxIncome: 100000,
      customCriteria: ['Must be receiving regular pension', 'Kerala resident for 10+ years']
    },
    benefits: ['Additional ₹1,000 per month', 'Free medical checkups', 'Subsidized medicines'],
    documentsRequired: ['Aadhaar Card', 'Pension book', 'Residence proof', 'Income certificate'],
    applicationProcess: ['Apply at local panchayat', 'Verification by officials', 'Approval and enrollment'],
    applicationFee: 0,
    processingTime: '30-45 days',
    officialWebsite: 'https://kerala.gov.in',
    helplineNumber: '0471-2518200',
    status: 'active',
    launchDate: '2016-08-15',
    lastUpdated: '2024-01-31T08:45:00Z',
    tags: ['senior-citizen', 'kerala', 'additional-pension', 'healthcare']
  },
  {
    id: 'gujarat-solar-rooftop',
    name: 'Gujarat Solar Rooftop Subsidy Scheme',
    description: 'Subsidy for installing solar panels on rooftops in Gujarat',
    department: 'Gujarat Energy Development Agency',
    category: 'business',
    eligibilityCriteria: {
      minAge: 18,
      state: ['Gujarat'],
      customCriteria: ['Must own property', 'Suitable rooftop space required', 'Electricity connection mandatory']
    },
    benefits: ['30% subsidy on installation', 'Net metering facility', 'Reduced electricity bills'],
    documentsRequired: ['Property documents', 'Electricity bill', 'Aadhaar Card', 'Bank account details'],
    applicationProcess: ['Online application', 'Site inspection', 'Installation by empanelled vendor', 'Subsidy disbursement'],
    applicationFee: 1000,
    processingTime: '90-120 days',
    officialWebsite: 'https://geda.gujarat.gov.in',
    helplineNumber: '079-23257251',
    status: 'active',
    launchDate: '2019-04-01',
    lastUpdated: '2024-02-01T12:15:00Z',
    tags: ['renewable-energy', 'gujarat', 'solar-power', 'subsidy']
  },
  {
    id: 'rajasthan-bhamashah-swasthya',
    name: 'Rajasthan Bhamashah Swasthya Bima Yojana',
    description: 'Health insurance scheme for families in Rajasthan',
    department: 'Government of Rajasthan',
    category: 'healthcare',
    eligibilityCriteria: {
      state: ['Rajasthan'],
      maxIncome: 200000,
      customCriteria: ['Must have Bhamashah card', 'Family size limit 5 members']
    },
    benefits: ['₹5 lakh health cover per family', 'Cashless treatment', 'Pre and post hospitalization'],
    documentsRequired: ['Bhamashah Card', 'Aadhaar Card', 'Income Certificate', 'Family composition certificate'],
    applicationProcess: ['Enroll at e-Mitra center', 'Biometric verification', 'Card generation', 'Hospital treatment'],
    applicationFee: 0,
    processingTime: '15-30 days',
    officialWebsite: 'https://health.rajasthan.gov.in',
    helplineNumber: '104',
    status: 'active',
    launchDate: '2015-12-30',
    lastUpdated: '2024-02-02T15:30:00Z',
    tags: ['healthcare', 'rajasthan', 'insurance', 'bhamashah']
  },
  {
    id: 'haryana-unemployment-allowance',
    name: 'Haryana Unemployment Allowance Scheme',
    description: 'Financial assistance for unemployed youth in Haryana',
    department: 'Government of Haryana',
    category: 'employment',
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 35,
      occupation: ['unemployed'],
      state: ['Haryana'],
      customCriteria: ['Must be graduate or postgraduate', 'Family income below ₹3 lakh']
    },
    benefits: ['₹9,000 per month for graduates', '₹15,000 per month for postgraduates', 'Job placement assistance'],
    documentsRequired: ['Degree certificate', 'Domicile certificate', 'Income certificate', 'Unemployment certificate'],
    applicationProcess: ['Online registration', 'Document verification', 'Interview', 'Allowance disbursement'],
    applicationFee: 0,
    processingTime: '30-45 days',
    officialWebsite: 'https://hreyahs.gov.in',
    helplineNumber: '0172-2560226',
    status: 'active',
    launchDate: '2016-11-01',
    lastUpdated: '2024-02-03T10:20:00Z',
    tags: ['employment', 'haryana', 'unemployment-allowance', 'youth']
  },
  {
    id: 'assam-apun-ghar',
    name: 'Assam Apun Ghar Housing Scheme',
    description: 'Affordable housing scheme for tea garden workers in Assam',
    department: 'Government of Assam',
    category: 'housing',
    eligibilityCriteria: {
      minAge: 18,
      state: ['Assam'],
      occupation: ['farmer', 'unemployed'],
      maxIncome: 300000,
      customCriteria: ['Must be tea garden worker or their family', 'Should not own a house']
    },
    benefits: ['₹2.5 lakh housing assistance', 'Technical support', 'Skill development for construction'],
    documentsRequired: ['Tea garden worker certificate', 'Income certificate', 'Land documents', 'Aadhaar Card'],
    applicationProcess: ['Apply through tea estate', 'Verification by district collector', 'Approval and fund release'],
    applicationFee: 0,
    processingTime: '90-120 days',
    officialWebsite: 'https://assam.gov.in',
    helplineNumber: '0361-2237582',
    status: 'active',
    launchDate: '2019-02-11',
    lastUpdated: '2024-02-04T14:15:00Z',
    tags: ['housing', 'assam', 'tea-garden-workers', 'rural-housing']
  },
  {
    id: 'odisha-nirman-shramik',
    name: 'Odisha Nirman Shramik Pucca Ghar Yojana',
    description: 'Housing scheme for construction workers in Odisha',
    department: 'Odisha Building and Other Construction Workers Board',
    category: 'housing',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 60,
      state: ['Odisha'],
      occupation: ['self-employed'],
      customCriteria: ['Must be registered construction worker', 'Minimum 1 year registration']
    },
    benefits: ['₹1.5 lakh for house construction', 'Interest subsidy on loans', 'Technical guidance'],
    documentsRequired: ['Construction worker registration', 'Aadhaar Card', 'Bank account details', 'Land documents'],
    applicationProcess: ['Apply at labor office', 'Verification of registration', 'Site inspection', 'Fund disbursement'],
    applicationFee: 0,
    processingTime: '60-90 days',
    officialWebsite: 'https://labour.odisha.gov.in',
    helplineNumber: '0674-2390236',
    status: 'active',
    launchDate: '2018-05-01',
    lastUpdated: '2024-02-05T11:30:00Z',
    tags: ['housing', 'odisha', 'construction-workers', 'labor-welfare']
  },
  {
    id: 'himachal-him-care',
    name: 'Himachal Pradesh Him Care Scheme',
    description: 'Health insurance scheme for residents of Himachal Pradesh',
    department: 'Government of Himachal Pradesh',
    category: 'healthcare',
    eligibilityCriteria: {
      state: ['Himachal Pradesh'],
      maxIncome: 500000,
      customCriteria: ['Must be bonafide resident of HP', 'Family size up to 5 members']
    },
    benefits: ['₹5 lakh health cover', 'Cashless treatment', 'Coverage for critical illnesses'],
    documentsRequired: ['Himachali Bonafide certificate', 'Aadhaar Card', 'Income certificate', 'Family composition proof'],
    applicationProcess: ['Online application', 'Document verification', 'Card issuance', 'Hospital treatment'],
    applicationFee: 0,
    processingTime: '30-45 days',
    officialWebsite: 'https://himcare.hp.gov.in',
    helplineNumber: '104',
    status: 'active',
    launchDate: '2019-01-01',
    lastUpdated: '2024-02-06T09:45:00Z',
    tags: ['healthcare', 'himachal-pradesh', 'insurance', 'universal-health']
  },
  {
    id: 'pm-scholarship-police',
    name: 'PM Scholarship for Children of Police Personnel',
    description: 'Scholarship scheme for wards of police personnel killed in action',
    department: 'Ministry of Home Affairs',
    category: 'education',
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 27,
      occupation: ['student'],
      customCriteria: ['Parent must be police personnel killed/disabled in duty', 'Minimum 60% marks in 12th']
    },
    benefits: ['₹3,000 per month for boys', '₹3,600 per month for girls', 'Duration: 4-5 years'],
    documentsRequired: ['Death/disability certificate of parent', 'Service record', 'Academic certificates', 'Bank details'],
    applicationProcess: ['Online application', 'Verification by police department', 'Selection committee review', 'Scholarship disbursement'],
    applicationFee: 0,
    processingTime: '60-90 days',
    officialWebsite: 'https://scholarships.gov.in',
    helplineNumber: '0120-6619540',
    status: 'active',
    launchDate: '2006-08-15',
    lastUpdated: '2024-02-07T13:20:00Z',
    tags: ['education', 'scholarship', 'police-welfare', 'martyrs-children']
  },
  {
    id: 'jan-dhan',
    name: 'Pradhan Mantri Jan Dhan Yojana',
    description: 'Financial inclusion scheme ensuring access to banking services',
    department: 'Ministry of Finance',
    category: 'social-security',
    eligibilityCriteria: {
      minAge: 18,
      customCriteria: ['Should not have any bank account']
    },
    benefits: ['Zero balance account', 'RuPay debit card', 'Accident insurance cover of ₹2 lakh', 'Overdraft facility up to ₹10,000'],
    documentsRequired: ['Aadhaar Card', 'Address proof', 'Photograph'],
    applicationProcess: ['Visit nearest bank branch or Business Correspondent', 'Fill account opening form', 'Submit Aadhaar and address proof', 'Account opened immediately', 'Receive RuPay card'],
    applicationFee: 0,
    processingTime: 'Same day',
    officialWebsite: 'https://pmjdy.gov.in',
    helplineNumber: '1800-11-0001',
    status: 'active',
    launchDate: '2014-08-28',
    lastUpdated: '2024-01-23T10:20:00Z',
    tags: ['financial-inclusion', 'banking', 'zero-balance', 'insurance']
  },
  {
    id: 'elderly-pension',
    name: 'Indira Gandhi National Old Age Pension Scheme',
    description: 'Monthly pension for elderly citizens below poverty line',
    department: 'Ministry of Rural Development',
    category: 'senior-citizen',
    eligibilityCriteria: {
      minAge: 60,
      maxIncome: 100000,
      customCriteria: ['Must be Below Poverty Line (BPL) family']
    },
    benefits: ['Monthly pension of ₹500 (60-79 years)', 'Monthly pension of ₹800 (80+ years)', 'Direct bank transfer'],
    documentsRequired: ['Aadhaar Card', 'Age proof', 'BPL card', 'Bank account details'],
    applicationProcess: ['Visit Gram Panchayat or Urban Local Body office', 'Fill pension application form', 'Submit required documents', 'Verification by officials', 'Pension starts next month'],
    applicationFee: 0,
    processingTime: '30-45 days',
    officialWebsite: 'https://nsap.nic.in',
    helplineNumber: '011-23438088',
    status: 'active',
    launchDate: '1995-08-15',
    lastUpdated: '2024-01-24T15:30:00Z',
    tags: ['senior-citizen', 'pension', 'elderly', 'social-security', 'bpl']
  }
];

export const getSchemeById = (id: string): Scheme | undefined => {
  return mockSchemes.find(scheme => scheme.id === id);
};

export const getSchemesByCategory = (category: string): Scheme[] => {
  return mockSchemes.filter(scheme => scheme.category.toLowerCase() === category.toLowerCase());
};

export const getActiveSchemes = (): Scheme[] => {
  return mockSchemes.filter(scheme => scheme.status === 'active');
}; 