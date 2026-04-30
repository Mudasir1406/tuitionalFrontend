"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog as HouseDialog } from "@/components/ui/dialog";
import DropDown from "../DropDown/DropDown";

interface SimplePackageModalProps {
  open: boolean;
  onClose: () => void;
  baseRate: number;
  currency: string;
  filterOptions: {
    grades: string[];
    subjects: string[];
    curricula: string[];
  };
}

interface PackageConfig {
  grade: string;
  subjects: string[];
  curriculum: string;
  sessionsPerWeek: number;
}

const sessionsOptions = ["2", "3", "4", "5+"];

const SimplePackageModal: React.FC<SimplePackageModalProps> = ({
  open,
  onClose,
  baseRate,
  currency,
  filterOptions,
}) => {
  const [config, setConfig] = useState<PackageConfig>({
    grade: "",
    subjects: [],
    curriculum: "",
    sessionsPerWeek: 2,
  });

  const handleFieldChange = (field: string, value: string | string[]) => {
    if (field === "subjects") {
      setConfig((prev) => ({ ...prev, subjects: Array.isArray(value) ? value : [] }));
    } else if (field === "sessionsPerWeek") {
      const stringValue = Array.isArray(value) ? value[0] : value;
      setConfig((prev) => ({ ...prev, sessionsPerWeek: parseInt(stringValue) || 2 }));
    } else {
      const stringValue = Array.isArray(value) ? value[0] : value;
      setConfig((prev) => ({ ...prev, [field]: stringValue }));
    }
  };

  const calculateMonthlyPrice = () => baseRate * config.sessionsPerWeek * 4;
  const canSubmit = () => config.grade && config.subjects.length > 0 && config.curriculum;

  const handleSubmit = () => {
    if (!canSubmit()) return;
    alert(
      `Custom package configured!\n\nGrade: ${config.grade}\nSubjects: ${config.subjects.join(", ")}\nCurriculum: ${config.curriculum}\nSessions/week: ${config.sessionsPerWeek}\n\nEstimated cost: ${currency} ${calculateMonthlyPrice()}/month\n\nWe'll contact you soon!`,
    );
    handleClose();
  };

  const handleClose = () => {
    setConfig({ grade: "", subjects: [], curriculum: "", sessionsPerWeek: 2 });
    onClose();
  };

  return (
    <HouseDialog open={open} onClose={handleClose} title="Build Your Custom Package" size="md">
      <p className="font-heading text-body text-ink-700">
        Select your preferences to create a personalized tutoring package.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <div>
          <label className="mb-1 block font-heading text-form-label text-ink-700">Grade Level *</label>
          <DropDown
            name="grade"
            placeholder="Select grade"
            data={filterOptions.grades}
            value={config.grade}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label className="mb-1 block font-heading text-form-label text-ink-700">
            Subjects * (Select multiple)
          </label>
          <DropDown
            name="subjects"
            placeholder="Select subjects"
            data={filterOptions.subjects}
            value={config.subjects}
            onChange={handleFieldChange}
            multiple
          />
        </div>
        <div>
          <label className="mb-1 block font-heading text-form-label text-ink-700">Curriculum *</label>
          <DropDown
            name="curriculum"
            placeholder="Select curriculum"
            data={filterOptions.curricula}
            value={config.curriculum}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label className="mb-1 block font-heading text-form-label text-ink-700">
            Sessions per week
          </label>
          <DropDown
            name="sessionsPerWeek"
            placeholder="Select sessions"
            data={sessionsOptions}
            value={config.sessionsPerWeek.toString()}
            onChange={handleFieldChange}
          />
        </div>
      </div>

      <div className="mt-6 rounded-md bg-brand-50 p-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-small text-ink-700">Base rate:</span>
          <span className="font-heading text-small font-semibold text-ink-900">
            {currency} {baseRate}/hour
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-heading text-small text-ink-700">Sessions/month:</span>
          <span className="font-heading text-small font-semibold text-ink-900">
            {config.sessionsPerWeek * 4} sessions
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-ink-200 pt-3">
          <span className="font-heading text-h6 text-ink-900">Estimated Monthly:</span>
          <span className="font-heading text-h5 font-bold text-brand-500">
            {currency} {calculateMonthlyPrice()}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={handleClose} variant="ghost">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit()} variant="primary">
          Get Quote
        </Button>
      </div>
    </HouseDialog>
  );
};

export default SimplePackageModal;
