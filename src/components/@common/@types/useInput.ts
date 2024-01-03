export interface Config {
  isRequired?: boolean;
  maxLength?: number;
  onValidate?: () => Validate[];
}

export interface Validate {
  regexp: RegExp;
  name: string;
  errorMessage: string;
}
