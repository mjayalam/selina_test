import { ProductsObj } from "../utils";
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../css/inventory.css';
export const Inventory = ((...rest) => {

  const [products, setProducts] = useState(ProductsObj);

  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;

    setProducts(_products);
  };

  const styles = {
    margin: "1rem"

  }

  return (<div className="p-4 mb-4">
    <div className="card" style={styles}  {...rest}>
      <DataTable className="p-datatable-inventory" value={products} editMode="row" dataKey="code" onRowEditComplete={onRowEditComplete} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '90rem' }}>
        <Column field="code" header="Codigo"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="stock" header="Stock"></Column>
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
  </div>
  );
});
