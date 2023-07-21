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

  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    let currentSavings = +userInput.CurrentSavings; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput.YearlySavings; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput.ExpectedInterest / 100;
    const duration = +userInput.InvestmentDuration;
    let totalInterest = 0;
    let investedCapital = currentSavings;
    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      totalInterest += yearlyInterest;  
      investedCapital += yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
        totalInterest: totalInterest,
        investedCapital: investedCapital
      });
    }
    setYearlyTableData(yearlyData);
  };

  return (
    <div>
      <Header/>

      <CalculatorForm calculateHandler={calculateHandler} />

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      <ResultTable yearlyTableData={yearlyTableData} formatter={formatter} />
    </div>
  );
}

export default App;
