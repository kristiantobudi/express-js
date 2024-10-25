import mongoose from 'mongoose'

const supplierSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, required: true },
  supplier_id: { type: String, required: true, unique: true },
  supplier_name: { type: String, required: true },
  contact_person: { type: String, nullable: true },
  email: { type: String },
  address: { type: String },
  phone_number: { type: String }
}, { timestamps: true })

const SupplierModel = mongoose.model('supplier', supplierSchema) || mongoose.models.supplier

export default SupplierModel
