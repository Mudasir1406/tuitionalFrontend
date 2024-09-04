import { Box, Button, Grid, Theme, Typography } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx';
import { Property } from 'csstype';
import React from 'react';

interface Options {
  Header: any;
  Paragraph: string;
  SubjectsArray: any;
}
const TutoringOptions = ({ data }: any) => {
  return (
    <>
      <Box sx={{ margin: "7vh" }}>
        <Typography sx={style.title}>
          {data?.Header}
        </Typography>
        <Typography sx={style.description}>
          {data?.Paragraph}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column', // Stack the rows vertically
          }}
        >
          <Grid container spacing={2} sx={{ maxWidth: '170vh', margin: "4vh auto" }}>
            {data?.SubjectsArray.map((button: { backgroundColor: (string & {}) | SystemStyleObject<Theme> | (string | number) | ((theme: Theme) => string | number | SystemStyleObject<Theme>) | readonly string[] | readonly (readonly string[] | Property.BackgroundColor | null | undefined)[] | { [key: string]: readonly string[] | Property.BackgroundColor | null | undefined; } | ((theme: Theme) => ResponsiveStyleValue<readonly string[] | Property.BackgroundColor | undefined>) | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
              <Grid item xs={12} sm={6} key={index}>
                <Button
                  sx={{
                    backgroundColor: index === 0 ? button.backgroundColor : '#FFFFFF',
                    color: '#2D2D2D', // Text color
                    width: '100%',
                    borderRadius: index === 0 ? '5vh' : '50px', // Apply border-radius conditionally
                    padding: '16px',
                    textAlign: 'center',
                    // boxShadow: index > 0 ? '0px -1px 10px 0px rgba(0, 0, 0, 0.15)' : 'none', //
                    fontSize: "2vh",
                    fontWeight: 500,
                  }}
                >
                  {button.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box >
    </>
  );
};

export default TutoringOptions;

const style = {
  title: {
    width: {
      lg: "92vh",
    },
    fontSize: {
      lg: "6vh",
    },
    fontWeight: 600,
  },
  description: {
    color: "#2D2D2D",
    width: {
      lg: "190vh"
    },
    fontSize: {
      lg: "2vh",
    },
    fontWeight: 400,
  }
}
