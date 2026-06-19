/**
 * @file Apply.jsx
 * @description Student Enrollment Workspace: Handles multi-step academic forms and live admission tracking dashboards.
 * 
 * Front-End Engineering (CO1) Concepts:
 * - Complex state driven view switching (Form Wizard vs. Live Dashboard).
 * - Implements both file input select triggers AND full drag-and-drop fields.
 * - Progressive step indicators showing form wizard completion percentages.
 * 
 * JavaScript Engineering (CO2) Concepts:
 * - Dynamic criteria validation checks preventing fee clearance if high school marks fall under requirement.
 * - State accumulator trees tracking progress milestones.
 * - Simulated async state updates (advancing admission status via a Registrar Simulation trigger).
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  FileText, 
  CreditCard, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  Trash2,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { apiService } from '../services/api';

export default function Apply({ currentUser }) {
  const navigate = useNavigate();

  // Redirect if session state is invalid
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Loaded courses and applications state (CO2: Async resource fetching)
  const [courses, setCourses] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Form step controls (Step 1-4)
  const [currentStep, setCurrentStep] = useState(1);

  // Form Data branches (CO2: Complex compound state object)
  const [personalDetails, setPersonalDetails] = useState({
    phone: '',
    dob: '',
    gender: 'Male',
    address: ''
  });

  const [academicDetails, setAcademicDetails] = useState({
    courseId: '',
    percentage10th: '',
    percentage12th: ''
  });

  const [uploadedDocuments, setUploadedDocuments] = useState({
    photoName: '',
    transcriptName: '',
    idProofName: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    cvv: '',
    expiry: ''
  });

  // Drag over states tracking
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [isDraggingTranscript, setIsDraggingTranscript] = useState(false);
  const [isDraggingID, setIsDraggingID] = useState(false);

  // Load baseline values from API service (CO2: Async React effect loop)
  const refreshApplicationWorkspace = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const courseData = await apiService.getCourses();
      setCourses(courseData);
      if (courseData.length > 0 && !academicDetails.courseId) {
        setAcademicDetails(prev => ({ ...prev, courseId: courseData[0].id }));
      }

      const apps = await apiService.getUserApplications();
      setUserApplications(apps);
    } catch (err) {
      console.error('Failed loading workspace resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshApplicationWorkspace();
  }, [currentUser]);

  // Input state handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setAcademicDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  // Drag and Drop implementation parameters (CO1: Professional Usability Pattern)
  const handleDragOver = (e, dragSetter) => {
    e.preventDefault();
    dragSetter(true);
  };

  const handleDragLeave = (dragSetter) => {
    dragSetter(false);
  };

  const handleDrop = (e, fileKey, dragSetter) => {
    e.preventDefault();
    dragSetter(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setUploadedDocuments(prev => ({
        ...prev,
        [fileKey]: files[0].name
      }));
    }
  };

  const handleFileSelect = (e, fileKey) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedDocuments(prev => ({
        ...prev,
        [fileKey]: files[0].name
      }));
    }
  };

  const clearFile = (fileKey) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [fileKey]: ''
    }));
  };

  // Step Navigations
  const handleNextStep = () => {
    setFormError('');

    // Progressive Form validations (CO2: Logic validations per stage)
    if (currentStep === 1) {
      if (!personalDetails.phone || !personalDetails.dob || !personalDetails.address) {
        setFormError('Please complete all personal profile fields to proceed.');
        return;
      }
    } else if (currentStep === 2) {
      if (!academicDetails.percentage10th || !academicDetails.percentage12th) {
        setFormError('High school standard percentages are required.');
        return;
      }
      
      const pct12 = parseFloat(academicDetails.percentage12th);
      const selectedCourseObj = courses.find(c => c.id === academicDetails.courseId);
      
      if (selectedCourseObj && pct12 < selectedCourseObj.minPercentage) {
        setFormError(`Warning: Your 12th percentage (${pct12}%) is below the minimum eligibility criteria requirement (${selectedCourseObj.minPercentage}%) for ${selectedCourseObj.name}. Check or select other programs.`);
        return;
      }
    } else if (currentStep === 3) {
      if (!uploadedDocuments.photoName || !uploadedDocuments.transcriptName || !uploadedDocuments.idProofName) {
        setFormError('Please drag or upload all three requested identity archives.');
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setFormError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Form final submit sequence
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!paymentDetails.cardName || !paymentDetails.cardNumber || !paymentDetails.cvv || !paymentDetails.expiry) {
      setFormError('Please clear administrative assessment fee details.');
      return;
    }

    setSubmitting(true);

    try {
      const consolidatedPayload = {
        ...personalDetails,
        ...academicDetails,
        photoName: uploadedDocuments.photoName,
        transcriptName: uploadedDocuments.transcriptName,
        idProofName: uploadedDocuments.idProofName
      };

      const res = await apiService.submitApplication(consolidatedPayload);
      if (res.success) {
        await refreshApplicationWorkspace();
        setCurrentStep(1); // Restore steps index background
      }
    } catch (err) {
      setFormError(err.message || 'Submission failed. Server failed compilation.');
    } finally {
      setSubmitting(false);
    }
  };

  // INTERACTIVE DEMO ACCELERATOR: Simulated status changer
  // Advancing admission steps of candidate directly in LocalStorage to demonstrate real-time states
  const handleSimulateAudit = () => {
    if (userApplications.length === 0) return;
    
    const activeApp = userApplications[0];
    const applications = JSON.parse(localStorage.getItem('sap_applications') || '[]');
    const matchedIndex = applications.findIndex(a => a.id === activeApp.id);

    if (matchedIndex !== -1) {
      const currentStatus = applications[matchedIndex].status;
      let nextStatus = '';
      let title = '';
      let desc = '';

      if (currentStatus === 'Applied') {
        nextStatus = 'Document Verification Pending';
        title = 'Documents Certified';
        desc = 'Office of Registrar approved submitted high school transcripts.';
      } else if (currentStatus === 'Document Verification Pending') {
        nextStatus = 'Approved';
        title = 'Admission Approved';
        desc = 'Congratulations! Aura University Admissions office has confirmed your seat. Your offer letter has been generated.';
      } else {
        // Reset simulation cycle
        nextStatus = 'Applied';
        title = 'Application Reset';
        desc = 'Reset status to Applied for checking portal timeline.';
      }

      applications[matchedIndex].status = nextStatus;
      
      // Push new timeline block (CO2: Array immutable updates)
      const newTimelineBlock = {
        status: nextStatus,
        title,
        description: desc,
        date: new Date().toLocaleDateString()
      };

      // Ensure duplicates don't crowd timeline
      if (!applications[matchedIndex].timeline.some(t => t.status === nextStatus)) {
        applications[matchedIndex].timeline.push(newTimelineBlock);
      } else {
        applications[matchedIndex].timeline = [
          { status: 'Applied', title: 'Application Submitted', description: 'Your application has been received successfully.', date: new Date().toLocaleDateString() }
        ];
        applications[matchedIndex].status = 'Applied';
      }

      localStorage.setItem('sap_applications', JSON.stringify(applications));
      refreshApplicationWorkspace();
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-blue-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-300" />
              <span>Student Admission Dashboard</span>
            </div>
            <h1 className="font-sans text-2xl sm:text-3xl font-black tracking-tight">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-xs text-blue-200 font-medium">
              Submit credentials, process verification assessment fees, and track your active registrar admission status.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10 text-xs font-mono space-y-1 block shrink-0">
            <div className="font-bold text-blue-300">USER PROFILE SUMMARY</div>
            <div>Name: {currentUser.name}</div>
            <div>Email: {currentUser.email}</div>
          </div>
        </div>

        {loading ? (
          /* Loader frame (CO1 Interaction) */
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <span className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
            <p className="text-sm font-sans font-semibold text-gray-500">Configuring Portal Workspace...</p>
          </div>
        ) : userApplications.length > 0 ? (
          
          /* ======================================================================== */
          /* CASE B: STUDENT DASHBOARD LIVE APPLICATION TRACKING VIEW                   */
          /* ======================================================================== */
          (
            <div className="space-y-8 text-left animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Application metadata details panel (5 cols) */}
                <div className="lg:col-span-5 bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/5 space-y-6">
                  
                  {/* Status header banner */}
                  <div className="flex items-center justify-between border-b border-blue-50 pb-5">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400">APPLICATION TOKEN</span>
                      <h3 className="font-mono text-xl font-bold text-gray-900 mt-0.5">{userApplications[0].id}</h3>
                    </div>
                    
                    {/* Status Badge colors logic */}
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      userApplications[0].status === 'Approved' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' 
                        : 'bg-blue-50 text-blue-800 border border-blue-200/50'
                    }`}>
                      {userApplications[0].status}
                    </span>
                  </div>

                  {/* Summary of chosen educational program */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-blue-50/50">
                      <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                          <GraduationCap className="w-5.2 h-5.2" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-blue-600 font-bold uppercase">SELECTED PROGRAM</span>
                          <h4 className="font-sans font-bold text-gray-950 text-sm sm:text-base leading-tight mt-0.5">{userApplications[0].courseName}</h4>
                          <p className="text-xs text-gray-400 font-medium mt-1">Submitted: {new Date(userApplications[0].submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Academic transcripts files loaded indicator */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase pl-1 block">CERTIFIED ARCHIVES</span>
                      
                      <div className="text-xs font-semibold text-gray-600 space-y-2">
                        <div className="flex items-center justify-between p-2.5 bg-blue-50/30 border border-blue-50/50 rounded-xl">
                          <span className="truncate">{userApplications[0].documents.photoName}</span>
                          <span className="text-[10px] text-emerald-600 font-bold shrink-0">Profile Image Approved</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-blue-50/30 border border-blue-50/50 rounded-xl">
                          <span className="truncate">{userApplications[0].documents.transcriptName}</span>
                          <span className="text-[10px] text-emerald-600 font-bold shrink-0">12th Marks Sheet Approved</span>
                        </div>
                      </div>
                    </div>

                    {/* INTERACTIVE DEMO TRIGGER: Change states to test real time capability */}
                    <div className="bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 mt-6 text-center space-y-3">
                      <div className="flex items-center justify-center gap-1 text-xs font-bold text-indigo-700">
                        <Award className="w-4.5 h-4.5 text-blue-600" />
                        <span>Interactive Admission Simulator</span>
                      </div>
                      <p className="text-[11px] text-indigo-900 font-medium leading-normal">
                        Advance application status directly to "Approved" to trigger final offer letter congratulations modules!
                      </p>
                      <button
                        onClick={handleSimulateAudit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs shadow hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer pointer-events-auto"
                      >
                        Advance Verification Status ->
                      </button>
                    </div>

                  </div>

                </div>

                {/* Live Admissions Timeline panel (7 Cols) */}
                <div className="lg:col-span-7 bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/5">
                  <h3 className="font-sans text-lg font-black text-gray-900 tracking-tight mb-8">
                    Registrar Verification Timeline
                  </h3>

                  {/* Connected visual lines */}
                  <div className="relative border-l-2 border-blue-100 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-8">
                    
                    {userApplications[0].timeline.map((event, eventIdx) => (
                      <div key={eventIdx} className="relative text-left">
                        
                        {/* Event node indicator */}
                        <div className="absolute top-0 -left-[35px] sm:-left-[43px] w-6 h-6 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center text-blue-600 font-bold">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        </div>

                        <div className="bg-blue-50/30 hover:bg-blue-50/70 border border-blue-100/50 p-4 rounded-2xl transition-all">
                          <div className="flex justify-between items-center gap-2">
                            <h4 className="font-sans font-bold text-gray-900 text-sm sm:text-base">{event.title}</h4>
                            <span className="text-[10px] text-gray-400 font-mono shrink-0">{event.date}</span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1.5">{event.description}</p>
                        </div>

                      </div>
                    ))}

                    <div className="relative text-left">
                      {/* Live flashing node representing immediate real-time listening */}
                      <div className="absolute top-0 -left-[35px] sm:-left-[43px] w-6 h-6 rounded-full bg-amber-100 border-4 border-white flex items-center justify-center animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      </div>
                      <div className="p-4 border border-dashed border-gray-200 rounded-2xl">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600">
                          <Clock className="w-4 h-4 animate-spin shrink-0" />
                          <span>REGISTRAR SESSION ACTIVE</span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-1">Our enrollment desk is waiting on standard security clearance.</p>
                      </div>
                    </div>

                  </div>

                  {/* Congratulations panel displayed ONLY when status reaches 'Approved' */}
                  {userApplications[0].status === 'Approved' && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-3xl flex items-center gap-4 text-left animate-bounce">
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                        <Award className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans font-bold text-emerald-900 text-sm sm:text-base">Seat Certified Successfully!</h4>
                        <p className="text-xs text-emerald-800 leading-relaxed font-semibold">Your digital matriculation fee has cleared. Welcome to Aura University family! Check your student inbox.</p>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          )

        ) : (
          
          /* ======================================================================== */
          /* CASE A: MULTI-STEP ADMISSION PROCESS FORM WIZARD                           */
          /* ======================================================================== */
          (
            <div className="bg-white border border-blue-100 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden text-left animate-fade-in max-w-4xl mx-auto">
              
              {/* Progress Step Bullet Indicators */}
              <div className="bg-gray-50/80 border-b border-blue-50 py-6 px-4 sm:px-8 grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { index: 1, label: 'Profile' },
                  { index: 2, label: 'Academic' },
                  { index: 3, label: 'Upload' },
                  { index: 4, label: 'Fee Clear' }
                ].map((step) => (
                  <div key={step.index} className="flex flex-col sm:flex-row items-center gap-2 justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                      currentStep === step.index 
                        ? 'bg-blue-600 text-white border-blue-600 shadow' 
                        : currentStep > step.index 
                          ? 'bg-emerald-500 text-white border-emerald-500' 
                          : 'bg-white text-gray-400 border-gray-200'
                    }`}>
                      {currentStep > step.index ? '✓' : step.index}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                      currentStep === step.index ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Error banner alerts */}
              {formError && (
                <div className="m-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-left text-rose-800 text-xs font-medium animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[10px]">Criteria Error</h4>
                    <p className="mt-0.5 leading-relaxed">{formError}</p>
                  </div>
                </div>
              )}

              {/* Form step contents */}
              <div className="p-6 sm:p-10">
                
                {currentStep === 1 && (
                  /* ================= STEP 1: PERSONAL DETAILS ================= */
                  <div className="space-y-6">
                    <div className="border-b border-blue-50 pb-4">
                      <h3 className="font-sans text-lg font-black text-gray-900 tracking-tight">Step 1: Contact & Personal Details</h3>
                      <p className="text-xs text-gray-400 mt-1">Please enter active coordinates to allow direct mailing of offer packets.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="apply-phone" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Mailing Phone Number</label>
                        <input
                          id="apply-phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="e.g. +1 555-123-4567"
                          value={personalDetails.phone}
                          onChange={handlePersonalChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label htmlFor="apply-dob" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Date of Birth</label>
                        <input
                          id="apply-dob"
                          name="dob"
                          type="date"
                          required
                          value={personalDetails.dob}
                          onChange={handlePersonalChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label htmlFor="apply-gender" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Gender Orientation</label>
                        <select
                          id="apply-gender"
                          name="gender"
                          value={personalDetails.gender}
                          onChange={handlePersonalChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-Binary">Non-Binary</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 text-left sm:col-span-2">
                        <label htmlFor="apply-address" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Permanent Mailing Address</label>
                        <textarea
                          id="apply-address"
                          name="address"
                          rows="3"
                          required
                          placeholder="Street, City, State, ZIP code"
                          value={personalDetails.address}
                          onChange={handlePersonalChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  /* ================= STEP 2: ACADEMIC BENCHMARKS ================= */
                  <div className="space-y-6">
                    <div className="border-b border-blue-50 pb-4">
                      <h3 className="font-sans text-lg font-black text-gray-900 tracking-tight">Step 2: Educational Programs & GPA Percentage</h3>
                      <p className="text-xs text-gray-400 mt-1">Select your course goal and report certified standard marks.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      <div className="space-y-1.5 text-left sm:col-span-2">
                        <label htmlFor="apply-courseId" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Preferred Course Major</label>
                        <select
                          id="apply-courseId"
                          name="courseId"
                          value={academicDetails.courseId}
                          onChange={handleAcademicChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-bold rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                        >
                          {courses.map(course => (
                            <option key={course.id} value={course.id}>
                              {course.name} (Requires minimum standard score: {course.minPercentage}%)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label htmlFor="apply-percentage10th" className="text-xs font-bold text-gray-600 uppercase tracking-wider">10th Standard Score %</label>
                        <input
                          id="apply-percentage10th"
                          name="percentage10th"
                          type="number"
                          required
                          min="0"
                          max="100"
                          step="any"
                          placeholder="e.g. 85.5"
                          value={academicDetails.percentage10th}
                          onChange={handleAcademicChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label htmlFor="apply-percentage12th" className="text-xs font-bold text-gray-600 uppercase tracking-wider">12th Standard Score %</label>
                        <input
                          id="apply-percentage12th"
                          name="percentage12th"
                          type="number"
                          required
                          min="0"
                          max="100"
                          step="any"
                          placeholder="e.g. 78.2"
                          value={academicDetails.percentage12th}
                          onChange={handleAcademicChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        />
                      </div>

                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  /* ================= STEP 3: DOCUMENT ARCHIVE ================= */
                  <div className="space-y-6">
                    <div className="border-b border-blue-50 pb-4">
                      <h3 className="font-sans text-lg font-black text-gray-900 tracking-tight">Step 3: Document Archives and Verification Files</h3>
                      <p className="text-xs text-gray-400 mt-1">Both Drag & Drop controls and standard file selection paths are supported. Limit: 5MB per element.</p>
                    </div>

                    <div className="space-y-6">
                      
                      {/* File item 1: Profile Photo */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1 block text-left">1. Professional Profile Photo (JPG/PNG)</span>
                        
                        {!uploadedDocuments.photoName ? (
                          <div
                            onDragOver={(e) => handleDragOver(e, setIsDraggingPhoto)}
                            onDragLeave={() => handleDragLeave(setIsDraggingPhoto)}
                            onDrop={(e) => handleDrop(e, 'photoName', setIsDraggingPhoto)}
                            className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all ${
                              isDraggingPhoto ? 'border-blue-600 bg-blue-50/50' : 'border-blue-100 bg-gray-50/50 hover:bg-white'
                            }`}
                          >
                            <UploadCloud className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                            <p className="text-xs text-gray-500 font-medium">
                              Drag & drop profile picture, or{' '}
                              <label htmlFor="select-photo" className="text-blue-600 font-bold hover:underline cursor-pointer">
                                select file path
                              </label>
                            </p>
                            <input 
                              id="select-photo"
                              type="file" 
                              accept="image/jpeg,image/png"
                              onChange={(e) => handleFileSelect(e, 'photoName')}
                              className="hidden" 
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-bold">
                            <span className="truncate">{uploadedDocuments.photoName}</span>
                            <button 
                              type="button" 
                              onClick={() => clearFile('photoName')} 
                              className="text-rose-500 hover:text-rose-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* File item 2: high school standard transcripts */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1 block text-left">2. 12th Standard transcript Grade-Sheet (PDF)</span>
                        
                        {!uploadedDocuments.transcriptName ? (
                          <div
                            onDragOver={(e) => handleDragOver(e, setIsDraggingTranscript)}
                            onDragLeave={() => handleDragLeave(setIsDraggingTranscript)}
                            onDrop={(e) => handleDrop(e, 'transcriptName', setIsDraggingTranscript)}
                            className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all ${
                              isDraggingTranscript ? 'border-blue-600 bg-blue-50/50' : 'border-blue-100 bg-gray-50/50 hover:bg-white'
                            }`}
                          >
                            <UploadCloud className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                            <p className="text-xs text-gray-400 font-medium">
                              Drag & drop high school certificates, or{' '}
                              <label htmlFor="select-transcript" className="text-blue-600 font-bold hover:underline cursor-pointer">
                                select file path
                              </label>
                            </p>
                            <input 
                              id="select-transcript"
                              type="file" 
                              accept="application/pdf"
                              onChange={(e) => handleFileSelect(e, 'transcriptName')}
                              className="hidden" 
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-bold">
                            <span className="truncate">{uploadedDocuments.transcriptName}</span>
                            <button 
                              type="button" 
                              onClick={() => clearFile('transcriptName')} 
                              className="text-rose-500 hover:text-rose-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* File Item 3: Passport proof ID */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1 block text-left">3. Passport or Government-issued ID Proof (PDF/JPG)</span>
                        
                        {!uploadedDocuments.idProofName ? (
                          <div
                            onDragOver={(e) => handleDragOver(e, setIsDraggingID)}
                            onDragLeave={() => handleDragLeave(setIsDraggingID)}
                            onDrop={(e) => handleDrop(e, 'idProofName', setIsDraggingID)}
                            className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all ${
                              isDraggingID ? 'border-blue-600 bg-blue-50/50' : 'border-blue-100 bg-gray-50/50 hover:bg-white'
                            }`}
                          >
                            <UploadCloud className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                            <p className="text-xs text-gray-400 font-medium">
                              Drag & drop ID copy packet, or{' '}
                              <label htmlFor="select-id" className="text-blue-600 font-bold hover:underline cursor-pointer">
                                select file path
                              </label>
                            </p>
                            <input 
                              id="select-id"
                              type="file" 
                              accept="application/pdf,image/jpeg,image/png"
                              onChange={(e) => handleFileSelect(e, 'idProofName')}
                              className="hidden" 
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-bold">
                            <span className="truncate">{uploadedDocuments.idProofName}</span>
                            <button 
                              type="button" 
                              onClick={() => clearFile('idProofName')} 
                              className="text-rose-500 hover:text-rose-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                )}

                {currentStep === 4 && (
                  /* ================= STEP 4: PROCESSING TRANSACTION FEES ================= */
                  <div className="space-y-6">
                    <div className="border-b border-blue-50 pb-4">
                      <h3 className="font-sans text-lg font-black text-gray-900 tracking-tight">Step 4: Secure Enrollment Assessment Fee ($50.00 USD)</h3>
                      <p className="text-xs text-gray-400 mt-1">Submit assessment fee processing through verified credit / debit card gateways.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                      
                      <div className="sm:col-span-12 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-blue-600 animate-pulse" />
                          <div>
                            <h4 className="text-xs font-bold text-gray-900">Registrar Assessment Charge</h4>
                            <p className="text-[10px] text-gray-400 mt-0.5">Non-refundable administrative transcript reviews</p>
                          </div>
                        </div>
                        <span className="font-mono text-lg font-black text-blue-700">$50.00 USD</span>
                      </div>

                      <div className="sm:col-span-8 space-y-1.5 text-left">
                        <label htmlFor="card-name" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Cardholder Name</label>
                        <input
                          id="card-name"
                          name="cardName"
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={paymentDetails.cardName}
                          onChange={handlePaymentChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div className="sm:col-span-4 space-y-1.5 text-left font-sans">
                        <label htmlFor="card-expiry" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Card Expiry (MM/YY)</label>
                        <input
                          id="card-expiry"
                          name="expiry"
                          type="text"
                          maxLength="5"
                          required
                          placeholder="12/28"
                          value={paymentDetails.expiry}
                          onChange={handlePaymentChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 text-center"
                        />
                      </div>

                      <div className="sm:col-span-8 space-y-1.5 text-left">
                        <label htmlFor="card-number" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Credit Card Number</label>
                        <input
                          id="card-number"
                          name="cardNumber"
                          type="text"
                          maxLength="19"
                          required
                          placeholder="4111 2222 3333 4444"
                          value={paymentDetails.cardNumber}
                          onChange={handlePaymentChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div className="sm:col-span-4 space-y-1.5 text-left">
                        <label htmlFor="card-cvv" className="text-xs font-bold text-gray-600 uppercase tracking-wider">Secure CVV</label>
                        <input
                          id="card-cvv"
                          name="cvv"
                          type="password"
                          maxLength="4"
                          required
                          placeholder="•••"
                          value={paymentDetails.cvv}
                          onChange={handlePaymentChange}
                          className="block w-full bg-gray-50 border border-blue-50 text-gray-800 font-semibold rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 text-center"
                        />
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Form Navigation Controls */}
              <div className="bg-gray-50 px-6 py-6 sm:px-10 border-t border-blue-50 flex items-center justify-between">
                
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-blue-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back Step</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:from-blue-700 hover:to-indigo-700 hover:shadow shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Next Milestone</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold hover:from-emerald-700 hover:to-teal-700 hover:shadow shadow-emerald-500/10 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Clearing details...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4.5 h-4.5" />
                        <span>Submit & Clear Fees</span>
                      </div>
                    )}
                  </button>
                )}

              </div>

            </div>
          )

        )}

      </div>
    </div>
  );
}
