import { Header } from '@/components'
import ConduciveEnviroment from '@/components/blog/conducive-enviroment'
import Embrace from '@/components/blog/embrace'
import Hero from '@/components/blog/hero'
import OptionsImageHome from '@/components/blog/options-image-home'
import RelatedBlogs from '@/components/blog/related-blogs'
import Footer from '@/components/footer'
import { Grid } from '@mui/material'
import React from 'react'
import students from '../../../public/assets/images/static/young-students-learning-together-group-study.png'

const Page = () => {



  var obj = {
    heroSection: {
      title: "Title for hero",
      tag: "H1",
      image: "url",
      imageAlt: "imageAlt",
      socialShare: true,
      categories: [
        "Study Material",
        "Texting"
      ]
    },

    blogContent: {
      title: "title for blog",
      tag: "h2",
      content: "base64 content / html content (quil output)"
    },
    postCTA:
    {
      show: true,
    },
    relatedBlogs: {
      show: true
    },
    tag: {
      data: [
        "IGCSE",
        "GCSE",
        "IB",
        "AP",
        "EDEXCEL"
      ]
    }

  }

  
  return (
    <>
      <Header />
      <Hero />
      <Grid
        item
        lg={6}
        md={12}
        sm={12}
        xs={12}
        sx={{
          backgroundImage: `url(${students.src})`,
          backgroundPosition: "bottom",
          backgroundSize: "contain",
          height: { xs: "20vh", sm: "25vh", md: "30vh", lg: "70vh" },
          width: "100%",
          backgroundRepeat: "no-repeat",
          borderRadius: "2vh",
        }}
      >
      </Grid>
      <OptionsImageHome />
      <Embrace />
      <ConduciveEnviroment />
      <RelatedBlogs />
      <Footer />
    </>
  )
}
export default Page