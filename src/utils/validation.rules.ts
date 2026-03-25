import { TDataType } from "@/data/types/TDataType";


export interface ValidationRuleInfo{
  name: string;
  type: string;
  description: string;
  value_type?: "number" | "string" | "boolean" | "date" | "options" | "select";
  options?: {
    label: string;
    value: string;
  }[];
};

export interface DataTypeValidationRules {
  type: TDataType;
  name: string;
  rules: ValidationRuleInfo[]
};

/**
 * Array con cada tipo de dato y las reglas de validación disponibles
 */
export const DATA_TYPE_VALIDATION_RULES: DataTypeValidationRules[] = [
  {
    type: "string",
    name:"Texto",
    rules: [
      {
        name: "requerido",
        type:"required",
        description: "El campo es obligatorio y no puede estar vacío",
        value_type: "boolean",
      },
      {
        name: "minimo",
        type:"min",
        description: "Longitud mínima de caracteres permitida",
        value_type: "number",
      },
      {
        name: "maximo",
        type:"max",
        description: "Longitud máxima de caracteres permitida",
        value_type: "number",
      },
      {
        name:"formato",
        type:"format",
        description:"Formato especifico del texto",
        value_type:"select",
        options:[
          {
            label:"Correo electrónico",
            value:"email",
          },
          {
            label:"Teléfono",
            value:"phone",
          },
          {
            label:"Texto",
            value:"text",
          }
        ]
      }
    ],


  },
  {
    type: "number",
    name:"Número",
    rules: [
      {
        name: "requerido",
        type:"required",
        description: "El campo es obligatorio y debe tener un valor numérico",
        value_type: "boolean",
      },
      {
        name: "minimo",
        type:"min",
        description: "Valor mínimo permitido",
        value_type: "number",
      },
      {
        name: "maximo",
        type:"max",
        description: "Valor máximo permitido",
        value_type: "number",
      },
      {
        name:"tipo numero",
        type:"number_type",
        description:"Tipo de número (entero o con decimales)",
        value_type:"select",
        options:[
          {
            label:"Número entero",
            value:"integer",
          },
          {
            label:"Número decimal",
            value:"decimal",
          }
        ]
      },
      {
        name:"signo",
        type:"sign",
        description:"Signo del número (positivo o negativo)",
        value_type:"select",
        options:[
          {
            label:"Positivo",
            value:"positive",
          },
          {
            label:"Negativo",
            value:"negative",
          },
        ]
      }
    ],
  },
  {
    type: "boolean",
    name:"Booleano",
    rules: [
      {
        name: "requerido",
        type:"required",
        description: "El campo es obligatorio y debe tener un valor booleano",
        value_type: "boolean",
      },
    ],
  },
  {
    type: "date",
    name:"Fecha",
    rules: [
      {
        name: "requerido",
        type:"required",
        description: "El campo es obligatorio y debe tener una fecha válida",
        value_type: "boolean",
      },
    ],
  },
  {
    type: "datetime",
    name:"Fecha y hora",
    rules: [
      {
        name: "requerido",
        type:"required",
        description: "El campo es obligatorio y debe tener una fecha y hora válida",
        value_type: "boolean",
      },
    ],
  },
  {
    type: "options",
    name:"Opciones",
    rules: [
      {
        name: "requerido",
        type:"required",
        description: "El campo es obligatorio y debe seleccionar una de las opciones disponibles",
        value_type: "boolean",
      },
    ],
  },
];

/**
 * Obtiene las reglas de validación disponibles para un tipo de dato específico
 */
export const getValidationRulesByType = (
  type: TDataType
): ValidationRuleInfo[] => {
  const dataType = DATA_TYPE_VALIDATION_RULES.find((dt) => dt.type === type);
  return dataType?.rules || [];
};

