const ProductManager = require('./manager/ProductManager');

const manager = new ProductManager('./files/products.json');

const producto1 = {
    title: 'HP Laserjet Pro M521dn',
    description: 'Fotocopiadora multifuncional de alto rendimiento, con velocidad de impresión de 42 páginas por minuto, resolución de 1200 x 1200 ppp y funciones de copiado, escaneo y fax',
    price: 4299,
    thumbnail: '../assets/img/photocopier1.jpg',
    code: 'M521',
    stock: 21
}

const producto2 = {
    title: 'Kyocera FS M3655idn',
    description: 'Fotocopiadora multifuncional de alto rendimiento, con velocidad de impresión de 55 páginas por minuto y resolución de 1200 x 1200 ppp.',
    price: 1575,
    thumbnail: '../assets/img/photocopier2.jpg',
    code: 'M3655idn',
    stock: 7
}

const producto3 = {
    title: 'Lexmark XM3150',
    description: 'Fotocopiadora multifuncional eficiente diseñada para entornos de trabajo de alto rendimiento. Con una velocidad de impresión de hasta 50 páginas por minuto y una resolución de 1200 x 1200 ppp',
    price: 1849,
    thumbnail: '../assets/img/photocopier3.jpg',
    code: 'XM3150',
    stock: 5
}

const producto4 = {
    title: 'Ricoh MP 305',
    description: 'Fotocopiadora multifuncional compacta y versátil que se adapta perfectamente a entornos de trabajo pequeños y medianos. Con una velocidad de impresión de hasta 30 páginas por minuto y una resolución de impresión de 1200 x 1200 ppp',
    price: 4415,
    code: 'L5590',
    stock: 33
}

const nuevosProductos = async() => {

    await manager.addProduct(producto1);
    await manager.addProduct(producto2);
    await manager.addProduct(producto3);
    await manager.addProduct(producto4);

    console.log(await manager.getProducts());
    console.log(await manager.getProductsById(1));
    console.log(await manager.updateProducts({id: 1, stock: 200}));
    console.log(await manager.deleteProduct(1));

    await manager.addProduct(producto1);
}

nuevosProductos();
