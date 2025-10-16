import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments & { constraints: string[] },
  ): Promise<boolean> | boolean {
    if (
      !validationArguments ||
      !validationArguments.constraints ||
      !validationArguments.object
    ) {
      return false;
    }

    const relatedPropertyName = validationArguments.constraints[0] as string;
    const relatedValue = (
      validationArguments.object as Record<string, unknown>
    )[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(
    validationArguments: ValidationArguments & { constraints: string[] },
  ) {
    const [relatedPropertyName] = validationArguments.constraints;
    return `${validationArguments.property} must match ${relatedPropertyName}`;
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}
