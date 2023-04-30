import { useState } from "react";
import { Flex } from "../components/Flex";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Tooltip } from "primereact/tooltip";
import { INPUTS_KEY, ProductsObj, INVENTORY_KEY } from "../utils";
import { InputsArray } from "../utils";
export const Outputs = () => {
    const [newInputCode, setNewInputCode] = useState('');
    const [newQuantity, setNewQuantity] = useState(null);
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState(() => {
        const json = localStorage.getItem(INPUTS_KEY);
        try {
            if (!!json) {
                const parsed = JSON.parse(json);
                return parsed;
            }
        } catch (e) {
            return InputsArray;
        }
        return InputsArray;
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
            <Flex justifyContent={"space-between"}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" style={{ color: 'green' }}></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Busca un producto" />
                </span>
                <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
            </Flex>
        );
    };
    const updateInventory = (code, quantity) => {
        const json = localStorage.getItem(INVENTORY_KEY);
        let currInventory = ProductsObj;
        if (!!json) {
            currInventory = JSON.parse(json);
        }
        let idxToUpdate = currInventory.findIndex((item) => {
            return item.code === code
        });
        currInventory[idxToUpdate].stock += Number(quantity);

        localStorage.setItem(INVENTORY_KEY, JSON.stringify(currInventory));
    }

    const storeInput = () => {
        if (newInputCode.length === 0 || newQuantity === 0 || newQuantity == null) return; // TODO validar que el product exista
        const current = localStorage.getItem(INPUTS_KEY);
        let arr = products;
        if (!!current) {
            arr = JSON.parse(current);
        }
        setNewInputCode('');
        arr = [...arr, { code: newInputCode, quantity: newQuantity }]
        setProducts(arr);
        localStorage.setItem(INPUTS_KEY, JSON.stringify(arr));
        setVisible(false);
        updateInventory(newInputCode, newQuantity);
    };

    const onUpdateInputCode = (e) => {
        setNewInputCode(e.target.value);
    };

    const onUpdateQuantity = (e) => {
        setNewQuantity(e.target.value);
    }

    const footerContent = (
        <div>
            <Button label="Guardar" onClick={storeInput} className="p-button-text" />
        </div>
    );
    const header = renderHeader();

    return (
        <>

            <Flex justifyContent={"flex-end"} >
                <Dialog header="Agrega un producto" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    <Flex flexDirection={"column"} justifyContent={"center"}>
                        <InputText type="text" className="p-inputtext-lg" placeholder="Codigo de producto" value={newInputCode} onChange={onUpdateInputCode} />
                        <InputText type="text" className="p-inputtext-lg" placeholder="Cantidad" value={newQuantity} onChange={onUpdateQuantity} />
                    </Flex>

                </Dialog>
            </Flex>
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
                emptyMessage="No se encontraron productos."
            >
                <Column field="code" header="Codigo"></Column>
                <Column field="quantity" header="Cantidad Ingresada"></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </>
    )
}