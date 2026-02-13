import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bgImage = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920';

// ─── UPDATE THESE WHEN READY ───────────────────────────────────────
const REGISTRATION_FEE = 500; // in ₹
const UPI_ID = 'prakalpa26@upi';
// ───────────────────────────────────────────────────────────────────

interface InputProps {
  label: string;
  required?: boolean;
  error?: string;
  [key: string]: any;
}

interface SelectProps {
  label: string;
  required?: boolean;
  error?: string;
  options: Array<{ value: string; label: string }>;
  [key: string]: any;
}

const Input = ({ label, required, error, ...props }: InputProps) => (
  <div className="space-y-2" data-error={error ? props.name : undefined}>
    <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
      {label} {required && <span className="text-pink-500">*</span>}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none transition-all"
    />
    {error && <span className="text-red-400 text-sm">{error}</span>}
  </div>
);

const Select = ({ label, required, error, options, ...props }: SelectProps) => (
  <div className="space-y-2" data-error={error ? props.name : undefined}>
    <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
      {label} {required && <span className="text-pink-500">*</span>}
    </label>
    <select
      {...props}
      className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white focus:border-pink-500 focus:outline-none transition-all"
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-black">
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-red-400 text-sm">{error}</span>}
  </div>
);

interface Participant {
  name?: string;
  email?: string;
  contact?: string;
  institute?: string;
  degree?: string;
  branch?: string;
  branchOther?: string;
  year?: string;
}

