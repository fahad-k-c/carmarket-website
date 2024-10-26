import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const FinancialCalculator = ({ carDetail }) => {
  const [carPrice, setCarPrice] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMonthlyPayment = () => {
    console.log(carPrice, interestRate, loanTerm, downPayment);

    const Principal = carPrice - downPayment;
    const monthlyInterestRate = interestRate / 12000;
    const monthlyPayment =
      (Principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, loanTerm)) /
      Math.pow(1 + monthlyInterestRate, loanTerm - 1);

    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <div className="p-10 border border-gray-300 rounded-xl shadow-xl mt-7">
      <h2 className="font-md text-2xl ">Financial Calculator</h2>
      <div className="flex gap-5 mt-2">
        <div className="w-full">
          <label>Price $</label>
          <Input
            type="number"
            className="w-full"
            onChange={(e) => {
              setCarPrice(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <label>Interest Rate</label>
          <Input
            type="number"
            className="w-full"
            onChange={(e) => {
              setInterestRate(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex gap-5 mt-2">
        <div className="w-full">
          <label>Loan Term (Months)</label>
          <Input
            type="number"
            className="w-full"
            onChange={(e) => {
              setLoanTerm(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <label>Down Payment</label>
          <Input
            type="number"
            className="w-full"
            onChange={(e) => {
              setDownPayment(e.target.value);
            }}
          />
        </div>
      </div>
      {monthlyPayment > 0 && (
        <h2 className="font-bold text-xl mt-2 ">
          Your Monthly Payment is :
          <span className="text-2xl text-primary"> {monthlyPayment} $</span>
        </h2>
      )}
      <Button
        className="w-full size-lg text-white mt-6 text-lg"
        onClick={calculateMonthlyPayment}
      >
        calculate
      </Button>
    </div>
  );
};

export default FinancialCalculator;
