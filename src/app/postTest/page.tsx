"use client";
import Link from "next/link";
import React from "react";

const CarListPage = () => {
  const cars = [
    { id: "1", name: "Car 1" },
    { id: "2", name: "Car 2" },
    { id: "3", name: "Car 3" },
  ];

  return (
    <div>
      <h1>Car List</h1>
      {cars.map((car) => (
        <div key={car.id}>
          <Link href={`/p/${car.id}`}>
            <h2>{car.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CarListPage;
