const switchRegex = type => {
  switch (type) {
    case "string":
      return /^([a-zA-Z]+)$/
    case "email":
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    case "number":
      return /^([0-9]+)$/
  }
}

export const formFields = [
  {
    field: "firstname",
    type: "string",
    isRequired: true,
    length: "NA"
  },
  {
    field: "lastname",
    type: "string",
    isRequired: true,
    length: "NA"
  },
  {
    field: "email",
    type: "email",
    isRequired: true,
    length: "NA"
  },
  {
    field: "age",
    type: "number",
    isRequired: false,
    length: 3
  },
  {
    field: "phone",
    type: "number",
    isRequired: true,
    length: 10
  }
]

export default function (values) {
  const errors = {}
  formFields.forEach(item => {
    const fieldValue = values[item.field]
    if (!fieldValue && item.isRequired) {
      errors[item.field] = "This field is required."
    } else if (fieldValue && !switchRegex(item.type).test(fieldValue)) {
      errors[item.field] = `Invalid input. Only input of type ${item.type} is allowed.`
    } else if (!(item.length === "NA")) {
      if (!item.isRequired) {
        if (fieldValue.length > item.length) {
          errors[item.field] = `Invalid input. Length of input should not be greater than ${item.length}.`
        }
      } else {
        if (fieldValue.length !== item.length) {
          errors[item.field] = `Invalid input. Length of input should be ${item.length}.`
        }
      }
    }
  })
  return errors
}
