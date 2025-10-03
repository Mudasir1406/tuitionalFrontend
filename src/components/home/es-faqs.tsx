import React, { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useI18n } from '@/context/language-context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EsFaqs: React.FC = () => {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Sample FAQs - replace with actual FAQs from locale
  const faqs = [
    { id: 'faq1', question: t('faqs.q1'), answer: t('faqs.a1') },
    { id: 'faq2', question: t('faqs.q2'), answer: t('faqs.a2') },
    { id: 'faq3', question: t('faqs.q3'), answer: t('faqs.a3') },
    { id: 'faq4', question: t('faqs.q4'), answer: t('faqs.a4') },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {t('faqs.title')}
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        {faqs.map((faq) => (
          <Accordion 
            key={faq.id} 
            expanded={expanded === faq.id}
            onChange={handleChange(faq.id)}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${faq.id}-content`}
              id={`${faq.id}-header`}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default EsFaqs;