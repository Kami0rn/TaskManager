import React, { useState } from 'react'

import './CardSlider.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ServiceData } from './constants'
import { ProjectInterface } from '../../interfaces/IProject';
import { ProjectCreateModal } from './ProjectCreateModal';

const CardSlider = ({projectData}: {projectData:ProjectInterface[]}) => {

  const [showProjectCreateModal, setShowProjectCreateModal] = useState(false);
  const handleOnClose = () => setShowProjectCreateModal(false);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
    <div className='w-2/4 mt-20 mx-auto'>
      <Slider {...settings}>
        <div onClick={() => setShowProjectCreateModal(true)} className='bg-[#505050] h-[150px] rounded-xl' style={{ width: '260px' }}>
          <div className='flex justify-center items-center gap-4 p-4 '>
            <p>sgesgesg</p>
          </div>
        </div>

        {projectData.map((item) => (
          <div className='h-[150px] bg-yellow-400  rounded-xl' style={{ width: '260px' }}>
            <div className='flex flex-col justify-center items-center gap-4 p-4'>
              <h1 className='font-semibold'>{item.ProjectName}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    <ProjectCreateModal onClose={handleOnClose} visible={showProjectCreateModal} />
    </>

  )
}

export default CardSlider