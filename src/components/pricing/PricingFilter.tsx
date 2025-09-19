"use client";
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { TutoringPackage } from '@/types/pricing';
import { leagueSpartan } from '@/app/fonts';
import DropDown from '../DropDown/DropDown';
import styles from './PricingFilter.module.css';

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
  locale = 'en',
  onFilterChange 
}) => {
  const [filteredPackages, setFilteredPackages] = useState(initialPackages);
  const [filters, setFilters] = useState({
    grade: '',
    subject: '',
    curriculum: ''
  });

  useEffect(() => {
    const filtered = initialPackages.filter(pkg => {
      if (filters.grade && !pkg.grades.includes(filters.grade)) return false;
      if (filters.subject && !pkg.subjects.includes(filters.subject)) return false;
      if (filters.curriculum && !pkg.curriculum.includes(filters.curriculum)) return false;
      return true;
    });
    
    setFilteredPackages(filtered);
    onFilterChange?.(filtered);
  }, [filters, initialPackages, onFilterChange]);

  const handleFilterChange = (key: string, value: string | string[]) => {
    try {
      setFilters(prev => ({
        ...prev,
        [key]: typeof value === 'string' ? value : value[0] || ''
      }));
    } catch (error) {
      console.error('Error updating filters:', error);
    }
  };

  const clearFilters = () => {
    setFilters({ grade: '', subject: '', curriculum: '' });
  };

  const hasActiveFilters = filters.grade || filters.subject || filters.curriculum;

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <div className={styles.filterGrid}>
          <div className={`${styles.filterItem} ${leagueSpartan.className}`}>
            <DropDown
              name="grade"
              placeholder="All Grades"
              data={filterOptions.grades}
              value={filters.grade}
              onChange={handleFilterChange}
              className={leagueSpartan.className}
            />
          </div>
          
          <div className={`${styles.filterItem} ${leagueSpartan.className}`}>
            <DropDown
              name="subject"
              placeholder="All Subjects"
              data={filterOptions.subjects}
              value={filters.subject}
              onChange={handleFilterChange}
              className={leagueSpartan.className}
            />
          </div>
          
          <div className={`${styles.filterItem} ${leagueSpartan.className}`}>
            <DropDown
              name="curriculum"
              placeholder="All Curricula"
              data={filterOptions.curricula}
              value={filters.curriculum}
              onChange={handleFilterChange}
              className={leagueSpartan.className}
            />
          </div>
          
          <div className={styles.filterActions}>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className={styles.clearButton}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.resultsInfo}>
        <Typography className={`${styles.resultsText} ${leagueSpartan.className}`}>
          Showing <span className={styles.resultsCount}>{filteredPackages.length}</span> package{filteredPackages.length !== 1 ? 's' : ''} 
          {userCountry && (
            <span> available in <span className={styles.userCountry}>{userCountry}</span></span>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default PricingFilter;