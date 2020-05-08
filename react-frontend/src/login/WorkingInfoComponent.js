import React from "react";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";
import ImageComponent from "core-components/ImageComponent";
import VideoComponent from "core-components/VideoComponent";

const WorkingSlideComponent = ({
  sliderList,
  titleClassName,
  imageClassName,
  videoClassName,
}) => (
  <div className="">
    <Carousel>
      {sliderList.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className={titleClassName}>
            <h2>{slide.title}</h2>
          </div>
          {slide.body.image && (
            <ImageComponent src={slide.body.image} className={imageClassName} />
          )}
          {slide.body.video && (
            <VideoComponent
              className={videoClassName}
              src={slide.body.video}
              controls="controls"
            />
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
);

WorkingSlideComponent.propTypes = {
  sliderList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.shape({
        image: PropTypes.string,
        video: PropTypes.any,
      }).isRequired,
    })
  ),
  titleClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  videoClassName: PropTypes.string,
};

export default WorkingSlideComponent;
