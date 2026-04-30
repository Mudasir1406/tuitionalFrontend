import React from "react";
import Image from "next/image";
import img1 from "../../../public/assets/images/static/blogimg1.png";
import img2 from "../../../public/assets/images/static/blogimg2.png";
import img3 from "../../../public/assets/images/static/blogimg3.png";
import img4 from "../../../public/assets/images/static/blogimg4.png";
import ellipse1 from "../../../public/assets/images/static/conduciveEllipse1.png";
import ellipse2 from "../../../public/assets/images/static/conduciveEllipse2.png";

const ConduciveEnviroment = () => {
  const images = [img1, img2, img3, img4];

  const data = [
    {
      heading1: "Create a Conducive Learning Environment",
      para1:
        "To maximize the benefits of online tutoring, it's important to create a dedicated learning space that fosters concentration and productivity. Start by selecting a quiet, well-lit area in your home where you can focus without interruptions. Ideally, this space should be separate from areas associated with relaxation or entertainment to help you mentally switch into \"study mode\" when you sit down.",
      para2:
        "Invest in ergonomic furniture to support your comfort during study sessions. A good chair with proper lumbar support and a desk at the right height can prevent strain and enhance your ability to focus for longer periods. Ensure your desk is organized and free of clutter to minimize distractions and keep essential materials within reach. Equip your learning space with the necessary tools for online tutoring. A reliable computer with up-to-date software and high-speed internet is crucial for smooth communication and access to online resources.",
      heading2: "Utilize Resources and Tools for Learning",
      para3:
        "Tuitional Education provides access to a variety of resources designed to enhance your learning experience and support your academic growth. Beyond traditional tutoring sessions, our platform offers a suite of online tools and resources that can significantly augment your studies. Take advantage of interactive whiteboards, which allow for real-time collaboration and visualization of complex concepts. These digital tools enable you and your tutor to draw diagrams, solve problems together, and illustrate ideas dynamically, making abstract concepts more concrete and easier to understand.",
      para4:
        "Educational apps and software integrated into our platform can offer personalized practice and reinforce what you've learned in your sessions. From interactive quizzes and flashcards to simulation games and problem-solving apps, these tools can cater to different learning styles and provide engaging ways to review and apply your knowledge.",
    },
  ];

  return (
    <>
      <div className="mx-[3vh] my-[5vh] mb-[3vh] lg:mx-[7vh] lg:my-0">
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="h-[25vh] w-full rounded-[2vh] bg-cover bg-center lg:h-[40vh]"
              style={{ backgroundImage: `url(${src.src})` }}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="lg:my-[8vh]">
          {data.map((text, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center justify-center">
                <h3 className="w-[35vh] text-center font-heading text-[3vh] font-semibold text-black lg:w-auto lg:text-[5vh]">
                  {text.heading1}
                </h3>
                <p className="w-[44vh] pt-[1.5vh] text-start font-heading text-[1.5vh] font-normal text-ink-900 sm:w-[55vh] sm:text-justify lg:w-[125vh] lg:pt-[2vh] lg:text-[2.4vh]">
                  {text.para1}
                </p>
                <p className="w-[44vh] pt-[1.5vh] text-start font-heading text-[1.5vh] font-normal text-ink-900 sm:w-[55vh] sm:text-justify lg:w-[125vh] lg:pt-[2vh] lg:text-[2.4vh]">
                  {text.para2}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="w-[35vh] text-center font-heading text-[3vh] font-semibold text-black lg:w-auto lg:text-[5vh]">
                  {text.heading2}
                </h3>
                <p className="w-[44vh] pt-[1.5vh] text-start font-heading text-[1.5vh] font-normal text-ink-900 sm:w-[55vh] sm:text-justify lg:w-[125vh] lg:pt-[2vh] lg:text-[2.4vh]">
                  {text.para3}
                </p>
                <p className="w-[44vh] pt-[1.5vh] text-start font-heading text-[1.5vh] font-normal text-ink-900 sm:w-[55vh] sm:text-justify lg:w-[125vh] lg:pt-[2vh] lg:text-[2.4vh]">
                  {text.para4}
                </p>
              </div>
            </React.Fragment>
          ))}
          <div className="absolute bottom-[250px] lg:bottom-[50px]">
            <Image src={ellipse1} alt="" className="h-auto w-[8vh]" />
          </div>
          <div className="absolute right-0 top-[130px] lg:top-[50px]">
            <Image src={ellipse2} alt="" className="h-auto w-[8vh]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConduciveEnviroment;
