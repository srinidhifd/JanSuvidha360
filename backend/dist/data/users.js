"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByPhone = exports.users = void 0;
exports.users = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        phoneNumber: '+919876543210',
        dateOfBirth: '1996-03-15',
        age: 28,
        gender: 'male',
        occupation: 'student',
        annualIncome: 180000,
        state: 'Delhi',
        city: 'New Delhi',
        address: '123 Main Street, Connaught Place, New Delhi, Delhi 110001',
        aadhaarNumber: '1234 5678 9012',
        panNumber: 'ABCDE1234F',
        profileCompleted: true,
        isVerified: false,
        documents: {
            aadhaar: {
                number: '1234 5678 9012',
                name: 'Rajesh Kumar',
                dob: '15/03/1996',
                gender: 'MALE',
                address: '123 Main Street, Connaught Place, New Delhi, Delhi 110001',
                fatherName: 'Suresh Kumar',
                issueDate: '12/08/2018',
                pincode: '110001',
                photo: '/api/placeholder/150/180' // Placeholder for photo
            },
            pan: {
                number: 'ABCDE1234F',
                name: 'RAJESH KUMAR',
                fatherName: 'SURESH KUMAR',
                dob: '15/03/1996',
                issueDate: '25/04/2019',
                signature: '/api/placeholder/200/50' // Placeholder for signature
            },
            drivingLicense: {
                number: 'DL-1320110012345',
                name: 'Rajesh Kumar',
                dob: '15/03/1996',
                address: '123 Main Street, Connaught Place, New Delhi, Delhi 110001',
                issueDate: '10/06/2020',
                validUpto: '09/06/2040',
                vehicleClass: 'LMV',
                bloodGroup: 'B+',
                photo: '/api/placeholder/150/180',
                issuingAuthority: 'Transport Commissioner, Delhi'
            },
            passport: {
                number: 'A1234567',
                name: 'RAJESH KUMAR',
                nationality: 'INDIAN',
                dob: '15/03/1996',
                pob: 'NEW DELHI',
                issueDate: '20/01/2021',
                expiryDate: '19/01/2031',
                issuingAuthority: 'PASSPORT OFFICE NEW DELHI',
                photo: '/api/placeholder/150/180'
            }
        }
    },
    {
        id: '2',
        name: 'Priya Sharma',
        phoneNumber: '+919876543211',
        dateOfBirth: '1993-07-22',
        age: 31,
        gender: 'female',
        occupation: 'farmer',
        annualIncome: 150000,
        state: 'Punjab',
        city: 'Amritsar',
        address: '456 Village Road, Amritsar, Punjab 143001',
        aadhaarNumber: '2345 6789 0123',
        panNumber: 'BCDEF2345G',
        profileCompleted: true,
        isVerified: true,
        documents: {
            aadhaar: {
                number: '2345 6789 0123',
                name: 'Priya Sharma',
                dob: '22/07/1993',
                gender: 'FEMALE',
                address: '456 Village Road, Amritsar, Punjab 143001',
                fatherName: 'Ramesh Sharma',
                issueDate: '15/05/2017',
                pincode: '143001',
                photo: '/api/placeholder/150/180'
            },
            pan: {
                number: 'BCDEF2345G',
                name: 'PRIYA SHARMA',
                fatherName: 'RAMESH SHARMA',
                dob: '22/07/1993',
                issueDate: '10/09/2018',
                signature: '/api/placeholder/200/50'
            },
            drivingLicense: {
                number: 'PB-0320110067890',
                name: 'Priya Sharma',
                dob: '22/07/1993',
                address: '456 Village Road, Amritsar, Punjab 143001',
                issueDate: '05/03/2019',
                validUpto: '04/03/2039',
                vehicleClass: 'LMV',
                bloodGroup: 'A+',
                photo: '/api/placeholder/150/180',
                issuingAuthority: 'Transport Commissioner, Punjab'
            },
            passport: {
                number: 'B2345678',
                name: 'PRIYA SHARMA',
                nationality: 'INDIAN',
                dob: '22/07/1993',
                pob: 'AMRITSAR',
                issueDate: '15/11/2020',
                expiryDate: '14/11/2030',
                issuingAuthority: 'PASSPORT OFFICE AMRITSAR',
                photo: '/api/placeholder/150/180'
            }
        }
    },
    {
        id: '3',
        name: 'Amit Patel',
        phoneNumber: '+919876543212',
        dateOfBirth: '1989-11-10',
        age: 35,
        gender: 'male',
        occupation: 'unemployed',
        annualIncome: 80000,
        state: 'Gujarat',
        city: 'Ahmedabad',
        address: '789 Market Street, Ahmedabad, Gujarat 380001',
        aadhaarNumber: '3456 7890 1234',
        panNumber: 'CDEFG3456H',
        profileCompleted: true,
        isVerified: false,
        documents: {
            aadhaar: {
                number: '3456 7890 1234',
                name: 'Amit Patel',
                dob: '10/11/1989',
                gender: 'MALE',
                address: '789 Market Street, Ahmedabad, Gujarat 380001',
                fatherName: 'Kiran Patel',
                issueDate: '08/12/2016',
                pincode: '380001',
                photo: '/api/placeholder/150/180'
            },
            pan: {
                number: 'CDEFG3456H',
                name: 'AMIT PATEL',
                fatherName: 'KIRAN PATEL',
                dob: '10/11/1989',
                issueDate: '22/07/2017',
                signature: '/api/placeholder/200/50'
            },
            drivingLicense: {
                number: 'GJ-0120110098765',
                name: 'Amit Patel',
                dob: '10/11/1989',
                address: '789 Market Street, Ahmedabad, Gujarat 380001',
                issueDate: '18/08/2018',
                validUpto: '17/08/2038',
                vehicleClass: 'LMV',
                bloodGroup: 'O+',
                photo: '/api/placeholder/150/180',
                issuingAuthority: 'Transport Commissioner, Gujarat'
            },
            passport: {
                number: 'C3456789',
                name: 'AMIT PATEL',
                nationality: 'INDIAN',
                dob: '10/11/1989',
                pob: 'AHMEDABAD',
                issueDate: '05/07/2019',
                expiryDate: '04/07/2029',
                issuingAuthority: 'PASSPORT OFFICE AHMEDABAD',
                photo: '/api/placeholder/150/180'
            }
        }
    },
    {
        id: '4',
        name: 'Sunita Devi',
        phoneNumber: '+919876543213',
        dateOfBirth: '1976-01-05',
        age: 48,
        gender: 'female',
        occupation: 'self-employed',
        annualIncome: 250000,
        state: 'Bihar',
        city: 'Patna',
        address: '321 Gandhi Nagar, Patna, Bihar 800001',
        aadhaarNumber: '4567 8901 2345',
        panNumber: 'DEFGH4567I',
        profileCompleted: true,
        isVerified: true,
        documents: {
            aadhaar: {
                number: '4567 8901 2345',
                name: 'Sunita Devi',
                dob: '05/01/1976',
                gender: 'FEMALE',
                address: '321 Gandhi Nagar, Patna, Bihar 800001',
                fatherName: 'Rajesh Singh',
                issueDate: '20/03/2015',
                pincode: '800001',
                photo: '/api/placeholder/150/180'
            },
            pan: {
                number: 'DEFGH4567I',
                name: 'SUNITA DEVI',
                fatherName: 'RAJESH SINGH',
                dob: '05/01/1976',
                issueDate: '15/12/2016',
                signature: '/api/placeholder/200/50'
            },
            drivingLicense: {
                number: 'BR-0120110054321',
                name: 'Sunita Devi',
                dob: '05/01/1976',
                address: '321 Gandhi Nagar, Patna, Bihar 800001',
                issueDate: '12/01/2017',
                validUpto: '11/01/2037',
                vehicleClass: 'LMV',
                bloodGroup: 'AB+',
                photo: '/api/placeholder/150/180',
                issuingAuthority: 'Transport Commissioner, Bihar'
            },
            passport: {
                number: 'D4567890',
                name: 'SUNITA DEVI',
                nationality: 'INDIAN',
                dob: '05/01/1976',
                pob: 'PATNA',
                issueDate: '28/02/2018',
                expiryDate: '27/02/2028',
                issuingAuthority: 'PASSPORT OFFICE PATNA',
                photo: '/api/placeholder/150/180'
            }
        }
    },
    {
        id: '5',
        name: 'Arjun Singh',
        phoneNumber: '+919876543214',
        dateOfBirth: '2001-09-12',
        age: 23,
        gender: 'male',
        occupation: 'student',
        annualIncome: 50000,
        state: 'Rajasthan',
        city: 'Jaipur',
        address: '654 Pink City Road, Jaipur, Rajasthan 302001',
        aadhaarNumber: '5678 9012 3456',
        panNumber: 'EFGHI5678J',
        profileCompleted: true,
        isVerified: false,
        documents: {
            aadhaar: {
                number: '5678 9012 3456',
                name: 'Arjun Singh',
                dob: '12/09/2001',
                gender: 'MALE',
                address: '654 Pink City Road, Jaipur, Rajasthan 302001',
                fatherName: 'Vikram Singh',
                issueDate: '18/11/2019',
                pincode: '302001',
                photo: '/api/placeholder/150/180'
            },
            pan: {
                number: 'EFGHI5678J',
                name: 'ARJUN SINGH',
                fatherName: 'VIKRAM SINGH',
                dob: '12/09/2001',
                issueDate: '05/02/2020',
                signature: '/api/placeholder/200/50'
            },
            drivingLicense: {
                number: 'RJ-1420110087654',
                name: 'Arjun Singh',
                dob: '12/09/2001',
                address: '654 Pink City Road, Jaipur, Rajasthan 302001',
                issueDate: '20/09/2022',
                validUpto: '19/09/2042',
                vehicleClass: 'LMV',
                bloodGroup: 'B-',
                photo: '/api/placeholder/150/180',
                issuingAuthority: 'Transport Commissioner, Rajasthan'
            },
            passport: {
                number: 'E5678901',
                name: 'ARJUN SINGH',
                nationality: 'INDIAN',
                dob: '12/09/2001',
                pob: 'JAIPUR',
                issueDate: '10/05/2022',
                expiryDate: '09/05/2032',
                issuingAuthority: 'PASSPORT OFFICE JAIPUR',
                photo: '/api/placeholder/150/180'
            }
        }
    }
];
const findUserByPhone = (phoneNumber) => {
    return exports.users.find(user => user.phoneNumber === phoneNumber);
};
exports.findUserByPhone = findUserByPhone;
const findUserById = (id) => {
    return exports.users.find(user => user.id === id);
};
exports.findUserById = findUserById;
//# sourceMappingURL=users.js.map