export default function RegistrationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [currentTab, setCurrentTab] = useState(1);
  const [formData, setFormData] = useState({
    numberOfParticipants: '',
    projectCategory: '',
    domain: '',
    domainOther: '',
    title: '',
    participants: [{}, {}, {}, {}] as Participant[]
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY < 25);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const domains = [
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'agrotech', label: 'Agrotech' },
    { value: 'game-dev', label: 'Game Development' },
    { value: 'cybersecurity', label: 'Cyber-Security' },
    { value: 'autonomous-vehicles', label: 'Autonomous Vehicles' },
    { value: 'robotics', label: 'Robotics' },
    { value: 'iot', label: 'IoT' },
    { value: 'cloud-computing', label: 'Cloud Computing' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'other', label: 'Others' }
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleParticipantChange = (index: number, field: string, value: string) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setFormData(prev => ({ ...prev, participants: newParticipants }));
  };

  const validateAllTabs = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.numberOfParticipants) {
      newErrors.numberOfParticipants = 'This is a required question';
    }

    const p1 = formData.participants[0];
    if (!p1.name) newErrors.name1 = 'This is a required question';
    if (!p1.email) newErrors.email1 = 'This is a required question';
    else if (!emailRegex.test(p1.email)) {
      newErrors.email1 = 'Enter a valid email address';
    }
    if (!p1.contact) {
      newErrors.contact1 = 'This is a required question';
    } else if (!phoneRegex.test(p1.contact)) {
      newErrors.contact1 = 'Enter a valid 10-digit number';
    }
    if (!p1.institute) newErrors.institute1 = 'This is a required question';
    if (!p1.degree) newErrors.degree1 = 'This is a required question';
    if (!p1.branch) newErrors.branch1 = 'This is a required question';
    if (p1.branch === 'Other' && !p1.branchOther) {
      newErrors.branchOther1 = 'This is a required question';
    }
    if (!p1.year) newErrors.year1 = 'This is a required question';

    if (!formData.projectCategory) newErrors.projectCategory = 'This is a required question';
    if (!formData.domain) newErrors.domain = 'This is a required question';
    if (formData.domain === 'other' && !formData.domainOther) {
      newErrors.domainOther = 'This is a required question';
    }
    if (!formData.title) newErrors.title = 'This is a required question';
    if (!projectFile) newErrors.projectFile = 'This is a required question';

    // Tab 3 validation
    if (!utrNumber.trim()) newErrors.utrNumber = 'This is a required question';
    else if (utrNumber.trim().length < 12) newErrors.utrNumber = 'Enter a valid UTR/Transaction ID';
    if (!paymentScreenshot) newErrors.paymentScreenshot = 'This is a required question';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      
      let errorTab = 1;
      if (['projectCategory', 'domain', 'domainOther', 'title', 'projectFile'].includes(firstErrorKey)) {
        errorTab = 2;
      }
      if (['utrNumber', 'paymentScreenshot'].includes(firstErrorKey)) {
        errorTab = 3;
      }
      
      setCurrentTab(errorTab);
      
      setTimeout(() => {
        const errorElement = document.querySelector(`[data-error="${firstErrorKey}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setCurrentTab(currentTab + 1);
    const container = document.getElementById('registration-scroll-container');
    if (container) container.scrollTop = 0;
  };

  const handlePrevious = () => {
    setCurrentTab(currentTab - 1);
    const container = document.getElementById('registration-scroll-container');
    if (container) container.scrollTop = 0;
  };

  const handleSubmit = () => {
    if (validateAllTabs()) {
      console.log('Form Data:', formData);
      console.log('Project File:', projectFile);
      console.log('UTR:', utrNumber);
      console.log('Payment Screenshot:', paymentScreenshot);
      setMessage({ type: 'success', text: '🎉 Registration Confirmed! See you at PRAKALPA\'26!' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setIsOpen(false);
        setFormData({
          numberOfParticipants: '',
          projectCategory: '',
          domain: '',
          domainOther: '',
          title: '',
          participants: [{}, {}, {}, {}]
        });
        setProjectFile(null);
        setPaymentScreenshot(null);
        setUtrNumber('');
        setErrors({});
        setCurrentTab(1);
      }, 2000);
    }
  };

  const renderParticipant = (index: number) => {
    const labels = ['Participant 1', 'Participant 2', 'Participant 3', 'Participant 4'];
    const isRequired = index === 0;
    const participant = formData.participants[index];

    const getYearOptions = () => {
      if (!participant.degree) return [];
      switch (participant.degree) {
        case 'B.Tech':
          return [
            { value: '1st Year', label: '1st Year' },
            { value: '2nd Year', label: '2nd Year' },
            { value: '3rd Year', label: '3rd Year' },
            { value: '4th Year', label: '4th Year' }
          ];
        case 'Postgraduate':
          return [
            { value: '1st Year', label: '1st Year' },
            { value: '2nd Year', label: '2nd Year' }
          ];
        case 'Diploma':
          return [
            { value: '1st Year', label: '1st Year' },
            { value: '2nd Year', label: '2nd Year' },
            { value: '3rd Year', label: '3rd Year' }
          ];
        default:
          return [];
      }
    };

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6 hover:border-pink-500/50 transition-all"
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {labels[index]}
          </h3>
          {index === 0 && (
            <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              Primary Contact
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required={isRequired}
            name={`name${index + 1}`}
            value={participant.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'name', e.target.value)}
            placeholder="Enter full name"
            error={errors[`name${index + 1}`]}
          />
          <Input
            label="Email Address"
            required={isRequired}
            type="email"
            name={`email${index + 1}`}
            value={participant.email || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'email', e.target.value)}
            placeholder="participant@email.com"
            error={errors[`email${index + 1}`]}
          />
          <Input
            label="Contact Number"
            required={isRequired}
            name={`contact${index + 1}`}
            value={participant.contact || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'contact', e.target.value)}
            placeholder="1234567890"
            error={errors[`contact${index + 1}`]}
          />
          <Input
            label="Institute/Organization"
            required={isRequired}
            name={`institute${index + 1}`}
            value={participant.institute || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'institute', e.target.value)}
            placeholder="Enter institute name"
            error={errors[`institute${index + 1}`]}
          />
          <Select
            label="Degree"
            required={isRequired}
            name={`degree${index + 1}`}
            value={participant.degree || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const newParticipants = [...formData.participants];
              newParticipants[index] = { 
                ...newParticipants[index], 
                degree: e.target.value,
                year: ''
              };
              setFormData(prev => ({ ...prev, participants: newParticipants }));
            }}
            options={[
              { value: 'B.Tech', label: 'B.Tech' },
              { value: 'Postgraduate', label: 'Postgraduate' },
              { value: 'Diploma', label: 'Diploma' }
            ]}
            error={errors[`degree${index + 1}`]}
          />
          <Select
            label="Branch/Specialization"
            required={isRequired}
            name={`branch${index + 1}`}
            value={participant.branch || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleParticipantChange(index, 'branch', e.target.value)}
            options={[
              { value: 'Computer Science Engineering', label: 'Computer Science Engineering' },
              { value: 'Information Technology', label: 'Information Technology' },
              { value: 'Electronics and Communication Engineering', label: 'Electronics and Communication Engineering' },
              { value: 'Electrical Engineering', label: 'Electrical Engineering' },
              { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
              { value: 'Civil Engineering', label: 'Civil Engineering' },
              { value: 'Chemical Engineering', label: 'Chemical Engineering' },
              { value: 'Aerospace Engineering', label: 'Aerospace Engineering' },
              { value: 'Biotechnology', label: 'Biotechnology' },
              { value: 'Artificial Intelligence and Machine Learning', label: 'Artificial Intelligence and Machine Learning' },
              { value: 'Data Science', label: 'Data Science' },
              { value: 'Cyber Security', label: 'Cyber Security' },
              { value: 'Robotics and Automation', label: 'Robotics and Automation' },
              { value: 'Other', label: 'Other' }
            ]}
            error={errors[`branch${index + 1}`]}
          />
          {participant.branch === 'Other' && (
            <Input
              label="Specify Branch/Specialization"
              required={isRequired}
              name={`branchOther${index + 1}`}
              value={participant.branchOther || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParticipantChange(index, 'branchOther', e.target.value)}
              placeholder="Enter your branch"
              error={errors[`branchOther${index + 1}`]}
            />
          )}
          <div className="space-y-2" data-error={errors[`year${index + 1}`] ? `year${index + 1}` : undefined}>
            <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Year of Study {isRequired && <span className="text-pink-500">*</span>}
            </label>
            <select
              name={`year${index + 1}`}
              value={participant.year || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleParticipantChange(index, 'year', e.target.value)}
              className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white focus:border-pink-500 focus:outline-none transition-all"
              disabled={!participant.degree}
            >
              <option value="">
                {participant.degree ? 'Select...' : 'Select degree first'}
              </option>
              {getYearOptions().map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-black">
                  {opt.label}
                </option>
              ))}
            </select>
            {!participant.degree && (
              <p className="text-sm text-gray-400">Please select a degree first</p>
            )}
            {errors[`year${index + 1}`] && (
              <span className="text-red-400 text-sm">{errors[`year${index + 1}`]}</span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* REGISTER BUTTON — centered, home page only */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed top-[80vh] left-0 right-0 flex justify-center z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(236, 72, 153, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 0 20px rgba(168, 85, 247, 0.5)", "0 0 40px rgba(236, 72, 153, 0.7)", "0 0 20px rgba(168, 85, 247, 0.5)"] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-2xl font-black rounded-xl shadow-2xl backdrop-blur-sm"
              style={{ fontFamily: 'Pricedown, sans-serif', textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                REGISTER NOW
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN SLIDING PAGE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="registration-scroll-container"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[9999] overflow-y-auto"
            style={{ 
              fontFamily: 'Rajdhani, sans-serif',
              background: `linear-gradient(rgba(0,0,0,0.92), rgba(0,0,0,0.92)), url('${bgImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            {/* Scanlines */}
            <div className="fixed inset-0 pointer-events-none opacity-5"
                 style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, purple 2px, purple 4px)' }} />

            {/* Close Button */}
            <div className="fixed top-8 right-8 z-[10000]">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setIsOpen(false); setCurrentTab(1); }}
                className="bg-pink-500 hover:bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all duration-300 border-2 border-purple-400 shadow-lg"
              >
                <span className="text-3xl leading-none">×</span>
              </motion.button>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-20">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-center mb-8"
              >
                <motion.h1 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-5xl md:text-7xl font-black mb-4 text-pink-500 transform -skew-x-6" 
                  style={{ 
                    fontFamily: 'Pricedown, sans-serif',
                    textShadow: '4px 4px 0px rgba(168,85,247,0.7), -2px -2px 0px rgba(236,72,153,0.4), 5px 5px 15px rgba(0,0,0,0.9)'
                  }}
                >
                  PRAKALPA'26 REGISTRATION
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-purple-300 text-lg"
                >
                  Complete all fields to register for the event
                </motion.p>
              </motion.div>

              {/* Tab Navigation */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mb-8"
              >
                <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-2 inline-flex gap-2">
                  <button
                    onClick={() => setCurrentTab(1)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${
                      currentTab === 1 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                        : 'text-purple-300 hover:text-white hover:bg-purple-500/20'
                    }`}
                  >
                    1. Participants
                  </button>
                  <button
                    onClick={() => setCurrentTab(2)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${
                      currentTab === 2 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                        : 'text-purple-300 hover:text-white hover:bg-purple-500/20'
                    }`}
                  >
                    2. Project
                  </button>
                  <button
                    onClick={() => setCurrentTab(3)}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${
                      currentTab === 3 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                        : 'text-purple-300 hover:text-white hover:bg-purple-500/20'
                    }`}
                  >
                    3. Payment
                  </button>
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="bg-black/40 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentTab / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* TAB 1: Participants */}
                  {currentTab === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-4xl font-black text-pink-500 text-center mb-6" style={{ fontFamily: 'Pricedown, sans-serif' }}>
                        PARTICIPANT INFORMATION
                      </h2>
                      <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6">
                        <Select
                          label="Number of Participants"
                          required
                          name="numberOfParticipants"
                          value={formData.numberOfParticipants}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('numberOfParticipants', e.target.value)}
                          options={[
                            { value: '1', label: '1 Participant' },
                            { value: '2', label: '2 Participants' },
                            { value: '3', label: '3 Participants' },
                            { value: '4', label: '4 Participants' }
                          ]}
                          error={errors.numberOfParticipants}
                        />
                      </div>
                      {formData.numberOfParticipants && (
                        <div className="space-y-6">
                          {Array.from({ length: parseInt(formData.numberOfParticipants) }, (_, i) => i).map(renderParticipant)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: Project Details */}
                  {currentTab === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-4xl font-black text-pink-500 text-center mb-6" style={{ fontFamily: 'Pricedown, sans-serif' }}>
                        PROJECT DETAILS
                      </h2>
                      <div className="bg-black/40 backdrop-blur-sm border-2 border-pink-500/30 rounded-lg p-6 space-y-6">
                        <Select
                          label="Project Category"
                          required
                          name="projectCategory"
                          value={formData.projectCategory}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('projectCategory', e.target.value)}
                          options={[
                            { value: 'working-model', label: 'Working Model' },
                            { value: 'software-competition', label: 'Software Competition' },
                            { value: 'paper-presentation', label: 'Paper Presentation' }
                          ]}
                          error={errors.projectCategory}
                        />
                        <Select
                          label="Domain"
                          required
                          name="domain"
                          value={formData.domain}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('domain', e.target.value)}
                          options={domains}
                          error={errors.domain}
                        />
                        {formData.domain === 'other' && (
                          <Input
                            label="Specify Domain"
                            required
                            name="domainOther"
                            value={formData.domainOther}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('domainOther', e.target.value)}
                            placeholder="Enter your domain"
                            error={errors.domainOther}
                          />
                        )}
                        <Input
                          label="Project Title"
                          required
                          name="title"
                          value={formData.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('title', e.target.value)}
                          placeholder="Enter project title"
                          error={errors.title}
                        />
                      </div>

                      <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6">
                        <h3 className="text-2xl font-black text-purple-400 mb-4" style={{ fontFamily: 'Pricedown, sans-serif' }}>
                          DOCUMENT UPLOAD
                        </h3>
                        <div className="space-y-2" data-error={errors.projectFile ? 'projectFile' : undefined}>
                          <label className="text-purple-300 font-semibold block">
                            Project Presentation/Paper <span className="text-pink-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setProjectFile(e.target.files?.[0] || null)}
                            className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white file:bg-gradient-to-r file:from-pink-500 file:to-purple-500 file:text-white file:border-0 file:px-4 file:py-2 file:mr-4 file:rounded cursor-pointer"
                          />
                          <p className="text-sm text-gray-400">PDF format only</p>
                          {projectFile && (
                            <p className="text-sm text-purple-300">✓ Selected: {projectFile.name}</p>
                          )}
                          {errors.projectFile && (
                            <span className="text-red-400 text-sm">{errors.projectFile}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Payment */}
                  {currentTab === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-4xl font-black text-pink-500 text-center mb-6" style={{ fontFamily: 'Pricedown, sans-serif' }}>
                        PAYMENT
                      </h2>

                      {/* Fee Summary */}
                      <div className="bg-black/40 backdrop-blur-sm border-2 border-pink-500/40 rounded-lg p-6">
                        <h3 className="text-xl font-black text-purple-300 mb-4 tracking-widest" style={{ fontFamily: 'Rajdhani, sans-serif' }}>REGISTRATION FEE</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">
                              {formData.numberOfParticipants
                                ? `${formData.numberOfParticipants} Participant${parseInt(formData.numberOfParticipants) > 1 ? 's' : ''} × ₹${REGISTRATION_FEE}`
                                : 'Per team'}
                            </p>
                            <p className="text-white text-sm mt-1">PRAKALPA'26 — {formData.projectCategory || 'Registration'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-5xl font-black text-pink-500" style={{ fontFamily: 'Pricedown, sans-serif' }}>₹{REGISTRATION_FEE}</p>
                            <p className="text-gray-400 text-xs tracking-widest">TOTAL AMOUNT</p>
                          </div>
                        </div>
                      </div>

                      {/* QR + Instructions */}
                      <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6">
                        <h3 className="text-xl font-black text-purple-300 mb-6 tracking-widest" style={{ fontFamily: 'Rajdhani, sans-serif' }}>SCAN & PAY</h3>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          {/* QR Placeholder */}
                          <div className="flex-shrink-0 w-48 h-48 bg-white rounded-lg flex items-center justify-center relative p-3">
                            <div className="w-full h-full border-4 border-black rounded flex items-center justify-center">
                              <p className="text-black font-black text-xs text-center leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                                REPLACE<br/>WITH YOUR<br/>QR CODE
                              </p>
                            </div>
                          </div>

                          {/* Steps */}
                          <div className="flex-1 space-y-4">
                            {[
                              'Open any UPI app (GPay, PhonePe, Paytm, BHIM)',
                              `Scan the QR or pay to UPI ID: ${UPI_ID}`,
                              `Pay ₹${REGISTRATION_FEE} and note your UTR/Transaction ID`,
                              'Enter the UTR ID and upload your payment screenshot below'
                            ].map((step, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0">{i + 1}</span>
                                <p className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* UTR + Screenshot */}
                      <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6 space-y-6">
                        <h3 className="text-2xl font-black text-purple-400 mb-2" style={{ fontFamily: 'Pricedown, sans-serif' }}>PAYMENT CONFIRMATION</h3>

                        <div className="space-y-2" data-error={errors.utrNumber ? 'utrNumber' : undefined}>
                          <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            UTR / Transaction ID <span className="text-pink-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="utrNumber"
                            value={utrNumber}
                            onChange={(e) => {
                              setUtrNumber(e.target.value);
                              if (errors.utrNumber) setErrors(prev => { const n = { ...prev }; delete n.utrNumber; return n; });
                            }}
                            placeholder="e.g. 123456789012"
                            className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none transition-all font-mono tracking-widest"
                          />
                          <p className="text-xs text-gray-400">12-digit UTR number from your UPI app payment receipt</p>
                          {errors.utrNumber && <span className="text-red-400 text-sm">{errors.utrNumber}</span>}
                        </div>

                        <div className="space-y-2" data-error={errors.paymentScreenshot ? 'paymentScreenshot' : undefined}>
                          <label className="text-purple-300 font-semibold block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            Payment Screenshot <span className="text-pink-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              setPaymentScreenshot(e.target.files?.[0] || null);
                              if (errors.paymentScreenshot) setErrors(prev => { const n = { ...prev }; delete n.paymentScreenshot; return n; });
                            }}
                            className="w-full px-4 py-3 bg-black/60 border-2 border-purple-500/40 rounded text-white file:bg-gradient-to-r file:from-pink-500 file:to-purple-500 file:text-white file:border-0 file:px-4 file:py-2 file:mr-4 file:rounded cursor-pointer"
                          />
                          <p className="text-xs text-gray-400">Upload screenshot from your UPI app (JPG, PNG)</p>
                          {paymentScreenshot && (
                            <p className="text-sm text-purple-300">✓ Selected: {paymentScreenshot.name}</p>
                          )}
                          {errors.paymentScreenshot && <span className="text-red-400 text-sm">{errors.paymentScreenshot}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-between items-center mt-8 gap-4"
              >
                <button
                  onClick={handlePrevious}
                  disabled={currentTab === 1}
                  className={`px-8 py-3 rounded-lg font-bold transition-all ${
                    currentTab === 1 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  ← Previous
                </button>
                {currentTab < 3 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-bold transition-all"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-12 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-black text-lg transition-all shadow-xl"
                    style={{ fontFamily: 'Pricedown, sans-serif' }}
                  >
                    SUBMIT REGISTRATION
                  </button>
                )}
              </motion.div>
            </div>

            {/* Success Screen */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-12 max-w-2xl text-center shadow-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="mb-6 flex justify-center"
                    >
                      <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                          />
                        </svg>
                      </div>
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-5xl font-black text-white mb-4"
                      style={{ fontFamily: 'Pricedown, sans-serif' }}
                    >
                      ALL SET!
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-2xl text-white font-semibold"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      Your registration for PRAKALPA'26 is confirmed
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Font Import */}
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
              @font-face {
                font-family: 'Pricedown';
                src: url('https://cdn.jsdelivr.net/gh/LuisFerOD/Fonts/fonts/pricedown.ttf') format('truetype');
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}