import Joi from 'joi'
import { SupplierType } from '../../types/supplier.type'

export const createSupplierValidation = (payload: SupplierType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    contact_person: Joi.string().optional().allow(''),
    email: Joi.string().required(),
    phone_number: Joi.string().optional().allow(''),
    address: Joi.string().optional().allow('')
  })
  return schema.validate(payload)
}
