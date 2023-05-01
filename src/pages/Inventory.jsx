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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };


  const getToOrder = ((option) => {
    const toOrder = option.securityStock - option.stock
    return toOrder >= 0 ? toOrder : 0
  })

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
        filters={filters}
        globalFilterFields={['name', 'code', 'stock', 'securityStock', 'toOrder']}
        dataKey="code"
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginator
        rows={5}
        header={header}
        emptyMessage="No se encontraron productos."
      >
        <Column header="Codigo" field="code" style={{ fontSize: '14px' }} />
        <Column header="Nombre" field="name" style={{ fontSize: '14px' }} />
        <Column header="Stock" field="stock" style={{ fontSize: '14px', textAlign: 'center' }} />
        <Column header="Stock de seguridad" field="securityStock" style={{ fontSize: '14px', textAlign: 'center' }} />
        <Column header="Cantidad a pedir" field="toOrder" body={getToOrder} style={{ fontSize: '14px', textAlign: 'center' }} />
        <Column header="Punto de reorden" field="reorder" style={{ fontSize: '14px', textAlign: 'center' }} />
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  </Wrapper>
  );
};
