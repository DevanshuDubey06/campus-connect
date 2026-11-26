'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessMessage from './SuccessMessage';

interface FormData {
  fullName: string;
  enrollmentNumber: string;
  collegeName: string;
  branch: string;
  semester: string;
  department: string;
  contributionDate: string;
  workTitle: string;
  workDescription: string;
  hoursInvested: string;
  workStatus: 'Completed' | 'In Progress' | '';
  remarks: string;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL_FORM: FormData = {
  fullName: '',
  enrollmentNumber: '',
  collegeName: '',
  branch: '',
  semester: '',
  department: '',
  contributionDate: '',
  workTitle: '',
  workDescription: '',
  hoursInvested: '',
  workStatus: '',
  remarks: '',
};

const DEPARTMENTS = [
  'Technical Team',
  'Design Team',
  'Content & Media',
  'Outreach & Marketing',
  'Event Coordination',
  'Research & Development',
  'Social Media',
  'Volunteer Management',
  'Others',
];

const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

export default function WorkUpdateForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [lastSubmitHash, setLastSubmitHash] = useState('');

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (form.fullName.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters';

    if (!form.enrollmentNumber.trim()) newErrors.enrollmentNumber = 'Enrollment number is required';
    else if (!/^[A-Za-z0-9/\-]{4,20}$/.test(form.enrollmentNumber.trim()))
      newErrors.enrollmentNumber = 'Enter a valid enrollment number';

    if (!form.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!form.branch.trim()) newErrors.branch = 'Branch is required';
    if (!form.semester) newErrors.semester = 'Semester is required';
    if (!form.department) newErrors.department = 'Department / Team is required';

    if (!form.contributionDate) newErrors.contributionDate = 'Contribution date is required';
    else {
      const selected = new Date(form.contributionDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selected > today) newErrors.contributionDate = 'Date cannot be in the future';
    }

    if (!form.workTitle.trim()) newErrors.workTitle = 'Work title is required';
    else if (form.workTitle.trim().length < 5) newErrors.workTitle = 'Title must be at least 5 characters';

    if (!form.workDescription.trim()) newErrors.workDescription = 'Work description is required';
    else if (form.workDescription.trim().length < 20)
      newErrors.workDescription = 'Please provide at least 20 characters of description';

    if (!form.hoursInvested) newErrors.hoursInvested = 'Hours invested is required';
    else {
      const h = parseFloat(form.hoursInvested);
      if (isNaN(h) || h <= 0 || h > 24) newErrors.hoursInvested = 'Enter valid hours (0.5 – 24)';
    }

    if (!form.workStatus) newErrors.workStatus = 'Please select work status';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const getSubmitHash = useCallback(() => {
    return `${form.enrollmentNumber}-${form.contributionDate}-${form.workTitle}`
      .toLowerCase()
      .replace(/\s/g, '');
  }, [form]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
      setSubmitError('');
    },
    [errors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const hash = getSubmitHash();
    if (hash === lastSubmitHash) {
      setSubmitError(
        'This record appears to be a duplicate of your last submission. Please change the work title or date.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      fullName: form.fullName.trim(),
      enrollmentNumber: form.enrollmentNumber.trim(),
      collegeName: form.collegeName.trim(),
      branch: form.branch.trim(),
      semester: form.semester,
      department: form.department,
      contributionDate: form.contributionDate,
      workTitle: form.workTitle.trim(),
      workDescription: form.workDescription.trim(),
      hoursInvested: form.hoursInvested,
      workStatus: form.workStatus,
      remarks: form.remarks.trim(),
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      setLastSubmitHash(hash);
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error. Please check your connection.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessMessage onReset={() => setSubmitted(false)} />;
  }

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Daily Work Update
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Log your daily contribution for the Campus Connect team record.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden shadow-xl"
        >
          <div
            className="h-1 w-full"
            style={{
              background: 'linear-gradient(90deg, #E11D48, #F97316, #7C3AED)',
            }}
          />

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 md:p-10 space-y-8">
            <FieldGroup title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Full Name" required error={errors.fullName}>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className={inputClass(errors.fullName)}
                    data-error={!!errors.fullName}
                  />
                </FormField>

                <FormField label="Enrollment Number" required error={errors.enrollmentNumber}>
                  <input
                    type="text"
                    name="enrollmentNumber"
                    value={form.enrollmentNumber}
                    onChange={handleChange}
                    placeholder="e.g. 0171CS221001"
                    className={inputClass(errors.enrollmentNumber)}
                    data-error={!!errors.enrollmentNumber}
                  />
                </FormField>
              </div>

              <FormField label="College Name" required error={errors.collegeName}>
                <input
                  type="text"
                  name="collegeName"
                  value={form.collegeName}
                  onChange={handleChange}
                  placeholder="e.g. LNCT Group of Colleges, Bhopal"
                  className={inputClass(errors.collegeName)}
                  data-error={!!errors.collegeName}
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormField label="Branch" required error={errors.branch}>
                  <input
                    type="text"
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    placeholder="e.g. CSE, ECE"
                    className={inputClass(errors.branch)}
                    data-error={!!errors.branch}
                  />
                </FormField>

                <FormField label="Current Semester" required error={errors.semester}>
                  <select
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    className={selectClass(errors.semester)}
                    data-error={!!errors.semester}
                  >
                    <option value="">Select Semester</option>
                    {SEMESTERS.map((s) => (
                      <option key={s} value={s}>
                        {s} Semester
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Department / Team" required error={errors.department}>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className={selectClass(errors.department)}
                    data-error={!!errors.department}
                  >
                    <option value="">Select Team</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </FieldGroup>

            <FieldGroup title="Work Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Contribution Date" required error={errors.contributionDate}>
                  <input
                    type="date"
                    name="contributionDate"
                    value={form.contributionDate}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    className={inputClass(errors.contributionDate)}
                    data-error={!!errors.contributionDate}
                  />
                </FormField>

                <FormField label="Work Status" required error={errors.workStatus}>
                  <div className="flex gap-3">
                    {(['Completed', 'In Progress'] as const).map((status) => (
                      <label
                        key={status}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${
                          form.workStatus === status
                            ? status === 'Completed'
                              ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300'
                              : 'border-amber-500/60 bg-amber-500/15 text-amber-300'
                            : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25'
                        }`}
                      >
                        <input
                          type="radio"
                          name="workStatus"
                          value={status}
                          checked={form.workStatus === status}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </FormField>
              </div>

              <FormField label="Work Title" required error={errors.workTitle}>
                <input
                  type="text"
                  name="workTitle"
                  value={form.workTitle}
                  onChange={handleChange}
                  placeholder="e.g. Designed event promotional banner"
                  className={inputClass(errors.workTitle)}
                  data-error={!!errors.workTitle}
                />
              </FormField>

              <FormField
                label="Detailed Description of Work Done"
                required
                error={errors.workDescription}
              >
                <textarea
                  name="workDescription"
                  value={form.workDescription}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe tasks completed, tools used, and outcomes..."
                  className={`${inputClass(errors.workDescription)} resize-y`}
                  data-error={!!errors.workDescription}
                />
                <p className="text-slate-500 text-xs mt-1 text-right">
                  {form.workDescription.length} characters
                </p>
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  label="Hours Invested"
                  required
                  error={errors.hoursInvested}
                  hint="Enter hours spent (0.5 – 24)"
                >
                  <div className="relative">
                    <input
                      type="number"
                      name="hoursInvested"
                      value={form.hoursInvested}
                      onChange={handleChange}
                      placeholder="e.g. 2.5"
                      min="0.5"
                      max="24"
                      step="0.5"
                      className={`${inputClass(errors.hoursInvested)} pr-12`}
                      data-error={!!errors.hoursInvested}
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                      hrs
                    </span>
                  </div>
                </FormField>

                <FormField
                  label="Additional Remarks"
                  error={errors.remarks}
                  hint="Optional"
                >
                  <input
                    type="text"
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    placeholder="Any notes or blockers..."
                    className={inputClass(errors.remarks)}
                  />
                </FormField>
              </div>
            </FieldGroup>

            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-sm"
                >
                  <p className="text-red-300 font-semibold">Submission Failed</p>
                  <p className="text-red-300/80 text-xs mt-1">{submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:opacity-95"
              style={{
                background: 'linear-gradient(135deg, #E11D48 0%, #F97316 100%)',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Work Update'}
            </button>

            <p className="text-center text-slate-500 text-xs">
              All submissions are recorded directly in the Campus Connect Google Spreadsheet.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <h3 className="text-slate-300 font-semibold text-xs uppercase tracking-wider">{title}</h3>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      {children}
    </div>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ label, required, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5" data-error={!!error}>
      <label className="flex items-center gap-1 text-sm font-medium text-slate-200">
        {label}
        {required && <span className="text-rose-400">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-slate-500 text-xs">{hint}</p>}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full px-3.5 py-2.5 rounded-lg text-white placeholder-slate-500 text-sm transition-colors border outline-none ${
    error
      ? 'border-red-500/60 bg-red-500/5 focus:border-red-400'
      : 'border-white/10 bg-white/[0.03] focus:border-rose-500/60 focus:bg-white/[0.05]'
  }`;
}

function selectClass(error?: string) {
  return `w-full px-3.5 py-2.5 rounded-lg text-white text-sm transition-colors border outline-none cursor-pointer ${
    error
      ? 'border-red-500/60 bg-red-950/30 focus:border-red-400'
      : 'border-white/10 bg-white/[0.03] focus:border-rose-500/60'
  } [&>option]:bg-slate-900 [&>option]:text-white`;
}
