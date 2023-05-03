import { INVENTORY_KEY, ProductsObj, DateFormatterMX, addDays, noWhites, noWhitesObj, InputsArray} from "../utils";
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Wrapper } from '../components/Wrapper';
import { Flex } from "../components/Flex";
import { FilterMatchMode } from 'primereact/api';
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
  const [demandPronos, setDemandPronos ] = useState(null);
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

  const calculateToOrder = (option) => Math.trunc((!!demandPronos ? parseFloat(demandPronos) : 1.0) * noWhitesObj[option.code].multiplier - parseFloat(option.stock));
  
  const getToOrder = ((option) => {
    if(noWhites.has(option.code)) {
      return calculateToOrder(option);
    }
    const toOrder = option.securityStock - option.stock;
    return toOrder >= 0 ? toOrder : 0
  });

  const getReorderPoint = ((option) => {
    if(option.securityStock <=  0) return DateFormatterMX.format(new Date());
    let toOrder = parseFloat(option.securityStock - option.stock);
    if(toOrder < 0) 
      toOrder = 0.0 ;
    const division =  parseFloat(toOrder / parseFloat(option.securityStock));
    const lowerBound = 0;
    const multiplier = noWhites.has(option.code) ? 23.0 : 180.0;
    const days = Math.trunc((1.0 - division) * multiplier);
    const currDate = new Date();
    const daysToAdd = lowerBound + days;
    const newDate = addDays(currDate, daysToAdd);
    return DateFormatterMX.format(newDate)
  
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

  const onChangeDemandPronos = (e) => {
    const demanda = Number(e.target.value);
    const json = localStorage.getItem(INVENTORY_KEY);
    let currProducts = products;
		try {
			if (!!json) {
				const parsed = JSON.parse(json);
				currProducts = parsed;
			}
		} catch (e) {
			console.error(e);
		}
    currProducts.forEach((item,idx) => {
      if(noWhites.has(item.code)) {
        const _toOrder = Math.trunc((!!demanda ? parseFloat(demanda) : 1.0) * noWhitesObj[item.code].multiplier - parseFloat(item.stock))
        currProducts[idx].toOrder = _toOrder;
      }
    });
    setDemandPronos(demanda);
    setProducts(currProducts);

  }

  const header = renderHeader();

  return (<Wrapper>
    <div {...rest}>
      <Flex justifyContent={"flex-end"}>
      <span className="p-float-label">
        <InputText id={"demand-pronostic"} value={demandPronos} onChange={onChangeDemandPronos}/>
        <label htmlFor="udemand-pronostic">Demanda pronosticada</label>
      </span>
      </Flex>
      <DataTable
        className="p-datatable-inventory"
        value={products}
        filters={filters}
        globalFilterFields={['name', 'code', 'stock', 'securityStock']}
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
        <Column header="Punto de reorden" field="reorder" body={getReorderPoint}style={{ fontSize: '14px', textAlign: 'center' }} />
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  </Wrapper>
  );
};
