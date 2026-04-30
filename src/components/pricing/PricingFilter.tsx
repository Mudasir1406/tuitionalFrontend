"use client";

import React, { useState, useEffect } from "react";
import DropDown from "../DropDown/DropDown";
import { TutoringPackage } from "@/types/pricing";

interface PricingFilterProps {
  initialPackages: TutoringPackage[];
  filterOptions: {
    grades: string[];
    subjects: string[];
    curricula: string[];
    countries: string[];
  };
  userCountry: string;
  locale?: string;
  onFilterChange?: (packages: TutoringPackage[]) => void;
}

const PricingFilter: React.FC<PricingFilterProps> = ({
  initialPackages,
  filterOptions,
  userCountry,
  locale = "en",
  onFilterChange,
}) => {
  const [filteredPackages, setFilteredPackages] = useState(initialPackages);
  const [filters, setFilters] = useState({ grade: "", subject: "", curriculum: "" });

  useEffect(() => {
    const filtered = initialPackages.filter((pkg) => {
      if (filters.grade && !pkg.grades.includes(filters.grade)) return false;
      if (filters.subject && !pkg.subjects.includes(filters.subject)) return false;
      if (filters.curriculum && !pkg.curriculum.includes(filters.curriculum)) return false;
      return true;
    });
    setFilteredPackages(filtered);
    onFilterChange?.(filtered);
  }, [filters, initialPackages, onFilterChange]);

  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? value : value[0] || "",
    }));
  };

  const clearFilters = () => setFilters({ grade: "", subject: "", curriculum: "" });
  const hasActiveFilters = filters.grade || filters.subject || filters.curriculum;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DropDown
          name="grade"
          placeholder="All Grades"
          data={filterOptions.grades}
          value={filters.grade}
          onChange={handleFilterChange}
        />
        <DropDown
          name="subject"
          placeholder="All Subjects"
          data={filterOptions.subjects}
          value={filters.subject}
          onChange={handleFilterChange}
        />
        <DropDown
          name="curriculum"
          placeholder="All Curricula"
          data={filterOptions.curricula}
          value={filters.curriculum}
          onChange={handleFilterChange}
        />
        <div className="flex items-center">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md border border-ink-200 bg-white px-4 py-2 font-body text-form-input text-ink-700 hover:bg-ink-50"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <p className="font-heading text-small text-ink-700">
        Showing <span className="font-semibold text-ink-900">{filteredPackages.length}</span>{" "}
        package{filteredPackages.length !== 1 ? "s" : ""}
        {userCountry && (
          <>
            {" "}available in <span className="font-semibold text-brand-500">{userCountry}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default PricingFilter;
