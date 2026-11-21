/**
 * StepRenderer — switch del tipo de paso hacia su sub-componente.
 * Todos los steps comparten la misma API:
 *   { step, value, onChange, onSelect, onAdvance, onEdit, onConfirm, stepList, error }
 */
import PropTypes from "prop-types";
import SelectSingleStep from "./steps/SelectSingleStep";
import TextInputStep from "./steps/TextInputStep";
import DatePickerStep from "./steps/DatePickerStep";
import SummaryStep from "./steps/SummaryStep";

export default function StepRenderer({ step, stepList, answers, ...props }) {
  if (!step) return null;
  switch (step.type) {
    case "select_single":
      return <SelectSingleStep step={step} {...props} />;
    case "text_input":
      return <TextInputStep step={step} {...props} />;
    case "date_picker":
      return <DatePickerStep step={step} {...props} />;
    case "summary_step":
      return <SummaryStep step={step} steps={stepList} answers={answers} {...props} />;
    default:
      return null;
  }
}
