import { TDataType } from "@/data/types/TDataType";
import { z } from "zod";
import { Field } from "@/entities/Field";

type ValidationRule = {
  rule: string;
  value: any;
};

type InputData = {
  input: string;
  value: any;
  id_input: number;
};

type ValidationError = {
  fieldId: number;
  fieldKey: string;
  message: string;
};

// Validaciones para strings
const validateStringRule = (value: any, rule: string, ruleValue: any): boolean => {
  if (typeof value !== "string") return false;

  switch (rule) {
    case "required":
      return ruleValue === true ? value.trim().length > 0 : true;
    case "min":
      return z.string().min(ruleValue).safeParse(value).success;
    case "max":
      return z.string().max(ruleValue).safeParse(value).success;
    case "format":
      if (ruleValue === "email") {
        return z.email().safeParse(value).success;
      } else if (ruleValue === "phone") {
        return z.string().regex(/^\d{10}$/).safeParse(value).success;
      } else {
        return z.string().safeParse(value).success;
      }
    default:
      return true;
  }
};

// Validaciones para numbers
const validateNumberRule = (value: any, rule: string, ruleValue: any): boolean => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (typeof numValue !== "number" || isNaN(numValue)) return false;

  switch (rule) {
    case "required":
      return ruleValue === true ? numValue !== null && numValue !== undefined : true;
    case "min":
      return z.number().min(ruleValue).safeParse(numValue).success;
    case "max":
      return z.number().max(ruleValue).safeParse(numValue).success;
    case "number_type":
      if (ruleValue === "integer") {
        return z.number().int().safeParse(numValue).success;
      } else {
        return z.number().safeParse(numValue).success;
      }
    case "sign":
      if (ruleValue === "positive") {
        return z.number().positive().safeParse(numValue).success;
      } else {
        return z.number().negative().safeParse(numValue).success;
      }
    default:
      return true;
  }
};

// Validaciones para boolean
const validateBooleanRule = (value: any, rule: string, ruleValue: any): boolean => {
  if (typeof value !== "boolean" && value !== "true" && value !== "false") return false;
  const boolValue = typeof value === "boolean" ? value : value === "true";

  switch (rule) {
    case "required":
      return ruleValue === true ? typeof boolValue === "boolean" : true;
    default:
      return z.boolean().safeParse(boolValue).success;
  }
};

// Validaciones para date
const validateDateRule = (value: any, rule: string, ruleValue: any): boolean => {
  const dateValue = value instanceof Date ? value : new Date(value);
  if (isNaN(dateValue.getTime())) return false;

  switch (rule) {
    case "required":
      return ruleValue === true ? !isNaN(dateValue.getTime()) : true;
    default:
      return z.date().safeParse(dateValue).success;
  }
};

// Validaciones para options
const validateOptionsRule = (
  value: any,
  rule: string,
  ruleValue: any,
  options?: string[]
): boolean => {
  if (!options || options.length === 0) return false;

  switch (rule) {
    case "required":
      return ruleValue === true ? options.includes(String(value)) : true;
    default:
      return z.enum(options as [string, ...string[]]).safeParse(value).success;
  }
};

/**
 * Valida una regla específica según el tipo de dato
 */
export const validateRule = (
  type: TDataType,
  value: any,
  rule: string,
  ruleValue: any,
  options?: string[]
): boolean => {
  switch (type) {
    case "string":
      return validateStringRule(value, rule, ruleValue);
    case "number":
      return validateNumberRule(value, rule, ruleValue);
    case "boolean":
      return validateBooleanRule(value, rule, ruleValue);
    case "date":
    case "datetime":
      return validateDateRule(value, rule, ruleValue);
    case "options":
      return validateOptionsRule(value, rule, ruleValue, options);
    default:
      return false;
  }
};

/**
 * Valida todas las reglas de un campo
 */
