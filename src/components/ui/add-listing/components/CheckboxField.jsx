import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const CheckboxField = (feature, handleInputChange) => {
  return (
    <div>
      <Checkbox
        onCheckedChange={(value) => {
          handleInputChange(feature.name, value);
        }}
      />
    </div>
  );
};

export default CheckboxField;
