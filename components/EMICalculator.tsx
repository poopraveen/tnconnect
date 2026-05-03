"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingDown, IndianRupee } from "lucide-react";
import { calculateEMI, formatPrice } from "@/lib/utils";

interface EMICalculatorProps {
  propertyPrice: number;
}

export default function EMICalculator({ propertyPrice }: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(Math.round(propertyPrice * 0.8));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalAmount, totalInterest } = useMemo(() => {
    const emi = calculateEMI(loanAmount, interestRate, tenure);
    const totalAmount = emi * tenure * 12;
    const totalInterest = totalAmount - loanAmount;
    return { emi, totalAmount, totalInterest };
  }, [loanAmount, interestRate, tenure]);

  const downPayment = propertyPrice - loanAmount;
  const loanPercent = Math.round((loanAmount / propertyPrice) * 100);

  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
          <Calculator className="w-4 h-4 text-primary-700" />
        </div>
        <h3 className="font-bold text-slate-800">EMI Calculator</h3>
      </div>

      {/* EMI Display */}
      <div className="bg-white rounded-xl p-4 mb-5 text-center shadow-sm">
        <p className="text-xs text-slate-500 mb-1">Monthly EMI</p>
        <p className="text-3xl font-bold text-primary-800">{formatPrice(emi)}</p>
        <p className="text-xs text-slate-400 mt-1">per month</p>
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Loan Amount</label>
            <span className="text-sm font-semibold text-primary-700">
              {formatPrice(loanAmount)} ({loanPercent}%)
            </span>
          </div>
          <input
            type="range"
            min={propertyPrice * 0.1}
            max={propertyPrice * 0.9}
            step={50000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-primary-700"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>10%</span>
            <span>90%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Interest Rate</label>
            <span className="text-sm font-semibold text-primary-700">{interestRate}% p.a.</span>
          </div>
          <input
            type="range"
            min={6}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-primary-700"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Loan Tenure</label>
            <span className="text-sm font-semibold text-primary-700">{tenure} years</span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-primary-700"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>5 yrs</span>
            <span>30 yrs</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <SummaryCard
          label="Down Payment"
          value={formatPrice(downPayment)}
          color="text-emerald-700"
          bg="bg-emerald-50"
        />
        <SummaryCard
          label="Total Interest"
          value={formatPrice(totalInterest)}
          color="text-orange-700"
          bg="bg-orange-50"
        />
        <SummaryCard
          label="Total Payment"
          value={formatPrice(totalAmount)}
          color="text-primary-700"
          bg="bg-primary-50"
        />
      </div>

      {/* Donut chart (CSS) */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div
          className="w-20 h-20 rounded-full"
          style={{
            background: `conic-gradient(
              #1D4ED8 0% ${Math.round((loanAmount / totalAmount) * 100)}%,
              #F97316 ${Math.round((loanAmount / totalAmount) * 100)}% 100%
            )`,
          }}
        />
        <div className="text-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-700" />
            <span className="text-slate-600">
              Principal: {Math.round((loanAmount / totalAmount) * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-orange" />
            <span className="text-slate-600">
              Interest: {Math.round((totalInterest / totalAmount) * 100)}%
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        * EMI calculated for indicative purposes only. Contact your bank for exact figures.
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={`${bg} rounded-lg p-3 text-center`}>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-xs font-bold ${color} leading-tight`}>{value}</p>
    </div>
  );
}
