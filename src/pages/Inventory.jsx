import { INVENTORY_KEY, ProductsObj } from "../utils";
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import '../css/inventory.css';
export const Inventory = ({...rest}) => {

  const [products, setProducts] = useState(() => {
    const json = localStorage.getItem(INVENTORY_KEY);
    console.log(json);
    if(!!json) {
      return JSON.parse(json);
    }
    return ProductsObj;
  });
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');


  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;

    setProducts(_products);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};

  const renderHeader = () => {
    return (
        <div className="flex justify-content-end">
            <span className="p-input-icon-left">
              <i className="pi pi-search" style={{ color: 'green' }}></i>
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Busca un producto" />
            </span>
        </div>
    );
};

  const styles = {
    margin: "1rem",
  };

  const header = renderHeader();

  return (<div className="p-4 mb-4">
    <div className="card" style={styles}  {...rest}>
      <DataTable 
        className="p-datatable-inventory"
        value={products}
        editMode="row"
        filters={filters}
        globalFilterFields={['name', 'code', 'representative.name', 'status']} 
        dataKey="code"
        onRowEditComplete={onRowEditComplete}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header} 
        tableStyle={{ minWidth: '90rem' }}
        emptyMessage="No se encontraron productos."
      >
        <Column field="code" header="Codigo"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="stock" header="Stock"></Column>
        <Column field="securityStock" header="Stock de seguridad"></Column>
        <Column field="toOrder" header="Cantidad a pedir"></Column>
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
  </div>
  );
};
