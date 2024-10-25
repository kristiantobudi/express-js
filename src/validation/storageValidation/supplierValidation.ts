import Joi from 'joi'
import { SupplierType } from '../../types/supplier.type'

export const createSupplierValidation = (payload: SupplierType) => {
  const schema = Joi.object({
    _id: Joi.string().optional(),
    sequence_value: Joi.number().optional(),
    supplier_id: Joi.string().required(),
    supplier_name: Joi.string().required(),
    contact_person: Joi.string().optional().allow(''),
    email: Joi.string().required(),
    phone_number: Joi.string().optional().allow(''),
    address: Joi.string().optional().allow('')
  })
  return schema.validate(payload)
}

export const updateSupplierValidation = (payload: SupplierType) => {
  const schema = Joi.object({
    _id: Joi.string().optional(),
    sequence_value: Joi.number().optional(),
    supplier_id: Joi.string().optional(),
    supplier_name: Joi.string().required(),
    contact_person: Joi.string().optional().allow(''),
    email: Joi.string().required(),
    phone_number: Joi.string().optional().allow(''),
    address: Joi.string().optional().allow('')
  })
  return schema.validate(payload)
}
