export const ProductsObj = [
  { code: "SCD0001", name: "SHAMPOO", stock: 0 , securityStock: 10, toOrder: 0},
  { code: "SCD0002", name: "ACONDICIONADOR", stock: 0 , securityStock: 6, toOrder: 0},
  { code: "SCD0003", name: "GEL DE BAÑO", stock: 0 , securityStock: 16, toOrder: 0},
  { code: "SCD0004", name: "Toallas Corporales", stock: 546 , securityStock: 157, toOrder: 0},
  { code: "SCD0005", name: "Toallas de Mano", stock: 201 , securityStock: 191, toOrder: 0},
  { code: "SCD0006", name: "Tapetes de baño", stock: 233 , securityStock: 149, toOrder: 0},
  { code: "SCD0007", name: "Toalla Facial", stock: 139 , securityStock: 424, toOrder: 0},
  { code: "SCD0008", name: "Toallas de Alberca", stock: 0 , securityStock: 0, toOrder: 0},
  { code: "SCD0009", name: "Sabanas Individuales", stock: 316 , securityStock: 170, toOrder: 0},
  { code: "SCD0010", name: "Sábanas Cajon individuales", stock: 300 , securityStock: 165, toOrder: 0},
  { code: "SCD0011", name: "Protector Colchon Individual", stock: 265 , securityStock: 126, toOrder: 0},
  { code: "SCD0012", name: "Sábanas Lisa Matrimoniales", stock: 86 , securityStock: 53, toOrder: 0},
  { code: "SCD0013", name: "Sábanas Cajon Matrimonial ", stock: 6 , securityStock: 28, toOrder: 0},
  { code: "SCD0014", name: "Protector Colchon Matrimonial", stock: 33 , securityStock: 43, toOrder: 0},
  { code: "SCD0015", name: "Cobertor Matrimonial ", stock: 3 , securityStock: 0, toOrder: 0},
  { code: "SCD0016", name: "Sábanas planas Queen", stock: 15 , securityStock: 26, toOrder: 0},
  { code: "SCD0017", name: "Protector Colchon Queen", stock: 5 , securityStock: 16, toOrder: 0},
  { code: "SCD0018", name: "Inserto Queen", stock: 12 , securityStock: 27, toOrder: 0},
  { code: "SCD0019", name: "Duvet Queen", stock: 27 , securityStock: 27, toOrder: 0},
  { code: "SCD0020", name: "Sábanas Lisa King", stock: 157 , securityStock: 50, toOrder: 0},
  { code: "SCD0021", name: "Sábana cajon King", stock: 24 , securityStock: 49, toOrder: 0},
  { code: "SCD0022", name: "Cobertor King ", stock: 12 , securityStock: 0, toOrder: 0},
  { code: "SCD0023", name: "Protector Colchon King", stock: 64 , securityStock: 38, toOrder: 0},
  { code: "SCD0024", name: "Inserto King", stock: 48 , securityStock: 27, toOrder: 0},
  { code: "SCD0025", name: "Duvet King", stock: 54 , securityStock: 35, toOrder: 0},
  { code: "SCD0026", name: "Almohadas std", stock: 397 , securityStock: 131, toOrder: 0},
  { code: "SCD0027", name: "Fundas Almohadas lisa std", stock: 914 , securityStock: 319, toOrder: 0},
  { code: "SCD0028", name: "Protector Almohada std cierre", stock: 425 , securityStock: 126, toOrder: 0},
  { code: "SCD0029", name: "Almohadas King ", stock: 0 , securityStock: 59, toOrder: 0},
  { code: "SCD0030", name: "Protector almohada cierre ", stock: 0 , securityStock: 0, toOrder: 0},
  { code: "SCD0031", name: "Funda Almohada King", stock: 71 , securityStock: 163, toOrder: 0},
  { code: "SCD0032", name: "Cortinas Frescura ", stock: 49 , securityStock: 0, toOrder: 0},
  { code: "SCD0033", name: "Cortinas Blackout ", stock: 131 , securityStock: 0, toOrder: 0},
  { code: "SCD0034", name: "Cojines decorativos", stock: 67 , securityStock: 0, toOrder: 0},
  { code: "SCD0035", name: "Forros decorativos", stock: 0 , securityStock: 0, toOrder: 0},
  
];

export const InputsArray = [];

export const OutputsArray = [];

export const BASE_URL = "/selina_test";

export const INPUTS_KEY = "inputs-register";

export const INVENTORY_KEY = "inventory";

export const OUTPUTS_KEY = "outputs_register";

export const headerItems = {
  imgFooter: "https://selina-res.cloudinary.com/image/upload/if_iw_gt_2560,c_scale,w_2560/e_sharpen:80,q_auto:good/f_auto/v1/s-cf-1/xdw7oj4u3s4v/7wcp0CllQpA4HAZ9Rr4FQr/de8c01157022b708957b2b5687ef8449/asset-1.svg",
  img: "https://www.selina.com/static/media/selina_logo_black.b62a0982.svg",
  navigation: [
    { name: "Instrucciones ", url: BASE_URL },
    { name: "Inventario", url: `${BASE_URL}/inventario` },
    { name: "Entradas", url: `${BASE_URL}/entradas`},
    { name: "Salidas", url: `${BASE_URL}/salidas`}

  ]
}; 