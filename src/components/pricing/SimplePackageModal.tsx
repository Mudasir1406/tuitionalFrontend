"use client";
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { leagueSpartan } from '@/app/fonts';
import DropDown from '../DropDown/DropDown';
import styles from './SimplePackageModal.module.css';

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

const SimplePackageModal: React.FC<SimplePackageModalProps> = ({
  open,
  onClose,
  baseRate,
  currency,
  filterOptions
}) => {
  const [config, setConfig] = useState<PackageConfig>({
    grade: '',
    subjects: [],
    curriculum: '',
    sessionsPerWeek: 2
  });

  const sessionsOptions = ['2', '3', '4', '5+'];

  const handleFieldChange = (field: string, value: string | string[]) => {
    if (field === 'subjects') {
      // Handle multi-select subjects
      setConfig(prev => ({
        ...prev,
        subjects: Array.isArray(value) ? value : []
      }));
    } else if (field === 'sessionsPerWeek') {
      const stringValue = Array.isArray(value) ? value[0] : value;
      setConfig(prev => ({
        ...prev,
        sessionsPerWeek: parseInt(stringValue) || 2
      }));
    } else {
      // Handle single-select fields
      const stringValue = Array.isArray(value) ? value[0] : value;
      setConfig(prev => ({
        ...prev,
        [field]: stringValue
      }));
    }
  };

  const calculateMonthlyPrice = () => {
    return baseRate * config.sessionsPerWeek * 4;
  };

  const canSubmit = () => {
    return config.grade && config.subjects.length > 0 && config.curriculum;
  };

  const handleSubmit = () => {
    if (!canSubmit()) return;
    
    console.log('Package Configuration:', config);
    console.log('Estimated Monthly Cost:', calculateMonthlyPrice());
    
    // TODO: Send to your backend/WhatsApp/email
    alert(`Custom package configured!\n\nGrade: ${config.grade}\nSubjects: ${config.subjects.join(', ')}\nCurriculum: ${config.curriculum}\nSessions/week: ${config.sessionsPerWeek}\n\nEstimated cost: ${currency} ${calculateMonthlyPrice()}/month\n\nWe'll contact you soon!`);
    
    onClose();
  };

  const handleClose = () => {
    setConfig({
      grade: '',
      subjects: [],
      curriculum: '',
      sessionsPerWeek: 2
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className={`${styles.modal} ${leagueSpartan.className}`}
      PaperProps={{
        className: `${styles.modalPaper} ${leagueSpartan.className}`
      }}
    >
      <DialogTitle className={styles.modalHeader}>
        <div className={styles.headerContent}>
          <Typography variant="h6" className={`${styles.modalTitle} ${leagueSpartan.className}`}>
            Build Your Custom Package
          </Typography>
          <IconButton onClick={handleClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent className={styles.modalContent}>
        <Typography className={`${styles.description} ${leagueSpartan.className}`}>
          Select your preferences to create a personalized tutoring package.
        </Typography>

        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <Typography className={`${styles.fieldLabel} ${leagueSpartan.className}`}>
              Grade Level *
            </Typography>
            <div className={leagueSpartan.className}>
              <DropDown
                name="grade"
                placeholder="Select grade"
                data={filterOptions.grades}
                value={config.grade}
                onChange={handleFieldChange}
                className={leagueSpartan.className}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <Typography className={`${styles.fieldLabel} ${leagueSpartan.className}`}>
              Subjects * (Select multiple)
            </Typography>
            <div className={leagueSpartan.className}>
              <DropDown
                name="subjects"
                placeholder="Select subjects"
                data={filterOptions.subjects}
                value={config.subjects}
                onChange={handleFieldChange}
                multiple={true}
                className={leagueSpartan.className}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <Typography className={`${styles.fieldLabel} ${leagueSpartan.className}`}>
              Curriculum *
            </Typography>
            <div className={leagueSpartan.className}>
              <DropDown
                name="curriculum"
                placeholder="Select curriculum"
                data={filterOptions.curricula}
                value={config.curriculum}
                onChange={handleFieldChange}
                className={leagueSpartan.className}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <Typography className={`${styles.fieldLabel} ${leagueSpartan.className}`}>
              Sessions per week
            </Typography>
            <div className={leagueSpartan.className}>
              <DropDown
                name="sessionsPerWeek"
                placeholder="Select sessions"
                data={sessionsOptions}
                value={config.sessionsPerWeek.toString()}
                onChange={handleFieldChange}
                className={leagueSpartan.className}
              />
            </div>
          </div>
        </div>

        <div className={styles.priceEstimate}>
          <div className={styles.priceRow}>
            <span className={`${styles.priceLabel} ${leagueSpartan.className}`}>Base rate:</span>
            <span className={`${styles.priceValue} ${leagueSpartan.className}`}>
              {currency} {baseRate}/hour
            </span>
          </div>
          <div className={styles.priceRow}>
            <span className={`${styles.priceLabel} ${leagueSpartan.className}`}>Sessions/month:</span>
            <span className={`${styles.priceValue} ${leagueSpartan.className}`}>
              {config.sessionsPerWeek * 4} sessions
            </span>
          </div>
          <div className={styles.totalRow}>
            <span className={`${styles.totalLabel} ${leagueSpartan.className}`}>Estimated Monthly:</span>
            <span className={`${styles.totalValue} ${leagueSpartan.className}`}>
              {currency} {calculateMonthlyPrice()}
            </span>
          </div>
        </div>
      </DialogContent>

      <DialogActions className={styles.modalActions}>
        <Button
          onClick={handleClose}
          className={`${styles.cancelButton} ${leagueSpartan.className}`}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit()}
          variant="contained"
          className={`${styles.submitButton} ${leagueSpartan.className}`}
        >
          Get Quote
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimplePackageModal;