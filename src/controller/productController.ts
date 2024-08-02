/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/semi */
import { Request, Response, NextFunction } from 'express';
import { dbFirebase } from '../firebase/config';
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Product from '../models/productModel';

const db = dbFirebase;

// Create new product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'products'), data);
    res.status(200).send('Product created successfully');
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getDocs(collection(db, 'products'));
    const productArry: any = [];

    if (products.empty) {
      res.status(400).send('No products found');
    } else {
      products.forEach((doc) => {
        const product = new Product(
          doc.id,
          doc.data().name,
          doc.data().price,
          doc.data().description,
          doc.data().stock
        );
        productArry.push(product);
      })
      res.status(200).send(productArry);
    }
  } catch (e) {
    res.status(400).send(e);
  }
}

// Get product by id
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await getDoc(doc(db, 'products', id));
    if (product.exists()) {
      res.status(200).send(product.data());
    } else {
      res.status(400).send('Product not found');
    }
  } catch (e) {
    res.status(400).send(e);
  }
}

// Update product by id
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await getDoc(doc(db, 'products', id));
    if (product.exists()) {
      await updateDoc(doc(db, 'products', id), data);
      res.status(200).send('Product updated successfully');
    } else {
      res.status(400).send('Product not found');
    }
  } catch (e) {
    res.status(400).send(e);
  }
}

// Delete product by id
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await getDoc(doc(db, 'products', id));
    if (product.exists()) {
      await deleteDoc(doc(db, 'products', id));
      res.status(200).send('Product deleted successfully');
    } else {
      res.status(400).send('Product not found');
    }
  } catch (e) {
    res.status(400).send(e);
  }
}