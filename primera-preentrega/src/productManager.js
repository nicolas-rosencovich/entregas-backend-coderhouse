import {promises as fs} from "fs"

//uud es para facilitar el tema de los IDs
import {v4 as uuidv4} from "uuid"


export class ProductManager{

    constructor(){
        this.path="products.json"
    this.products=[]
    }
    
    addProduct = async ({title,description, price, thumbnail,code,stock,stat,category})=>{
     let id=uuidv4()


        let newProduct = {title,description, price, thumbnail,code,stock,stat,category}

        this.products= await this.getProducts

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }
    getProducts = async ()=>{
        const response = await fs.readFile(this.path, "utf-8");
        const responseJSON = JSON.parse(response)
    }

    getProductById = async(id)=>{
        const response =await this.getProducts()

        const product = response.find ( product => product.id ===id);

        if (product){
            return product
        }else{
            console.log("Producto no encontrado");
            
        }

    }

    updateProduct = async (id, {...data})=>{
        const products = await this.getProducts()
        //Si existe esto nos devuelve el índice del producto - sino devuelve -1
        const index = products.findIndex(product => product.id ===id)

        if (index!= -1){
            response[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringyfy(products))
            return products [index]

        }else{
            console.log("Upss.. Producto no encontrado");
            
        }
    }

    deleteProduct = async (id)=>{ 
        const products = this.getProducts()
        const index = products.findIndex(product => product.id ===id)

        if(index!= -1){
            //con el método splice borraremnos en el array todo el producto que se encuentre del find index
            //Una vez eliminado volveremops a escribr sobre el archivo
            products.splice(index,2)
            await fs.writeFile(this.path, JSON.stringify(products))
        }else{
            console.log("Producto No encontrado!!");
            
        }
    }
}
