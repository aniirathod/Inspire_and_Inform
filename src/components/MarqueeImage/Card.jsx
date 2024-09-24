import React from "react";

const Card = ({ image, name, work }) => {
  return (
    <div className="">
      <div className="relative w-64 h-64 overflow-hidden text-xs font-bold text-white bg-gray-400 rounded-3xl">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 px-5 mb-4">
          <h3>{name}</h3>
          <h4>{work}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
