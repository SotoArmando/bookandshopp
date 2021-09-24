import Cellitemdisplay from './Cellitemdisplay'
import Wrappedrowlist from './Wrappedrowlist'

export default function Pagehomepath() {
    return <div>
        <Wrappedrowlist 
        g="g"
        item={Cellitemdisplay} list={[..."0".repeat(50).split("")]}
        basis={46}
        marginh={22}
        marginv={22}/>
    </div>
}