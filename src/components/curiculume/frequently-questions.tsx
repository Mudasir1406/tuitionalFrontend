import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import upicon from '../../../public/assets/images/svg/Upicon.svg'
import downicon from '../../../public/assets/images/static/Downicon.png'
import Image from 'next/image'
const FrequentlyQuestions = () => {
  let Questions = [
    {
      Text: "Lorem ipsum dolor sit amet consectetur. Faucibus.",
      icon: downicon,
    },
    {
      Text: "Lorem ipsum dolor sit amet consectetur. Ultricies nibh.",
      icon: downicon,
    },
    {
      Text: "Lorem ipsum dolor sit amet consectetur. Quis in rhoncus id libero molestie sed.",
      icon: downicon,
    },
    {
      Text: "Lorem ipsum dolor sit amet consectetur. Pulvinar accumsan dui malesuada commodo euismod.",
      icon: downicon,
    },
    {
      Text: "Lorem ipsum dolor sit amet consectetur. Purus quis venenatis eget.",
      icon: downicon,
    },
    {
      Text: "Lorem ipsum dolor sit amet consectetur. A tincidunt at morbi.",
      icon: downicon,
    },
  ]

  return (
    <div>
      <Box sx={{
        marginY: {
          lg: "13vh"
        },
        marginX: {
          lg: "4vh",
        },
      }}>
        <Box>
          <Typography sx={style.frequently}>Frequently Asked Questions</Typography>
          <Typography sx={style.frequentlyDesc}>
            Lorem ipsum dolor sit amet consectetur. Amet morbi sit suspendisse dui ut donec vel id. Viverra urna cras nulla elementum. Risus orci dolor euismod in fringilla adipiscing eu condimentum.
          </Typography>
        </Box>

        <Box sx={{
          marginX: "auto", // Center the Box horizontally
          maxWidth: "140vh", // Optional: limit the max width of the Box
          paddingX: { lg: "2vh" }, // Optional: add padding to the sides

        }}>
          <Grid container spacing={1}>
            <Box sx={{
              borderRadius: "2vh",
              border: "0.784px #EBEBEB",
              background: "#9EDCFF",
              backdropFilter: "blur(5px)",
              padding: "3vh",
              marginTop: "3vh",
            }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // Center items horizontally

                }}>
                  <Typography sx={style.boxhed}>
                    Lorem ipsum dolor sit amet consectetur. Lorem leo felis.
                  </Typography>
                  <Typography>
                    <Image src={upicon} alt="" style={{ height: "6vh" }} />
                  </Typography>
                </Box>
                <Typography sx={style.boxdesc}>
                  Lorem ipsum dolor sit amet consectetur. Nunc malesuada massa enim nec sapien vel sagittis dignissim libero. Felis phasellus cursus dolor suspendisse. Quam enim urna dictumst aenean morbi nisi. Molestie tincidunt id neque mauris. Egestas nisi tellus eget id aenean dignissim turpis risus. Nisi felis.
                </Typography>
              </Grid>
            </Box>
          </Grid>

          <Grid container spacing={1}>
            {
              Questions.map((item, index) => {
                return (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box sx={{
                        borderRadius: "2vh",
                        border: "0.784px #EBEBEB",
                        background: "#F3FBFF",
                        backdropFilter: "blur(77px)",
                        padding: "3vh",
                        marginTop: "3vh",
                      }}>
                        <Box sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center", // Center items horizontally
                        }}>
                          <Typography sx={style.TextBox}>{item.Text}</Typography>
                          <Typography><Image src={item.icon} alt="" style={{ maxHeight: "8vh" }} /></Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                )
              })
            }
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default FrequentlyQuestions

const style = {
  frequently: {
    fontWeight: "600",
    fontSize: {
      lg: "6vh",
    },
    textAlign: "center",
  },
  frequentlyDesc: {
    textAlign: "center", // Centers the text within the Typography
    fontWeight: "400",
    fontSize: {
      lg: "2.2vh",
    },
    width: {
      lg: "55%",
    },
    margin: "0 auto",
    lineHeight: "5vh"
  },
  boxhed: {
    fontSize: {
      lg: "2.5vh"
    },
  },
  boxdesc: {
    fontSize: {
      lg: "1.9vh"
    },
    width: {
      lg: "135vh",
    },
    marginTop: "2vh",
  },
  TextBox: {
    fontSize: "2.2vh"
  }
}