export const validateFieldRules = (
  field: Field,
  inputValue: any,
  inputsDataMap: Map<number, InputData>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Verificar si el campo tiene validaciones
  if (!field.validations || !field.validations.v || !Array.isArray(field.validations.v)) {
    return errors;
  }

  const rules = field.validations.v as ValidationRule[];
  const fieldType = field.type as TDataType;
  const options = field.options?.options as string[] | undefined;

  // Validar cada regla
  for (const ruleObj of rules) {
    const { rule, value: ruleValue } = ruleObj;

    // Si la regla es "required" y el valor está vacío/null/undefined
    if (rule === "required" && ruleValue === true) {
      if (
        inputValue === null ||
        inputValue === undefined ||
        inputValue === "" ||
        (Array.isArray(inputValue) && inputValue.length === 0)
      ) {
        errors.push({
          fieldId: field.id,
          fieldKey: field.key,
          message: `El campo ${field.label} es requerido`,
        });
        continue;
      }
    }

    // Si el campo no es requerido y está vacío, no validamos las demás reglas
    const isRequired = rules.some((r) => r.rule === "required" && r.value === true);
    if (!isRequired && (inputValue === null || inputValue === undefined || inputValue === "")) {
      continue;
    }

    // Validar la regla
    if (!validateRule(fieldType, inputValue, rule, ruleValue, options)) {
      let errorMessage = `El campo ${field.label} no cumple con la regla ${rule}`;
      if (ruleValue !== undefined && ruleValue !== null && ruleValue !== true) {
        errorMessage += ` (valor esperado: ${ruleValue})`;
      }
      errors.push({
        fieldId: field.id,
        fieldKey: field.key,
        message: errorMessage,
      });
    }
  }

  return errors;
};

/**
 * Valida las dependencias entre campos
 */
export const validateFieldDependencies = (
  field: Field,
  inputsDataMap: Map<number, InputData>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Si el campo no tiene dependencia, no hay nada que validar
  if (!field.dependsOnField || !field.depends_on_value) {
    return errors;
  }

  const dependentFieldId = field.dependsOnField.id;
  const expectedValue = field.depends_on_value;
  const dependentInput = inputsDataMap.get(dependentFieldId);

  // Si el campo del que depende no está presente, el campo actual no debe estar presente
  if (!dependentInput) {
    const currentInput = inputsDataMap.get(field.id);
    if (currentInput && currentInput.value !== null && currentInput.value !== undefined && currentInput.value !== "") {
      errors.push({
        fieldId: field.id,
        fieldKey: field.key,
        message: `El campo ${field.label} requiere que el campo ${field.dependsOnField.label} tenga el valor "${expectedValue}"`,
      });
    }
    return errors;
  }

  // Verificar que el valor del campo del que depende coincida con el esperado
  const dependentValue = String(dependentInput.value);
  const expectedValueStr = String(expectedValue);

  if (dependentValue !== expectedValueStr) {
    const currentInput = inputsDataMap.get(field.id);
    if (currentInput && currentInput.value !== null && currentInput.value !== undefined && currentInput.value !== "") {
      errors.push({
        fieldId: field.id,
        fieldKey: field.key,
        message: `El campo ${field.label} requiere que el campo ${field.dependsOnField.label} tenga el valor "${expectedValue}"`,
      });
    }
  }

  return errors;
};

/**
 * Valida todos los campos de un formulario
 */
export const validateFormData = (
  fields: Field[],
  inputsData: InputData[]
): { isValid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];
  const inputsDataMap = new Map<number, InputData>();

  // Crear un mapa de los datos enviados por id_input
  for (const input of inputsData) {
    inputsDataMap.set(input.id_input, input);
  }

  // Validar cada campo
  for (const field of fields) {
    const input = inputsDataMap.get(field.id);
    const inputValue = input?.value;

    // Validar dependencias primero
    const dependencyErrors = validateFieldDependencies(field, inputsDataMap);
    errors.push(...dependencyErrors);

    // Si hay errores de dependencia, no validamos las reglas del campo
    if (dependencyErrors.length > 0) {
      continue;
    }

    // Validar reglas del campo
    const ruleErrors = validateFieldRules(field, inputValue, inputsDataMap);
    errors.push(...ruleErrors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


