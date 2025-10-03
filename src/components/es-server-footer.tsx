import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, IconButton } from '@mui/material';
import { useI18n } from '@/context/language-context';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const EsServerFooter: React.FC = () => {
  const { t } = useI18n();

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('footer.title')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {t('footer.description')}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <IconButton href="#" color="primary">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="primary">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="primary">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="primary">
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              {t('footer.sections.curriculums')}
            </Typography>
            <Link href="/es/curriculums" color="inherit" display="block">
              Cambridge
            </Link>
            <Link href="/es/curriculums" color="inherit" display="block">
              Pearson Edexcel
            </Link>
            <Link href="/es/curriculums" color="inherit" display="block">
              AQA
            </Link>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              {t('footer.sections.subjects')}
            </Typography>
            <Link href="/es/subjects" color="inherit" display="block">
              {t('subjects.math')}
            </Link>
            <Link href="/es/subjects" color="inherit" display="block">
              {t('subjects.science')}
            </Link>
            <Link href="/es/subjects" color="inherit" display="block">
              {t('subjects.english')}
            </Link>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              {t('footer.sections.about_us')}
            </Typography>
            <Link href="/es/about" color="inherit" display="block">
              {t('nav.about')}
            </Link>
            <Link href="/es/contact" color="inherit" display="block">
              {t('nav.contact')}
            </Link>
            <Link href="/es/testimonials" color="inherit" display="block">
              {t('nav.testimonials')}
            </Link>
          </Grid>
        </Grid>
        
        <Box sx={{ pt: 4, mt: 4, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="textSecondary" align="center">
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default EsServerFooter;