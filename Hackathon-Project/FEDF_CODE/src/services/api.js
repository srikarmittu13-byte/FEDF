/**
 * @file api.js
 * @description Core Service Layer for the Student Admission Portal.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Separation of Concerns: API communication and data storage are isolated from view components.
 * - ES6 modules, arrow functions, destructuring, and template literals for clean, scalable JS.
 * - Simulated asynchronous API operations using Promise and setTimeout to replicate real-world latency.
 * - Resilient LocalStorage adapters with type checks and fallback defaults to prevent state failures.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Robust user state models that drive visual state machines on the client side.
 * - Dynamic data payload design representing real-world college applications (grades, courses, tracking status).
 */

// Simulated database structures in LocalStorage
const STORAGE_KEYS = {
  USERS: 'sap_users',
  APPLICATIONS: 'sap_applications',
  SESSION: 'sap_session'
};

// Initial static seed data for courses
const MOCK_COURSES = [
  { id: 'cs', name: 'B.Tech Computer Science & Engineering', dept: 'Engineering', duration: '4 Years', fee: '$8,500/yr', minPercentage: 75 },
  { id: 'ee', name: 'B.Tech Electrical & Electronics Engineering', dept: 'Engineering', duration: '4 Years', fee: '$7,800/yr', minPercentage: 65 },
  { id: 'ba', name: 'Bachelor of Business Administration (BBA)', dept: 'Management', duration: '3 Years', fee: '$6,000/yr', minPercentage: 60 },
  { id: 'eco', name: 'B.Sc Economics (Hons)', dept: 'Humanities', duration: '3 Years', fee: '$5,500/yr', minPercentage: 70 },
  { id: 'dm', name: 'B.Des Digital Media & Animation', dept: 'Design', duration: '4 Years', fee: '$7,000/yr', minPercentage: 55 }
];

// Helper to safely get data from localStorage (CO2: Resilient Storage Adapter)
const getStorageItem = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    if (!item && key === STORAGE_KEYS.USERS) {
      const demoUsers = [
        {
          id: 'std_demo',
          name: 'Jane Doe',
          email: 'demo@university.edu',
          password: 'password123',
          joinedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(key, JSON.stringify(demoUsers));
      return demoUsers;
    }
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Helper to set data in localStorage
const setStorageItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

// Simulated Network Latency Helper (CO2: Async flow design)
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  /**
   * Get list of offered courses
   */
  getCourses: async () => {
    await delay(300);
    return MOCK_COURSES;
  },

  /**
   * Check eligibility for a specific course based on 12th grade percentage
   * (CO2: Business Logic Encapsulation)
   */
  checkEligibility: async (percentage, courseId) => {
    await delay(200);
    const pct = parseFloat(percentage);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      return { eligible: false, message: 'Please enter a valid percentage between 0 and 100.' };
    }

    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) {
      return { eligible: false, message: 'Please select a valid course.' };
    }

    if (pct >= course.minPercentage) {
      return {
        eligible: true,
        message: `Congratulations! You are eligible for the ${course.name}. The minimum requirement is ${course.minPercentage}%, and yours is ${pct}%.`
      };
    } else {
      return {
        eligible: false,
        message: `Unfortunately, you do not meet the minimum requirement of ${course.minPercentage}% for ${course.name}. We suggest checking other course offerings.`
      };
    }
  },

  /**
   * Register a new student user
   */
  registerUser: async (userData) => {
    await delay(500);
    const { name, email, password } = userData;
    
    if (!name || !email || !password) {
      throw new Error('All registration fields are required.');
    }

    const users = getStorageItem(STORAGE_KEYS.USERS, []);
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

    if (userExists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `std_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password, // In a real app, passwords would absolutely be encrypted on the server-side.
      joinedAt: new Date().toISOString()
    };

    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);

    // Auto-login after registration
    setStorageItem(STORAGE_KEYS.SESSION, { id: newUser.id, name: newUser.name, email: newUser.email });
    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  },

  /**
   * Login student
   */
  loginUser: async (email, password) => {
    await delay(500);
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const users = getStorageItem(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const session = { id: user.id, name: user.name, email: user.email };
    setStorageItem(STORAGE_KEYS.SESSION, session);
    return { success: true, user: session };
  },

  /**
   * Get active logged-in user
   */
  getCurrentUser: () => {
    return getStorageItem(STORAGE_KEYS.SESSION, null);
  },

  /**
   * Logout user and wipe active session
   */
  logoutUser: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  /**
   * Submit admission application
   * (CO2: Complex document payload compilation & simulation)
   */
  submitApplication: async (appData) => {
    await delay(800);
    const activeUser = apiService.getCurrentUser();
    if (!activeUser) {
      throw new Error('You must be logged in to submit an application.');
    }

    const applications = getStorageItem(STORAGE_KEYS.APPLICATIONS, []);
    
    // Check if user already applied to this specific course to avoid duplicates
    const alreadyApplied = applications.some(
      app => app.email.toLowerCase() === activeUser.email.toLowerCase() && app.courseId === appData.courseId
    );

    if (alreadyApplied) {
      throw new Error(`You have already submitted an application for this course.`);
    }

    const matchedCourse = MOCK_COURSES.find(c => c.id === appData.courseId);

    const newApplication = {
      id: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: activeUser.id,
      email: activeUser.email,
      name: activeUser.name,
      phone: appData.phone,
      dob: appData.dob,
      gender: appData.gender,
      address: appData.address,
      percentage10th: appData.percentage10th,
      percentage12th: appData.percentage12th,
      courseId: appData.courseId,
      courseName: matchedCourse ? matchedCourse.name : appData.courseId,
      documents: {
        photoName: appData.photoName || 'profile_photo.jpg',
        transcriptName: appData.transcriptName || 'grade_sheet_12th.pdf',
        idProofName: appData.idProofName || 'passport_copy.pdf'
      },
      status: 'Applied', // Statuses: 'Applied' | 'Document Verification Pending' | 'Fees Reviewed' | 'Approved'
      submittedAt: new Date().toISOString(),
      timeline: [
        { status: 'Applied', title: 'Application Submitted', description: 'Your application has been received successfully.', date: new Date().toLocaleDateString() },
        { status: 'Document Verification Pending', title: 'Document Verification', description: 'Our registrar is verifying your uploaded academic archives.', date: 'In Progress' }
      ]
    };

    applications.push(newApplication);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, applications);
    return { success: true, application: newApplication };
  },

  /**
   * Get all applications submitted by the current user
   */
  getUserApplications: async () => {
    await delay(400);
    const activeUser = apiService.getCurrentUser();
    if (!activeUser) return [];

    const allApps = getStorageItem(STORAGE_KEYS.APPLICATIONS, []);
    return allApps.filter(app => app.userId === activeUser.id);
  }
};
