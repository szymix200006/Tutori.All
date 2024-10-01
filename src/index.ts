let sales: number = 123_456_789
let course: string = 'typescript'
let is_published: boolean = true;

function render(document: string) {
    console.log(document);
}

let numbers: number[] = [1,2,3];
numbers.forEach(n => n.toFixed);

let user: [number, string] = [1, 'Chuj'];

const enum Size {
    Small, Medium, Large
}

let mySize = Size.Large;
console.log(mySize)

function calculateTax(income: number, taxYear = 2022): number {
    if (taxYear < 50_000)
         return income * 1.2;
    return income * 1.5;
}

calculateTax(120000);

let employee: {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void
} = {
    id: 1, 
    name: 'Chuj',
    retire: (date: Date) => {
        console.log(date)
    }
}

type Employee = {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void
}

let employee2 : Employee = {
    id: 1, 
    name: 'Chuj',
    retire: (date: Date) => {
        console.log(date)
    }
}

function kgToLbs(weight: number | string): number {
    if(typeof weight === 'number') {
        return weight * 2.2
    }
    return parseInt(weight) * 2.2
}

kgToLbs(10)
kgToLbs('10')

type Draggable = {
    drag: () => void;
}

type Resizable = {
    resize: () => void;
}

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}

type Quantity = 50 | 100
type Metric = 'cm' | 'inch'
let quantity: Quantity = 50;

function greet(name: string | null | undefined): void {
    if (name)
      console.log(name.toUpperCase())
    else 
      console.log('Hola!')
}

type Customer = {
    birthday: Date
}

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : {birthday: new Date()}
}

let customer = getCustomer(0);
console.log(customer?.birthday.getFullYear())

//customers?.[0]
//log?.('a')