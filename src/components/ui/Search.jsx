import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import { CarMakes, Pricing } from "../../shared/Data";
import { Link } from "react-router-dom";

const Search = () => {
  const [car, setCar] = useState();
  const [make, setMake] = useState();
  const [price, setPrice] = useState();

  return (
    <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row px-5 gap-10 items-center w-[60%]">
      <Select
        onValueChange={(value) => {
          setCar(value);
        }}
      >
        <SelectTrigger className="outline-none md:outline-none w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Old">Old</SelectItem>
          <SelectItem value="Certified Pre-owned">
            Certified Pre-owned
          </SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select
        onValueChange={(value) => {
          setMake(value);
        }}
      >
        <SelectTrigger className="outline-none md:outline-none w-full shadow-none text-lg">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {CarMakes.map((maker, index) => (
            <SelectItem key={maker.id} value={maker.name}>
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select
        onValueChange={(value) => {
          setPrice(value);
        }}
      >
        <SelectTrigger className="outline-none md:outline-none w-full shadow-none text-lg">
          <SelectValue placeholder="Prizing" />
        </SelectTrigger>
        <SelectContent>
          {Pricing.map((prize, index) => (
            <SelectItem key={prize.id} value={prize.amount}>
              {prize.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Link to={"/search?cars=" + car + "&make=" + make + "&price=" + price}>
        <CiSearch className="text-xl bg-primary p-3 rounded-full text-[50px] text-white hover:scale-105 transition-all cursor-pointer" />
      </Link>
    </div>
  );
};

export default Search;
