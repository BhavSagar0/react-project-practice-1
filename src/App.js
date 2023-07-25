import { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import ResultTable from "./components/ResultTable";
import Header from "./components/Header";

function App() {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [yearlyTableData, setYearlyTableData] = useState([]);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
    
    const yearlyData = []; // per-year results
    setInitialInvestment(+userInput.CurrentSavings);
    let currentSavings = +userInput.CurrentSavings; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput.YearlySavings; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput.ExpectedInterest / 100;
    const duration = +userInput.InvestmentDuration;
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
    setYearlyTableData(yearlyData);
  };

  return (
    <div>
      <Header/>

      <CalculatorForm calculateHandler={calculateHandler} />
      <ResultTable yearlyTableData={yearlyTableData} formatter={formatter} initialInvestment={initialInvestment} />
    </div>
  );
}

export default App;
