class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeRepetido = this.products.find(p => p.code === code);
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.products.length + 1,
        };
        if (title && description && price && thumbnail && code && stock !== undefined && !codeRepetido) {
            this.products.push(product);
        } else {
            console.log('Complete all fields');
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const productById = this.products.find(p => p.id === id);
        if (productById) {
            return productById;
        }
        console.error('Not Found');
    }
}

const productos1 = new ProductManager();
productos1.addProduct('HP Laserjet Pro M521dn', 'Fotocopiadora multifuncional de alto rendimiento, con velocidad de impresión de 42 páginas por minuto, resolución de 1200 x 1200 ppp y funciones de copiado, escaneo y fax', 4299, '../assets/img/photocopier1.jpg', 'M521', 21);
productos1.addProduct('Kyocera FS M3655idn', 'Fotocopiadora multifuncional de alto rendimiento, con velocidad de impresión de 55 páginas por minuto y resolución de 1200 x 1200 ppp.', 1575, '../assets/img/photocopier2.jpg', 'M3655idn', 7);
productos1.addProduct('Lexmark XM3150', 'Fotocopiadora multifuncional eficiente diseñada para entornos de trabajo de alto rendimiento. Con una velocidad de impresión de hasta 50 páginas por minuto y una resolución de 1200 x 1200 ppp', 1849, '../assets/img/photocopier3.jpg', 'XM3150', 5);
productos1.addProduct('Ricoh MP 305', 'Fotocopiadora multifuncional compacta y versátil que se adapta perfectamente a entornos de trabajo pequeños y medianos. Con una velocidad de impresión de hasta 30 páginas por minuto y una resolución de impresión de 1200 x 1200 ppp', 4415, '../assets/img/photocopier4.jpg', 'MP305', 11);
productos1.addProduct('EPSON L5590', 'Impresora multifuncional versátil y eficiente para entornos de trabajo domésticos o de pequeñas empresas. Con una velocidad de impresión de hasta 33 páginas por minuto en blanco y negro y 20 páginas por minuto en color.', 411, '../assets/img/printer1.jpg', 'L5590', 33);

const productById1 = productos1.getProductById(1);
const productById5 = productos1.getProductById(5);

console.log(productos1.getProducts());
console.log(productById1);
