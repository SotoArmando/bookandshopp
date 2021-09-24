export default function Cellitemdisplay() {
    const defaultValues = {
        name: "C 400 GT",
        brand: "BMW"
    }
    const {name,brand} = defaultValues
    return <div className="col">
        <div>{name}</div>
        <div>{brand}</div>
    </div>
}