import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useI18n } from '@/context/language-context';
import { Search } from '@mui/icons-material';

const EsFilter: React.FC = () => {
  const { t } = useI18n();
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');

  const handleSearch = () => {
    // Handle search logic
    console.log({ grade, subject, level });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {t('filter.title')}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>{t('filter.grade')}</InputLabel>
            <Select
              value={grade}
              label={t('filter.grade')}
              onChange={(e) => setGrade(e.target.value)}
            >
              <MenuItem value="grade4">4° Grado</MenuItem>
              <MenuItem value="grade5">5° Grado</MenuItem>
              <MenuItem value="grade6">6° Grado</MenuItem>
              <MenuItem value="grade7">7° Grado</MenuItem>
              <MenuItem value="grade8">8° Grado</MenuItem>
              <MenuItem value="igcse">IGCSE</MenuItem>
              <MenuItem value="gcse">GCSE</MenuItem>
              <MenuItem value="a-level">A-Level</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>{t('filter.subject')}</InputLabel>
            <Select
              value={subject}
              label={t('filter.subject')}
              onChange={(e) => setSubject(e.target.value)}
            >
              <MenuItem value="math">Matemáticas</MenuItem>
              <MenuItem value="science">Ciencias</MenuItem>
              <MenuItem value="english">Inglés</MenuItem>
              <MenuItem value="physics">Física</MenuItem>
              <MenuItem value="chemistry">Química</MenuItem>
              <MenuItem value="biology">Biología</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>{t('filter.level')}</InputLabel>
            <Select
              value={level}
              label={t('filter.level')}
              onChange={(e) => setLevel(e.target.value)}
            >
              <MenuItem value="beginner">{t('levels.beginner')}</MenuItem>
              <MenuItem value="intermediate">{t('levels.intermediate')}</MenuItem>
              <MenuItem value="advanced">{t('levels.advanced')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Search />}
            fullWidth
            onClick={handleSearch}
          >
            {t('buttons.search')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EsFilter;