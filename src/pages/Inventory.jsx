import { INVENTORY_KEY, ProductsObj } from "../utils";
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Wrapper } from '../components/Wrapper';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import '../css/inventory.css';
export const Inventory = ({ ...rest }) => {

  const [products, setProducts] = useState(() => {
    const json = localStorage.getItem(INVENTORY_KEY);

    if (!!json) {
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



  const header = renderHeader();

  return (<Wrapper>
    <div {...rest}>
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
        header={header}
        emptyMessage="No se encontraron productos."
      >
        <Column style={{ fontSize: '14px', }} field="code" header="Codigo"></Column>
        <Column style={{ fontSize: '14px', }} field="name" header="Nombre"></Column>
        <Column style={{ fontSize: '14px', }} field="stock" header="Stock"></Column>
        <Column style={{ fontSize: '14px', }} field="securityStock" header="Stock de seguridad"></Column>
        <Column style={{ fontSize: '14px', }} field="toOrder" header="Cantidad a pedir"></Column>
        <Column style={{ fontSize: '14px', }} field="reorder" header="Punto de reorden"></Column>
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
  </Wrapper>
  );
};
