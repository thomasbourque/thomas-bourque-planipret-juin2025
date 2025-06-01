
import React from "react";
import { Slider } from "@/components/ui/slider";

interface MortgageSliderProps {
  label: string;
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
}

const MortgageSlider = ({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  formatValue
}: MortgageSliderProps) => {
  return (
    <div>
      <label className="block text-lg font-medium text-slate-900 mb-4">
        {label}
      </label>
      <div className="space-y-4">
        <Slider
          value={value}
          onValueChange={onValueChange}
          max={max}
          min={min}
          step={step}
          className="w-full"
        />
        <div className="text-center">
          <span className="text-xl font-semibold text-slate-700">
            {formatValue(value[0])}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MortgageSlider;
