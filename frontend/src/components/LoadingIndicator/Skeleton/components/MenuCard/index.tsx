type Props = {
    card: {
        width: string;
        height: string;
    }
}

export default function MenuCard({card}:Props){
    return (
        <div className="skeleton__menu w-100 overflow-hidden">
            <div className="d-flex flex-wrap gap-3"
                style={{width: "2000px"}}>
                <div className="skeleton skeleton__card rounded-4"
                    style={{
                        width: card.width,
                        height: card.height
                    }}>    
                </div>
                <div className="skeleton skeleton__card rounded-4"
                    style={{
                        width: card.width,
                        height: card.height
                    }}>    
                </div>
                <div className="skeleton skeleton__card rounded-4"
                    style={{
                        width: card.width,
                        height: card.height
                    }}>    
                </div>
                <div className="skeleton skeleton__card rounded-4"
                    style={{
                        width: card.width,
                        height: card.height
                    }}>    
                </div>
                <div className="skeleton skeleton__card rounded-4"
                    style={{
                        width: card.width,
                        height: card.height
                    }}>    
                </div>
            </div>
        </div>
    )
}