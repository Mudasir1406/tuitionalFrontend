import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material';
import { useI18n } from '@/context/language-context';
import { Send } from '@mui/icons-material';

const EsContactUs: React.FC = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('contact.title')}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {t('contact.subtitle')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('contact.description')}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">{t('contact.contact_info')}</Typography>
            <Typography variant="body1">{t('contact.phone')}</Typography>
            <Typography variant="body1">{t('contact.email')}</Typography>
            <Typography variant="body1">{t('contact.address')}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('contact.form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('contact.form.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('contact.form.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<Send />}
                  fullWidth
                >
                  {t('contact.form.submit')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EsContactUs;