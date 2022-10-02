import {
  ArrayType,
  BaseType,
  DefinitionType,
  OptionalType,
  PrimitiveType,
  UndefinedType,
  UnionType
} from '@kitajs/ts-json-schema-generator';

/**
 * Tries to resolve the provided type into a primitive type, if it is one.
 */
export function asPrimitiveType(type: BaseType): BaseType | undefined {
  if (type instanceof DefinitionType) {
    type = type.getType();
  }

  if (type instanceof PrimitiveType || type instanceof UndefinedType) {
    return type;
  }

  if (type instanceof OptionalType) {
    if (asPrimitiveType(type.getType())) {
      return type;
    }
  }

  if (type instanceof UnionType) {
    if (type.getTypes().every((t) => asPrimitiveType(t))) {
      return type;
    }
  }

  if (type instanceof ArrayType) {
    if (asPrimitiveType(type.getItem())) {
      return type;
    }
  }

  return undefined;
}
